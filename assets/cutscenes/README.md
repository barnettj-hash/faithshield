# FAITHSHIELD Cutscene Media Pack

The app now supports an upgraded **HQ cutscene pack** for better App Store visual quality.

## Preferred HQ folder

Put upgraded files in:

- `assets/cutscenes/hq/<era>.mp4`
- `assets/cutscenes/hq/<era>.m4a` or `assets/cutscenes/hq/<era>.mp3`

Eras:

- `genesis`
- `patriarchs`
- `exodus`
- `wilderness`
- `conquest`
- `judges`
- `samuel`
- `saul`
- `david`
- `generic`

## Poster art (still-image fallback)

Per-era posters are now in:

- `assets/cutscenes/posters/<era>.svg`

Primary still-image scene art can also be placed in:

- `assets/cutscenes/stills/<era>.jpg` (or `.jpeg`, `.png`, `.webp`, `.svg`)

The app now tries `stills/` first, then `posters/`, then `stage-art.png`.

The app uses these posters when no HQ MP4 is present.

## Generate HQ media automatically

Use:

- `build_hq_cutscene_pack.py`

Example:

```bash
cd assets/cutscenes
pip3 install -r requirements-cutscene.txt
OPENAI_API_KEY=YOUR_KEY python3 build_hq_cutscene_pack.py \
  --images-dir ./custom_art \
  --output-dir ./hq \
  --voice onyx \
  --size 1920x1080 \
  --fps 30 \
  --bitrate 9000k \
  --overwrite
```

Image naming expected in `--images-dir`:

- `genesis.png`, `patriarchs.png`, ..., `david.png`, `generic.png`

If an era image is missing, the script falls back to `generic.*`.

## Generate better narration locally (no API key)

If you only want improved voice with still-art cutscenes, run:

```bash
cd assets/cutscenes
chmod +x ./build_local_hq_narration.sh
./build_local_hq_narration.sh ./hq
```

Optional voice/rate:

```bash
VOICE="Eddy (English (US))" RATE=170 ./build_local_hq_narration.sh ./hq
```

This creates `hq/<era>.m4a` files and the app will play them over still poster artwork.

## Legacy low-res video fallback

Legacy pixel videos are still in `assets/cutscenes/*.mp4`, but the app now prioritizes HQ media.

Current default in app code:

- `USE_LEGACY_CUTSCENE_VIDEO_FALLBACK = false`
- `FORCE_STILL_CUTSCENE_MODE = true`
- `PREFER_SYSTEM_NARRATION_VOICE = true`

This means:

- Cutscenes use still pictures by default.
- Narration uses a calmer built-in system voice by default.
- No legacy low-res pixel MP4 fallback unless you explicitly turn it on.

Set to `true` in `app.js` only if you intentionally want old video fallback.

## Recommended export quality

- H.264 video (`.mp4`)
- 1920x1080 (or higher)
- 24 or 30 fps
- AAC audio
- Warm, natural narration voice
- Avoid copyrighted background music
