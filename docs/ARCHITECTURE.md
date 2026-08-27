# Architecture

How this site is put together, and the patterns to follow when extending it.

**Scope.** Structural decisions and extension points only — the "add X by doing
Y" recipes. Coding style and workflow rules live in `CLAUDE.md`; deferred work
lives in `docs/TODO.md`.

**Keep it current.** This file grows a little at a time. When you introduce a
pattern another session will need to follow — a new content type, a new data
shape, a new registry — add a short section for it here in the same task. Do not
document one-off components or anything already obvious from the code.

---

## Stack

Next.js App Router (React Server Components), TypeScript, Tailwind CSS v4,
shadcn/ui (`base-nova` style) on Base UI, next-intl for routing and UI copy,
Motion for entrance animations.

Every page is prerendered. The catalogue is static TypeScript data, so
`/[locale]/products/[slug]` supplies `generateStaticParams` and the whole site
builds to static HTML — keep new content sources build-time unless there is a
reason not to.

---

## Two kinds of text, two homes

This split is the single most load-bearing convention in the codebase.

| Kind | Example | Lives in | Read as |
| --- | --- | --- | --- |
| Static UI chrome | nav labels, buttons, section headings owned by the page | `messages/th.json`, `messages/en.json` | `useTranslations()` / `getTranslations()` |
| Content data | product titles, descriptions, spec-table headers | the data file itself, both locales inline | `value[locale]` |

Content carries its locales inline via the `Localized` type:

```ts
// src/lib/localized.ts
export type Localized<T = string> = Record<AppLocale, T>;
```

`AppLocale` is `"th" | "en"` (`src/i18n/routing.ts`). Narrow an incoming route
param with `toAppLocale()` (`src/i18n/locale.ts`) before indexing localized
data — it returns an `AppLocale` without a cast.

Rule of thumb: if a marketing person would edit it per product, it is content.
If it is the same on every page of that kind, it is chrome.

---

## Product catalogue

`src/lib/products.ts` holds the `Product[]` and the accessors
(`getProductBySlug`, `getFeaturedProducts`, `getAllProducts`,
`getRelatedProducts`). Pages import the accessors, never the array directly, so
the storage can change later without touching page code.

A `Product` carries identity, copy, images, listing flags — and an optional list
of detail-page content blocks:

```ts
sections?: ProductSection[];
```

---

## Product detail sections

**The problem.** Products need different things on their detail page. One wants
a size table, the next a datasheet download, another a chart. A bespoke page
component per product duplicates layout and drifts visually.

**The pattern.** Each product declares an ordered list of typed blocks; a single
renderer maps each block's `type` to a component.

```
src/lib/product-sections.ts          the ProductSection discriminated union
src/components/product-sections/
  index.tsx                          the type -> component switch
  spec-table-section.tsx             one renderer per union member
```

Everything above the sections — title, description, CTA, gallery — is shared by
every product and is fixed in
`src/app/[locale]/products/[slug]/page.tsx`. Sections render between the gallery
and the related-products strip.

The switch in `index.tsx` is exhaustive over the union, so adding a member
without a branch is a **compile error**, not a silently blank page.

### Adding a section type

1. Add an interface to `src/lib/product-sections.ts` and to the `ProductSection`
   union. Every piece of visible text on it is `Localized` — section data is
   content, not chrome.
2. Add `src/components/product-sections/<name>-section.tsx`. Take
   `{ section, locale, headingId }`, render a `<section aria-labelledby={headingId}>`
   with an `<h2 id={headingId}>` carrying `section.title[locale]`.
3. Add the `case` to the switch in `index.tsx`.
4. Add the data to the relevant product in `src/lib/products.ts`.

Keep renderers server components unless they need state or an event handler —
only then add `"use client"`. Reach for a shadcn primitive before hand-rolling
(`npx shadcn@latest add <name>`).

### Current members

| `type` | Renders | Used by |
| --- | --- | --- |
| `specTable` | A size/spec table: navy header row, zebra body, first cell of each row is a `<th scope="row">`, figures right-aligned with `tabular-nums`, scrolls sideways on narrow screens | `frp-vertical-water-tank` |

### If a product truly needs a one-off layout

Do not add a per-slug page component. Add a section type for it, even if only
one product ever uses it — the page stays one component and the block still
composes with the others in whatever order the data says.

---

## Page composition

- `src/components/ui/section.tsx` — a full-bleed band that owns the ground
  (`light` / `navy`) and vertical rhythm only. Inner width stays the page's job:
  wrap contents in `mx-auto w-full max-w-6xl`.
- `FadeInUp` / `FadeInUpGroup` (`src/components/fade-in-up.tsx`) — scroll-in
  reveals. Nest `FadeInUp` inside a `FadeInUpGroup` to cascade; the group takes
  the layout classes (grid, flex, gap) and the children inherit its trigger.
- Colour comes from the tokens in `src/app/globals.css` — `--navy`, `--brand`,
  `--teal`, `--primary` and friends. Use the Tailwind classes they generate
  (`bg-navy`, `text-teal-foreground`); never spell out a hex or oklch in a
  component.
