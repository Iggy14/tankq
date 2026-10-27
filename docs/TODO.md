# TODO

Deferred work — things intentionally left undone, with enough context to pick
them up cold. Delete an entry once it ships.

## Headless WordPress: put it on the VPS

**Status:** code written, not deployed. Added 2026-10-27.

The boss wants to edit products, projects and services without a developer. The
site now reads that content from a headless WordPress when `WP_API_URL` is set
(see "Content source" in `docs/ARCHITECTURE.md`) and from `src/lib` otherwise.
Everything was built and tested against a LocalWP site on a laptop. Nothing runs
on the real server yet, so production still serves the built-in data.

Verified locally: build and lint pass in both modes; with the built-in data all
30 prerendered pages match the pre-change build; with WordPress on, every page
matches except `og:image` / `twitter:image` / image URLs, which now point at the
WordPress host; an edit saved in WordPress shows on the live page after
`POST /api/revalidate`. **Not exercised:** the plugin's own webhook call
(`tq_notify_site` in `wordpress/tankq-cms/tankq-cms.php`), because the
`TANKQ_REVALIDATE_*` constants were not set in the local `wp-config.php`. Test it
in step 8 below. Note that ACF's REST API rejects a partial update that omits a
required field, so a test script must send `title_th`, `title_en`,
`description_th`, `description_en` and `category` together.

**Why it was skipped:** the server side needs the hosting provider or someone
with DirectAdmin access alongside, and the deploy host details were not at hand.

**What to do** (the live host is a DirectAdmin VPS at 43.249.35.28, panel on
port 2222; the Next.js site is deployed by uploading files in File Manager and
running commands in Warp):

1. Find which DirectAdmin user hosts `tankq-solution.com` and where its DNS is
   managed. Check PHP is 8.1 or newer (PHP Configuration) and that MySQL
   Management exists. DirectAdmin here has no WordPress installer.
2. Create the subdomain `cms.tankq-solution.com` (Domain Setup > Subdomain
   Management), add its DNS A record pointing at 43.249.35.28, and issue a
   Let's Encrypt certificate for it.
3. Create a MySQL database and user in MySQL Management. Download WordPress from
   wordpress.org, upload the zip to the subdomain's `public_html` in File
   Manager, extract, and run the web installer.
4. Install and activate the free "Advanced Custom Fields" plugin, then copy
   `wordpress/tankq-cms/` into `wp-content/plugins/` and activate it. Under
   Settings > Permalinks choose "Post name". Tick "Discourage search engines".
5. In `wp-config.php` add:
   `define('TANKQ_REVALIDATE_URL', 'https://www.tankq-solution.com/api/revalidate');`,
   `define('TANKQ_REVALIDATE_SECRET', '<long random string>');` and
   `define('TANKQ_SITE_URL', 'https://www.tankq-solution.com');`.
6. Create an Application Password for an admin user, put `WP_API_URL`
   (`https://cms.tankq-solution.com`), `WP_USER` and `WP_APP_PASSWORD` in
   `.env.local`, and run `npx tsx scripts/migrate-to-wp.ts --dry-run`, then
   without `--dry-run`. It is safe to re-run.
7. On the server set `WP_API_URL` and `REVALIDATE_SECRET` (same value as
   `TANKQ_REVALIDATE_SECRET`) in the environment the site runs in, then deploy
   as usual (upload, build, restart). If the build runs on the server it needs
   `WP_API_URL` at build time too.
8. Test: edit a product title in WordPress, save, and confirm the live page
   changes within seconds. Stop WordPress briefly and confirm the live site
   still serves pages.
9. Create an Editor account for the boss. Turn on DirectAdmin backups for the
   WordPress MySQL database and its `wp-content/uploads` folder, and note that
   WordPress core and plugins need regular updates.
10. Remove the built-in arrays from `src/lib` only if the boss no longer wants a
    code fallback; until then they double as the migration source and the
    no-CMS mode.

## Product detail sections are still edited in code

**Status:** deliberate gap. Added 2026-10-27.

