"""所属章节：08-应用组织与配置
演示知识点：本章应用组织与配置示例：以本模块标识 study_api 普通 Python 包
运行命令：python -m uvicorn study_api.main:create_app --factory --app-dir scripts/08-application-and-settings --host 127.0.0.1 --port 8080（工作目录 content/Web与应用开发/FastAPI）
期望结果：包内 config、routes、main 模块可被正常导入，Uvicorn 经工厂创建应用并在本地 8080 提供服务"""
