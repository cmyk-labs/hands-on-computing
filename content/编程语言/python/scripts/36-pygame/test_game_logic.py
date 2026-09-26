"""所属章节：36-Pygame 图形与游戏
演示知识点：移动累计与限速、边界与计分、事件驱动重置退出及有限循环资源清理的测试
运行命令：python -m pytest -q scripts/36-pygame/test_game_logic.py（工作目录 content/编程语言/python）
期望结果：16 项测试通过
"""

from pathlib import Path

import pygame
import pytest

import collect_game
import game_logic


@pytest.fixture(autouse=True)
def use_headless_display(monkeypatch: pytest.MonkeyPatch) -> None:
    """即使单独运行测试，也在显示初始化前选择无窗口驱动。"""
    monkeypatch.setenv("SDL_VIDEODRIVER", "dummy")


def test_fractional_movement_survives_each_frame() -> None:
    """每帧不足一个像素时仍累计位置，防止 Rect 取整吞掉位移。"""
    state = game_logic.GameState()
    for _ in range(10):
        state.update(pygame.Vector2(1, 0), 0.001)
    assert state.position.x == pytest.approx(41.8)
    assert state.player_rect.x == 41


def test_diagonal_speed_matches_horizontal_speed() -> None:
    """斜向输入不应让同一时间内的移动距离变长。"""
    state = game_logic.GameState()
    origin = state.position.copy()
    state.update(pygame.Vector2(1, 1), 0.05)
    assert state.position.distance_to(origin) == pytest.approx(9)


@pytest.mark.parametrize("dt", [0.05, 0.5, 10.0])
def test_long_frame_is_capped(dt: float) -> None:
    """停顿后单帧最多移动 9 像素。"""
    state = game_logic.GameState()
    state.update(pygame.Vector2(1, 0), dt)
    assert tuple(state.position) == (49.0, 200.0)


@pytest.mark.parametrize(
    ("start", "direction", "expected"),
    [
        ((25, 97), (-1, -1), (24, 96)),
        ((591, 311), (1, 1), (592, 312)),
    ],
)
def test_player_stays_inside_arena(
    start: tuple[int, int],
    direction: tuple[int, int],
    expected: tuple[int, int],
) -> None:
    """四条边都按整个玩家矩形限制，不能只限制左上角。"""
    state = game_logic.GameState(position=pygame.Vector2(start))
    state.update(pygame.Vector2(direction), 0.05)
    assert tuple(state.position) == expected
    assert pygame.Rect(game_logic.ARENA).contains(state.player_rect)


def test_touching_edge_does_not_score_then_overlap_scores_once() -> None:
    """边缘接触不加分，真正重叠后切换目标，原地不能反复计分。"""
    state = game_logic.GameState(position=pygame.Vector2(96, 200))
    state.update(pygame.Vector2(), 0)
    assert state.score == 0
    state.update(pygame.Vector2(1, 0), 0.01)
    assert state.score == 1
    assert state.target_rect.topleft == (400, 140)
    state.update(pygame.Vector2(), 0)
    assert state.score == 1


def test_target_sequence_wraps_without_losing_score() -> None:
    """收完四个固定位置后回到首个目标，累计分数保留。"""
    state = game_logic.GameState()
    for point in [(120, 200), (400, 140), (500, 290), (180, 120)]:
        state.position = pygame.Vector2(point)
        state.update(pygame.Vector2(), 0)
    assert state.score == 4
    assert state.target_rect.topleft == (120, 200)


def test_restart_key_restores_whole_round() -> None:
    """R 事件同时重置分数、目标及位置。"""
    state = game_logic.GameState(position=pygame.Vector2(120, 200))
    state.update(pygame.Vector2(), 0)
    state.handle_events([pygame.event.Event(pygame.KEYDOWN, key=pygame.K_r)])
    assert state.score == 0
    assert state.target_rect.topleft == (120, 200)
    assert tuple(state.position) == (40.0, 200.0)
    assert state.running


@pytest.mark.parametrize(
    "quit_event",
    [
        pygame.event.Event(pygame.QUIT),
        pygame.event.Event(pygame.KEYDOWN, key=pygame.K_ESCAPE),
    ],
)
def test_quit_stops_update_even_if_restart_follows(
    quit_event: pygame.event.Event,
) -> None:
    """退出后的同批事件和移动不能继续推进游戏。"""
    state = game_logic.GameState()
    restart = pygame.event.Event(pygame.KEYDOWN, key=pygame.K_r)
    state.handle_events([quit_event, restart])
    state.update(pygame.Vector2(1, 0), 0.05)
    assert not state.running
    assert tuple(state.position) == (40.0, 200.0)


def test_two_states_do_not_share_position() -> None:
    """一次游戏的移动不能影响新建的另一局。"""
    first = game_logic.GameState()
    second = game_logic.GameState()
    first.update(pygame.Vector2(1, 0), 0.05)
    assert tuple(second.position) == (40.0, 200.0)


def test_real_event_queue_restarts_then_quits() -> None:
    """真实 SDL 队列交付的事件应驱动重置与退出。"""
    state = game_logic.GameState(position=pygame.Vector2(120, 200))
    state.update(pygame.Vector2(), 0)
    try:
        pygame.display.init()
        pygame.display.set_mode((64, 48))
        pygame.event.clear()
        restart = pygame.event.Event(pygame.KEYDOWN, key=pygame.K_r)
        assert pygame.event.post(restart)
        state.handle_events(pygame.event.get())
        assert state.score == 0
        assert tuple(state.position) == (40.0, 200.0)
        assert pygame.event.post(pygame.event.Event(pygame.QUIT))
        state.handle_events(pygame.event.get())
        assert not state.running
    finally:
        pygame.quit()


def test_finite_loop_moves_scores_saves_and_closes(
    monkeypatch: pytest.MonkeyPatch,
    tmp_path: Path,
) -> None:
    """只替代物理键盘状态；循环、事件、碰撞、绘图与清理真实执行。"""
    # 固定键盘输入，其余游戏循环和 SDL 绘制都真实执行。
    keys = {
        pygame.K_RIGHT: True,
        pygame.K_LEFT: False,
        pygame.K_DOWN: False,
        pygame.K_UP: False,
    }
    monkeypatch.setattr(pygame.key, "get_pressed", lambda: keys)
    image_path = tmp_path / "last-frame.png"
    report = collect_game.run_game(10, 0.05, image_path)
    assert report["frames"] == 10
    assert report["position"] == [130.0, 200.0]
    assert report["score"] == 1
    assert not report["running"]
    assert report["display_closed"]
    assert not pygame.font.get_init()
    # 状态检查后再读实际图片，在玩家和新目标内部各取一个像素。
    rendered = pygame.image.load(image_path)
    assert rendered.get_size() == (640, 400)
    assert tuple(rendered.get_at((131, 201)))[:3] == (90, 215, 196)
    assert tuple(rendered.get_at((401, 141)))[:3] == (250, 196, 72)


def test_drawing_failure_still_closes_resources(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """绘制阶段失败也必须执行 finally，不能遗留显示及字体模块。"""
    def fail_drawing(*args: object) -> None:
        raise ValueError("演示绘制失败")

    monkeypatch.setattr(collect_game, "draw_scene", fail_drawing)
    with pytest.raises(ValueError, match="演示绘制失败"):
        collect_game.run_game(1, 0.02)
    assert not pygame.display.get_init()
    assert not pygame.font.get_init()
