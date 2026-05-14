# Typography Refinement Brief — The J, and the type system

**From** Senior creative web dev
**To** Design assistant + Jordan (for decision)
**Status** Supplementary to Update Brief 02. Decision required before final render.
**Effort** CSS changes only; 15 minutes to test all three J fixes.
**Touches** `site.css` (`.wordmark` rule only).

---

## The issue

The J in "Jordan" on the Home wordmark — currently rendered in Fraunces italic with `opsz=144, SOFT=100, WONK=1` — reads as overly decorative at its current size. The italic descender curves dramatically left and back under the following letters, and the WONK axis activates exaggerated alternates that make the letterform feel precious rather than confident. On a professional site for an AI ethics consultant, "precious" is not the goal.

The wordmark is the first letter every visitor reads. It deserves to land cleanly.

---

## Diagnosis: What's bothering us about the J?

Before implementing a fix, we need to isolate which aspect is the issue. The J's current appearance results from four compounding settings:

| Setting | Current | Effect |
|---------|---------|--------|
| Style | Italic | Long, sweeping descender; writerly feel |
| `WONK` axis | 1 (max) | Activates quirky alternates; most exaggerated J descender |
| `SOFT` axis | 100 (max) | Softens terminals; makes the J hook rounder and more ornate |
| `opsz` | 144 (display) | Maximizes contrast; makes the descender more dramatic at large sizes |

The problem is likely one of these, or a combination. The three fixes below target different diagnoses.

---

## Three fixes to test

### Fix 1: Turn off WONK (Smallest change — Easiest test)

**The hypothesis:** The exaggerated alternates activated by `WONK=1` are making the J too decorative. Removing them while keeping the soft, display-size aesthetics might be enough.

```css
.wordmark {
  font-variation-settings: "opsz" 144, "SOFT" 100, "WONK" 0;
}
```

**What changes:** The J descender stays long and italic but loses the extreme curl and the most ornate alternate forms. The letterforms across the wordmark become slightly crisper. The overall effect is less "poetry chapbook" and more "literary journal."

**What stays:** Italic posture, soft terminals, display-size contrast. The wordmark remains Fraunces-y; it just dials back one axis.

**Likelihood this works:** High. Most feedback about Fraunces mentions the WONK axis specifically as the "feels precious" element.

**Recommendation:** Test this first. It's a one-number change and gives you the biggest clue about which axis is the issue.

---

### Fix 2: Pull SOFT down, keep WONK off (Medium change)

**The hypothesis:** The descender is not just exaggerated but *soft*. The rounded terminals and the flowing curve might read as too ornate. Tightening the letterforms while removing WONK would make the J feel more chiseled and confident.

```css
.wordmark {
  font-variation-settings: "opsz" 144, "SOFT" 30, "WONK" 0;
}
```

**What changes:** Letterforms become noticeably crisper. Terminals sharpen. The J descender remains italic but becomes more angular and less flowing. The effect is closer to editorial typography (think *The New York Times Magazine* or *Bloomberg Businessweek*).

**What stays:** Italic posture, display-size contrast. Fraunces's character remains; the ornament is removed.

**When to use this:** If Fix 1 works but you want to go further — more architectural, less flowing.

**Recommendation:** Second test. Move here if Fix 1 still feels "decorative."

---

### Fix 3: Switch to roman — Remove italic entirely (Largest change)

**The hypothesis:** The italic itself is the issue. The italic posture gives the J its distinctive long, sweeping descender. Going roman removes this entirely and normalizes the letterform.

```css
.wordmark {
  font-style: normal;        /* was: italic */
  font-variation-settings: "opsz" 144, "SOFT" 60, "WONK" 0;
}
```

**What changes:** The J becomes upright with a much shorter, simpler descender — closer to how J behaves in conventional typography. The wordmark feels more grounded and less expressive. All letters gain an upright, straightforward posture.

**What stays:** Fraunces as the display face. Optical-size contrast. The warm, humanist character of the font.

**Trade-off:** Italic Fraunces is one of the more distinctive typographic choices in the current web-design landscape. Going roman makes the wordmark slightly more conventional. But "conventional" and "confident" often read the same way on a professional site.

**When to use this:** If Fixes 1 and 2 still don't satisfy. Or, if you decide that the italic wordmark competes with other elements (the Caribbean-night palette, the epigraph band, the clay section grounds) and you want the type to be quieter.

**Recommendation:** Third test. Only move here if the first two fixes don't resolve it.

---

## Testing order

1. **Fix 1.** Turn off WONK only. Load the site. Read the wordmark. Does it feel better? If yes, you have your answer. If no, proceed.
2. **Fix 2.** Pull SOFT down to 30, keep WONK off. Does this feel better? If yes, ship it. If no, proceed.
3. **Fix 3.** Go roman. Does the upright J feel right? If yes, ship it. If no, we have a different conversation (see below).

All three can be tested in under 5 minutes because they're CSS-only changes.

---

## If none of the three fixes work

If you test all three and the J *still* bothers you, the issue is likely with Fraunces's J *specifically* — the letterform itself, not the axes. This points to a font swap rather than a parameter adjustment.

**Alternative display faces with different J letterforms:**

