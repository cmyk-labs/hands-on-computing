from fastapi import FastAPI

app = FastAPI()


@app.get("/hello")
def hello(name: str = "读者") -> dict[str, str]:
    return {"message": f"你好，{name}"}


@app.post("/echo")
def echo(payload: dict[str, str]) -> dict[str, str]:
    return payload
