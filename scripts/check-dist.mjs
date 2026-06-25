import { readFile, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const DIST = join(ROOT, "dist");
const SITE = "https://jordanloewencolon.com";

const routes = [
  "/",
  "/about",
  "/speaking",
  "/work",
  "/work/publications",
  "/work/press",
  "/work/projects",
  "/contact",
];

function pageFile(route) {
  return route === "/"
    ? join(DIST, "index.html")
    : join(DIST, ...route.slice(1).split("/"), "index.html");
}

function fail(message) {
  throw new Error(message);
}

function inlineScriptHashes(html) {
  return [...html.matchAll(/<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/g)]
    .map((match) => "sha256-" + createHash("sha256").update(match[1]).digest("base64"));
}

await stat(DIST);

const sitemap = await readFile(join(DIST, "sitemap.xml"), "utf8");
const netlify = await readFile(join(ROOT, "netlify.toml"), "utf8");
const csp = netlify.match(/Content-Security-Policy = "([^"]+)"/)?.[1] || "";

for (const route of routes) {
  const file = pageFile(route);
  const html = await readFile(file, "utf8");
  const canonical = SITE + route;

  if (/unpkg\.com|text\/babel|react\.development|babel\.min\.js|window\.__INITIAL_PAGE__/.test(html)) {
    fail(`${route}: dev-only script leaked into dist`);
  }
  if (!html.includes(`<link rel="canonical" href="${canonical}" />`)) {
    fail(`${route}: missing canonical`);
  }
  if (!sitemap.includes(`<loc>${canonical}</loc>`)) {
    fail(`${route}: missing sitemap entry`);
  }
  if ((html.match(/<h1\b/g) || []).length !== 1) {
    fail(`${route}: expected one h1`);
  }
  for (const hash of inlineScriptHashes(html)) {
    if (!csp.includes(`'${hash}'`)) fail(`${route}: CSP missing ${hash}`);
  }
}

const home = await readFile(join(DIST, "index.html"), "utf8");
if (!/href="\/site\.[a-f0-9]{10}\.css" integrity="sha384-[^"]+"/.test(home)) {
  fail("missing hashed CSS with SRI");
}
if (!/src="\/app\.[a-f0-9]{10}\.js" integrity="sha384-[^"]+"/.test(home)) {
  fail("missing hashed JS with SRI");
}

console.log(`Checked ${routes.length} prerendered routes.`);
