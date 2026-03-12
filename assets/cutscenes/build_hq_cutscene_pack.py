#!/usr/bin/env python3
"""
Build a high-quality FAITHSHIELD cutscene pack from still artwork + AI narration.

Outputs (for each era):
- hq/<era>.mp4  (H.264 + AAC)
- hq/<era>.mp3  (narration audio)

The app now prioritizes these HQ files.
"""

from __future__ import annotations

import argparse
import os
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class SceneSpec:
    era: str
    title: str
    narration: str


SCENES: tuple[SceneSpec, ...] = (
    SceneSpec("genesis", "Creation Dawn", "In the beginning, God created the heavens and the earth. This scene introduces creation, the fall, and the flood, showing both God's justice and His mercy."),
    SceneSpec("patriarchs", "Patriarch Journey", "God calls Abraham, builds a covenant family, and preserves His promise through Isaac, Jacob, and Joseph."),
    SceneSpec("exodus", "Deliverance", "God delivers Israel from slavery in Egypt through Moses, the Passover, and the crossing of the sea."),
    SceneSpec("wilderness", "Wilderness Trust", "In the wilderness, God provides, teaches obedience, and forms His people through covenant and daily trust."),
    SceneSpec("conquest", "Promise Land", "Under Joshua, God leads Israel into the promised land and calls them to faithful worship."),
    SceneSpec("judges", "Mercy in Cycles", "In the days of the judges, people fall into cycles of sin and rescue, and God raises leaders to deliver them."),
    SceneSpec("samuel", "Samuel's Calling", "God calls Samuel as a young servant and establishes His word in Israel."),
    SceneSpec("saul", "Kingship Tested", "Saul begins as Israel's first king, but this period shows how partial obedience leads to loss."),
    SceneSpec("david", "David's Courage", "David trusts in the Lord, defeats Goliath, and shows courage grounded in faith, not size or strength."),
    SceneSpec("generic", "Story Preview", "This preview highlights a key Bible event. Listen closely, then enter the challenge with confidence in God's Word."),
)


def require_deps() -> tuple[object, object, object, object]:
    try:
        from moviepy.editor import AudioFileClip, ColorClip, CompositeVideoClip, ImageClip, vfx  # type: ignore
    except Exception as exc:
        raise SystemExit(
            "Missing dependency: moviepy. Install with: pip3 install moviepy"
        ) from exc

    try:
        from openai import OpenAI  # type: ignore
    except Exception as exc:
        raise SystemExit(
            "Missing dependency: openai. Install with: pip3 install openai"
        ) from exc

    return AudioFileClip, ColorClip, CompositeVideoClip, ImageClip, vfx, OpenAI


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Generate HQ cutscene mp4 + narration pack")
    p.add_argument("--images-dir", type=Path, required=True, help="Folder with <era>.png/.jpg/.jpeg/.webp images")
    p.add_argument("--output-dir", type=Path, default=Path("./hq"), help="Output folder (default: ./hq)")
    p.add_argument("--model", default="gpt-4o-mini-tts", help="OpenAI TTS model")
    p.add_argument("--voice", default="onyx", help="OpenAI voice (try onyx, alloy, or ash)")
    p.add_argument("--size", default="1920x1080", help="Video size WIDTHxHEIGHT")
    p.add_argument("--fps", type=int, default=30)
    p.add_argument("--bitrate", default="9000k")
    p.add_argument("--zoom", type=float, default=0.07, help="Total pan/zoom amount over clip duration")
    p.add_argument("--fade", type=float, default=0.6, help="Fade in/out seconds")
    p.add_argument("--tail", type=float, default=0.4, help="Extra time after narration ends")
    p.add_argument("--overwrite", action="store_true")
    return p.parse_args()


def parse_size(raw: str) -> tuple[int, int]:
    parts = raw.lower().split("x", 1)
    if len(parts) != 2:
        raise SystemExit(f"Invalid --size '{raw}'. Use WIDTHxHEIGHT, e.g. 1920x1080")
    w = int(parts[0])
    h = int(parts[1])
    if w <= 0 or h <= 0:
        raise SystemExit("Width and height must be positive")
    return w, h


