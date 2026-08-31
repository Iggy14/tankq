# TODO

Deferred work — things intentionally left undone, with enough context to pick
them up cold. Delete an entry once it ships.

## Breadcrumb structured data (JSON-LD)

**Status:** not started. Added 2026-08-27 alongside the breadcrumb work.

Every page except the homepage renders a visible trail via
`src/components/breadcrumbs.tsx`. Google will not read that markup as a
breadcrumb for search results — it wants a `BreadcrumbList` JSON-LD block. Once
added, results show `tankq.co.th › Products › FRP Vertical Water Tank` instead
of a bare URL.

**Why it was skipped:** JSON-LD requires absolute URLs (`https://…/en/products`),
and the site has no canonical domain configured yet — `metadataBase` is not set
in `src/app/[locale]/layout.tsx`, and there is no `NEXT_PUBLIC_SITE_URL`.
Emitting relative URLs would produce invalid structured data, which is worse
than none.

**What to do:**

1. Decide the production domain and set `metadataBase: new URL(siteUrl)` in the
   locale layout's `generateMetadata`. Read the URL from an env var so preview
   deploys are not stamped with the production host.
2. Extend `Breadcrumbs` to also emit a
   `<script type="application/ld+json">` with a `BreadcrumbList`: one
   `ListItem` per crumb, `position` starting at 1, `name` = the crumb label,
   `item` = the absolute URL. The Home crumb is position 1 and its `item` is
   the locale root (`/th` or `/en`).
3. The component already receives everything it needs except the href of the
   final crumb — the current page carries no `href` today. Either pass one in
   for the JSON-LD only, or derive it from the request pathname.
4. Validate with Google's Rich Results Test before considering it done.

**Related:** `metadataBase` also fixes the currently-relative Open Graph and
canonical URLs, so it is worth doing as one change rather than two.

## Contact page body

**Status:** not started. Added 2026-08-28.

`src/app/[locale]/contact/page.tsx` currently renders only `Breadcrumbs` and
the new `ContactHero` banner (`src/components/contact-hero.tsx`). The
reference (`references/contact-us.jpg`) also has a body below the banner: a
map, an address/company card, and (implied by `contact.subtitle` in the
messages files, still a placeholder) a contact form.

**Why it was skipped:** the task asked only for the top hero section.

**What to do:**

