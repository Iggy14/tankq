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

**Status:** not started. Added 2026-08-29 with the project data.

Both entries in `src/lib/projects.ts` carry `images: []`. The field follows the
product convention - public paths, first entry is the cover - but no files
exist yet under `public/images/projects/`.

**Why it was skipped:** no photography was supplied with the copy.

**What to do:**

1. Add files at `public/images/projects/<slug>/<n>.webp`, matching the two
   slugs: `frp-horizontal-buffer-tank-15000l` and
   `fire-water-frp-tank-500000l-nfpa`.
2. Fill the `images` array on each entry, cover first.
3. Until then, any card or detail renderer must handle an empty array - do not
   assume `images[0]` exists.

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

**Status:** not started. Added 2026-08-29.

`src/app/[locale]/projects/page.tsx` renders only `Breadcrumbs`, an `h1` and
the placeholder `projects.subtitle`. The data now exists behind it.

**Why it was skipped:** the task asked for the data only, no UI.

**What to do:**

1. Build the card grid off `getAllProjects()`, reading copy as
   `project.title[locale]` and resolving the two labels through
   `getProjectTankTypeById()` / `getProjectApplicationById()`. See the
   "Project showcase" section of `docs/ARCHITECTURE.md`.
2. Replace the placeholder `projects.subtitle` in `messages/en.json` and
   `messages/th.json`, and add any new chrome keys (the "Problem" / "Solution"
   / "Result" labels are chrome, not content) to both files key-for-key.
3. Decide whether projects need detail pages. `Project.slug` exists for that,
   but no route consumes it yet - drop the field if the answer is no.
