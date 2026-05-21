import { build } from "esbuild";
import { readFile, writeFile, mkdir, cp, rm, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join } from "node:path";

const ROOT = new URL(".", import.meta.url).pathname;
const DIST = join(ROOT, "dist");

const SOURCE_FILES = ["tweaks-panel.jsx", "site-work.jsx", "site.jsx"];
const STATIC_COPY = ["site.css", "images", "robots.txt", ".well-known"];

async function exists(p) {
  try { await stat(p); return true; } catch { return false; }
}

await rm(DIST, { recursive: true, force: true });
await mkdir(DIST, { recursive: true });

const sources = await Promise.all(
  SOURCE_FILES.map((f) => readFile(join(ROOT, f), "utf8"))
);

const entryContents = `
import * as React from "react";
import * as ReactDOMClient from "react-dom/client";
globalThis.React = React;
globalThis.ReactDOM = ReactDOMClient;
${sources.join("\n")}
`;

const result = await build({
  stdin: {
    contents: entryContents,
    loader: "jsx",
    resolveDir: ROOT,
  },
  bundle: true,
  minify: true,
  format: "iife",
  target: ["es2020"],
  write: false,
  legalComments: "none",
  jsx: "transform",
});

const jsBuffer = result.outputFiles[0].contents;
const hash = createHash("sha384").update(jsBuffer).digest("base64");
const sri = `sha384-${hash}`;
const shortHash = createHash("sha256").update(jsBuffer).digest("hex").slice(0, 10);
const jsName = `app.${shortHash}.js`;

await writeFile(join(DIST, jsName), jsBuffer);

const indexTemplate = await readFile(join(ROOT, "index.html"), "utf8");
const indexOut = indexTemplate
  .replace(
    /<script src="https:\/\/unpkg\.com\/react@[\s\S]*?<\/script>\s*<script src="https:\/\/unpkg\.com\/react-dom@[\s\S]*?<\/script>\s*<script src="https:\/\/unpkg\.com\/@babel\/standalone@[\s\S]*?<\/script>/m,
    ""
  )
  .replace(
    /<script type="text\/babel" src="tweaks-panel\.jsx"><\/script>\s*<script type="text\/babel" src="site-work\.jsx"><\/script>\s*<script type="text\/babel" src="site\.jsx"><\/script>/m,
    `<script src="/${jsName}" integrity="${sri}" crossorigin="anonymous" defer></script>`
  );

await writeFile(join(DIST, "index.html"), indexOut);

for (const item of STATIC_COPY) {
  const src = join(ROOT, item);
  if (await exists(src)) {
    await cp(src, join(DIST, item), { recursive: true });
  }
}

console.log(`Built ${jsName} (${jsBuffer.length} bytes), SRI ${sri}`);
