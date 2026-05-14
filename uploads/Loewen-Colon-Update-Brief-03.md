# Update Brief 03 — Portfolio expansion, new pages, content lists

**From** Senior creative web dev
**To** Design assistant (Claude Design handoff bundle)
**Status** Builds on Update Briefs 01 and 02. Direction B palette and section grounds are in place.
**Effort** ~12–16 hours; this is the largest brief in the series.
**Touches** `site.css`, `site.jsx`, `tweaks-panel.jsx`. Two new page components. One nav reorganization.

---

## What changed since Brief 02

Jordan has committed to portfolio-mode as the site's governing identity (vs. the original document-mode framing). Four content additions follow from that:

1. **Publications and talks expand on the Work page** as grouped, expandable sections.
2. **A new Press page** for podcast interviews, journalist appearances, and media coverage.
3. **A new Projects page** for technical AI / data-science work hosted on GitHub.
4. **Home gets a "Recently built" surface** for the projects punching above their weight.

The site grows from five pages to seven. The nav is reorganized to keep the header readable. Direction B's palette and band logic carry forward unchanged; the new pages inherit them.

> [!IMPORTANT]
> This brief includes full content lists (publications, talks, press, projects) from Jordan's uploaded materials. The content is ship-ready as written; the design assistant should incorporate it verbatim unless flagged otherwise.

---

## Part one · Navigation reorganization

### The problem

Seven top-nav items in the current header would overflow visually. The restrained sticky-header treatment from Brief 01 was specced for four to five items.

### The solution

Group the three output-shaped pages (Work, Press, Projects) under a single **Work** landing, with the sub-pages accessible via either a dropdown on hover or — preferred — visible secondary nav on each of the three pages.

**New nav structure:**

```
Home  ·  Work  ·  About  ·  Speaking  ·  Contact
                 ↓
         Work landing page
         shows three tiles:
         → Publications & talks
         → Press & media
         → Projects & code
```

**Implementation:** The top nav stays at five items. The Work page becomes a landing that introduces the body of work in a short lead paragraph, then offers three clear entry points to the sub-sections. Each sub-page has its own URL (`/work/publications`, `/work/press`, `/work/projects`) and a small secondary nav at the top of each that lets you move laterally between them without going back to the landing.

This is the "sub-pages with a real spine" architecture rather than the "everything in the top nav" architecture. It scales as Jordan publishes more.

> [!NOTE]
> **Alternative if Jordan prefers:** A six-item top nav with `Home · Work · Press · Projects · About · Speaking · Contact` (dropping one or accepting overflow on mobile). I'd push for the grouped version, but flag both options on the marked-up prototype.

---

## Part two · The new Work landing

The Work page changes from "a stream of mixed items" to "a landing that introduces three rooms." The original stream of essays, talks, panels, etc. moves to the **Publications & talks** sub-page (see Part three).

### Layout

- **Title band** on `--bohio` ground (forest green), 140px tall, page title in `--paper` Fraunces at 96px. Unchanged from Brief 02.
- **Kicker** in `--bohio`: `BODY OF WORK`
- **Lead paragraph** on `--ink`:

> *"Essays, talks, policy, ventures, teaching, code, press — one practice, not seven buckets. In this lineage they answer to each other. Three doorways below."*

(This replaces the Brief 01/02 lead. The "three doorways" phrasing names the navigation structure.)

- **Three tiles** below the lead, arranged as a 1-column stack on mobile, 3-column row on desktop. Each tile has:
  - A small Fraunces numeral (01, 02, 03) in the section's accent
  - A title in Fraunces
  - A one-sentence description in Source Serif 4
  - A "→ Enter" link in JetBrains Mono / Bricolage (whichever the type decision lands on)

**Tile copy:**

```
01.  Publications & talks
     Peer-reviewed essays, conference keynotes, invited panels. Twelve years of writing
     and speaking on AI ethics, Indigenous data justice, and the religious dimensions
     of technology.
     → Enter

02.  Press & media
     Podcast appearances, journalist interviews, op-eds. The work as it lands outside
     the academy.
     → Enter

03.  Projects & code
     Technical AI and data-science projects. Tools, datasets, and working models built
     in public.
     → Enter
```

Each tile's accent: 01 uses `--clay`, 02 uses `--sun`, 03 uses `--shell`. This gives the Work landing its own internal color rhythm.

---

## Part three · Publications & talks sub-page

### URL: `/work/publications` (or `/work/writing-and-talks`)

### Structure

The page is organized as **expandable groups** by content type. Each group shows the three most recent items by default, with a "**View all (N)**" toggle that expands the full list inline.

