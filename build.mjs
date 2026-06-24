import { build } from "esbuild";
import { readFile, writeFile, mkdir, cp, rm, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = fileURLToPath(new URL(".", import.meta.url));
const DIST = join(ROOT, "dist");
const SITE_URL = "https://jordanloewencolon.com";
const CUSTOM_DOMAIN = "jordanloewencolon.com";

const SOURCE_FILES = ["tweaks-panel.jsx", "site-work.jsx", "site.jsx"];
const STATIC_COPY  = ["images", "robots.txt", ".well-known", "llms.txt", "bio-and-headshot-pack-jordan-loewen-colon.md"];

// ── Per-route metadata ───────────────────────────────────────────────────────
const ROUTES = [
  { key: "home",              path: "/",                  portrait: true,
    title: "Jordan Loewen-Colón — Responsible AI Strategist",
    desc:  "Indigenous Taíno technologist and Responsible AI strategist. Available for keynotes, workshops, and advisory on AI ethics and data justice." },
  { key: "about",             path: "/about",             portrait: true,
    title: "About — Jordan Loewen-Colón",
    desc:  "Jordan Loewen-Colón is an Indigenous Taíno technologist and Responsible AI strategist teaching AI ethics and policy at Queen's University." },
  { key: "speaking",          path: "/speaking",          portrait: false,
    title: "Speaking & Consulting — Jordan Loewen-Colón",
    desc:  "Keynotes, workshops, advisory, and consulting on responsible AI, Indigenous data justice, and AI ethics. Rates listed." },
  { key: "work",              path: "/work",              portrait: false,
    title: "Work — Jordan Loewen-Colón",
    desc:  "Publications, talks, press, and projects on AI ethics, Indigenous data sovereignty, and responsible technology." },
  { key: "work/publications", path: "/work/publications", portrait: false,
    title: "Publications & Talks — Jordan Loewen-Colón",
    desc:  "Peer-reviewed essays, book chapters, public writing, and conference talks on AI ethics, Indigenous data justice, and technology." },
  { key: "work/press",        path: "/work/press",        portrait: false,
    title: "Press & Media — Jordan Loewen-Colón",
    desc:  "Podcast appearances, journalist interviews, and media coverage of Jordan Loewen-Colón's work in responsible AI and Indigenous data sovereignty." },
  { key: "work/projects",     path: "/work/projects",     portrait: false,
    title: "Projects & Code — Jordan Loewen-Colón",
    desc:  "Technical AI and data-science projects including BookBack, psychedelic health research tools, and educational datasets." },
  { key: "contact",           path: "/contact",           portrait: false,
    title: "Contact — Jordan Loewen-Colón",
    desc:  "Book a keynote, start a consulting engagement, or reach out for press and advisory inquiries." },
];

// ── JSON-LD schemas ──────────────────────────────────────────────────────────
const PERSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Jordan Loewen-Colón",
  "url": SITE_URL + "/",
  "image": SITE_URL + "/images/portrait-window.jpg",
  "jobTitle": "Responsible AI Strategist",
  "description": "Indigenous Taíno technologist and Responsible AI strategist working at the intersection of AI, culture, new media, and data justice.",
  "sameAs": [
    "https://www.linkedin.com/in/jordanloewencolon/",
    "https://github.com/jbloewencolon",
    "https://smith.queensu.ca/",
    "https://hbr.org/search?term=Jordan+Loewen-Col%C3%B3n"
  ],
  "affiliation": {
    "@type": "CollegeOrUniversity",
    "name": "Queen's University",
    "url": "https://smith.queensu.ca/"
  },
  "alumniOf": [
    { "@type": "CollegeOrUniversity", "name": "Syracuse University" },
    { "@type": "CollegeOrUniversity", "name": "Princeton Theological Seminary" }
  ],
  "knowsAbout": [
    "Artificial Intelligence", "Indigenous Data Sovereignty",
    "AI Ethics", "Technology Policy", "Responsible AI", "Data Justice"
  ]
};

const SERVICE_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Keynotes, Workshops & Advisory — Jordan Loewen-Colón",
  "provider": { "@type": "Person", "name": "Jordan Loewen-Colón", "url": SITE_URL + "/" },
  "serviceType": "Speaking and Consulting",
  "areaServed": "Worldwide",
  "description": "Keynotes, workshops, advisory, and consulting on responsible AI, Indigenous data sovereignty, and AI ethics.",
  "offers": [
    { "@type": "Offer", "name": "Keynote",
      "priceSpecification": { "@type": "PriceSpecification", "minPrice": 5000, "maxPrice": 15000, "priceCurrency": "USD" } },
    { "@type": "Offer", "name": "Workshop (per day)",
      "priceSpecification": { "@type": "PriceSpecification", "minPrice": 4000, "maxPrice": 12000, "priceCurrency": "USD" } },
    { "@type": "Offer", "name": "Advisory Retainer",
      "description": "Quarterly retainer for teams building or governing AI systems." }
  ]
};