1. Add a section (`tone="light"`, `max-w-6xl`, matching the rest of the site's
   page composition — see `docs/ARCHITECTURE.md`) below `<ContactHero />` with
   the company address/phone/email (already in `messages/*.json` under
   `footer.companyAddress`, `footer.contactLine`, `footer.contactEmail` — reuse
   or move into a `contact.*` key if this page's copy diverges) and, if wanted,
   an embedded map.
2. Replace the placeholder `contact.subtitle` copy in `messages/en.json` /
   `messages/th.json` once real body content is decided, or remove the key if
   it ends up unused.

## Project photography

**Status:** not started. Added 2026-08-29 with the project data, updated
2026-08-30.

Neither entry in `src/lib/projects.ts` has real photography. Both now carry a
stand-in cover borrowed from the "why TankQ" stock set -
`images: ["/why/delivery.jpg"]` on `frp-horizontal-buffer-tank-15000l` and
`images: ["/why/engineered.jpg"]` on `fire-water-frp-tank-500000l-nfpa` - so
that the homepage cards and the case studies have something to show. Nothing
exists under `public/images/projects/`.

**Why it was skipped:** no photography was supplied with the copy.

**What to do:**

1. Add files at `public/images/projects/<slug>/<n>.webp`, matching the two
   slugs: `frp-horizontal-buffer-tank-15000l` and
   `fire-water-frp-tank-500000l-nfpa`.
2. Replace the `/why/*.jpg` path on each entry's `images` array with the real
   ones, cover first. That is the only edit needed - both
   `src/components/project-card.tsx` and
   `src/components/project-case-studies.tsx` already read `project.images[0]`.
3. A renderer must still handle an empty array - a newly added job may arrive
   with no photo, so do not assume `images[0]` exists.

## Thai copy review for the project showcase

**Status:** not started. Added 2026-08-29 with the project data.

The English side of `src/lib/projects.ts` and `src/lib/project-tags.ts` is the
customer's own copy. The Thai side was written by Claude and has not been read
by a native speaker.

**Why it was skipped:** only English copy was supplied, and the data shape
requires both locales inline.

**What to do:**

1. Review every `th` string in `src/lib/projects.ts` (titles, `industry`,
   `province`, and the problem/solution/result lines) and in
   `src/lib/project-tags.ts`.
2. Settle the `frp-factory` label in particular. Its English source was
   "FRP factory", which is ambiguous next to the other label
   ("Horizontal FRP Tank") - it may have been meant as a tank type, a job type,
   or a photo caption. The Thai currently reads "งานโรงงานไฟเบอร์กลาส".
   Renaming the id means updating `tankTypeId` on the entry that uses it.

## Projects page UI

**Status:** in progress. Added 2026-08-29, updated 2026-08-30.

`src/app/[locale]/projects/page.tsx` now has a hero (title, subtitle, rule),
`ProjectStats`, a "Featured Project Case Studies" heading, and
`ProjectCaseStudies` (`src/components/project-case-studies.tsx`) - both
entries in `src/lib/projects.ts` (`frp-horizontal-buffer-tank-15000l`,
`fire-water-frp-tank-500000l-nfpa`) as a photo/copy block each, image
alternating left/right. The `projects.subtitle` placeholder is gone and the
"Problem" / "Solution" / "Result" chrome keys exist in both message files.

**Why the rest was skipped:** the page shows every project as a photo/copy
case study. That reads well at two entries and is now driven off
`getAllProjects()`, but it is not a listing - revisit the format once there
are enough jobs that one full-width block each stops scaling.

**What to do:**

1. Decide whether projects need detail pages. `Project.slug` exists for that,
   but no route consumes it yet - drop the field if the answer is no. Until
   one exists, `src/components/project-card.tsx` is deliberately not a link;
   wrap it in a `Link` to `/projects/<slug>` and restore `ProductCard`'s hover
   affordance once there is somewhere to go.
2. The homepage's `FeaturedProjects`
   (`src/components/featured-projects.tsx`) shows every project carrying
   `featured: true` - both of them today, so its grid is two-up
   (`sm:grid-cols-2` inside `max-w-4xl`). Once a third job is flagged, add
   `lg:grid-cols-3` and drop the `max-w-4xl` so it matches the three-across
   featured products row above it.

## Service page photography

**Status:** not started. Added 2026-08-30 with the service page sections.

All six entries in `src/lib/services.ts` carry `image: null`, so every row on
`/service` renders the placeholder box from
`src/components/service-sections/service-image.tsx` instead of a photo.

**Why it was skipped:** no service photography was supplied. `public/service/`
does already hold `s1.jpg` - `s6.jpg`, but they are generic finished-tank shots
(site installation, warehouse, transport, a tank farm) and none of them depict
inspection, repair, lining, accessory replacement, survey or PM work, so wiring
them in would caption a transport photo as "FRP Tank Inspection". They are
referenced nowhere in `src/`.

**What to do:**

1. Add a photo per service under `public/service/`, named for its entry id
   (`inspection`, `repair`, `lining`, `accessories`, `survey`, `pm-contract`).
   Landscape crops - the box is 4:3, and `object-cover` will cut a portrait
   shot hard. The two portrait files already there (`s3.jpg`, `s4.jpg`) are the
   reason to check this.
2. Set `image` on that entry in `src/lib/services.ts` and review its
   `imageAlt`, which currently describes the intended photo rather than a real
   one.
3. Decide what to do with `s1.jpg` - `s6.jpg`. If they are not going to be
   used anywhere, delete them - they are 4.5 MB of unreferenced assets.

## Fiberglass septic tank: photo format, table images and English copy

**Status:** not started. Added 2026-08-31 with the `fiberglass-septic-tank`
product (`src/lib/products.ts`, category `frp-wastewater-treatment-tank`),
updated 2026-08-31 when the three treatment-system `content` sections landed.

Three separate things are outstanding on this one product.

### 1. Gallery photos are unconverted JPEGs

The three photos in the product's `images` array
(`public/images/products/fiberglass-septic-tank/1.jpg` - `3.jpg`) are unedited
phone/camera JPEGs, renamed and moved into place as-is. Every other product's
`images` array points at optimized `.webp` files. The six treatment-system
diagrams added later are already `.webp` and are not affected.

**Why it was skipped:** no image-conversion tooling is available in this
session, and re-encoding was out of scope for adding the product entry.

**What to do:** convert the three files to `.webp` (matching the sizing and
quality other product photos use) and update the three paths in the
`fiberglass-septic-tank` entry in `src/lib/products.ts`.

### 2. Three sizing tables ship as pictures, not as `specTable` data

`treatment-systems/2.webp`, `4.webp` and `6.webp` are screenshots of tables -
the WSF, WSFA and WAS model ranges, each roughly 10 to 14 rows by 9 to 11
columns, listing flow rate, tank dimensions, pipe sizes and maximum occupancy.
They render as images inside the `content` sections, so the figures are not
selectable, not searchable, not readable by a screen reader beyond the `alt`
summary, and are hard to read on a phone: a 1024px-wide table scaled into a
360px column leaves the digits tiny.

**Why it was skipped:** the source brief (`tasks/add_contents.md`) placed them
in the flow as images, and `ContentBlock` has no table member, so honouring the
brief meant shipping them as pictures. Transcribing them is a content decision
and a few hundred bilingual cells of data entry.

**What to do:**

1. Transcribe each table into a `specTable` section - see `ProductSection` in
   `src/lib/product-sections.ts` and any existing `specTable` for the shape.
   `pe-waste-water-treatment-tank` has a close analogue already.
2. Drop the matching image block from the `content` section and add the
   `specTable` section after it, so the diagram stays in the flow and the
   figures become real markup.
3. Delete the three `.webp` files once nothing references them.

Alternatively add a `table` member to `ContentBlock` so a table can sit inside
the flow rather than becoming its own section. Only worth doing if more
products need tables mid-article.

### 3. English copy on this product is Claude-written

The Thai side of the three treatment-system sections is the customer's own copy
from `tasks/add_contents.md`; the English side was translated by Claude and has
not been read by a native or technical reviewer. The product `description` has
the reverse problem - its English is the customer's and the Thai is Claude's.

**What to do:** review both locales on the `fiberglass-septic-tank` entry. The
process terms are worth checking against the shop's own wording in particular:
"septic chamber" for ส่วนเกรอะ, "anaerobic / aerobic filter", "microbial flocs"
for ตะกอนจุลชีพ, and "clarifier" for ถังแยกตะกอน. Also confirm the closing
paragraph is meant to read "Thai Chemical Storage (TCS)" on a TankQ-branded
site - it is the only place on the site that names TCS, and it was supplied
that way in the brief.

## Thai copy review for the service page

**Status:** not started. Added 2026-08-30 with the service page sections.

The English side of `src/lib/services.ts` is the customer's own copy from
`tasks/service_page.md`. The Thai side was written by Claude and has not been
read by a native speaker.

**Why it was skipped:** the source brief was English apart from two bullets in
the lining section (`ถังเหล็ก`, `ถังคอนกรีต`), which were split across the two
locales as written.

**What to do:**

1. Review every `th` string in `src/lib/services.ts` - the six titles,
   descriptions, point lists and `imageAlt` values.
2. Check the technical terms in particular: "ทดสอบความแข็ง Barcol",
   "ตุ่มพอง" for blisters, and "เคลือบ Vinyl Ester / Isophthalic" - these are
   trade terms and the shop may have its own wording.
