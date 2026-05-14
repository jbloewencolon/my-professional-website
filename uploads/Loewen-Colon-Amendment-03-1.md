# Amendment 03.1 — Home consolidation, affiliations, site-wide tightening

**From** Senior creative web dev
**To** Design assistant (Claude Design handoff bundle)
**Status** Amends Update Brief 03. Builds on the current prototype.
**Effort** ~6–8 hours total.
**Touches** `site.jsx` (Home, About, Speaking, Footer), `site-work.jsx` (HOME_PROJECTS, HOME_PRESS no longer needed), `site.css`, `tweaks-panel.jsx`.

---

## Why this amendment exists

After reviewing the live prototype, three issues are clear:

1. **Home is doing too much.** Six numbered sections, three of which are structurally identical "here are three things → see all" lists. The portfolio depth is right; the way Home tries to surface all of it on one page is over-design.
2. **The affiliations / "who I've worked with" question still needs answering**, and the right place for that section depends on what else Home is carrying.
3. **The site has accumulated small inconsistencies and placeholder content** that need to be resolved before launch.

This amendment addresses all three together because they're the same edit: getting Home to do less so the rest of the site can do more, then cleaning up the build for ship.

---

## Part one · Home consolidation (Option A)

### The new Home structure

Seven sections become five:

```
1. Identity            (wordmark + 2-line subtitle)
2. Epigraph band       (clay, smaller than current)
3. Recently            (mixed chronological stream, 5–6 items)
4. Where the work travels   (affiliations — Part two)
5. Start a conversation
```

Marginalia rail stays on the right. Same notes as currently specified.

### Specific changes to the existing Home component

**Cut from `Home()`:**

- The separate "Talks, this season" section (lines 186–202 in current `site.jsx`)
- The separate "Recently" section (lines 204–226)
- Both `HomeRecentlyBuilt` and `HomeInConversation` conditional renders (lines 228–229)
- The conditional section numbering (`t.homeextras === "on" ? "06" : "03"` — section is just numbered statically now)

**Replace with a single consolidated section:**

```jsx
<section className="home-section">
  <h2 className="section-head"><span className="sh-num">01</span> Recently</h2>
  <ul className="home-recent-list">
    {HOME_RECENT.map((item, i) => (
      <li key={i} className="hr-item">
        <a href={item.href} target={item.external ? "_blank" : null} rel="noopener"
           onClick={item.page ? (e) => { e.preventDefault(); setPage(item.page); } : null}>
          <span className="hr-kind">{item.kind}</span>
          <span className="hr-venue">· {item.venue} ·</span>
          <span className="hr-date">{item.date}</span>
          <span className="hr-title">{item.title}</span>
        </a>
      </li>
    ))}
  </ul>
  <nav className="hr-deeper" aria-label="Deeper into the work">
    <a className="quiet-link" href="#work/publications"
       onClick={(e) => { e.preventDefault(); setPage("work/publications"); }}>
      All writing & talks →
    </a>
    <a className="quiet-link" href="#work/projects"
       onClick={(e) => { e.preventDefault(); setPage("work/projects"); }}>
      All projects →
    </a>
    <a className="quiet-link" href="#work/press"
       onClick={(e) => { e.preventDefault(); setPage("work/press"); }}>
      All press →
    </a>
  </nav>
</section>
```

### The new `HOME_RECENT` constant

Define in `site.jsx` near the existing `TALKS` and `WORK` constants:

```jsx
const HOME_RECENT = [
  { kind: "Essay",   venue: "Harvard Business Review", date: "May 2025",
    title: "Research: Do LLMs Have Values?",
    href: "https://hbr.org/2025/05/research-do-llms-have-values", external: true },
  { kind: "Code",    venue: "BookBack", date: "2025",
    title: "Reclaim the Commons — public-domain reclamation against extractive scraping.",
    href: "https://github.com/jbloewencolon/BookBack", external: true },
  { kind: "Talk",    venue: "Data Natives · Berlin", date: "2025",
    title: "Responsible Innovation: Hopes & Fears",
    href: "#work/publications", page: "work/publications" },
  { kind: "Podcast", venue: "Pondering AI", date: "2025",
    title: "What Does AI Value? — with Kimberly Nevala",
    href: "https://www.youtube.com/watch?v=ZajcadLF_8I", external: true },
  { kind: "Policy",  venue: "Aspen Institute", date: "2024",
    title: "AI in Drug Development & Indigenous Knowledge",
    href: "#work/publications", page: "work/publications" },
];
```

Five items, mixed types, chronological. The kind-tag (`Essay / Code / Talk / Podcast / Policy`) does the type-distinction work that the separate sections were doing structurally.

### Subtitle trim

Current Home subtitle:

```jsx
<div className="home-subtitle">
  <span className="hs-tag">Practice</span>
  Indigenous Taíno technologist<br/>
  Responsible AI strategist<br/>
  Scholar · educator · consultant
</div>
```

Replace with:

```jsx
<div className="home-subtitle">
  Indigenous Taíno technologist<br/>
  Responsible AI strategist
</div>
```

Cuts the "Practice" tag (was labeling something that didn't need a label) and the third role line ("Scholar · educator · consultant" — those identities surface on About and Speaking, don't need to compete on Home). Brings the hero from five lines to three.

### CSS for the consolidated list

```css
/* Home consolidated "Recently" list */
.home-recent-list{
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 28px;
}
.hr-item a{
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  gap: 10px;
  align-items: baseline;
  border-bottom: 1px solid color-mix(in oklab, var(--paper-mute) 25%, transparent);
  padding-bottom: 18px;
  color: var(--paper);
  text-decoration: none;
}
.hr-item a:hover{ border-bottom-color: var(--clay); }
.hr-item a:hover .hr-title{ color: var(--clay); }

.hr-kind{
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--clay);
}
.hr-venue{
  font-family: var(--mono);
  font-size: 11px;
  color: var(--paper-mute);
}
.hr-date{
  font-family: var(--mono);
  font-size: 11px;
  color: var(--paper-mute);
  text-align: right;
}
.hr-title{
  grid-column: 1 / -1;
  font-family: var(--serif-display);
  font-size: 22px;
  line-height: 1.3;
  color: var(--paper);
  transition: color 200ms ease;
}

.hr-deeper{
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-top: 32px;
  font-family: var(--mono);
  font-size: 12px;
}

@media (max-width: 720px) {
  .hr-item a{
    grid-template-columns: auto 1fr;
  }
  .hr-venue, .hr-date{ font-size: 10px; }
}
```

---

## Part two · Affiliations section ("Where the work travels")

### Placement

New section on Home, between "Recently" and "Start a conversation." Numbered section 02.

### Treatment

**Featured logos (4)** displayed at the top of the section, followed by **typeset list (4)** below. Mixed treatment respects the relationship distinctions:

- **Featured with logos** (Jordan confirmed permission from IVI; the other three are the most identity-defining):
  - Indigenous Values Initiative
  - Nera Lake
  - Candidly AI
  - Aspen Policy Academy (Tech)

- **Typeset list** (no logos; named affiliations):
  - FASPE — Fellowship at Auschwitz for the Study of Professional Ethics
  - Smith School of Business, Queen's University
  - Founder Institute
  - TIDEL at The New School

### Component spec

