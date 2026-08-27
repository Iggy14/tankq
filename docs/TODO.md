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