// ── Helpers ──────────────────────────────────────────────────────────────────
async function exists(p) {
  try { await stat(p); return true; } catch { return false; }
}

function hashName(prefix, ext, buffer) {
  const short = createHash("sha256").update(buffer).digest("hex").slice(0, 10);
  return {
    name: `${prefix}.${short}.${ext}`,
    sri:  `sha384-${createHash("sha384").update(buffer).digest("base64")}`,
  };
}

// ── Setup ────────────────────────────────────────────────────────────────────
await rm(DIST, { recursive: true, force: true });
await mkdir(DIST, { recursive: true });

const sources = await Promise.all(SOURCE_FILES.map((f) => readFile(join(ROOT, f), "utf8")));

// ── Client JS bundle ─────────────────────────────────────────────────────────
const clientEntry = `
import * as React from "react";
import * as ReactDOMClient from "react-dom/client";
globalThis.React = React;
globalThis.ReactDOM = ReactDOMClient;
${sources.join("\n")}
`;

const jsBuild = await build({
  stdin: { contents: clientEntry, loader: "jsx", resolveDir: ROOT },
  bundle: true, minify: true, format: "iife", target: ["es2020"],
  write: false, legalComments: "none", jsx: "transform",
  define: { "process.env.NODE_ENV": '"production"' },
});
const jsBuffer = jsBuild.outputFiles[0].contents;
const js = hashName("app", "js", jsBuffer);
await writeFile(join(DIST, js.name), jsBuffer);

// ── CSS bundle ───────────────────────────────────────────────────────────────
const cssBuild = await build({
  entryPoints: [join(ROOT, "site.css")],
  bundle: true, minify: true, write: false,
  loader: { ".css": "css" },
});
const cssBuffer = cssBuild.outputFiles[0].contents;
const css = hashName("site", "css", cssBuffer);
await writeFile(join(DIST, css.name), cssBuffer);

// ── SSR bundle (Node.js, bundles React) ──────────────────────────────────────
const noop = "() => {}";
const ssrEntry = `
import React from "react";
import { renderToString } from "react-dom/server";

const noop = ${noop};

// Minimal browser-global shim for renderToString
if (typeof window === "undefined") {
  globalThis.window = {
    location: { pathname: "/" },
    matchMedia: () => ({ matches: false }),
    addEventListener: noop, removeEventListener: noop,
    scrollTo: noop, dispatchEvent: noop,
    parent: { postMessage: noop },
    history: { replaceState: noop },
    __PRINT_MODE: true,
  };
  globalThis.history  = { replaceState: noop };
  globalThis.document = {
    documentElement: { dataset: {}, style: {} },
    title: "",
    querySelector: () => null,
    getElementById: () => null,
    createElement: () => ({ style: {}, dataset: {}, textContent: "", appendChild: noop }),
    createTextNode: (t) => t,
    fonts: { ready: Promise.resolve() },
  };
  globalThis.localStorage = { getItem: () => null, setItem: noop };
  globalThis.ReactDOM     = { createRoot: () => ({ render: noop }), hydrateRoot: noop };
}

globalThis.React = React;
${sources.join("\n")}

export function renderPage(pageKey) {
  globalThis.window.location = { pathname: pageKey === "home" ? "/" : "/" + pageKey };
  globalThis.window.__INITIAL_PAGE__ = pageKey;
  return renderToString(React.createElement(App, {}));
}
`;

const ssrFile = join(ROOT, ".ssr-temp.mjs");
await build({
  stdin: { contents: ssrEntry, loader: "jsx", resolveDir: ROOT },
  bundle: true, platform: "node", format: "esm",
  write: true, outfile: ssrFile,
  jsx: "transform", legalComments: "none",
  define: { "process.env.NODE_ENV": '"production"' },
  // Keep react/react-dom as Node.js imports so their CJS internals
  // (which use dynamic require("stream") etc.) resolve at runtime.
  external: ["react", "react-dom"],
});

const { renderPage } = await import(pathToFileURL(ssrFile).href);

// ── Read HTML template ───────────────────────────────────────────────────────
const tpl = await readFile(join(ROOT, "index.html"), "utf8");

