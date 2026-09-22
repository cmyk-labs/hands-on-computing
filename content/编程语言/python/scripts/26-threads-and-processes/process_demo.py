"""所属章节：26-线程与进程
演示知识点：spawn 启动方式、进程间列表副本隔离、进程队列通信与退出清理
运行命令：python scripts/26-threads-and-processes/process_demo.py（工作目录 content/编程语言/python）
期望结果：输出 JSON：start_method 为 spawn，parent 为 [15, 20]，child 为 [15, 20, 30]，exitcode 为 0
"""

import json
import multiprocessing
import multiprocessing.queues


def append_and_send(
    minutes: list[int],
    output_queue: multiprocessing.queues.Queue,
) -> None:
    """修改子进程中的列表副本，并把结果交回父进程。"""
    try:
        minutes.append(30)
        output_queue.put(minutes)
    finally:
        output_queue.close()
        output_queue.join_thread()


def main() -> None:
    """启动子进程，先接收消息，再等待退出并释放句柄。"""
    # 1. 进程和队列来自同一个 spawn 上下文。
    context = multiprocessing.get_context("spawn")
    output_queue = context.Queue()
    parent_minutes = [15, 20]
    process = context.Process(
        target=append_and_send,
        args=(parent_minutes, output_queue),
    )
    try:
        process.start()
        # 2. 先取完消息，避免父进程等待退出、子进程等待管道被读取。
        child_minutes = output_queue.get(timeout=10)
        process.join(timeout=10)
        if process.is_alive():
            raise TimeoutError("统计子进程在 10 秒内没有退出")
        if process.exitcode != 0:
            raise RuntimeError(f"统计子进程异常退出：{process.exitcode}")
        # JSON 中 start_method=spawn、parent=[15, 20]、child=[15, 20, 30]、exitcode=0。
        print(json.dumps({
            "start_method": context.get_start_method(),
            "parent": parent_minutes,
            "child": child_minutes,
            "exitcode": process.exitcode,
        }))
    finally:
        # 3. 正常路径已经 join；强制终止只作异常兜底，队列不再复用。
        if process.pid is not None:
            if process.is_alive():
                process.terminate()
            process.join(timeout=5)
            if process.is_alive():
                process.kill()
                process.join(timeout=5)
            if process.is_alive():
                raise TimeoutError("统计子进程无法终止")
        process.close()
        output_queue.close()
        output_queue.join_thread()


if __name__ == "__main__":
    main()
