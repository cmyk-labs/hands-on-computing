"""所属章节：11-表单提交与原生校验
演示知识点：本机页面服务与 GET/POST 请求回显：保留重复字段和空值、限定文件清单与 64 KiB 请求体上限；不保存提交数据或上传文件、不解析 multipart、不做业务校验
运行命令：python scripts/11-form-submission-and-validation/echo_server.py（工作目录 content/Web与应用开发/html）；浏览器打开 http://127.0.0.1:8011/submission.html
期望结果：终端打印 http://127.0.0.1:8011/submission.html，提交后回显页显示方法、Content-Type、字段条目与原始请求体
"""

import html
import http.server
import json
from pathlib import Path
import urllib.parse


class EchoHandler(http.server.BaseHTTPRequestHandler):
    """只提供本章的指定文件，并回显 GET 查询及 POST 请求体。"""

    def do_GET(self) -> None:
        """读取本章页面，或展示 GET 查询参数。"""
        # 1. 接收地址是演示端点，不对应磁盘上的文件。
        request_path = urllib.parse.urlsplit(self.path).path
        if request_path in {"/echo", "/echo-post"}:
            self._echo(b"")
            return

        # 2. 明确列出可访问文件，避免暴露其他章节或 Python 源文件。
        filename = request_path.removeprefix("/") or "submission.html"
        allowed_files = {
            "submission.html", "upload.html", "constraints.html",
            "pattern.html", "sample-note.txt", "practice-submission.html",
            "practice-upload.html", "practice-constraints.html",
            "practice-pattern.html",
        }
        if filename not in allowed_files:
            self.send_error(404)
            return
        chapter_directory = Path(__file__).resolve().parent
        file_path = (chapter_directory / filename).resolve()
        if file_path.parent != chapter_directory or not file_path.is_file():
            self.send_error(404)
            return
        content_type = "text/html; charset=utf-8"
        if file_path.suffix == ".txt":
            content_type = "text/plain; charset=utf-8"
        self._send(file_path.read_bytes(), content_type)

    def do_POST(self) -> None:
        """读取至多 64 KiB 的演示请求体，不解析 multipart 文件。"""
        # 1. 只接收指定端点和有明确长度的小型请求。
        request_path = urllib.parse.urlsplit(self.path).path
        if request_path not in {"/echo", "/echo-post"}:
            self.send_error(404)
            return
        if self.headers.get("Transfer-Encoding") is not None:
            self.send_error(501, "Transfer-Encoding is not supported")
            return
        length_header = self.headers.get("Content-Length")
        if length_header is None:
            self.send_error(411)
            return
        try:
            body_length = int(length_header)
        except ValueError:
            self.send_error(400, "Invalid Content-Length")
            return
        if body_length < 0:
            self.send_error(400, "Invalid Content-Length")
            return
        if body_length > 65536:
            self.send_error(413, "Use the small sample file from this chapter")
            return

        # 2. 本地异常请求也不能无限占住读取线程。
        self.connection.settimeout(5)
        try:
            raw_body = self.rfile.read(body_length)
        except TimeoutError:
            self.send_error(408)
            return
        if len(raw_body) != body_length:
            self.send_error(400, "Incomplete request body")
            return
        self._echo(raw_body)

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
            try:
                body_text = raw_body.decode("utf-8")
            except UnicodeDecodeError:
                self.send_error(400, "Expected UTF-8 form data")
                return
            form_pairs = urllib.parse.parse_qsl(
                body_text, keep_blank_values=True
            )
            lines.extend([
                "URL-encoded body entries:",
                json.dumps(form_pairs, ensure_ascii=False, indent=2),
            ])
        lines.extend([
            "Raw body (UTF-8 preview; invalid bytes escaped):",
            raw_body.decode("utf-8", errors="backslashreplace"),
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

    def log_message(self, format: str, *args: object) -> None:
        """不将可能带有查询参数的访问日志写入终端或磁盘。"""
        return


def make_server() -> http.server.ThreadingHTTPServer:
    """绑定本章独占的回环地址；调用方负责启动和关闭服务。"""
    return http.server.ThreadingHTTPServer(("127.0.0.1", 8011), EchoHandler)


def main() -> None:
    """供终端预览使用，按 Ctrl+C 结束并释放监听端口。"""
    # 1. 路径以脚本所在目录为准，终端启动不依赖其他 Notebook。
    with make_server() as server:
        print("http://127.0.0.1:8011/submission.html")
        print("仅限本机模拟数据；按 Ctrl+C 关闭服务。")
        # 2. 终端中 serve_forever 返回后，由上下文管理器关闭套接字。
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("本章服务已停止。")


if __name__ == "__main__":
    main()
