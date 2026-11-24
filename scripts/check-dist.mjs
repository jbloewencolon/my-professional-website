import { readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const DIST = join(ROOT, "dist");
const SITE = "https://jordanloewencolon.com";

await import(pathToFileURL(join(ROOT, "content/routes.js")).href);
const routes = globalThis.SITE_ROUTES.map((route) => route.path);

function pageFile(route) {
  return route === "/"
    ? join(DIST, "index.html")
    : join(DIST, ...route.slice(1).split("/"), "index.html");
}

function fail(message) {
  throw new Error(message);
}

await stat(DIST);

const sitemap = await readFile(join(DIST, "sitemap.xml"), "utf8");

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
}

// Talk photos: file must be published and must carry alt text.
await import(pathToFileURL(join(ROOT, "content/work.js")).href);
for (const t of globalThis.SITE_WORK_CONTENT.talks) {
  const p = t.photo;
  if (!p) continue;
  if (!p.alt || !p.w || !p.h || !p.tag || !p.short) fail(`talk photo "${p.src}": needs alt, w, h, tag, short`);
  for (const f of [p.src, p.avif].filter(Boolean)) await stat(join(DIST, f)).catch(() => fail(`talk photo missing from dist: ${f}`));
}
for (const e of globalThis.SITE_WORK_CONTENT.upcoming) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(e.date) || !e.title || !e.venue) fail(`upcoming event needs ISO date, title, venue: ${JSON.stringify(e)}`);
}

const home = await readFile(join(DIST, "index.html"), "utf8");
if (!/href="\/site\.[a-f0-9]{10}\.css" integrity="sha384-[^"]+"/.test(home)) {
  fail("missing hashed CSS with SRI");
}
if (!/src="\/app\.[a-f0-9]{10}\.js" integrity="sha384-[^"]+"/.test(home)) {
  fail("missing hashed JS with SRI");
}

console.log(`Checked ${routes.length} prerendered routes.`);
