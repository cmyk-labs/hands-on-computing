"""收集游戏的状态规则；导入及状态更新均不创建窗口。"""

import dataclasses
import math
from collections.abc import Iterable

import pygame

ARENA = (24, 96, 592, 240)
PLAYER_SIZE = 24
SPEED = 180.0  # 像素／秒；与 MAX_DT 一起限制单帧位移。
MAX_DT = 0.05  # 秒；超过此值的停顿时间不参与本帧更新。
TARGET_POSITIONS = ((120, 200), (400, 140), (500, 290), (180, 120))


@dataclasses.dataclass
class GameState:
    """保存一局游戏；position 是玩家左上角的浮点像素坐标。"""

    position: pygame.Vector2 = dataclasses.field(
        default_factory=lambda: pygame.Vector2(40, 200),
    )
    score: int = 0
    target_index: int = 0
    running: bool = True

    @property
    def player_rect(self) -> pygame.Rect:
        """从浮点位置构造整数碰撞框，不反向覆盖浮点位置。"""
        return pygame.Rect(
            int(self.position.x), int(self.position.y),
            PLAYER_SIZE, PLAYER_SIZE,
        )

    @property
    def target_rect(self) -> pygame.Rect:
        """构造当前目标的整数矩形。"""
        return pygame.Rect(TARGET_POSITIONS[self.target_index], (24, 24))

    def reset(self) -> None:
        """重置本局位置、分数与目标；不撤销退出请求。"""
        self.position = pygame.Vector2(40, 200)
        self.score = 0
        self.target_index = 0

    def handle_events(self, events: Iterable[pygame.event.Event]) -> None:
        """处理离散命令；退出后不处理同批次的后续事件。"""
        if not self.running:
            return
        for event in events:
            if event.type == pygame.QUIT:
                self.running = False
                return
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    self.running = False
                    return
                if event.key == pygame.K_r:
                    self.reset()

    def update(self, direction: pygame.Vector2, dt: float) -> None:
        """按方向和秒数更新，限制时间与边界，再处理一次碰撞。

        direction 由方向键产生，每个分量为 -1、0 或 1。
        dt 必须有限且非负；允许 0，便于只检查当前碰撞。
        """
        if not math.isfinite(dt) or dt < 0:
            raise ValueError("dt 必须是有限的非负秒数")
        if not self.running:
            return

        # 1. 非零方向归一化，防止斜向速度更快；保留小数位移。
        dt = min(dt, MAX_DT)
        if direction.length_squared() > 0:
            self.position += direction.normalize() * SPEED * dt

        # 2. 限制整个玩家矩形，而不只是左上角坐标。
        arena = pygame.Rect(ARENA)
        self.position.x = min(
            max(self.position.x, arena.left), arena.right - PLAYER_SIZE,
        )
        self.position.y = min(
            max(self.position.y, arena.top), arena.bottom - PLAYER_SIZE,
        )

        # 3. 目标按固定顺序移动，本帧只计一次分，便于复现。
        if self.player_rect.colliderect(self.target_rect):
            self.score += 1
            self.target_index = (self.target_index + 1) % len(TARGET_POSITIONS)