def resolve_image(images_dir: Path, era: str) -> Path:
    candidates = [
        images_dir / f"{era}.png",
        images_dir / f"{era}.jpg",
        images_dir / f"{era}.jpeg",
        images_dir / f"{era}.webp",
        images_dir / "generic.png",
        images_dir / "generic.jpg",
        images_dir / "generic.jpeg",
        images_dir / "generic.webp",
    ]
    for c in candidates:
        if c.exists():
            return c
    names = ", ".join(str(c.name) for c in candidates[:4])
    raise SystemExit(f"Missing artwork for era '{era}'. Expected one of: {names}")


def generate_narration(client: object, model: str, voice: str, text: str, out_mp3: Path) -> None:
    with client.audio.speech.with_streaming_response.create(
        model=model,
        voice=voice,
        input=text,
    ) as response:
        response.stream_to_file(str(out_mp3))


def build_video(
    AudioFileClip: object,
    ColorClip: object,
    CompositeVideoClip: object,
    ImageClip: object,
    vfx: object,
    image_path: Path,
    audio_path: Path,
    out_mp4: Path,
    width: int,
    height: int,
    fps: int,
    bitrate: str,
    zoom: float,
    fade: float,
    tail: float,
) -> None:
    audio = AudioFileClip(str(audio_path))
    duration = max(0.1, float(audio.duration) + max(0.0, tail))

    bg = ColorClip((width, height), color=(12, 18, 28)).set_duration(duration)

    image = ImageClip(str(image_path)).set_duration(duration)
    image = image.resize(height=height)
    if image.w > width:
        image = image.resize(width=width)
    image = image.set_position("center")
    image = image.resize(lambda t: 1 + zoom * (t / duration))
    image = image.fx(vfx.fadein, fade).fx(vfx.fadeout, fade)

    video = CompositeVideoClip([bg, image], size=(width, height)).set_audio(audio)
    try:
        video.write_videofile(
            str(out_mp4),
            fps=fps,
            codec="libx264",
            audio_codec="aac",
            bitrate=bitrate,
            threads=4,
            preset="slow",
        )
    finally:
        video.close()
        audio.close()


def main() -> None:
    args = parse_args()
    width, height = parse_size(args.size)

    if not args.images_dir.exists():
        raise SystemExit(f"--images-dir does not exist: {args.images_dir}")

    api_key = os.environ.get("OPENAI_API_KEY", "").strip()
    if not api_key:
        raise SystemExit("Set OPENAI_API_KEY before running this script")

    AudioFileClip, ColorClip, CompositeVideoClip, ImageClip, vfx, OpenAI = require_deps()

    out_dir = args.output_dir
    out_dir.mkdir(parents=True, exist_ok=True)

    client = OpenAI(api_key=api_key)

    for scene in SCENES:
        image = resolve_image(args.images_dir, scene.era)
        mp3 = out_dir / f"{scene.era}.mp3"
        mp4 = out_dir / f"{scene.era}.mp4"

        if args.overwrite or not mp3.exists():
            print(f"[TTS] {scene.era} -> {mp3}")
            generate_narration(client, args.model, args.voice, scene.narration, mp3)
        else:
            print(f"[TTS] skip {mp3.name}")

        if args.overwrite or not mp4.exists():
            print(f"[MP4] {scene.era} -> {mp4}")
            build_video(
                AudioFileClip,
                ColorClip,
                CompositeVideoClip,
                ImageClip,
                vfx,
                image,
                mp3,
                mp4,
                width,
                height,
                args.fps,
                args.bitrate,
                args.zoom,
                args.fade,
                args.tail,
            )
        else:
            print(f"[MP4] skip {mp4.name}")

    print("Done. Copy generated files into assets/cutscenes/hq/")


if __name__ == "__main__":
    main()
