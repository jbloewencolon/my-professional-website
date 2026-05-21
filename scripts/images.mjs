// One-shot script: emits modern formats next to each source image
// and writes dist/images-manifest.json with {filename: {w, h}} for the
// build step to read.
import sharp from "sharp";
import { readdir, writeFile, mkdir, stat } from "node:fs/promises";
import { join, parse } from "node:path";

const SRC = new URL("../images/", import.meta.url).pathname;
const OUT = SRC; // emit alongside originals; build copies the lot into dist

await mkdir(OUT, { recursive: true });

const entries = await readdir(SRC);
const manifest = {};

for (const f of entries) {
  const full = join(SRC, f);
  const s = await stat(full);
  if (!s.isFile()) continue;
  const { name, ext } = parse(f);
  const lower = ext.toLowerCase();
  if (![".png", ".jpg", ".jpeg", ".webp"].includes(lower)) continue;

  const img = sharp(full);
  const meta = await img.metadata();
  manifest[f] = { w: meta.width, h: meta.height };

  if (lower === ".webp") continue; // already modern; keep as-is

  // WebP — universal, smallest of the older modern formats.
  await sharp(full).webp({ quality: 80, effort: 6 }).toFile(join(OUT, `${name}.webp`));
  manifest[`${name}.webp`] = { w: meta.width, h: meta.height };

  // AVIF — only worth the encode cost for the very large flyer.
  if (s.size > 500_000) {
    await sharp(full).avif({ quality: 55, effort: 6 }).toFile(join(OUT, `${name}.avif`));
    manifest[`${name}.avif`] = { w: meta.width, h: meta.height };
  }
}

await writeFile(join(SRC, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`Wrote ${Object.keys(manifest).length} entries to images/manifest.json`);