**Groups, in order:**

1. **Peer-reviewed publications**
2. **Book chapters**
3. **Public writing** (HBR, The Conversation, etc.)
4. **Selected talks**
5. **Policy work** (if Jordan adds policy items separately later; currently empty)

### Group header treatment

Each group header is a Fraunces title at 36px with a small mono count to the right (e.g., "Peer-reviewed publications — 9"). Below it, a hairline rule in the section's accent color, then the items.

### Item treatment

Each item is a single block with:

- **Year** in JetBrains Mono, left-aligned, in `--paper-mute`
- **Title** in Fraunces italic for essays/articles, Fraunces roman for books, in `--paper`
- **Venue** in Source Serif 4 italic, in `--paper-mute`
- **Co-authors** if any, in Source Serif 4, in `--paper-mute`
- **Status tag** if applicable (e.g., "in preparation," "forthcoming") as a small uppercase mono mark in `--clay`
- **Link** if available, as a chevron-arrow at the right edge of the item, in `--clay`

### Expand / collapse

Below each group, a centered button: "**View all 9 publications**" with a small down-chevron. On click, the hidden items reveal inline (no page reload, no modal). The button changes to "**Collapse**" with an up-chevron. Animation: a soft slide-down, 240ms.

### Full content — Peer-reviewed publications

```
2026   (In preparation) "AI and Personal Values: An Alignment Problem."
       AI and Ethics, Springer.
       — in preparation

2026   "Preventing AI Extractivism: The Case for Braiding Indigenous Data Justice
       with ABS for Stronger AI Data Governance."
       With M. Schulz. AI and Indigenous Studies, Springer Special Issue.
       → https://link.springer.com/article/10.1007/s00146-026-02931-z

2024   "Virtual Memory, Real Power: How Memes Resist Data Colonialism."
       With A. Smith. Convergence: The International Journal of Research into
       New Media Technologies.
       → https://journals.sagepub.com/doi/abs/10.1177/13548565241262421

2023   "The Age of (the Algorithmic) Aquarius: How AI Meets Our Esoteric Needs."
       With S. Mosurinjohn. Journal for the American Academy of Religion,
       Special Issue.
       → https://muse-jhu-edu.libezproxy2.syr.edu/pub/3/article/916429

2022   "Fabulation, Machine Agents, and Spiritually Authorizing Encounters."
       With S. Mosurinjohn. Religions, special issue.
       → https://www.mdpi.com/2077-1444/13/4/333

2021   "Revisiting Teaching and Games: mapping out ecosystems of learning."
       With B. Marklund and M. Saridaki. Gamevironments, University of Bremen.
       → https://journals.suub.uni-bremen.de/index.php/gamevironments/article/view/144

2019   "Death, Fabulation, and Virtual Reality Gaming."
       Gamevironments, No. 9, 202–221. University of Bremen.
       → https://media.suub.uni-bremen.de/handle/elib/3494

2015   "On Being Made Stupid: Developing a Religious Ethic of Anti-Propaganda."
       The Journal for the Fellowship at Auschwitz for the Study of
       Professional Ethics (FASPE).
       → https://www.academia.edu/10269683
```

Display order: most recent first. Default-show top 3, expand to see all 8.

### Full content — Book chapters

```
2025   "Virtual Reality and the Vulnerability of the Self: A Critical Analysis
       of Self-Hacking."
       With A. Amarasingam and S. Mosurinjohn. In Security of the Self,
       a SSHRC-funded project.
       → https://press.uottawa.ca/en/9780776645612/the-security-of-self/

2024   "'We Will Always Burn the Man': The Ecstatic Moment of Burning Man VR."
       With A. Amarasingam and S. Mosurinjohn. Bloomsbury Handbook of
       Ecstatic Religion. Bloomsbury Press.
       → https://www.bloomsbury.com/ca/bloomsbury-handbook-of-religious-ecstasy-9781350346994/
```

Default-show both (only 2 items).

### Full content — Public writing

```
2025   "Do LLMs Have Values?"
       Harvard Business Review.
       → https://hbr.org/2025/05/research-do-llms-have-values

2025   "AI tools promise efficiency at work, but they can erode trust,
       creativity and agency."
       The Conversation.
       → https://theconversation.com/ai-tools-promise-efficiency-at-work-264865
```

Default-show both (only 2 items).

### Full content — Selected talks

