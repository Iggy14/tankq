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

## LINE social link placeholder

**Status:** not started. Added 2026-08-27 alongside the home page social icons.

`src/components/social-links.tsx` renders three circular social icons (LINE,
Facebook, Instagram) between the home page's featured products and the
footer. Facebook and Instagram link to the real profiles; LINE links to `"#"`.

**Why it was skipped:** the user gave real URLs for Facebook and Instagram but
said the LINE link should be a placeholder — there is no official LINE
account/OA link yet.

**What to do:** once a TankQ LINE Official Account (or add-friend URL) exists,
update the `href` for the `"line"` entry in the `SOCIAL_LINKS` array in
`src/components/social-links.tsx`.

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
