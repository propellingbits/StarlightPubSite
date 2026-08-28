# Starlight site — changes to land in the design source

Applied to the published site after the Aug 14 export. Filenames below are the
**designer export's** names. `Starlight Landing.dc.html` is published as `index.html`,
so any cross-page link to it should point at `index.html`.

**§2 (anonymisation) is the priority** — those changes exist for legal reasons,
not taste, and re-exporting without them reintroduces real-world references.

---

## 1. Copy changes

### `Starlight Landing.dc.html`

**Hero sub-paragraph — final phrase**

- Before: `Your producers stay where they belong: <em …>Growing.</em>`
- After: `Your producers stay where they belong: <em …>Growing the book.</em>`

Why: bare "Growing." leaves the reader to ask *growing what?* "The book" is the
producer's own term for what they grow, and it is already site vocabulary —
"your book" appears in BrokerOS, Contact and Trust. It also lands on its own
line, so it reads as a closing beat rather than a trailing clause.

**Fill-engine panel — title bar**

- Before: `ML EXTRACTION — MOTOR CARRIER APPLICATION`
- After: `LAUXIER TRANSPORT INC. — MOTOR CARRIER APPLICATION`

Why: "ML" is engineering vocabulary that means nothing to a broker, and this is
a *simulated product screen* — buyers read screen chrome as what the product
calls itself. Every other label in the panel already answers "what's here" or
"what's happening" (`SOURCE DOCUMENTS · SCANNED 34/34`, `MOTOR CARRIER
APPLICATION · FIELDS 142/142`, `READING PAGES… → MAPPING FIELDS… → DONE`).
The title bar was the only one naming a technique. Using the client name matches
the sibling panel in the hero, which is titled `NORTHGATE INSURANCE ·
UNDERWRITER PACKET` — i.e. **who · what**.

Note: the section kicker directly above already reads `THE FILL ENGINE`, so the
title bar should not repeat it.

**Demo length**

- Before: `A 25-minute demo on one of your real submissions …`
- After: `A 20-minute demo on one of your real submissions …`

Why: three different durations were quoted across the site. See §5.

### `BookDemo.dc.html`

**Intro paragraph**

- Before: `Twenty minutes. Bring your messiest file — we'll show you what the AI does with it, live. Your calendar loads automatically, right here.`
- After: `Thirty minutes — about twenty on your file, the rest for your questions. Bring your messiest one and we'll show you what the AI does with it, live. Your calendar loads automatically, right here.`

**Panel labels**

- `BOOK A 20-MIN WALKTHROUGH` → `BOOK A 30-MIN WALKTHROUGH`
- `PICK A TIME · 20 MIN · CAL.COM` → `PICK A TIME · 30 MIN · CAL.COM`

**"your calendar" → "the calendar"** — two places:

- Intro paragraph: `Your calendar loads automatically, right here.` → `The calendar loads automatically, right here.`
- Panel front face: `Loading your calendar — or jump in now.` → `Loading the calendar — or jump in now.`

Why: everywhere else on that page "your" means the reader's own thing — *your
agency*, *your file*, *your questions*, *your messiest one*. But this calendar is
**Starlight's availability**, not the prospect's calendar, so the possessive was
doing the wrong work inside a paragraph that otherwise uses it precisely.

Why: the Cal.com event is a **30-minute** booking, so the site was promising 20
and delivering 30 — visible simultaneously, since our label sits directly above
Cal's own "30 min meeting" heading in the embed. Naming the split (20 on the
file, 10 for questions) turns the larger number into an advantage: it tells a
skeptical broker most of the slot is their file being worked, not a pitch.

### `Careers.dc.html`

- Before: `Pre-launch, post-guessing.`
- After: `Pre-stardom, post-launch.`

Why: the product has launched, so the original was no longer true. The
replacement keeps the original's parallel construction.

### `Contact.dc.html`

- Before: `For quick questions, not demos. Mon–Fri, 8am–7pm ET.`
- After: `For quick questions, not demos. Mon–Fri, 10am–4pm CT.`

Note this is the **public phone window**, not staffed hours — the team works
longer, it just isn't taking calls all day. So the neighbouring promises ("We
reply the same business day", "Answers in hours, not days") still hold.

**Office location — `AUSTIN, TX` → `CHICAGO, IL`**, in three places:

- the office row on the page itself
- `<meta name="description">` — `Montréal and Austin` → `Montréal and Chicago`
- `<meta property="og:description">` — same

This also resolves a pre-existing mismatch: the published phone number is
**+1 (312)**, a Chicago area code, and the Cal.com booking timezone is
`America/Chicago`. Number, timezone and office now all agree — Austin was the
odd one out. Note the meta tags carry the city too, so a page-only edit leaves
search results and link previews advertising the wrong office.

