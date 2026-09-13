"""预览本章媒体与来源对照，固定媒体类型；仅绑定本机。"""

import argparse
import functools
import http.server
from pathlib import Path


class MediaRequestHandler(http.server.SimpleHTTPRequestHandler):
    """明确媒体响应类型，避免操作系统的扩展名映射影响字幕。"""

    extensions_map = http.server.SimpleHTTPRequestHandler.extensions_map | {
        ".vtt": "text/vtt",
        ".webm": "video/webm",
        ".mp4": "video/mp4",
        ".wav": "audio/wav",
    }


def main() -> None:
    """在一个指定端口运行；终端 Ctrl+C 结束并释放监听端口。"""
    # 1. 两个终端分别使用两个端口，保持真实跨源条件。
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, choices=(8008, 8108), default=8008)
    args = parser.parse_args()
    chapter_dir = Path(__file__).resolve().parent
    handler = functools.partial(MediaRequestHandler, directory=str(chapter_dir))

    # 2. 服务根目录固定为本章目录，URL 不再重复 scripts 路径。
    with http.server.ThreadingHTTPServer(("127.0.0.1", args.port), handler) as server:
        print(f"http://127.0.0.1:{args.port}/video.html", flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("本章预览服务已停止。", flush=True)


if __name__ == "__main__":
    main()
