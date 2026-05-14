# Update Brief 02 — Caribbean night, Verge-discipline, Indigenous Futurism

**From** Senior creative web dev
**To** Design assistant (Claude Design handoff bundle)
**Status** Supersedes Update Brief 01. Builds on prototype `Jordan Loewen-Colón.html`.
**Effort** ~8–10 hours total; 24–36 hour turnaround.
**Touches** `site.css`, `site.jsx`, `tweaks-panel.jsx`. No new components.

---

## What changed since Brief 01

Jordan chose Direction B — the Caribbean night palette — as the site's foundation, replacing the aged-paper ground. This is a more substantive shift than Brief 01 contemplated, and it cascades into the band logic, the image treatments, and the tweaks panel.

This brief is **not additive to Brief 01**. It supersedes it. Read this one as the working document; refer to Brief 01 only for the rationale on individual decisions that carry forward.

Three things to internalize before building:

1. **The ground itself is the design.** Deep ink-blue is no longer an accent; it is the room. This changes which moments need to be "events" — the bands stop being color statements and start being tonal lifts or warm-color punctuation against a cool ground.
2. **Warm cream on deep blue is the central pairing.** Body type goes from near-black on aged paper to warm cream (`#EDE6D5`) on deep ink (`#1A2A38`). This is the visual signature of the site, and most other decisions answer to it.
3. **The Taíno material-culture references live in the palette, not in motifs.** The ground is sea-and-night; the warm accents are clay, sun, coral. Nothing is quoted; the references are structural. The "what not to do" list at the end of this brief still applies.

> [!IMPORTANT]
> Several items below touch identity claims that are Jordan's to make, not ours. Items marked **Pending Jordan** should be implemented as specified in the brief but flagged for his sign-off before launch.

---

## Part one · The palette

### Replace the root tokens

```css
:root {
  /* Ground — the room */
  --ink:           #1A2A38;   /* deep ink-blue with green undertone; the background */
  --ink-lifted:    #23354A;   /* faintly lifted ground for paper-soft band role */
  --ink-deep:      #11202C;   /* deeper still, for the header stripe and footer */

  /* Body */
  --paper:         #EDE6D5;   /* warm cream — the new body-text color */
  --paper-mute:    #8FA0B0;   /* cool blue-gray for muted text, marginalia, dates */

  /* Warm accents (used as section grounds and trim) */
  --clay:          #D26545;   /* terracotta — the loudest pairing against --ink */
  --sun:           #D4A04A;   /* gold ochre */
  --shell:         #E89090;   /* lifted coral — reserved, one use only (al colibrí) */

  /* Cool / green accent */
  --bohio:         #5C8A5C;   /* brighter forest, holds against the dark ground */
}
```

The semantic names (`--clay`, `--sea`, `--bohio`, `--sun`, `--shell`) are kept as CSS comments and as variable names; they do not appear in markup. They exist to keep us honest about the material references — fired clay, sea-and-sky, bohío wood, sun ochre, conch-shell pink. A Taíno scholar peer reading the source would recognize the choice; a booker would not see it at all.

**Note on `--sea`:** In Brief 01, `--sea` was an accent ground. On Direction B, the entire site ground *is* the sea tone. We do not declare `--sea` as a separate variable — `--ink` carries that meaning. This simplifies the band logic; see item 06.

### Accessibility check before shipping

Run the body pairing (`#EDE6D5` on `#1A2A38`) through a contrast checker. It comes in around 11.5:1, well past WCAG AAA. The accent pairings need verification:

- `--clay` (#D26545) on `--ink` (#1A2A38) — for ground-text on the Home epigraph band
- `--paper` (#EDE6D5) on `--clay` (#D26545) — for text on the Home band
- `--paper` on `--bohio` — for text on the Work title band

All three should clear AA for large text minimum. If any fall short, lift the foreground rather than darkening the ground.

---

## Part two · Page-by-page changes

### Site shell

**01. Convert the global ground.** Set `body { background: var(--ink); color: var(--paper); }`. Remove the paper noise tile (it was tuned for the cream background and reads wrong against ink). Add an extremely subtle dark-noise tile at 3% opacity if any texture is needed — but test without it first; the deep ink may not need texture at all.

**02. Header.** Background goes to `--ink-deep` (the slightly deeper tone) so the sticky header has a hairline of contrast against the page ground. Wordmark text in `--paper`. Nav links in `--paper-mute`, hover state in `--clay`.

**03. Header stripe (carried from Brief 01, item 11).** Keep the 3px page-color stripe under the header, but now in the warm accent rather than the page's ground. Home: `--clay`. Work: `--bohio`. About: `--sun`. Speaking: `--shell` *or* `--clay` — see open items. Contact: omitted.

**04. Footer.** Background `--ink-deep`, text `--paper-mute`, links `--paper`. The land-acknowledgment line and Taíno colophon word (from Brief 01, item 15) carry forward and read more legibly against the deeper ground.

---

### Home

**05. Epigraph band stays, but its role inverts.** In Brief 01 the clay band was the loud event against a paper ground. Here, the clay band is *still* the loud event, because clay-on-ink is the single most luminous pairing in the palette. Keep it.

- Full-bleed section, `background: var(--clay)`, foreground `var(--paper)`.
- Fraunces italic, 40–48px (slightly bigger than Brief 01 specified — the band now has more visual headroom because the surrounding ground is dark).
- Max-width 32em, centered within the band.
- No top or bottom rule on the band. The color shift carries the boundary.

**06. The "wordmark on home" treatment carries.** From the Verge-influence discussion: name `clamp(96px, 14vw, 180px)` in Fraunces, breaking the body-column grid, with the mono subtitle hanging in the right gutter where marginalia would otherwise sit. On `--ink` ground, this is genuinely arresting.

**07. Talks and recent-work blocks below the band.** These sit on the ground (`--ink`) with `--paper` text. Item titles in Fraunces, kickers in `--clay` (the new kicker color for Home page; see item 14).

---

### Work

**08. Work title band on `--bohio` ground.** Carries forward from Brief 01 item 07, unchanged in spec. 140px tall, full-bleed, just the page title in `--paper` Fraunces at 96px. Kicker and lead resume on `--ink`.

**09. Work item figures.** Drop the grayscale filter entirely (Brief 01 item 12 carried forward, sharpened). On the dark ground, desaturating images makes them look dead; saturated images become little windows of warmth on the page. The Data Natives orange-chairs photo in particular wants to land fully saturated.

**10. Filter chips: still remove them.** Carried from prior evaluation. Eight chronological items don't need filtering.

---

### About

**11. Portrait band changes role.** In Brief 01, the About portrait band was on `--paper-soft` (a paler tone than `--paper`) — a tonal lift, not a chromatic shift. On Direction B, we do the equivalent: the portrait band sits on `--ink-lifted` (`#23354A`), a faintly lifted version of the ground. Same logic, different palette.

- Portrait at 480px on the left.
- Kicker, page title, figcaption float to the right.
- Page-title color on this band: `--paper`. Kicker color: `--sun`.

**12. Survivance kicker (Brief 01 item 13, carries forward; Pending Jordan).** Above the page title, add a second kicker line in mono caps. Suggested: `TAÍNO · PRESENT TENSE`. Renders in `--clay` against the lifted ground for maximum visibility.

**13. Lineages section (Brief 01 item 14, carries forward; Pending Jordan).** Add after "Currently thinking about." Same dashed-rule list treatment. Names render in `--paper`; dates and affiliations in `--paper-mute`.

---

### Speaking

**14. The rates block re-conception.** Brief 01 put the rates on a `--sea` band against paper. On Direction B, the ground is already sea-tone, so a "sea band" is invisible. Two options:

- **Option A (recommended):** Rates block on `--clay` ground, `--paper` foreground. The numbers (`$10–25k`, etc.) become Fraunces at 64–80px in `--paper`. The clay band on Speaking echoes the clay band on Home, which gives the site a deliberate two-event rhythm. **Pending Jordan** on the actual numbers; design moves ahead regardless.
- **Option B (fallback):** Rates block on `--ink-lifted` (the same faintly lifted ground used for the About portrait band). Quieter, tonal rather than chromatic. Use this if Jordan finds two clay bands too repetitive.

I'd ship Option A and let Jordan vote.

**15. Topic numbers.** From Brief 01: bump the topic-num from 12px mono to 96px Fraunces in the accent color. On Direction B, the accent for this is `--sun` rather than `--clay` — gold reads more confidently than terracotta at large display sizes against `--ink`, and it gives Speaking its own warm signal distinct from Home/Work's clay-and-bohío.

---

### Contact

**16. Contact stays minimal.** Ground stays `--ink`. No band. The page is four lines and a calendar link; color discipline here means doing nothing.

---

## Part three · Trim, type, marginalia

**17. Display sizes (Brief 01 item 08).** Carry forward unchanged. Fraunces at the larger sizes holds even better against the dark ground than against paper — the deep background gives the type more weight per pixel.

**18. Kicker colors per page.**

```css
.page-home     .kicker { color: var(--clay); }
.page-work     .kicker { color: var(--bohio); }
.page-about    .kicker { color: var(--sun); }
.page-speaking .kicker { color: var(--sun); }
.page-contact  .kicker { color: var(--paper-mute); }
```

The page-color logic is preserved from Brief 01; the colors are reassigned to read confidently against `--ink`.

**19. Marginalia (carries forward, palette adjusted).** Margin notes stay in the right gutter. Text in `--paper-mute` (cool blue-gray) rather than the previous warm mute. Tag uppercased above each note renders in the section's kicker color. Hairline rule on the left of each note in `--paper-mute` at 30% opacity.

**20. Link styling.** Inline body links: `--paper` text, underline in `--clay` at 60% opacity (raise from the 40% used on the paper version — the dark ground absorbs warm tones and we need to push back). Hover: underline goes to 100% `--clay`.

**21. The al colibrí link in "surfaced" state.** Inline mention in the About bio body. Underline in `--shell` (coral) at 60% opacity. On `--ink` ground, the shell pink genuinely glows — this is the single most visible color in the palette and is reserved for this one use. **Pending Jordan** on whether to keep "surfaced" as the default or flip back to "footnote."

---

## Part four · Tweaks panel

Three toggles are added or modified:

- **`mode`** *(new)* — paper / dark. Lets Jordan flip between the original paper palette and Direction B for side-by-side comparison through the build. Default: dark.
- **`palette`** *(carries from Brief 01, role adjusted)* — warm / cool. On dark mode: warm uses clay + sun + shell for the warm accents; cool substitutes a deeper amber and pulls back the shell. Most useful for stress-testing whether the warm accents feel right against `--ink`.
- **`header-stripe`** *(carries from Brief 01)* — on / off. Unchanged.

Existing toggles (`accent`, `display`, `namestyle`, `marginalia`, `colibri`) all remain.

---

## Part five · Indigenous Futurism layer

All carries forward from Brief 01 unchanged in concept, but several items read differently on the new ground:

**22. About survivance kicker.** See item 12. Pending Jordan.

**23. About Lineages section.** See item 13. Pending Jordan.

**24. Footer land acknowledgment + Taíno colophon.** Carried from Brief 01 item 15. Now reads more legibly against `--ink-deep` footer. Pending Jordan on Taíno word and gloss.

**25. CSS token material references.** Carried from Brief 01 item 16. Names already incorporated into the palette block at the top of this brief. No additional action.

**26. Work lead copy sharpening.** Carried from Brief 01 item 18.

> Suggested copy: *"Essays, talks, policy, ventures, teaching — one practice, not three buckets. In this lineage they answer to each other."*

---

## Suggested build order

1. **Tokens first.** Items 01, and the palette block at the top. Declare the room before furnishing it.
2. **Body and shell.** Items 02, 03, 04. The site reads correctly even before bands are applied.
3. **Type and kicker adjustments.** Items 17, 18, 20. Free wins; everything else looks better against them.
4. **Bands.** Items 05, 08, 11, 14. The big visual moves.
5. **Marginalia and image fixes.** Items 09, 19.
6. **Indigenous Futurism content layer.** Items 22, 23, 24, 26. Content changes; do last when the visual system is stable.
7. **Tweaks panel.** New `mode` toggle plus carries-forward.

---

## Open items requiring Jordan's input

Do not ship without his sign-off on these. Build as specified in the meantime; he will confirm wording and specifics, not concept.

- The survivance kicker copy on About (item 12). Suggested: `TAÍNO · PRESENT TENSE`.
- The list of names in the Lineages section (item 13).
- The Taíno colophon word and its gloss (item 24). Suggestions: *guakía* ("we / ours") or *bo'matúm* ("thank you"). His call entirely.
- The land acknowledgment phrasing (item 24).
- The Home epigraph itself — still the Deleuze placeholder.
- The rates-block numbers (item 14).
- Direction B's rates band: Option A (clay) versus Option B (lifted ink). Design ships A, Jordan votes.
- al colibrí default state — footnote versus surfaced (item 21).
- Work filter chips — remove (recommended) versus keep.

---

## Out of scope for this update

The "what not to do" list from Brief 01 carries forward in full. Re-stated here because Direction B's distinctiveness creates new temptations:

- No Taíno petroglyph or pictograph imagery anywhere on the site, including at low opacity, in corners, as section dividers, or in the wordmark.
- No pan-Indigenous visual vocabulary (dream-catchers, medicine wheels, feathers, "tribal" patterns).
- No imagery of Taíno artifacts or museum objects.
- No additional palette colors beyond those declared in Part one. Deep ink-blue plus warm cream plus four warm accents plus one green is the complete system. The discipline is the design.
- No additional fonts. Fraunces / Source Serif 4 / JetBrains Mono.
- No new pages. Five-page architecture.
- No motion beyond the home-epigraph fade-in. Bands appear; they do not animate in.
- No Storystream content additions to Work.
- **New for Direction B:** No "ocean" or "wave" visual metaphors anywhere on the site. The palette references the sea; nothing else should. No animated water, no wave dividers, no nautical iconography, no maps. The reference is in the color, full stop.
- **New for Direction B:** No starscape or constellation imagery. Same logic. Caribbean night is a color choice, not an illustration brief.

---

## A note on what this commits us to

Direction B is a more singular choice than the paper version. The site will look like nothing else in the AI ethics consultant space, and that is the point. A booker scanning fast will react to the palette before they read a word. Most will read it as confident and considered; some will read it as unusual for the category. Both reactions are intended.

The fallback is preserved through the `mode` toggle on the tweaks panel. If Jordan, after living with the dark version for a few days, prefers the paper version, flipping the toggle reverts cleanly without losing any structural work. Brief 01's section-band system is built into both modes; the palette is what differs.

Send a marked-up version of the prototype back when ready. The reviewer and I will look at it together before it goes to Jordan.

*— End of brief 02.*