```jsx
const AFFILIATIONS_LOGOS = [
  { name: "Indigenous Values Initiative", short: "IVI", href: "https://indigenousvalues.org/",
    descriptor: "Haudenosaunee values education, Doctrine of Discovery scholarship." },
  { name: "Nera Lake", href: "https://www.neralake.com/",
    descriptor: "AI ethics and applied alignment." },
  { name: "Candidly AI", href: "https://candidly-ai.com/about/",
    descriptor: "Applied AI for human-facing systems." },
  { name: "Aspen Policy Academy (Tech)", href: "https://aspenpolicyacademy.org/tech/",
    descriptor: "Tech Policy Writing Fellowship." },
];

const AFFILIATIONS_TEXT = [
  { name: "FASPE", full: "Fellowship at Auschwitz for the Study of Professional Ethics",
    href: "https://www.faspe-ethics.org/" },
  { name: "Smith School of Business, Queen's University", href: "https://smith.queensu.ca/" },
  { name: "Founder Institute", href: "https://fi.co/" },
  { name: "TIDEL", full: "The New School", href: "https://utsnyc.edu/tidel/" },
];

function HomeAffiliations() {
  return (
    <section className="home-section home-affiliations">
      <h2 className="section-head">
        <span className="sh-num">02</span> Where the work travels
      </h2>
      <p className="lead-mute">
        Indigenous sovereignty work, applied AI, policy training, universities,
        humanities ethics. The same questions show up in different rooms.
      </p>

      <ul className="affil-logo-grid">
        {AFFILIATIONS_LOGOS.map((a) => (
          <li key={a.name} className="affil-logo-item">
            <a href={a.href} target="_blank" rel="noopener">
              <div className="affil-logo" aria-hidden="true">
                {/* Logo asset goes here; placeholder is monogram */}
                <span className="affil-logo-placeholder">{a.short || a.name.split(" ").map(w => w[0]).join("").slice(0, 3)}</span>
              </div>
              <div className="affil-name">{a.name}</div>
              <div className="affil-descriptor">{a.descriptor}</div>
            </a>
          </li>
        ))}
      </ul>

      <p className="affil-also-label">Also affiliated with</p>
      <ul className="affil-text-list">
        {AFFILIATIONS_TEXT.map((a) => (
          <li key={a.name}>
            <a className="inline-link" href={a.href} target="_blank" rel="noopener">
              {a.name}
            </a>
            {a.full && <span className="affil-full"> — {a.full}</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}
```

### CSS for the affiliations block

```css
.home-affiliations{ margin-top: 80px; }

.affil-logo-grid{
  list-style: none;
  margin: 32px 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}
.affil-logo-item a{
  display: block;
  text-decoration: none;
  color: var(--paper);
  border-top: 1px solid color-mix(in oklab, var(--paper-mute) 25%, transparent);
  padding-top: 20px;
  transition: border-color 200ms ease;
}
.affil-logo-item a:hover{
  border-top-color: var(--clay);
}
.affil-logo{
  height: 56px;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.affil-logo img{
  max-height: 100%;
  max-width: 140px;
  width: auto;
  /* No grayscale filter; logos in their actual colors */
}
.affil-logo-placeholder{
  font-family: var(--serif-display);
  font-size: 28px;
  font-style: italic;
  color: var(--clay);
  letter-spacing: -0.02em;
}
.affil-name{
  font-family: var(--serif-display);
  font-size: 17px;
  line-height: 1.3;
  margin-bottom: 6px;
}
.affil-descriptor{
  font-family: var(--mono);
  font-size: 11px;
  line-height: 1.5;
  color: var(--paper-mute);
}

.affil-also-label{
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--paper-mute);
  margin: 48px 0 16px;
}
.affil-text-list{
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
  font-family: var(--serif-body);
  font-size: 16px;
}
.affil-full{ color: var(--paper-mute); }

@media (max-width: 1100px){
  .affil-logo-grid{ grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 720px){
  .affil-logo-grid{ grid-template-columns: 1fr; gap: 24px; }
}
```

> [!IMPORTANT]
> **Logo asset action:** The four featured logos need to be saved as SVG (preferred) or transparent-background PNG and dropped into `/images/logos/`. Until then, the placeholder shows the monogram (e.g., "IVI", "NL", "CA", "APA") in Fraunces italic. **The design assistant should leave the monogram placeholder in place if logo assets aren't ready** — it reads as deliberate restraint rather than a missing image. Jordan can swap in actual logos when he has them.

