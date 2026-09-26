"""所属章节：11-表单提交与原生校验
演示知识点：本机页面服务与 GET/POST 请求回显：保留重复字段和空值、不保存提交数据或上传文件、不解析 multipart、不做业务校验
运行命令：python scripts/11-form-submission-and-validation/echo_server.py（工作目录 content/Web与应用开发/html）；浏览器打开 http://127.0.0.1:8011/submission.html
期望结果：终端打印 http://127.0.0.1:8011/submission.html，提交后回显页显示方法、Content-Type、字段条目与原始请求体
"""

from functools import partial
import html
import http.server
import json
from pathlib import Path
import urllib.parse


class EchoHandler(http.server.SimpleHTTPRequestHandler):
    """提供本章目录的文件，并回显 GET 查询及 POST 请求体。"""

    def do_GET(self) -> None:
        """读取本章页面，或展示 GET 查询参数。"""
        # 1. 接收地址是演示端点，不对应磁盘上的文件。
        request_path = urllib.parse.urlsplit(self.path).path
        if request_path in {"/echo", "/echo-post"}:
            self._echo(b"")
            return

        super().do_GET()

    def do_POST(self) -> None:
        """按浏览器提供的长度读取本章表单请求体。"""
        body_length = int(self.headers["Content-Length"])
        self._echo(self.rfile.read(body_length))

    def _echo(self, raw_body: bytes) -> None:
        # 1. URL 编码数据保留重复字段和空值；不判断业务数据是否合法。
        query = urllib.parse.urlsplit(self.path).query
        content_type = self.headers.get("Content-Type", "(未提供)")
        query_pairs = urllib.parse.parse_qsl(query, keep_blank_values=True)
        lines = [
            f"Method: {self.command}",
            f"Request target: {self.path}",
            f"Content-Type: {content_type}",
            f"Content-Length: {self.headers.get('Content-Length', '(未提供)')}",
            f"Body bytes received: {len(raw_body)}",
            "Query entries:",
            json.dumps(query_pairs, ensure_ascii=False, indent=2),
        ]
        # 只有 URL 编码表单转成字段条目；multipart 在下面仅显示原始体。
        media_type = content_type.split(";", 1)[0].strip().lower()
        if media_type == "application/x-www-form-urlencoded":
            body_text = raw_body.decode("utf-8")
            form_pairs = urllib.parse.parse_qsl(
                body_text, keep_blank_values=True
            )
            lines.extend([
                "URL-encoded body entries:",
                json.dumps(form_pairs, ensure_ascii=False, indent=2),
            ])
        lines.extend([
            "Raw body (UTF-8 preview):",
            raw_body.decode("utf-8"),
        ])

        # 2. 所有请求内容先转义；原始体只展示，不冒充 multipart 解析结果。
        preview = html.escape("\n".join(lines))
        page = (
            '<!doctype html><html lang="zh-CN"><head>'
            '<meta charset="utf-8">'
            '<meta name="viewport" content="width=device-width, initial-scale=1">'
            '<title>本机请求回显</title></head><body>'
            '<h1>本机请求回显</h1>'
            '<p>这里只显示收到的请求；没有保存数据，也没有完成业务校验。</p>'
            f'<pre>{preview}</pre>'
            '<nav aria-label="实验页面">'
            '<a href="/submission.html">提交数据</a> | '
            '<a href="/upload.html">文件上传</a> | '
            '<a href="/constraints.html">原生约束</a> | '
            '<a href="/pattern.html">格式与输入提示</a>'
            '</nav></body></html>'
        )
        self._send(page.encode("utf-8"), "text/html; charset=utf-8")

    def _send(self, content: bytes, content_type: str) -> None:
        # 长度按编码后的字节计算；先发送响应头，再发送页面字节。
        self.send_response(200)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(content)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.end_headers()
        self.wfile.write(content)

# 静态页面路径相对于本脚本目录；with 在终止服务时关闭监听套接字。
handler = partial(EchoHandler, directory=Path(__file__).resolve().parent)
with http.server.ThreadingHTTPServer(("127.0.0.1", 8011), handler) as server:
    print("http://127.0.0.1:8011/submission.html")
    print("本机模拟数据回显；按 Ctrl+C 关闭服务。")
    server.serve_forever()
