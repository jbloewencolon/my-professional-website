# Remaining Tasks

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
- [ ] **Deploy to production** — Push to main, trigger Netlify build
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
- [ ] **CDN/caching optimization** — Set appropriate cache headers for static assets and prerendered HTML

## Notes

- **Constraint:** No new visible copy should be added to the site (per original request)
- **Current branch:** `claude/zealous-planck-qr2iql`
- **Build output:** `dist/` directory with 8 prerendered routes, sitemap.xml, JSON-LD on all pages
- **Key improvements:** SEO (sitemap, JSON-LD, per-route metadata), mobile (hamburger nav, tap targets), AISEO (llms.txt, robots.txt, structured data)
