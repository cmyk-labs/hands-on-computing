"""所属章节：08-音视频与嵌入内容
演示知识点：可选工具——标准库合成音频并调用已有 FFmpeg 重建本章媒体与封面，不下载资源
运行命令：python scripts/08-media-and-embedded-content/generate_media.py --ffmpeg <FFmpeg 命令>（工作目录 content/Web与应用开发/html；正文未要求运行，<FFmpeg 命令>为本地已有的 FFmpeg 可执行命令或路径，参数说明见 --help）
期望结果：覆盖生成 signal.wav、signal.mp4、signal.webm 与 poster.png
"""

import argparse
import math
from pathlib import Path
import struct
import subprocess
import wave


def write_audio(output_path: Path) -> None:
    """覆盖生成四秒单声道 WAV，其中有两段低幅、渐入渐出的短音。"""
    # 1. 构造低幅采样；首尾各用 20 毫秒渐变，避免突然跳变。
    sample_rate = 16000
    samples = bytearray()
    for sample_index in range(4 * sample_rate):
        # 每两秒的 0.25～0.45 秒发声，其余时间为静音。
        local_seconds = sample_index / sample_rate % 2 - 0.25
        amplitude = 0
        if 0 <= local_seconds < 0.2:
            fade = min(local_seconds / 0.02, (0.2 - local_seconds) / 0.02, 1)
            amplitude = round(
                800 * fade * math.sin(2 * math.pi * 440 * local_seconds)
            )
        samples.extend(struct.pack("<h", amplitude))

    # 2. 保存为 16 位单声道 PCM，写入上下文结束时关闭文件。
    with wave.open(str(output_path), "wb") as audio_file:
        audio_file.setnchannels(1)
        audio_file.setsampwidth(2)
        audio_file.setframerate(sample_rate)
        audio_file.writeframes(samples)


def main() -> None:
    """生成音频、两种视频容器与视频首帧，覆盖本目录同名媒体。"""
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--ffmpeg", required=True, help="已有 FFmpeg 的命令或完整路径")
    args = parser.parse_args()
    chapter_dir = Path(__file__).resolve().parent

    # 1. 声音由标准库合成；画面由 FFmpeg 的色块滤镜合成。
    write_audio(chapter_dir / "signal.wav")
    video_filter = (
        "drawbox=x=30:y=60:w=60:h=60:color=0xf4c95d:t=fill:enable='lt(t,2)',"
        "drawbox=x=230:y=60:w=60:h=60:color=0xf4c95d:t=fill:enable='gte(t,2)'"
    )
    inputs = [
        args.ffmpeg, "-hide_banner", "-loglevel", "error", "-y",
        "-f", "lavfi", "-i", "color=c=0x17384a:s=320x180:r=10:d=4",
        "-i", str(chapter_dir / "signal.wav"),
        "-vf", video_filter, "-t", "4",
    ]

    # 2. 同一画面和声音分别编码，source 才有真实的格式候选可选。
    subprocess.run(
        inputs + [
            "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "28",
            "-c:a", "aac", "-b:a", "32k", "-movflags", "+faststart",
            str(chapter_dir / "signal.mp4"),
        ],
        check=True,
    )
    subprocess.run(
        inputs + [
            "-c:v", "libvpx", "-b:v", "100k", "-c:a", "libvorbis",
            "-q:a", "1", str(chapter_dir / "signal.webm"),
        ],
        check=True,
    )

    # 3. 封面取真实首帧；它不包含字幕，文字轨由独立 VTT 文件提供。
    subprocess.run(
        [
            args.ffmpeg, "-hide_banner", "-loglevel", "error", "-y",
            "-i", str(chapter_dir / "signal.mp4"), "-frames:v", "1",
            str(chapter_dir / "poster.png"),
        ],
        check=True,
    )
    print("已重建 signal.wav、signal.mp4、signal.webm、poster.png。")


if __name__ == "__main__":
    main()
