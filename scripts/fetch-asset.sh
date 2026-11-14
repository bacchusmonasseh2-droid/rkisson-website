#!/usr/bin/env bash
# Usage: scripts/fetch-asset.sh <name> <url>
# Downloads a generated source image into raw-assets/ (kept out of the build).
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p raw-assets
curl -sS -o "raw-assets/$1.png" -w "$1 %{http_code} %{size_download}\n" "$2"
