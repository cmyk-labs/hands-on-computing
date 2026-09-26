"""所属章节：14-多页面网站实践
演示知识点：以 site 目录为根的静态站点服务与 /preview GET 字段回显（保留重复字段和空值）；不保存输入或执行报名操作
运行命令：python scripts/14-multi-page-site/preview_server.py（工作目录 content/Web与应用开发/html）；浏览器打开 http://127.0.0.1:8014/index.html
期望结果：终端打印预览地址，站点页面与资源可访问，/preview 以表格回显本次 GET 字段
"""

import functools
import html
import http.server
from pathlib import Path
import urllib.parse


def render_preview(query: str) -> bytes:
    """将查询条目转成 UTF-8 HTML，保留重复字段和空值。"""
    # 1. 每个条目单独成行，不把同名复选框值合并成一个值。
    entries = urllib.parse.parse_qsl(query, keep_blank_values=True)
    rows = []
    for name, value in entries:
        rows.append(
            f"<tr><td>{html.escape(name)}</td>"
            f"<td>{html.escape(value)}</td></tr>"
        )

    # 2. 用户输入只进入文本位置；回显仅表明接收，不表示报名成功。
    page = f"""<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>提交内容预览 · 周末读书会</title>
  <link rel="stylesheet" href="assets/styles.css">
</head>
<body>
  <a class="skip-link" href="#main">跳到主要内容</a>
  <header class="site-header">
    <p class="site-name">周末读书会</p>
    <nav aria-label="站点导航">
      <ul>
        <li><a href="index.html">阅读目录</a></li>
        <li><a href="notes/reading.html">阅读记录</a></li>
        <li><a href="join.html">参与意向</a></li>
      </ul>
    </nav>
  </header>
  <main id="main" tabindex="-1">
    <h1>提交内容预览</h1>
    <p>已收到以下查询字段，仅在本机回显；没有保存报名或发送邮件。</p>
    <table>
      <caption>本次 GET 请求的字段</caption>
      <thead><tr><th scope="col">字段名</th><th scope="col">字段值</th></tr></thead>
      <tbody>{"".join(rows)}</tbody>
    </table>
    <p><a href="join.html">重新填写参与意向</a></p>
  </main>
  <footer class="site-footer"><p>周末读书会 · 本地练习站</p></footer>
</body>
</html>"""
    return page.encode("utf-8")


class PreviewHandler(http.server.SimpleHTTPRequestHandler):
    """保留静态文件服务，为 /preview 增加无状态回显。"""

    def do_GET(self) -> None:
        """返回静态资源，或把查询字段作为文本回显。"""
        # 1. 只对明确的回显路径生成响应，其他请求由静态服务处理。
        parts = urllib.parse.urlsplit(self.path)
        if parts.path != "/preview":
            super().do_GET()
            return

        # 2. 声明编码、长度并发送正文；不把用户字段写入磁盘。
        body = render_preview(parts.query)
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

# 静态文件以 site 为根；正常表单包含已讲解的字段。
site_dir = Path(__file__).resolve().parent / "site"
handler = functools.partial(PreviewHandler, directory=str(site_dir))
with http.server.ThreadingHTTPServer(("127.0.0.1", 8014), handler) as server:
    print("预览地址：http://127.0.0.1:8014/index.html")
    server.serve_forever()
