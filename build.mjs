import { build } from "esbuild";
import { readFile, writeFile, mkdir, cp, rm, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join } from "node:path";

const ROOT = new URL(".", import.meta.url).pathname;
const DIST = join(ROOT, "dist");

const SOURCE_FILES = ["tweaks-panel.jsx", "site-work.jsx", "site.jsx"];
const STATIC_COPY = ["images", "robots.txt", ".well-known"];

async function exists(p) {
  try { await stat(p); return true; } catch { return false; }
}

function hashName(prefix, ext, buffer) {
  const short = createHash("sha256").update(buffer).digest("hex").slice(0, 10);
  return { name: `${prefix}.${short}.${ext}`, sri: `sha384-${createHash("sha384").update(buffer).digest("base64")}` };
}

await rm(DIST, { recursive: true, force: true });
await mkdir(DIST, { recursive: true });

// JS bundle ------------------------------------------------------------------
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

const jsBuild = await build({
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
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});

const jsBuffer = jsBuild.outputFiles[0].contents;
const js = hashName("app", "js", jsBuffer);
await writeFile(join(DIST, js.name), jsBuffer);

// CSS bundle -----------------------------------------------------------------
const cssBuild = await build({
  entryPoints: [join(ROOT, "site.css")],
  bundle: true,
  minify: true,
  write: false,
  loader: { ".css": "css" },
});
const cssBuffer = cssBuild.outputFiles[0].contents;
const css = hashName("site", "css", cssBuffer);
await writeFile(join(DIST, css.name), cssBuffer);

// index.html -----------------------------------------------------------------
const indexTemplate = await readFile(join(ROOT, "index.html"), "utf8");
const indexOut = indexTemplate
  .replace(
    /<script src="https:\/\/unpkg\.com\/react@[\s\S]*?<\/script>\s*<script src="https:\/\/unpkg\.com\/react-dom@[\s\S]*?<\/script>\s*<script src="https:\/\/unpkg\.com\/@babel\/standalone@[\s\S]*?<\/script>/m,
    ""
  )
  .replace(
    /<link rel="stylesheet" href="site\.css" \/>/,
    `<link rel="stylesheet" href="/${css.name}" integrity="${css.sri}" crossorigin="anonymous" />`
  )
  .replace(
    /<script type="text\/babel" src="tweaks-panel\.jsx"><\/script>\s*<script type="text\/babel" src="site-work\.jsx"><\/script>\s*<script type="text\/babel" src="site\.jsx"><\/script>/m,
    `<script src="/${js.name}" integrity="${js.sri}" crossorigin="anonymous" defer></script>`
  );

await writeFile(join(DIST, "index.html"), indexOut);

// Static assets --------------------------------------------------------------
for (const item of STATIC_COPY) {
  const src = join(ROOT, item);
  if (await exists(src)) {
    await cp(src, join(DIST, item), { recursive: true });
  }
}

console.log(`Built ${js.name} (${jsBuffer.length} bytes), ${css.name} (${cssBuffer.length} bytes)`);