With WordPress on, the boss can edit product names, descriptions, categories,
cover and extra pictures, the at-a-glance facts, order and "featured", plus
projects and services. The long detail sections (size tables, lists, numbered
write-ups, the per-variant galleries on merged pages) and the jump-link rows
(`Product.sectionLinks`, `galleryInSections`) still live in
`src/lib/product-section-data.ts` and `src/lib/products.ts`, because editing
them in WordPress needs repeater / flexible content fields, which are the paid
ACF Pro plugin (about US$50 a year). A product created only in WordPress has no
sections.

**What to do** if the boss wants to edit them too: buy ACF Pro, add a flexible
content field to the product field group in `wordpress/tankq-cms/tankq-cms.php`
with one layout per `ProductSection` type (`src/lib/product-sections.ts`), map
it in `src/lib/wp/catalogue.ts`, and make `getProductSections` prefer the
WordPress sections when a product has any (keep the code data as the fallback).
Move `fiberglass-septic-tank` and `water-wastewater-treatment-system` last: their
`content` sections nest lists and tables. Then update "Content source" in
`docs/ARCHITECTURE.md`.

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
5. Add `"/projects"` to `staticPaths` in `src/app/sitemap.ts`. It was left
   out on purpose so search engines are not pointed at the hidden page.

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

## Delete the original JPG/PNG files after the webp conversion

**Status:** not started. Added 2026-09-25.

Large images under `public/` were converted to `.webp` and every reference in
`src/` now points at the webp. The original JPG/PNG files were left in place
because the bulk delete was blocked in the session that did the conversion.
They are no longer referenced, so they only add about 18 MB to the repo.

**What to do:**

1. From the repo root, delete these (each has a `.webp` next to it, except the
   two renames below): `public/about/{mission,story}.jpg`,
   `public/contactus/contactus-logo.jpg`, `public/hero/tankq-hero-{1,2,3}.jpg`,
   `public/home/wastewater-treatment-plant.jpg`,
   `public/images/products/epoxy-flooring/{5..12}.jpg`,
   `public/images/products/pe-above-ground-water-tank-granite/13.png`,
   `public/images/products/polyurethane-concrete-flooring/{1..6}.png`,
   `public/images/products/wastewater-treatment-system/2.jpg`,
   `public/quality/production-process.png`, `public/service/s{1..6}.jpg`.
2. Two originals were renamed because a different image already held the
   `.webp` name: `pe-underground-water-tank/1.jpg` is now `4.webp` and
   `pe-waste-water-treatment-tank/2.jpg` is now `3.webp`. Delete those two
   `.jpg` files as well.
3. Run `npm run build` and open a few product pages to confirm no image 404s.

## Analytics and Search Console

**Status:** not started. Added 2026-09-25.

There is no analytics and no Search Console verification. Skipped because it
needs an ID or verification token from the site owner.

**What to do:**

1. Register `https://www.tankq-solution.com` in Google Search Console, submit
   `/sitemap.xml`, and use the HTML tag method: put the token in
   `verification.google` in `generateMetadata` in
   `src/app/[locale]/layout.tsx`.
2. If wanted, add GA4 with `@next/third-parties` (`GoogleAnalytics` in the
   layout, ID from an env var). Check first whether a cookie/PDPA notice is
   needed.

## Redirects for the retired `?category=` ids

**Status:** not started. Added 2026-10-20.

The old product slugs are redirected in `next.config.ts`, but the old category
ids in `/products?category=<id>` are not: `frp-vertical-water-tank`,
`frp-horizontal-water-tank`, `septic-tank-grease-trap`, `epoxy-pu-flooring` and
`water-solution` now fall back to the unfiltered listing.

**Why it was skipped:** a stale filter link only lands on the full listing, so
it is low value.

**What to do:** map the old ids to their new categories in
`parseActiveCategory` (`src/lib/product-category-url.ts`).

## Check the underground PE tank "Usage" copy

**Status:** needs a decision. Added 2026-10-20.

Under the PE Water Tank page, "TU Series PE Underground Water Tank: Usage"
reads "Suitable for wastewater treatment" (`peUndergroundSections` in
`src/lib/product-section-data.ts`). That was copied unchanged from the old
standalone page, but it looks wrong for a water storage tank. Confirm the
intended wording with the content owner and fix both locales.