> [!NOTE]
> **Permission note:** Jordan has confirmed permission from Indigenous Values Initiative. Confirm with the other three (Nera Lake, Candidly AI, Aspen Policy Academy) before launch. Listing by name is generally low-risk; logo display warrants a quick email.

---

## Part three · Site-wide tightening (pre-launch must-fixes)

### Critical: Replace dead links

Three placeholder URLs need real targets before launch:

**Contact page** (`site.jsx`):
```jsx
// Current — broken:
<a className="inline-link" href="#">Download bio & headshot pack</a>

// Fix — either real PDF link, or remove the entry entirely if the asset isn't ready:
<a className="inline-link" href="/press-pack-jordan-loewen-colon.pdf">
  Download bio & headshot pack
</a>
```

**Contact page** LinkedIn:
```jsx
// Current — generic:
href="https://www.linkedin.com/"

// Fix:
href="https://www.linkedin.com/in/jordan-loewen-colon/"   // Jordan to confirm exact URL
```

**Footer** (`site.jsx`):
```jsx
// Current — dead:
<div><a href="#">LinkedIn</a></div>
<div><a href="#">Substack</a></div>

// Fix LinkedIn as above. For Substack: either link to real URL or REMOVE the entry.
// Don't link to nothing.
```

### Critical: Resolve `.pending` flags

Seven `<span className="pending">Pending</span>` markers across the build. These were essential during design but must not ship visibly.

**Add `data-draft` attribute** to the `.site` root, default off:

```jsx
// In App component:
<div className={`site ${cn}`}
     data-page={...}
     data-draft={t.draft ? "true" : null}>
```

**Add tweak default:**

```jsx
const TWEAK_DEFAULTS = {
  // ... existing ...
  "draft": false,
};
```

**Add CSS rule** to hide pending markers when draft is off:

```css
/* Pending markers only visible in draft mode */
.site:not([data-draft="true"]) .pending{ display: none; }
```

**Add tweaks-panel toggle** in `tweaks-panel.jsx`:

```jsx
{
  key: "draft",
  label: "Draft markers",
  options: [{ value: false, label: "Hidden" }, { value: true, label: "Visible" }],
}
```

This way Jordan can flip draft on to see what still needs his sign-off, but the production site never shows the badges. The seven flagged items remain in place as content placeholders until Jordan resolves them.

### Critical: Fix marginalia top padding

Current CSS (line 288):

```css
.grid-margin{
  padding-top: 200px;   /* magic number, misaligns on most pages */
}
.grid-margin.flush{ padding-top: 24px; }
```

Default of 200px was set to align with Home's first body paragraph, which sits below the wordmark + band. But this misaligns the marginalia on every other page, where body text starts much higher.

**Fix:** Make 24px the default; remove the special-case flush class.

```css
.grid-margin{
  padding-top: 24px;
}
/* .grid-margin.flush is no longer needed — remove the class and all uses of it */
```

Find all uses of `<Margin ... flush>` in `site.jsx` and remove the `flush` prop. The `Margin` component's `flush` parameter can also be removed.

### Should-fix: Drop redundant Speaking marginalia

In `Speaking()` component, the marginalia rail has three notes:

```jsx
<MarginNote tag="On rates">...</MarginNote>
<MarginNote tag="What I am useful for">...</MarginNote>
<MarginNote tag="What I am not">...</MarginNote>
```

The "On rates" note ("Listed because guessing wastes everyone's time. If your budget is real and falls outside, write anyway.") is now redundant with the full-bleed clay rates band that follows on the page. The note's content is essentially the same as the rates band's intro.

**Fix:** Remove the "On rates" margin note. Keep "What I am useful for" and "What I am not" — those are the page's voice.

### Should-fix: Normalize band foreground colors

The Press and Projects sub-pages have `.dark` classes on individual elements to override foreground color on lighter band grounds (sun, shell):

```jsx
<WorkSubnav ... variant="dark" />
<div className="wt-kicker dark">In the conversation</div>
<h1 className="dark">Press & media.</h1>
```