```
2026   "Artificial Opportunity: Universities are Doomed and the Humanities
       Can Save Them."
       Syracuse Humanities Tolley Professor Keynote. Syracuse, NY.

2026   "Data Res Nullius: The Doctrine of Discovery in the Age of AI."
       US Indigenous Data Sovereignty and Governance Summit. Tucson, AZ.

2025   "Decolonizing AI: Nesting Access Benefit Sharing and Indigenous
       Data Justice."
       Sustainable AI Conference. University of Bonn, Germany.

2025   "Working Across Sectors: Film, Gaming, and AI."
       The Latin Forum, Listo Calisto. Toronto.

2025   "Let's Explore the Alignment Problem — What Do AIs Value?"
       Techqueria. New York.

2025   "Data Leadership and Ethics Amidst Uncertainty: Navigating Governance,
       Innovation, and Responsibility."
       Big Data & Analytics Summit. Toronto.

2023   "Welcomed with Open Arms: A Data Justice Warning from Taíno History."
       The Religious Origins of White Supremacy: Doctrine of Christian Discovery
       conference. Syracuse University.

2023   "AI and Psychedelic Health Sciences: Designing a Data-Augmented
       Trip Report Generator."
       Practical Big Data Workshop. University of Michigan, Ann Arbor.

2022   "Decolonizing Design with New Media Art: The Doctrine of Discovery
       Podcast and VR Game."
       Indigenous Religious Traditions Unit, American Academy of Religion. Denver.

2022   "How, Why, Should We Digital Twin?: Experiencing AI in Healthcare."
       Center for Health and Innovation Symposium, Queen's University. Kingston.

2022   "'We Will Always Burn the Man': Taking the Ecstatic Moment of
       Burning Man into VR."
       American Academy of Religion. Denver.

2022   "Simulating Empathy with Spiritual AI."
       Society for Literature, Science and the Arts. Purdue University.

2021   "Robot Priests, Virtual Freuds, and Technodelics: A Theoretical Framework
       for Coupling AI and VR."
       Artificial Intelligence and Religion Seminar, American Academy of Religion.
       San Antonio.
```

Display order: most recent first. Default-show top 3, expand to see all 13. This is the largest group; the expand toggle matters most here.

---

## Part four · Press & media sub-page

### URL: `/work/press` (or `/work/media`)

### Structure

A single chronological list — no grouping needed; 7 items, all of the same general type. Each item is a media appearance with date, title, venue/show, and link.

### Title band

`--sun` ground (gold ochre), 140px tall, page title "**Press & media**" in `--paper` Fraunces. Kicker in `--sun`: `IN THE CONVERSATION`.

### Lead

> *"How the work travels. Podcasts, interviews, and media appearances where the arguments meet wider audiences."*

### Item treatment

Same as publications/talks but with one addition: each item gets a small **type tag** in JetBrains Mono uppercase (`PODCAST` / `INTERVIEW` / `FEATURE`) in `--sun`.

### Full content — Press & media

```
2025   PODCAST
       "What Does AI Value?"
       Pondering AI Podcast, hosted by Kimberly Nevala.
       → https://www.youtube.com/watch?v=ZajcadLF_8I

2025   FEATURE
       "The Culture Clash with AI Bots."
       Smith Business Insight, Queen's University.
       → https://smith.queensu.ca/insight/content/the-culture-clash-with-AI-bots.php

2025   FEATURE
       "Utah Partnered with a Nonprofit to Boost Its AI Governance."
       StateScoop.
       → https://statescoop.com/utah-aspen-institute-policy-academy-ai-governance/

2024   INTERVIEW
       "Data Ethics, Religion, and Gaming: Meet Jordan Loewen-Colón."
       Queen's University Graduate Research Spotlight.
       → https://www.queensu.ca/grad-postdoc/research/research-spotlights/data-ethics-religion-and-gaming-meet-jordan-loewen-colon

2024   INTERVIEW
       "Innovation in Motion: The AI Revolution — Transforming Health."
       Centre for Entrepreneurship, Innovation & Social Impact,
       Smith School of Business.
       → https://www.investkingston.ca/event/innovation-in-motion-the-ai-revolution-transforming-health/

2023   PODCAST
       The Responsible Use of AI Podcast.
       Queen's University Centre for Health Innovation.
       → https://open.spotify.com/show/5DIpaizqQEtr1GHpaaHmZz

2023   PROJECT
       The Digital Cancer Twin Project — Podcast and Digital Humanities Archive.
       Queen's University, Center for Health Innovation. Writer & producer.
       → https://www.queensu.ca/health-innovation/digital-cancer-twin-project/

2022   PODCAST
       "Realities (Altered & Virtual) | Discourse!"
       The Religious Studies Project. Guest scholar.
       → https://www.religiousstudiesproject.com/podcast/discourse-november-2022/
```

All 8 visible by default — list is short enough not to need expand/collapse.

