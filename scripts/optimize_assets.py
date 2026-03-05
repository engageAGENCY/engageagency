#!/usr/bin/env python3
"""
Generate optimized web variants for heavy visual assets.

Outputs files under public/optimized:
- WEBP (always)
- AVIF (when Pillow build supports it)
"""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

from PIL import Image, features


ROOT = Path(__file__).resolve().parents[1]
PUBLIC_DIR = ROOT / "public"
OUTPUT_DIR = PUBLIC_DIR / "optimized"


@dataclass(frozen=True)
class AssetSpec:
  source: str
  output_slug: str
  widths: tuple[int, ...]


ASSETS: tuple[AssetSpec, ...] = (
  AssetSpec("CONTENT ENGAGE.png", "content-engage", (1600, 900)),
  AssetSpec("eng-agency.png", "eng-agency", (1200, 800)),
  AssetSpec("eng-agency2.png", "eng-agency2", (1200, 800)),
  AssetSpec("NN.png", "nn", (1200, 800)),
  AssetSpec("SS.png", "ss", (1200, 800)),
  AssetSpec("33545201_smartphone5.png", "smartphone5", (1200, 800)),
  AssetSpec("masking-duct-tape.png", "masking-duct-tape", (1200, 800)),
  AssetSpec("vivid-blurred-colorful-wallpaper-background-2.jpg.jpeg", "vivid-bg", (1920, 1280)),
)


def fit_width(image: Image.Image, width: int) -> Image.Image:
  if image.width <= width:
    return image.copy()
  height = int((width / image.width) * image.height)
  return image.resize((width, height), Image.Resampling.LANCZOS)


def ensure_rgb(image: Image.Image) -> Image.Image:
  if image.mode in ("RGB", "RGBA"):
    return image
  if "A" in image.getbands():
    return image.convert("RGBA")
  return image.convert("RGB")


def save_webp(image: Image.Image, path: Path) -> None:
  image.save(path, "WEBP", quality=80, method=6)


def save_avif(image: Image.Image, path: Path) -> None:
  image.save(path, "AVIF", quality=55)


def iter_outputs(spec: AssetSpec) -> Iterable[tuple[int, Path, Path]]:
  for width in spec.widths:
    webp = OUTPUT_DIR / f"{spec.output_slug}-{width}.webp"
    avif = OUTPUT_DIR / f"{spec.output_slug}-{width}.avif"
    yield width, webp, avif


def main() -> int:
  OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
  avif_supported = bool(features.check("avif"))

  print(f"[optimize-assets] output: {OUTPUT_DIR}")
  print(f"[optimize-assets] AVIF support: {'yes' if avif_supported else 'no'}")

  for spec in ASSETS:
    source_path = PUBLIC_DIR / spec.source
    if not source_path.exists():
      print(f"[skip] source missing: {spec.source}")
      continue

    with Image.open(source_path) as original:
      base = ensure_rgb(original)
      for width, webp_path, avif_path in iter_outputs(spec):
        resized = fit_width(base, width)
        save_webp(resized, webp_path)
        print(f"[ok] {webp_path.relative_to(ROOT)}")
        if avif_supported:
          save_avif(resized, avif_path)
          print(f"[ok] {avif_path.relative_to(ROOT)}")

  print("[done] asset optimization complete")
  return 0


if __name__ == "__main__":
  raise SystemExit(main())
