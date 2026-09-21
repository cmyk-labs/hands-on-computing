"""所属章节：36-Pygame 图形与游戏
演示知识点：完整游戏循环（输入、更新、碰撞计分、绘制）与有限运行入口、资源清理；交互模式 R 重来、Esc 退出
运行命令：SDL_VIDEODRIVER=dummy python scripts/36-pygame/collect_game.py --frames 8 --dt 0.025（工作目录 content/编程语言/python）
期望结果：输出 JSON 报告 frames=8、score=0、position=[40.0, 200.0] 且 display_closed 为 true
"""

import argparse
import json
import math
from pathlib import Path

import pygame

import game_logic


def draw_scene(
    screen: pygame.Surface,
    state: game_logic.GameState,
    font: pygame.font.Font,
) -> None:
    """根据当前状态重画背景、目标、玩家与文字。"""
    # 1. 清除上一帧，在固定活动区绘制几何图形。
    screen.fill((17, 24, 39))
    pygame.draw.rect(screen, (31, 43, 61), game_logic.ARENA)
    pygame.draw.rect(screen, (92, 111, 139), game_logic.ARENA, width=2)
    pygame.draw.rect(screen, (250, 196, 72), state.target_rect)
    pygame.draw.rect(screen, (90, 215, 196), state.player_rect)

    # 2. 默认字体生成文字 Surface，再复制到画面。
    labels = [
        ("COLLECT THE SQUARE", (24, 22)),
        (f"SCORE  {state.score}", (24, 58)),
        ("ARROWS: move    R: restart    ESC: quit", (24, 360)),
    ]
    for text, position in labels:
        label = font.render(text, True, (232, 238, 248))
        screen.blit(label, position)


def run_game(
    frames: int | None = None,
    fixed_dt: float | None = None,
    snapshot: Path | None = None,
) -> dict[str, object]:
    """运行游戏并释放资源；有限模式绘完指定帧数后投递 QUIT。

    不设置显示驱动：普通终端启动显示窗口，Notebook 的子进程用 dummy。
    fixed_dt 只允许与 frames 同用，避免误把固定步长当作真实计时。
    """
    if frames is not None and frames <= 0:
        raise ValueError("frames 必须是正整数")
    if fixed_dt is not None:
        if frames is None:
            raise ValueError("fixed_dt 需要有限 frames")
        if not math.isfinite(fixed_dt) or fixed_dt <= 0:
            raise ValueError("fixed_dt 必须是有限的正秒数")

    # 1. 只初始化需要的显示和字体模块；失败也进入 finally 清理。
    state = game_logic.GameState()
    rendered_frames = 0
    try:
        pygame.display.init()
        pygame.font.init()
        screen = pygame.display.set_mode((640, 400))
        pygame.display.set_caption("Collect the square")
        font = pygame.font.Font(None, 28)
        clock = pygame.time.Clock()

        # 2. 每帧按输入、更新与碰撞、绘制、提交画面的顺序推进。
        while state.running:
            elapsed_seconds = clock.tick(60) / 1000
            if (
                frames is not None
                and rendered_frames >= frames
                and not pygame.event.post(pygame.event.Event(pygame.QUIT))
            ):
                raise RuntimeError("自动退出事件未能入队")
            state.handle_events(pygame.event.get())
            if not state.running:
                break
            keys = pygame.key.get_pressed()
            direction = pygame.Vector2(
                int(keys[pygame.K_RIGHT]) - int(keys[pygame.K_LEFT]),
                int(keys[pygame.K_DOWN]) - int(keys[pygame.K_UP]),
            )
            dt = elapsed_seconds if fixed_dt is None else fixed_dt
            state.update(direction, dt)
            draw_scene(screen, state, font)
            pygame.display.flip()
            rendered_frames += 1

        # 3. 保存最后一帧后再释放显示资源；未指定路径则不写文件。
        if snapshot is not None:
            pygame.image.save(screen, snapshot)
    finally:
        pygame.quit()
    return {
        "frames": rendered_frames,
        "score": state.score,
        "position": list(state.position),
        "running": state.running,
        "display_closed": not pygame.display.get_init(),
    }


def main() -> None:
    """解析有限运行选项，默认进入可交互游戏。"""
    # 1. 在 CLI 边界给出错误提示，不启动无效的实验。
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--frames", type=int, help="正整数，省略则手动退出")
    parser.add_argument("--dt", type=float, help="有限模式固定秒数")
    parser.add_argument("--snapshot", type=Path, help="保存最后一帧的 PNG 路径")
    args = parser.parse_args()
    if args.frames is not None and args.frames <= 0:
        parser.error("--frames 必须是正整数")
    if args.dt is not None:
        if args.frames is None:
            parser.error("--dt 必须与 --frames 一起使用")
        if not math.isfinite(args.dt) or args.dt <= 0:
            parser.error("--dt 必须是有限的正秒数")

    # 2. 运行后输出简短状态，供 Notebook 核对完成与清理。
    report = run_game(args.frames, args.dt, args.snapshot)
    print(json.dumps(report))


if __name__ == "__main__":
    main()