---

## Part five · Projects & code sub-page

### URL: `/work/projects` (or `/work/code`)

This is the most distinctive of the three sub-pages and the one most worth designing with care. It's the page that converts Jordan from "ethics consultant" to "ethics consultant who ships."

### Title band

`--shell` ground (coral-pink), 140px tall, page title "**Projects & code**" in `--ink` Fraunces (note: dark text on coral for legibility — verify contrast). Kicker in `--shell`: `BUILT IN PUBLIC`.

> [!NOTE]
> **Contrast check required:** `--ink` on `--shell` may not clear AA. If it falls short, lift to `--ink-deep` or switch to `--paper` foreground. Test before shipping.

### Lead

> *"Working models, datasets, and tools. Most are in public; all are open to fork, critique, and conversation."*

### Item treatment

Different from publications/talks because these need more space. Each project gets:

- **A title** in Fraunces, 28px
- **A subtitle / project type** in Source Serif 4 italic, `--paper-mute`
- **A two-to-three-sentence description** in Source Serif 4 body size
- **Tags** (e.g., `NLP` / `Data Science` / `Education` / `Indigenous Data`) as small mono uppercase pills in `--shell` outline
- **A "View on GitHub →" link** in `--clay`
- **An optional screenshot or diagram** at 320px max-width, right-aligned on desktop, full-width on mobile

Each project is a card-like block separated by hairline rules.

### Full content — Projects

```
1) BookBack — Reclaim the Commons
   Public-domain reclamation project
   Tags: Indigenous Data · Data Justice · Provenance

   A project for restoring public-domain works to public access in the face of
   extractive scraping. Built around the principle that AI training data should
   honor provenance, not erase it.
   → https://github.com/jbloewencolon/BookBack

2) The Demographics of Faerûn — D&D Dataset for Data Science Education
   Educational dataset
   Tags: Data Science Education · Tabletop Gaming · Synthetic Data

   A dynamic fictional dataset built on the Forgotten Realms setting, designed
   to make data science pedagogy more engaging and immersive. Used in classroom
   contexts to teach analysis, visualization, and modeling.
   → https://github.com/jbloewencolon/Creating-Dataset-for-The-Demographics-of-Faerun/

3) Psychedelic Trip Report LLM
   Large-language-model research tool
   Tags: NLP · LLM · Health Research

   Built on 70,000 entries from the Erowid dataset, this tool uses large language
   models to assess subjective elements in psychedelic experiences. Designed with
   applications in synthetic drug discovery and qualitative health research.
   → https://github.com/jbloewencolon/Psychedelic-Trip-Report-Text-Generator

4) Video Game Review Analysis Tool
   Sentiment analysis & classification
   Tags: NLP · Sentiment Analysis · Gaming

   A sentiment-analysis tool trained on 30,000 Steam reviews for Hades by
   Supergiant Games. Combines unsupervised learning and multi-class
   classification to surface patterns in player feedback.
   → https://github.com/jbloewencolon/Steam-Game-Review-Sentiment-Analysis

5) Personality & Psychedelic Use Analysis
   Behavioral data analysis
   Tags: Statistics · Psychology · Drug Research

   An analysis of the correlation between the 'Openness to experience' personality
   factor and psychedelic drug use. Designed to aid researchers and companies in
   identifying participants for research studies.
   → https://github.com/jbloewencolon/Predicting-Personality-and-Psychedelic-Experience
```