This is ad-hoc. The clean version is a band-level modifier:

**In CSS:**

```css
.band-sun, .band-shell{
  --band-fg: var(--ink);
  --band-fg-mute: var(--ink-soft);
}
.band-sun .wt-kicker,
.band-shell .wt-kicker,
.band-sun h1,
.band-shell h1{
  color: var(--band-fg);
}
.band-sun .work-subnav,
.band-shell .work-subnav{
  color: var(--band-fg-mute);
}
```

**In JSX:** Remove all `className="dark"` and `variant="dark"` from the Press and Projects components. The band itself now carries the foreground color.

---

## Part four · About page tightening (nice-to-have)

### Combine "Currently thinking about" + "Lineages" into two-column block

Currently About has two stacked sections:

- "Currently thinking about" (4 items)
- "Lineages" (6 names)

Both are list-of-things sections that could share horizontal space. Replace with a single two-column section:

```jsx
<section className="about-currents">
  <div className="ac-col">
    <h2 className="section-head section-head-spaced">
      <span className="sh-num">·</span> Currently thinking about
    </h2>
    <ul className="thinking-list">
      <li>The difference between an AI <em>model</em> and an AI <em>system</em>, and why bookers keep using one word when they mean the other.</li>
      <li>What an "ensemble" of human and machine judgment looks like in a workflow that has to ship next quarter.</li>
      <li>Whether <em>opacity</em> can be a design constraint and not just a value statement.</li>
      <li>Glissant on relation. The same passage, third year running.</li>
    </ul>
  </div>
  <div className="ac-col">
    <h2 className="section-head section-head-spaced">
      <span className="sh-num">·</span> In conversation with
      <span className="pending" title="Pending Jordan sign-off">Pending</span>
    </h2>
    <ul className="lineages">
      {LINEAGES.map((l, i) => (
        <li key={i}>
          <span className="lin-name">{l.name}</span>
          <span className="lin-meta">{l.meta}</span>
        </li>
      ))}
    </ul>
  </div>
</section>
```

Note the renamed heading: "Lineages" → "In conversation with." Slightly less professorial; lands more cleanly with the surrounding prose.

CSS:

```css
.about-currents{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  margin-top: 56px;
}
@media (max-width: 1100px){
  .about-currents{ grid-template-columns: 1fr; gap: 40px; }
}
```

### Hide Lineages "Pending" marker via draft mode

The pending marker on Lineages now sits inside the renamed section head. It will hide automatically when `data-draft` is off (per the fix in Part three).

---

## Part five · Footer tightening (nice-to-have)

### Collapse to three columns

Current footer has four columns. The "Elsewhere" column has only three links (one of which — Substack — is currently dead). Collapse to three columns:

```jsx
function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner footer-three">
        <div className="f-col">
          <div className="f-label">Land acknowledgment</div>
          <p className="land-ack">
            This site is maintained from Kingston, Ontario, on the traditional territory of the
            Anishinaabe and Haudenosaunee peoples, and from across the Caribbean diaspora.
            Jordan writes as Taíno — a continuing people, not a closed chapter.
          </p>
        </div>
        <div className="f-col">
          <div className="f-label">Elsewhere</div>
          <div><a href="mailto:jordan@jordanloewencolon.com">Email</a></div>
          <div><a href="https://www.linkedin.com/in/jordan-loewen-colon/" target="_blank" rel="noopener">LinkedIn</a></div>
          {/* Substack removed; add back when Jordan launches one */}
          <div className="f-also">
            <div className="f-label" style={{marginTop:"18px"}}>© 2026</div>
            <div>Jordan Loewen-Colón</div>
            <div className="f-tagline">A document, not a platform. No tracking. No cookie banner.</div>
          </div>
        </div>
        <div className="f-col">
          <div className="f-label">Colophon</div>
          <span className="colophon-word">guakía</span>
          <span className="colophon-gloss">Taíno · "we, ours"</span>
          <div className="f-set">Set in Fraunces & Source Serif 4.<br/>Monospace: JetBrains Mono.</div>
        </div>
      </div>
    </footer>
  );
}
```

