#!/usr/bin/env bash
set -euo pipefail

OUT_DIR="${1:-./hq}"
VOICE="${VOICE:-Evan (Enhanced)}"
RATE="${RATE:-160}"

mkdir -p "${OUT_DIR}"

if ! say -v "${VOICE}" "Voice check" >/dev/null 2>&1; then
  echo "Voice '${VOICE}' not available. Falling back to Daniel."
  VOICE="Daniel"
fi

era_text() {
  case "$1" in
    genesis)
      echo "In the beginning, God created the heavens and the earth. This scene introduces creation, the fall, and the flood, showing both God's justice and His mercy."
      ;;
    patriarchs)
      echo "God calls Abraham, builds a covenant family, and preserves His promise through Isaac, Jacob, and Joseph."
      ;;
    exodus)
      echo "God delivers Israel from slavery in Egypt through Moses, the Passover, and the crossing of the sea."
      ;;
    sinai)
      echo "At Mount Sinai, God gives His covenant words, reveals His holiness, and calls His people to faithful obedience."
      ;;
    wilderness)
      echo "In the wilderness, God provides daily bread, leads His people through every trial, and teaches them to trust Him."
      ;;
    conquest)
      echo "Under Joshua, God leads Israel into the promised land and calls them to faithful worship."
      ;;
    judges)
      echo "In the days of the judges, people fall into cycles of sin and rescue, and God raises leaders to deliver them."
      ;;
    samuel)
      echo "God calls Samuel as a young servant and establishes His word in Israel."
      ;;
    saul)
      echo "Saul begins as Israel's first king, but this period shows how partial obedience leads to loss."
      ;;
    david)
      echo "David trusts in the Lord, defeats Goliath, and shows courage grounded in faith, not size or strength."
      ;;
    generic)
      echo "This preview highlights a key Bible event. Listen closely, then enter the challenge with confidence in God's Word."
      ;;
    *)
      echo ""
      ;;
  esac
}

ERAS=(
  genesis
  patriarchs
  exodus
  sinai
  wilderness
  conquest
  judges
  samuel
  saul
  david
  generic
)

for era in "${ERAS[@]}"; do
  text="$(era_text "${era}")"
  aiff_file="${OUT_DIR}/${era}.aiff"
  m4a_file="${OUT_DIR}/${era}.m4a"

  echo "[narration] ${era} -> ${m4a_file}"
  # `say` expects `-o` before the message text when writing to a file.
  say -v "${VOICE}" -r "${RATE}" -o "${aiff_file}" "${text}"
  # `avconvert` is more consistent than `afconvert` for AIFF -> M4A on modern macOS.
  avconvert --preset PresetAppleM4A --source "${aiff_file}" --output "${m4a_file}" --replace >/dev/null
  rm -f "${aiff_file}"
done

echo "Done. Generated narration pack in ${OUT_DIR}"