function buildHTML(route, body) {
  const schemas = [PERSON_LD];
  if (route.key === "speaking") schemas.push(SERVICE_LD);
  const ldTags = schemas
    .map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join("\n");

  const portraitPreload = route.portrait
    ? `<link rel="preload" as="image" href="/images/portrait-window.webp" fetchpriority="high" />\n`
    : "";

  const canonical = SITE_URL + route.path;

  return tpl
    // Strip CDN dev scripts
    .replace(
      /<script src="https:\/\/unpkg\.com\/react@[\s\S]*?<\/script>\s*<script src="https:\/\/unpkg\.com\/react-dom@[\s\S]*?<\/script>\s*<script src="https:\/\/unpkg\.com\/@babel\/standalone@[\s\S]*?<\/script>/m,
      ""
    )
    // CSS
    .replace(
      /<link rel="stylesheet" href="site\.css" \/>/,
      `<link rel="stylesheet" href="/${css.name}" integrity="${css.sri}" crossorigin="anonymous" />`
    )
    // JS — inject __INITIAL_PAGE__ before the deferred bundle
    .replace(
      /<script type="text\/babel" src="tweaks-panel\.jsx"><\/script>\s*<script type="text\/babel" src="site-work\.jsx"><\/script>\s*<script type="text\/babel" src="site\.jsx"><\/script>/m,
      `<script>window.__INITIAL_PAGE__="${route.key}";</script>\n` +
      `<script src="/${js.name}" integrity="${js.sri}" crossorigin="anonymous" defer></script>`
    )
    // Portrait preload (per-route)
    .replace(/^/m, (m, offset) => {
      // injected just before </head> later — no-op here
      return m;
    })
    // Per-route title
    .replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`)
    // Per-route description
    .replace(/<meta name="description"[^>]*\/>/, `<meta name="description" content="${route.desc}" />`)
    // Per-route canonical
    .replace(/<link rel="canonical"[^>]*\/>/, `<link rel="canonical" href="${canonical}" />`)
    // Per-route OG
    .replace(/<meta property="og:title"[^>]*\/>/, `<meta property="og:title" content="${route.title}" />`)
    .replace(/<meta property="og:description"[^>]*\/>/, `<meta property="og:description" content="${route.desc}" />`)
    .replace(/<meta property="og:url"[^>]*\/>/, `<meta property="og:url" content="${canonical}" />`)
    // Per-route Twitter
    .replace(/<meta name="twitter:title"[^>]*\/>/, `<meta name="twitter:title" content="${route.title}" />`)
    .replace(/<meta name="twitter:description"[^>]*\/>/, `<meta name="twitter:description" content="${route.desc}" />`)
    // Inject portrait preload + JSON-LD before </head>
    .replace("</head>", `${portraitPreload}${ldTags}\n</head>`)
    // Pre-rendered body
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

// ── Prerender all routes ─────────────────────────────────────────────────────
for (const route of ROUTES) {
  const body = renderPage(route.key);
  const html = buildHTML(route, body);
  const outDir = route.key === "home" ? DIST : join(DIST, ...route.key.split("/"));
  await mkdir(outDir, { recursive: true });
  await writeFile(join(outDir, "index.html"), html);
}

// ── Sitemap ──────────────────────────────────────────────────────────────────
const today = new Date().toISOString().split("T")[0];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map((r) => {
  const prio = r.key === "home" ? "1.0"
             : r.key === "speaking" || r.key === "about" ? "0.9"
             : "0.8";
  const freq = r.key === "home" || r.key === "work/publications" ? "monthly" : "yearly";
  return `  <url>\n    <loc>${SITE_URL}${r.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${prio}</priority>\n  </url>`;
}).join("\n")}
</urlset>`;
await writeFile(join(DIST, "sitemap.xml"), sitemap);
await writeFile(join(DIST, ".nojekyll"), "");
await writeFile(join(DIST, "CNAME"), CUSTOM_DOMAIN + "\n");

// ── Static assets ────────────────────────────────────────────────────────────
for (const item of STATIC_COPY) {
  const src = join(ROOT, item);
  if (await exists(src)) await cp(src, join(DIST, item), { recursive: true });
}

// Clean up SSR temp file
await rm(ssrFile, { force: true });

console.log(`Built: ${js.name} (${jsBuffer.length} B), ${css.name} (${cssBuffer.length} B)`);
console.log(`Prerendered: ${ROUTES.length} routes · sitemap.xml · JSON-LD on all pages`);