CSS adjustment:

```css
.footer-three{
  grid-template-columns: 2fr 1fr 1fr;
}
@media (max-width: 1100px){
  .footer-three{ grid-template-columns: 1fr 1fr; }
}
@media (max-width: 720px){
  .footer-three{ grid-template-columns: 1fr; }
}
```

The land acknowledgment gets more space (it's the most substantive column); Elsewhere and Colophon share narrower columns.

---

## Part six · Projects page lead tightening (nice-to-have)

The Projects page currently has:

```jsx
<div className="wt-kicker dark">Built in public</div>
<h1 className="dark">Projects & code.</h1>
// then:
<p className="lead">
  Working models, datasets, and tools. Most are in public; all are open to fork,
  critique, and conversation.
</p>
```

Three sentences of meta-description before the visitor sees a project. Tighten the lead:

```jsx
<p className="lead">
  Working models, datasets, and tools. Open to fork, critique, and conversation.
</p>
```

Drops "Most are in public; all are" from the front of the sentence. Same meaning, one less clause.

---

## Part seven · Tweaks panel updates

Add two new toggles, remove one:

**Add:**

- `draft` — Hidden / Visible. Default Hidden. Shows or hides the `.pending` markers across the site.
- `homerecent-mode` — Consolidated / Separate. Default Consolidated. Lets Jordan compare the new single-stream Home against the previous three-section version. Useful for a 24-hour A/B before committing.

**Remove:**

- `homeextras` — superseded by `homerecent-mode`. The "extras" off state was simulating a lean Home; the consolidated version is leaner *and* better.

**Keep:** All other existing toggles.

---

## Suggested build order

1. **Critical fixes first** (Part three). These are pre-launch blockers regardless of the rest. About an hour: dead links, `.pending` system, marginalia padding.
2. **Home consolidation** (Part one). The largest structural change. Maybe 90 minutes.
3. **Affiliations section** (Part two). New component, new CSS. 90 minutes. Use monogram placeholders if logo assets aren't ready.
4. **Speaking marginalia trim** (Part three should-fix). Five minutes.
5. **Band foreground normalization** (Part three should-fix). Twenty minutes.
6. **About two-column refactor** (Part four). Forty-five minutes.
7. **Footer collapse** (Part five). Twenty minutes.
8. **Projects lead trim** (Part six). One minute.
9. **Tweaks panel** (Part seven). Thirty minutes.

Total: roughly 6–8 hours of focused work.

---

## Open items for Jordan

Carries forward + new:

- The Home epigraph (still the Deleuze placeholder).
- Survivance kicker copy on About (`TAÍNO · PRESENT TENSE`).
- Lineages names (placeholders in the brief; Jordan to confirm or replace).
- Taíno colophon word (`guakía` placeholder).
- Land acknowledgment phrasing.
- Rates-block numbers ($10–25k, $8–15k, etc.).
- al colibrí default state — footnote vs. surfaced.
- Press pack PDF — needs to be created, or the Contact entry needs to be removed.
- Substack — link it or remove it.
- LinkedIn exact URL.

**New:**

- Permission confirmation for the three non-IVI featured affiliations (Nera Lake, Candidly AI, Aspen Policy Academy).
- Logo assets for the four featured affiliations (SVG preferred). Monogram placeholders ship if assets aren't ready.

---

## Out of scope for this amendment

The Brief 03 "what not to do" list still applies. New items specific to this amendment:

- No animation on the affiliations logo grid (no hover-lift, no fade-in cascade). The grid stays still.
- No "client testimonials" section. Affiliations carries the social proof; testimonials would re-introduce the consultant-site vocabulary the original proposal specifically resisted.
- No filtering or sorting on the consolidated Home "Recently" list. Five items, chronological, full stop.

---

*— End of amendment 03.1.*
