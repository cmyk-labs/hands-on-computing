"""预览本章页面，并为同一内容提供 HTML 与 XML 两种响应类型。"""

import functools
import http.server
import io
from pathlib import Path
from typing import BinaryIO


class PreviewHandler(http.server.SimpleHTTPRequestHandler):
    """为两个固定实验地址设置 Content-Type，其余地址读取本章文件。"""

    def send_head(self) -> BinaryIO | None:
        """发送响应头并返回可读取的响应体，同时支持 GET 和 HEAD。"""
        # 1. 只有两个约定地址改变媒体类型，不根据扩展名作实验判断。
        mime_types = {
            "/as-html.xhtml": "text/html",
            "/as-xml.html": "application/xhtml+xml",
        }
        mime_type = mime_types.get(self.path.partition("?")[0])
        if mime_type is None:
            return super().send_head()

        # 2. 两个响应读取同一文件；不改写、解析或复制页面内容。
        payload = (Path(self.directory) / "mime-probe.xhtml").read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", mime_type + "; charset=utf-8")
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        return io.BytesIO(payload)


def main() -> None:
    """在终端启动本章服务，按 Ctrl+C 退出并关闭套接字。"""
    handler = functools.partial(
        PreviewHandler, directory=Path(__file__).resolve().parent
    )
    with http.server.ThreadingHTTPServer(("127.0.0.1", 8017), handler) as server:
        print("http://127.0.0.1:8017/dom.html")
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("预览服务已停止。")


if __name__ == "__main__":
    main()
