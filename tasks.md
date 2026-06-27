# Tasks

## Copy Editing Refactor

- [x] Create task tracker for copy-editing refactor work.
- [x] Add a centralized route/title/meta content file.
- [x] Wire the build to read route metadata from that content file.
- [x] Wire the client app to read page titles and nav labels from that content file.
- [x] Keep the local source fallback working.
- [x] Update the dist self-check to validate generated routes from the same source.
- [x] Run `npm run check`.

## Text Copy Phase

- [x] Push route/title/meta copy refactor.
- [x] Add centralized editable content files for homepage/about/speaking/contact/work text.
- [x] Wire build and local fallback to load text content before JSX.
- [x] Move existing structured text lists out of component files.
- [x] Wire key page headlines and lead copy to the text content file.
- [x] Run `npm run check`.
- [x] Move work page headlines/leads and work lists into editable content.

## Accessibility Palette Phase

- [x] Add contrast-safe clay and bohio text tokens.
- [x] Update small labels, links, metadata, focus ring, skip link, and CTA colors to pass AA contrast.
- [x] Preserve original accent tokens for decorative stripes, borders, and visual accents.
- [x] Run `npm run check`.

## Change Log

- 2026-06-26: Added `tasks.md` to track copy-editing architecture changes.
- 2026-06-26: Added `content/routes.js` as the route/title/meta/nav label source of truth.
- 2026-06-26: Wired build output, local fallback scripts, client nav labels, client page titles, and dist checks to `content/routes.js`.
- 2026-06-26: Ran `npm run check`; build and route/meta validation passed.
- 2026-06-26: Pushed commit `6fb0f52` with route/title/meta copy refactor.
- 2026-06-26: Added `content/text.js` and wired homepage/about/speaking/contact page copy through it.
- 2026-06-26: Ran `npm run check`; text content build passed.
- 2026-06-26: Added `content/work.js` and moved work publications, press, talks, projects, headlines, leads, and tiles into editable content files.
- 2026-06-26: Ran `npm run check`; work content build passed.
- 2026-06-27: Added contrast-safe palette tokens and updated small text, focus, skip-link, CTA, and band colors for WCAG AA contrast.
- 2026-06-27: Ran `npm run check`; accessibility palette build passed.
- 2026-06-27: Removed `netlify.toml` and Netlify-specific checks because deployment now runs through GitHub Pages.
## Remaining Tasks From Main

## Priority 1: Verification & Testing

- [ ] **Run the site locally** — Test the dev server / production build to verify:
  - All 8 routes render correctly with proper titles, content, and metadata
  - Mobile hamburger nav opens/closes and responds to navigation
  - Tap targets are large enough on mobile
  - Portrait preload is working on home/about (check DevTools network tab)
  - Skip link is keyboard-accessible (`Tab` key)
  - Focus styles visible with keyboard navigation
  - No console errors or warnings
  - Reduced-motion guard works (disable animations preference in browser)

## Priority 2: Deployment & Go-Live

- [ ] **Create pull request** — Merge `claude/zealous-planck-qr2iql` → `main`
- [ ] **Deploy to production** — Push to main and let GitHub Pages deploy
- [ ] **Verify live site** — Check jordanloewencolon.com for all features working in production
- [ ] **Check search console** — Verify sitemap.xml is indexed and robots.txt policies are applied
- [ ] **Monitor 404s** — Ensure no broken route navigation due to pathname routing

## Priority 3: Performance & SEO Polish (Optional)

- [ ] **Lighthouse audit** — Run Lighthouse on production to check Core Web Vitals (LCP, FID, CLS), accessibility score, SEO score
- [ ] **Social media preview** — Manually test OG/Twitter card rendering on LinkedIn, Twitter/X, etc.
- [ ] **Structured data testing** — Validate JSON-LD schemas with Google's Rich Results Test (schema.org/Person and Service)
- [ ] **robots.txt validation** — Confirm crawlers respect Allow/Disallow rules (monitor Search Console)
- [ ] **Mobile usability** — Full mobile flow testing (navigation, forms, interactive elements)

## Priority 4: Content & Future Enhancements (Backlog)

- [ ] **Add new speaking engagements** — Update speaking page with recent talks/engagements as they occur
- [ ] **Expand publications list** — Add new papers, book chapters, public writing
- [ ] **Update press/media** — Add new podcast appearances, interviews, media coverage
- [ ] **Refresh projects** — Add new technical projects or update existing ones
- [ ] **Contact form integration** — If not already present, consider adding email/contact backend
- [ ] **Analytics setup** — Consider adding privacy-respecting analytics (e.g., Plausible, Fathom) to track engagement
- [ ] **CDN/caching optimization** — Review what can be improved within GitHub Pages constraints

## Notes

- **Constraint:** No new visible copy should be added to the site (per original request)
- **Current branch:** `codex/github-pages-links`
- **Build output:** `dist/` directory with 8 prerendered routes, sitemap.xml, JSON-LD on all pages
- **Key improvements:** SEO (sitemap, JSON-LD, per-route metadata), mobile (hamburger nav, tap targets), AISEO (llms.txt, robots.txt, structured data)
