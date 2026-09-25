# TODO

Deferred work — things intentionally left undone, with enough context to pick
them up cold. Delete an entry once it ships.

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

## Projects page unlinked pending real photos/data

**Status:** in progress. Added 2026-09-14.

The supervisor asked to hide the Projects page for now because both entries in
`src/lib/projects.ts` still use placeholder photography and copy (see
"Project photography" above) and they don't want it shown publicly until real
job photos/data are gathered. The `/projects` route itself was deliberately
**not** removed or blocked (no redirect/`notFound()`), only every on-site link
to it - the page is small-traffic with no `sitemap.ts` in this project, so the
supervisor accepted the low risk of someone finding the bare URL directly.

**What was changed:**

1. `src/components/header.tsx` - removed the `{ href: "/projects", key:
   "projects" }` entry from `navItems` (this array drives both the desktop
   `<nav>` and the `MobileNav` items, so both were hidden by removing it here).
2. `src/components/footer/link-columns.tsx` - removed the same entry from
   `companyLinks`, leaving that footer column with only `about`.
3. `src/app/[locale]/page.tsx` - removed the `<FeaturedProjects />` section
   (and its now-unused import) from the homepage. The component itself,
   `src/components/featured-projects.tsx`, was left in place, just unused.

**What to do once real project photos/data are ready:**

1. Re-add `{ href: "/projects", key: "projects" }` to `navItems` in
   `src/components/header.tsx` (restore it before `quality` to match the
   original order).
2. Re-add the same entry to `companyLinks` in
   `src/components/footer/link-columns.tsx`.
3. Re-add the `FeaturedProjects` import and `<FeaturedProjects />` element to
   `src/app/[locale]/page.tsx` (it sat between `<FeaturedProducts />` and
   `<SocialLinks />`).
4. Resolve "Project photography" and "Thai copy review for the project
   showcase" above first (or alongside), since the whole point of hiding the
   page was to keep the placeholder photos/copy off the public site.

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

## Fiberglass septic tank: English copy

**Status:** not started. Added 2026-08-31 with the `fiberglass-septic-tank`
product (`src/lib/products.ts`, category `frp-wastewater-treatment-tank`),
updated 2026-08-31 when the three treatment-system `content` sections landed,
2026-09-01 when all three sizing tables became real `table` blocks and their
screenshots were deleted, and 2026-09-25 when the gallery photos were
converted to `.webp` (`sharp`, already present in `node_modules` as a
transitive dependency, handled this - no new package was needed).

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