---

## 2. Anonymisation — please carry these upstream

The demo data contained values that could resolve to **real companies**. These
were replaced. Re-exporting without them puts the originals back.

| Was | Now | Why |
|---|---|---|
| `Laurier Transport Inc.` | `Lauxier Transport Inc.` | avoided resembling a real corporation |
| `2841177 · MC-884120` | `8251177 · MC-996120` | MC and USDOT numbers are public FMCSA identifiers; a plausible one maps to a real carrier |
| `9404-3384 QUÉBEC INC.` | `LAUXIER TRANSPORT INC.` | see note below |
| `435 rue Norman, Lachine` | `2400 rue Bellevue, Lachine` | invented street; borough kept so it still reads like a real Montreal trucking yard |

**On the Québec Inc. line:** the numbered-company format (`NNNN-NNNN Québec
Inc.`) is how Quebec actually names numbered corporations, so *any* digit
combination could resolve to a registered entity — there is no safe number.
The format was dropped entirely rather than swapping digits. Side effect: the
BrokerOS panel now shows the same client as the fill demo. If those were meant
to be two distinct agencies showing variety, invent a second fictional name
rather than restoring a numbered company.

**Casing matters when renaming.** The client name appears in three registers,
and a blind find-replace breaks two of them:

- `LAUXIER TRANSPORT` — all-caps mono labels (phone headers, `FILED TO …`, panel title)
- `Lauxier Transport Inc.` — title case, in the `FIELDS` / `FILL_FIELDS` data arrays
- `Lauxier's` — sentence case, inside SMS and call transcript copy

**Note `Northgate Insurance` was deliberately left alone** — it stands in for a
carrier, not a client, so it carries none of the same concern.

Affected files: `Starlight Landing.dc.html` and `BrokerOS.dc.html`. The values
appear in both markup and the JS data arrays (`FIELDS`, `FILL_FIELDS`, `LINES`,
and the SMS array), so they need changing in both places.

---

## 3. Behaviour added (not in the export)

### Mobile navigation — **all pages**

The export hides the nav below 1000px (`.bw-navlinks { display: none !important; }`)
with nothing in its place, so phones get no navigation at all beyond the logo
and footer.

Added:
- A `☰` button beside the theme toggle, visible below 1000px, toggling to `✕`
- A stacked drop-down panel with all 7 nav links, **Sign in**, and a **Book a demo**
  primary button
- Current-page highlighting carries into the panel
- ~52px tap targets; panel scrolls on short viewports
- Closes on any link tap — required for the landing page's in-page anchors
  (`#how`, `#migration`, `#fill`), which don't reload and would otherwise leave
  the panel open over the section just jumped to
- `aria-label` (Open/Close menu) and `aria-expanded` on the button; panel is a
  labelled `<nav>` landmark

### Phone strip — **all pages**

Below 620px the header's `.bw-phone-label` hides, collapsing the number to a
bare icon. Added a tappable `tel:` strip directly under the announcement bar
reading `TALK TO US  +1 (312) 200-1992`, shown **only** below 620px so it hands
off cleanly with the header label and never appears twice.

### SMS link — `Contact.dc.html`

The export defines `smsHref: 'sms:' + phone` (line 220) but no element uses it,
while the card label reads `CALL, TEXT SALES` — so the page advertised texting
with no way to text. Added a `TEXT US →` pill beside the number, using the
existing `smsHref`. Calling stays visually primary (large serif number); texting
is the secondary pill.

### Accessibility — nav

- Theme toggle had no accessible name (announced as "sun"/"moon") → `aria-label`
- Phone link's only text is hidden below 620px, so it announced as nothing →
  `aria-label="Call Starlight at …"`

---

## 4. Missing from every page in the export

**No `<title>`, meta description, or Open Graph tags** on any of the 13 files.

Consequences: search results show an untitled page, and links shared to
LinkedIn/Slack/iMessage render no preview card. These must live in the **static
`<head>`**, not in `<helmet>` — social scrapers don't run JavaScript, so
helmet-injected tags are invisible to exactly the thing they're for.

Titles and descriptions are in place on the published site; worth mirroring
upstream so they survive the next export. The landing page uses
`Starlight — AI Broker Management for Commercial Lines`.

---

## 5. Inconsistencies found in the export (fix at source)

- **Demo length quoted three ways** — `Starlight Landing` said "25-minute",
  `BrokerOS` says "Twenty minutes", `BookDemo` said "Twenty minutes"/"20 MIN",
  and the actual Cal.com booking is 30. Now standardised: **30-minute slot,
  20-minute demo**. `BrokerOS`'s "Twenty minutes, one live file" is consistent
  and unchanged.
