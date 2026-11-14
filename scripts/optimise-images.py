#!/usr/bin/env python3
"""
Prepare source images for the website.

Reads the full-resolution originals in raw-assets/ (PNG, as downloaded from
Higgsfield), removes stray machine markings / pseudo-text that image models
sometimes add, and writes web masters to src/assets/img/ as high-quality JPEG.
Astro then generates responsive AVIF/WebP variants from those at build time.

Usage:  python3 scripts/optimise-images.py
Needs:  pip install pillow opencv-python-headless numpy
"""
from pathlib import Path

import cv2
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "raw-assets"
OUT = ROOT / "src" / "assets" / "img"
MAX_WIDTH = 2048
PAD = 8

# Regions (x1, y1, x2, y2 in source pixels) where generated lettering or
# logo-like marks were found and are painted out.
INPAINT = {
    "sea-defence": [(1381, 707, 1447, 722), (1405, 680, 1432, 704)],
    "culvert": [(121, 433, 171, 474), (50, 484, 177, 512)],
    "road-hinterland": [(415, 743, 493, 762)],
}

# Markings on yellow bodywork: only the non-yellow pixels inside the box are
# painted out, so edges against sky or ground are left untouched.
ON_YELLOW = {
    "water-well": [(1150, 870, 1310, 948), (1360, 1000, 1402, 1042)],
    "sea-defence": [(1090, 505, 1190, 560), (995, 550, 1045, 630)],
    "culvert": [(1150, 375, 1230, 415)],
}

# Light lettering on dark panels.
ON_DARK = {
    "culvert": [(296, 486, 392, 520)],
}

# Regions replaced by cloning a patch from (dx, dy) away — used on textured
# ground where inpainting would smear.
CLONE = {
    "hero-home": [((40, 540, 560, 622), (0, 90))],
}

# Crops (left, top, right, bottom as fractions) applied after retouching.
CROP = {
    "about-drawings": (0.15, 0.0, 1.0, 1.0),
}


def retouch(name: str, img: np.ndarray) -> np.ndarray:
    h, w = img.shape[:2]
    if name in INPAINT:
        mask = np.zeros((h, w), np.uint8)
        for x1, y1, x2, y2 in INPAINT[name]:
            mask[max(0, y1 - PAD) : min(h, y2 + PAD), max(0, x1 - PAD) : min(w, x2 + PAD)] = 255
        img = cv2.inpaint(img, mask, 6, cv2.INPAINT_TELEA)
    if name in ON_YELLOW or name in ON_DARK:
        hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
        mask = np.zeros((h, w), np.uint8)
        for x1, y1, x2, y2 in ON_YELLOW.get(name, []):
            box = hsv[y1:y2, x1:x2]
            yellow = ((box[..., 0] >= 12) & (box[..., 0] <= 42) & (box[..., 1] > 45) & (box[..., 2] > 135)).astype(np.uint8)
            closed = cv2.morphologyEx(yellow, cv2.MORPH_CLOSE, np.ones((31, 31), np.uint8))
            mask[y1:y2, x1:x2] = (closed & (1 - yellow)) * 255
        for x1, y1, x2, y2 in ON_DARK.get(name, []):
            box = hsv[y1:y2, x1:x2]
            mask[y1:y2, x1:x2] = (box[..., 2] > 105).astype(np.uint8) * 255
        mask = cv2.dilate(mask, np.ones((5, 5), np.uint8))
        img = cv2.inpaint(img, mask, 4, cv2.INPAINT_TELEA)
    for (x1, y1, x2, y2), (dx, dy) in CLONE.get(name, []):
        patch = img[y1 + dy : y2 + dy, x1 + dx : x2 + dx].copy()
        alpha = np.zeros((y2 - y1, x2 - x1), np.float32)
        alpha[10:-10, 10:-10] = 1.0
        alpha = cv2.GaussianBlur(alpha, (21, 21), 0)[..., None]
        region = img[y1:y2, x1:x2].astype(np.float32)
        img[y1:y2, x1:x2] = (patch * alpha + region * (1 - alpha)).astype(np.uint8)
    return img


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for src in sorted(RAW.glob("*.png")):
        name = src.stem
        img = cv2.cvtColor(np.array(Image.open(src).convert("RGB")), cv2.COLOR_RGB2BGR)
        img = retouch(name, img)
        pil = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
        if name in CROP:
            l, t, r, b = CROP[name]
            pil = pil.crop((int(l * pil.width), int(t * pil.height), int(r * pil.width), int(b * pil.height)))
        if pil.width > MAX_WIDTH:
            pil = pil.resize((MAX_WIDTH, round(pil.height * MAX_WIDTH / pil.width)), Image.LANCZOS)
        pil.save(OUT / f"{name}.jpg", quality=88, optimize=True, progressive=True)
        print(f"{name}.jpg  {pil.width}x{pil.height}")

    # Social sharing image (1200x630) from the home hero.
    hero = Image.open(OUT / "hero-home.jpg")
    scale = max(1200 / hero.width, 630 / hero.height)
    hero = hero.resize((round(hero.width * scale), round(hero.height * scale)), Image.LANCZOS)
    left = (hero.width - 1200) // 2
    top = (hero.height - 630) // 2
    hero.crop((left, top, left + 1200, top + 630)).save(ROOT / "public" / "og-image.jpg", quality=82, optimize=True)
    print("public/og-image.jpg  1200x630")


if __name__ == "__main__":
    main()
