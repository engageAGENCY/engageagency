import fs from "node:fs/promises";
import path from "node:path";
import opentype from "opentype.js";

const fontPath = path.resolve("public/fonts/playlist-script.woff");
const outputPath = path.resolve("public/engage-wordmark.svg");

const font = await opentype.load(fontPath);

const text = "Engage";
const fontSize = 700;
const raiseLast = -0.12 * fontSize;

let x = 0;
const y = 0;
let minX = Infinity;
let minY = Infinity;
let maxX = -Infinity;
let maxY = -Infinity;
const pathData = [];

const glyphs = font.stringToGlyphs(text);
glyphs.forEach((glyph, index) => {
  const isLast = index === glyphs.length - 1;
  const yOffset = isLast ? raiseLast : 0;
  const glyphPath = glyph.getPath(x, y + yOffset, fontSize);
  const box = glyphPath.getBoundingBox();
  minX = Math.min(minX, box.x1);
  minY = Math.min(minY, box.y1);
  maxX = Math.max(maxX, box.x2);
  maxY = Math.max(maxY, box.y2);
  pathData.push(glyphPath.toPathData(2));
  x += glyph.advanceWidth * (fontSize / font.unitsPerEm);
});

const width = maxX - minX;
const height = maxY - minY;
const gradientWidth = width * 4;
const translateTo = -width * 3;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${minX} ${minY} ${width} ${height}" role="img" aria-label="Engage">
  <defs>
    <linearGradient id="engageGradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${gradientWidth}" y2="0">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#60a5fa"/>
      <stop offset="50%" stop-color="#a855f7"/>
      <stop offset="75%" stop-color="#ec4899"/>
      <stop offset="100%" stop-color="#ffffff"/>
      <animateTransform attributeName="gradientTransform" type="translate" from="0 0" to="${translateTo} 0" dur="12s" repeatCount="indefinite" />
    </linearGradient>
  </defs>
  <g fill="url(#engageGradient)">
    ${pathData.map((d) => `<path d="${d}" />`).join("\n    ")}
  </g>
</svg>
`;

await fs.writeFile(outputPath, svg, "utf8");
console.log(`Generated ${outputPath}`);