| Font | J style | Notes |
|------|---------|-------|
| **GT Sectra** (Klim, paid) | Quiet, conventional | High-contrast serif, editorial aesthetic; the J is upright and serious. ~$400–800 license. |
| **Newsreader** (Google Fonts, free) | Rounded, friendly | Contemporary serif with softer terminals; the J is readable and warm but not ornate. |
| **Reckless** (Pangrampangram, paid) | Sharp, architectural | Geometric serif with clean lines; the J is decisive and modern. ~$200–400 license. |
| **Cormorant** (Google Fonts, free) | Display-ornate | If you *want* decorative, but Cormorant's J is more classical than Fraunces's; it reads as intentional. |

I would not recommend swapping the display face without testing all three Fraunces fixes first. Changing from Fraunces cascades into page titles, talk titles, epigraph blocks, topic numbers — basically every display moment on the site. The current Fraunces system works well for those uses. The J issue might be solvable within the system.

---

## The broader type-system question

Separate from the J issue, there's a question about whether Source Serif 4 and JetBrains Mono are doing their jobs in the rest of the system. From the previous conversation, four pairing options were on the table:

1. **Instrument Serif + Satoshi** — Trend-forward, editorial. (Not recommended; too fashion-magazine.)
2. **DM Serif Display + Manrope** — Academic workmanlike. (Not recommended; too forgettable.)
3. **Clash Grotesk + Geist** — AI-startup aesthetic. (Strong skip; wrong category signal.)
4. **Bricolage Grotesque + Aeonik** — Quirky-professional. (Closest to brief; but loses the body serif.)

**Current system:** Fraunces (display) + Source Serif 4 (body) + JetBrains Mono (UI/metadata).

**Three recommended alternatives, in order of preference:**

### Option A: Keep Fraunces, add Bricolage Grotesque for UI layer

Bring in Bricolage Grotesque (free) to replace JetBrains Mono in kickers, section heads, nav, and tweaks-panel UI. Keeps Source Serif 4 for body text (critical for long-form reading). Gives the site more humanist character without sacrificing serif comfort.

**Fonts:** Fraunces (display) + Source Serif 4 (body) + Bricolage Grotesque (UI)
**Cost:** Free
**Effort:** Medium (CSS role reassignment)
**Best for:** Adding visible quirk to the UI layer while keeping the body serif.

### Option B: Keep Fraunces, swap Source Serif 4 for GT Sectra (or similar)

If the entire serif body feels too quiet, replace it with a serif that has more character. GT Sectra (Klim, ~$300–800) has the same editorial vibe as Instrument Serif but with more substance. Paired with Fraunces, it reads as genuinely editorial rather than trendy.

**Fonts:** Fraunces (display) + GT Sectra (body) + JetBrains Mono (UI)
**Cost:** ~$400–800 type license
**Effort:** Low (font swap)
**Best for:** Pushing toward "thoughtful editorial publication" vibe rather than "professional consultant."

### Option C: Keep current system, tune Fraunces harder

Use Fraunces's axes (WONK, SOFT, opsz) more aggressively on select elements — page titles, talk-topic titles, the rates numbers — to inject more visible character without adding new fonts. Works in tandem with the J fixes above.

**Fonts:** Current system (Fraunces + Source Serif 4 + JetBrains Mono)
**Cost:** Free
**Effort:** Trivial (CSS axis changes)
**Best for:** Adding personality on a budget; works best if you fix the J and want more of that feeling elsewhere.

---

## Recommendation summary

**For the J:** Test Fixes 1 → 2 → 3 in that order. Stop when you're satisfied. Probably Fix 1 is enough.

**For the broader type system:** Option A (add Bricolage for UI) is the lowest-cost way to increase humanist character across the whole site. Option B (swap the body serif) is the move if you want to push toward editorial aesthetic. Option C (tune Fraunces harder) is the free option if you want personality without new fonts.

None of these is urgent. The J fix is the immediate decision. The type-system question can be decided after you live with the J fix for a day.

---

## What the design assistant needs to do

**Immediate:** Implement Fix 1 (turn off WONK) in site.css:

```css
.wordmark {
  font-family: "Fraunces";
  font-size: clamp(96px, 14vw, 180px);
  font-style: italic;
  font-variation-settings: "opsz" 144, "SOFT" 100, "WONK" 0;  /* Changed: WONK from 1 to 0 */
}
```

Push the prototype back with this change. Jordan marks it up. If he's satisfied, done. If not, repeat with Fix 2, then Fix 3.

**After J decision:** If broader type-system changes are wanted, those are a separate brief. Flag them on the tweaks panel as new toggles (e.g., `ui-font: jetbrains / bricolage`, `body-font: source-serif / gt-sectra`), so Jordan can toggle between options before committing.

---

## Open items for Jordan

- Which J fix feels right? Test 1 → 2 → 3 and let us know when one lands.
- After the J is fixed: do you want to explore broader type-system changes (Options A, B, C), or does the current system with the J refinement feel complete?
- If you want to go further: which direction appeals to you? Adding Bricolage to the UI (Option A), pushing toward editorial with a new body serif (Option B), or staying with the current fonts but tuning them harder (Option C)?

---

*— End of typography refinement brief.*
