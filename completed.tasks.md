# Completed Tasks

## Round 1: Core Fixes & Fundamentals

- [x] **Proofread all copy** — Fixed 8 typos across site.jsx (convesations, Repitition, Developong, Tech Polic, garbled Reality Technologies sentence)
- [x] **Remove all "Pending" badges** — Deleted 5 `<span className="pending">` elements from Work pages
- [x] **Replace stale flyer** — Swapped "Upcoming · April 22" with Berlin 2025 talk photo
- [x] **Add accessibility stack** — Implemented `:focus-visible`, skip link (`#main-content`), and `prefers-reduced-motion` guard on epigraph animation
- [x] **Add SEO metadata** — Full OG/Twitter cards, canonical, favicon SVG (`#1A2A38` ink-blue with clay `#D26545` "J")
- [x] **Reconcile date inconsistencies & remove dead code** — Deleted `WORK` array, `Work` component, `WorkFlat`, `HomeRecentlyBuilt`, `HomeInConversation`, and homerecent ternary branch
- [x] **Switch to pathname routing with per-page titles** — Removed hash routing, added `popstate` listener, implemented `PAGE_TITLES` map, updated all hrefs from `#page` to `/page`, added `document.title` updates per page
- [x] **Update build metadata** — Added `netlify.toml` SPA fallback redirect (`/* → /index.html`)

## Round 2: SEO, Mobile, AISEO & Build-Time Prerendering

- [x] **Build-time SSR prerendering** — Implemented full pipeline using `react-dom/server` and `renderToString`; generated 8 prerendered `dist/*/index.html` files with injected per-route content; fixed dynamic require error by using `external: ["react", "react-dom"]` in esbuild config
- [x] **JSON-LD structured data** — Added Person schema (all pages) and Service schema (speaking page); proper organization, affiliation, and expertise descriptions
- [x] **sitemap.xml generation** — Auto-generated with all 8 routes, proper priorities (1.0 for home, 0.9 for speaking/about, 0.8 for others), change frequencies
- [x] **Mobile hamburger nav** — Added `.nav-toggle` button with `.bar` elements; collapsible nav with `aria-expanded` and `aria-label`; nav closes on navigation
- [x] **Tap target enlargement** — Ensured all interactive elements ≥44px height on mobile (nav links, footer links, contact links, back links)
- [x] **robots.txt bot policy** — Allow search-time AI crawlers (OAI-SearchBot, PerplexityBot, YouBot); block training crawlers (GPTBot, CCBot, anthropic-ai, Claude-Web, Google-Extended, Bytespider, Diffbot, omgili)
- [x] **llms.txt AISEO file** — Created `/llms.txt` for LLM discoverability with Jordan's identity, expertise, services, affiliations, and links
- [x] **Per-route metadata injection** — Title, description, canonical, OG, Twitter cards, JSON-LD, and portrait preload (home/about only)
- [x] **SRI bundle hashing** — Hashed JS/CSS with SHA-256 (10-char slug), SHA-384 for integrity attributes
- [x] **SSR-safe state initialization** — Updated `useState` to detect `window.__INITIAL_PAGE__` or `window.location.pathname` to ensure correct page renders on both SSR and client hydration

### Verification
All 8 routes verified:
- Root `<div class="site">` renders with full content
- JSON-LD schemas injected correctly
- Portrait preload only on home/about
- Sitemap has 8 entries
- Service LD only on speaking page