- **DOT number differed between two panels on the same page** — the hero
  `FIELDS` array and the fill-engine `FILL_FIELDS` array quoted different
  numbers for the same carrier. Now both `8251177`.
- **`BrokerOS.dc.html` uses a parallel `bo-*` class namespace** (`.bo-navlinks`,
  `.bo-g3`, `.bo-h2`, `@keyframes boFadeUp` …) duplicating the site's `bw-*`
  system — 43 references. Two rules genuinely differ rather than just being
  renamed: `.bo-g3` collapses to 1 column at 860px (vs 2 for `.bw-g3`), and
  `.bo-h2` is 32px at 620px (vs 34px). Worth confirming those two are intentional.
- **`BookDemo.dc.html` doesn't load IBM Plex Mono.** Its Google Fonts link
  requests only Instrument Serif and Instrument Sans, while the page uses
  `font-family: 'IBM Plex Mono'` in five places — `BOOK A DEMO`, `BOOK A 30-MIN
  WALKTHROUGH`, the loading line, `PICK A TIME · 30 MIN · CAL.COM`, and the
  `↩ BACK` button. Those fall back to the system monospace, so this page's mono
  labels render differently from every other page. It is the only one of the 13
  files missing the family; the other 12 request all three. Fixed on the
  published site by adding `&family=IBM+Plex+Mono:wght@400;500;600` to the link.
- **About and Careers footers omit the `SOLUTIONS` column** (4 links) that the
  other 8 pages carry.
- **About and Careers navs use different link sets** from the other 10 pages —
  they swap the landing-page anchors for their own About/Careers entries.
- **Design tokens had forked into 5 variants** across pages. Values were
  identical wherever they overlapped, so no page changed appearance, but they
  should ideally be emitted from one source.

---

## 6. Editorial rules we settled on

Useful when writing new copy:

**Mechanism words** (ML, extraction, model, pipeline) may appear **mid-sentence
doing explanatory work** — "every extracted value carries a confidence score"
earns it, because it tells a broker why they can trust the number. They should
**never** be a heading, chip, button, or screen label, where they name the
machinery instead of the outcome.

Note "extraction" on its own is ordinary business English and is fine — the
problem was specifically **"ML"** as an acronym.

**"AI" is a category claim, not decoration.** `AI BROKER MANAGEMENT · COMMERCIAL
LINES` in the hero kicker is correct and stays — it says this is not another AMS,
which is the differentiation. What to avoid is generic filler like "Your AI team
works the file", which claims nothing specific. The working structure above the
fold: **category in the kicker → outcome in the headline (no AI) → mechanism in
the sub** ("Starlight's AI agents text and call your clients"). Named once,
then proven.

---

## 7. Not for the design source

The published site also restructured the shared nav, footer, theme tokens and
contact data into separate reusable files. That's delivery-side plumbing for the
static host — **please keep exporting flat pages as you do now.** It doesn't need
to be reflected upstream and shouldn't change how the design files are authored.

### Published filenames

Pages are renamed on publish: the `.dc` suffix is dropped and spaces become
hyphens. Casing is preserved.

| Design source | Published as |
|---|---|
| `Starlight Landing.dc.html` | `index.html` |
| `About.dc.html` | `About.html` |
| `Blog.dc.html` | `Blog.html` |
| `Blog - The Paperwork Tax.dc.html` | `Blog-The-Paperwork-Tax.html` |
| `BookDemo.dc.html` | `BookDemo.html` |
| `BrokerOS.dc.html` | `BrokerOS.html` |
| `Careers.dc.html` | `Careers.html` |
| `Contact.dc.html` | `Contact.html` |
| `Pricing.dc.html` | `Pricing.html` |
| `Privacy.dc.html` | `Privacy.html` |
| `Terms.dc.html` | `Terms.html` |
| `Trust.dc.html` | `Trust.html` |

**No action needed** — keep authoring and cross-linking with `.dc.html` names so
previews keep working. Internal `href`s are rewritten during publish.

Two things that do matter on your side:

- **Tell us when you add or rename a page.** New files need to be added to the
  rename map and the nav/footer link lists, which live outside the export.
- **Cross-page links are rewritten by exact filename match**, so a link written
  as `contact.dc.html` when the file is `Contact.dc.html` will be missed. The
  published host is case-sensitive (Linux) even though Windows isn't, so a
  casing slip that looks fine locally becomes a 404 in production.

`Colorful Section Explorations.dc.html` is unlinked and was left untouched.

---

## 8. Outside the files — Cal.com account

- The booking event is still named **"30 min meeting"**, Cal's stock default.
  That string renders as the largest heading inside the embed, so it's the last
  thing a prospect reads before committing. Rename to e.g. **"Starlight Demo"**.
- If the intent was ever a 20-minute slot rather than 30, change it in Cal and
  the four site strings in §1 flip back.