Display order: BookBack first (most current and most aligned with the AI ethics / Indigenous data work that defines Jordan's public identity), then the rest in approximate recency / impact order. **Jordan should confirm or reorder.**

> [!NOTE]
> **Jordan's action:** Pin these five repositories on the GitHub profile so the "View profile →" link at the bottom of the page surfaces them as the curated view. Takes thirty seconds; meaningful payoff.

---

## Part six · Home page additions

The Home page gets two new elements to surface the deeper content. Both sit below the existing epigraph band and recent-work strip.

### "Recently built" block

A new section, sitting between the existing "Recent" work strip and the "Get in touch" closer. Treatment:

- Kicker in `--shell`: `RECENTLY BUILT`
- Section head in Fraunces: "**In public, in code**"
- Three project cards in a row (desktop) / stack (mobile):
  - BookBack
  - Psychedelic Trip Report LLM
  - The Demographics of Faerûn
- Each card: title in Fraunces 22px, one-line description in Source Serif 4, GitHub link in `--clay`
- Below the cards: "**View all projects →**" link to the Projects page

### "In the conversation" block

A second new section, below "Recently built." Surfaces 3 most recent press items:

- Kicker in `--sun`: `IN THE CONVERSATION`
- Section head in Fraunces: "**Where the work lands**"
- Three press items in vertical list (same item treatment as the Press sub-page)
- Below the list: "**View all press →**" link to the Press page

### Home page final structure (post-update)

1. Wordmark + subtitle
2. Epigraph on clay band (smaller — see Brief 02 amendment below)
3. "Recent" work strip (existing)
4. "Recently built" projects block (new)
5. "In the conversation" press block (new)
6. "Get in touch" closer (existing)

Home is now longer than originally specced, but it earns the length by surfacing the depth of the work without forcing visitors into sub-pages.

---

## Part seven · Brief 02 amendment: shrink the Home epigraph band

Per Jordan's direct note. The current Home epigraph band reads as a billboard; it should read as a considered moment.

### Changes to `.band-clay` and `.epigraph-on-ground`

```css
.band-clay {
  padding: 64px 0;              /* was 96–120px */
}

.epigraph-on-ground {
  font-size: clamp(24px, 3vw, 32px);   /* was 40–48px */
  max-width: 24em;              /* was 32em */
  /* Italic, --paper foreground, clay ground — unchanged */
}
```

The band becomes roughly 200–240px tall total instead of the previous ~360–400px. The epigraph reads as a pulled quote inside an article rather than a hero statement. The wordmark above it remains the loudest element on the page, which is correct.

---

## Part eight · Tweaks panel additions

Three new toggles, two amendments:

- **`work-architecture`** *(new)* — landing / flat
  Landing: the new three-tile sub-page structure (default).
  Flat: original Brief 02 single-stream architecture, preserved as a fallback if Jordan wants to revert.

- **`home-extras`** *(new)* — on / off
  Toggles the "Recently built" and "In the conversation" Home blocks (Part six). Useful for seeing the Home page in its lean vs. full state.

- **`nav-style`** *(new)* — grouped / flat
  Grouped: 5-item top nav with Work-as-landing (default).
  Flat: 7-item top nav with Press and Projects as siblings. Fallback if Jordan prefers visible top-nav exposure.

Existing toggles (`mode`, `palette`, `header-stripe`, `accent`, `display`, `namestyle`, `marginalia`, `colibri`) all remain.

---

## Suggested build order

1. **Nav reorganization** (Part one). The new structure has to be in place before sub-pages exist.
2. **Work landing page** (Part two). The three-tile entry point.
3. **Publications & talks sub-page** (Part three). The largest content payload.
4. **Press & media sub-page** (Part four).
5. **Projects & code sub-page** (Part five). The most design-distinct page; do last when the system is settled.
6. **Home additions** (Part six). The new blocks integrate cleanly once sub-pages exist to link to.
7. **Epigraph band shrink** (Part seven). One-line CSS change; do it any time.
8. **Tweaks panel** (Part eight). After everything else is stable.

---

## Open items for Jordan

- Confirm nav reorganization: grouped (recommended) vs. flat 7-item.
- Confirm project order on the Projects page — currently BookBack first, then descending by recency / impact.
- Pin the 5 listed repos on the GitHub profile (`https://github.com/jbloewencolon`) so the curated view surfaces them.
- Confirm the contrast check on the Projects title band (`--ink` on `--shell`) — design will switch to `--ink-deep` or `--paper` if needed.
- Confirm whether you'd like any of the talks marked as "selected" vs. shown as a complete list. Currently presented as "Selected talks (13)"; some scholars prefer "Full talks list" framing.
- The placeholder Home epigraph is still the Deleuze line. Indigenous Futurism opens the option of substituting a line from a Taíno or Caribbean Indigenous thinker. Your call.

---

## Old-site gallery — held for separate decision

Jordan's old site (`jordanbradyloewen.com#gallery`) was referenced in the previous conversation but not addressed here. Once Jordan sends the gallery contents (or links to specific images), I'll write a small amendment specifying where each image belongs — into Work item figures, into a thin "Field" surface on About, or into the artist site rather than this one. **Not blocking this brief.**

---

## Out of scope (still)

The "what not to do" list from Briefs 01 and 02 carries forward. Specific to this brief:

- No carousels. Considered and rejected — expandable groups and dedicated sub-pages serve Jordan better.
- No "Featured project" hero with a single huge project image. Projects are equally weighted on the Projects page.
- No GitHub activity heatmap, contribution graph, or commit count. The page is about the work, not the metrics.
- No automatic "Latest from Twitter / X / Mastodon / Bluesky" embeds. The site stays static.
- No newsletter signup. The proposal explicitly held this for Phase 2.

---

*— End of brief 03. Send marked-up prototype back when ready.*
