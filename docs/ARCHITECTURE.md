# Architecture

How this site is put together, and the patterns to follow when extending it.

**Scope.** Structure and extension points only. The stack and its versions live
in `docs/TECH-STACKS.md`; coding and workflow rules in `CLAUDE.md`; deferred
work in `docs/TODO.md`.

**Keep it current.** When you introduce a pattern another session must follow -
a new content type, data shape, or registry - add a short section here in the
same task. Do not document one-off components or anything obvious from the code.

---

## What this is

A bilingual (Thai / English) marketing and catalogue site for TankQ, an FRP
tank manufacturer. Seven top-level pages plus a product detail page. No
database, no API routes, no auth, and no form that posts anywhere yet. All
content is static TypeScript data and JSON message files, so the whole site
prerenders at build time.

## Request path

```
request  ->  src/proxy.ts                 next-intl middleware: detect locale,
                                          redirect /about -> /th/about
         ->  src/app/[locale]/layout.tsx  guard locale, setRequestLocale,
                                          fonts, Header + Footer
         ->  src/app/[locale]/**/page.tsx
```

`src/proxy.ts` is what other Next.js versions call `middleware.ts`; Next 16
renamed the file. It skips any path with a file extension so `public/` assets
are not locale-prefixed, because a `matcher` regex containing `\.` fails to
compile in this version.

`src/i18n/request.ts` loads `messages/<locale>.json` per request. Every page
calls `setRequestLocale(locale)` first, which is what keeps the route
statically renderable.

## Routing and rendering

```
src/app/
  globals.css                      Tailwind entry + design tokens
  [locale]/
    layout.tsx                     html/body, fonts, Header, Footer,
                                   NextIntlClientProvider
    page.tsx                       home
    about|projects|quality|service|blog|contact/page.tsx
    products/page.tsx              catalogue listing
    products/[slug]/page.tsx       detail page
```

- Locales come from `generateStaticParams` in the layout (`th`, `en`), product
  slugs from `generateStaticParams` in `products/[slug]/page.tsx`. Every route
  is prerendered. Keep new content sources build-time unless there is a reason
  not to.
- Pages are async server components typed with the generated
  `PageProps<"/...">` / `LayoutProps<"/...">` helpers. `params` is a Promise and
  must be awaited.
- Each page exports `generateMetadata` reading `<namespace>.metaTitle` and
  `metaDescription`; the layout supplies the `%s | TankQ` title template.
- Server components are the default. `"use client"` only for state, event
  handlers, or Motion: `fade-in-up`, `nav-link`, `language-switcher`,
  `mobile-nav`, `product-gallery`, the slideshows, plus `ui/dropdown-menu` and
  `ui/table`.

## Two kinds of text, two homes

The single most load-bearing convention in the codebase.

| Kind | Example | Lives in | Read as |
| --- | --- | --- | --- |
| Static UI chrome | nav labels, buttons, headings owned by the page | `messages/th.json`, `messages/en.json` | `useTranslations()` / `getTranslations()` |
| Content data | product titles, descriptions, spec-table cells | the data file itself, both locales inline | `value[locale]` |

Content carries both locales inline via `Localized` (`src/lib/localized.ts`):

```ts
export type Localized<T = string> = Record<AppLocale, T>;
```

`AppLocale` is `"th" | "en"` (`src/i18n/routing.ts`). Narrow a route param with
`toAppLocale()` (`src/i18n/locale.ts`) before indexing localized data; it
returns an `AppLocale` without a cast.

Rule of thumb: if a marketing person would edit it per product, it is content.
If it is the same on every page of that kind, it is chrome.

Message files are namespaced per page (`nav`, `common`, `home`, `products`,
`about`, ..., `footer`) and shallow inside. A repeated UI block keeps its list
in code and its copy under a key prefix: `stats-strip.tsx` holds
`[{ key: "experience", Icon: Trophy }, ...]` and reads
`home.stats.experienceValue`. `th.json` and `en.json` must stay key-for-key
identical.

Navigate with `Link` / `useRouter` / `usePathname` from `@/i18n/navigation`,
never from `next/navigation` directly: those wrappers add and strip the locale
prefix.

## Product catalogue

`src/lib/products.ts` holds the `Product[]` and the accessors
(`getProductBySlug`, `getFeaturedProducts`, `getAllProducts`,
`getRelatedProducts`). Pages import the accessors, never the array, so the
storage can change later without touching page code.

A `Product` carries `id`, `slug`, localized `title` and `description`, `images`
(public paths, first is the cover), `featured`, `order`, and optionally
`sections?: ProductSection[]`. Images live at
`public/images/products/<slug>/<n>.webp`.

## Product detail sections

**Problem.** Products need different things on their detail page: one wants a
size table, the next a datasheet, another a chart. A bespoke page per product
duplicates layout and drifts visually.

**Pattern.** Each product declares an ordered list of typed blocks; one
renderer maps each block's `type` to a component.

```
src/lib/product-sections.ts        the ProductSection discriminated union
src/components/product-sections/
  index.tsx                        the type -> component switch
  spec-table-section.tsx           one renderer per union member
  check-list-section.tsx
  paragraph-section.tsx
  image-grid-section.tsx
```

Everything above the sections - title, description, CTA, gallery - is shared by
every product and fixed in `products/[slug]/page.tsx`. Sections render between
the gallery and the related-products strip. The switch in `index.tsx` is
exhaustive over the union, so adding a member without a branch is a compile
error, not a silently blank page.

### Adding a section type

1. Add an interface to `src/lib/product-sections.ts` and to the
   `ProductSection` union. Every visible string is `Localized`; section data is
   content, not chrome.
2. Add `src/components/product-sections/<name>-section.tsx`. Take
   `{ section, locale, headingId }` and render
   `<section aria-labelledby={headingId}>` with an `<h2 id={headingId}>`
   carrying `section.title[locale]`.
3. Add the `case` to the switch in `index.tsx`.
4. Add the data to the relevant product in `src/lib/products.ts`.

Keep renderers server components unless they need state. Reach for a shadcn
primitive before hand-rolling one.

### Current members

| `type` | Renders |
| --- | --- |
| `specTable` | Size/spec table: navy header row, zebra body, first cell of each row is a `<th scope="row">`, figures right-aligned with `tabular-nums`, scrolls sideways when narrow |
| `checkList` | Short selling points, each beside a lucide `Check` in a tinted teal disc; two columns from `sm` up |
| `paragraph` | A heading over one centred paragraph, capped at a readable measure |
| `imageGrid` | Pictures three across on desktop down to one on a phone, filling square tiles (`object-cover`). Localized `alt` required |

Only `frp-vertical-water-tank` carries sections today.

### If a product needs a one-off layout

Do not add a per-slug page component. Add a section type for it even if only
one product ever uses it: the page stays one component and the block still
composes with the others in whatever order the data says.

## Components

```
src/components/
  ui/               shadcn primitives: breadcrumb, button, card, dropdown-menu,
                    section, table
  product-sections/ the section registry above
  *.tsx             page-level blocks: header, footer, hero, why-tankq,
                    our-story, stats-strip, ...
```

Page-level blocks are self-contained: each reads its own copy through
`useTranslations`, so a page composes them with no props. Split anything that
grows past one job.

- `ui/section.tsx` is a full-bleed band owning only the ground (`light` /
  `navy`) and the vertical rhythm. Inner width stays the page's job: wrap the
  contents in `mx-auto w-full max-w-6xl`.
- Two page widths are in use. `max-w-6xl` is the default for a text page;
  `max-w-[88rem]` is the wide track used by the hero, the stats strip, the
  footer and both product pages. A wide page must also pass `wide` to
  `<Breadcrumbs>`, or the trail sits indented from the heading below it.
- `FadeInUp` / `FadeInUpGroup` (`src/components/fade-in-up.tsx`) are the
  scroll-in reveals. Nest `FadeInUp` inside a `FadeInUpGroup` to cascade: the
  group takes the layout classes (grid, flex, gap) and the children inherit its
  trigger and stagger. Both respect `prefers-reduced-motion`.
  They fire on a viewport inset, not on a fraction of the element: a
  fractional `amount` is unreachable for anything taller than a few
  screens, which strands tall grids at `opacity: 0`. Leave `amount` alone
  unless the element is known to be short. The hidden start state is
  server-rendered, so the locale layout carries a `<noscript>` rule that
  clears `[data-fade-in-up]` for browsers that never run the script.

## Styling and tokens

Tailwind v4 is configured entirely in `src/app/globals.css`; there is no
`tailwind.config`. That file imports Tailwind, `tw-animate-css` and
`shadcn/tailwind.css`, maps CSS variables to Tailwind colours in
`@theme inline`, then defines the palette on `:root` plus a `.dark` block that
nothing toggles yet.

Beyond the standard shadcn tokens the theme adds `--brand` (logo cyan),
`--navy` / `--navy-foreground` (structural bands: header, footer, dark
sections) and `--teal` / `--teal-foreground` (icons, hover accents). Use the
Tailwind classes they generate (`bg-navy`, `text-teal-foreground`); never spell
out a hex or oklch value in a component.

Fonts load through `next/font/google` in the locale layout: Anuphan (variable,
Thai + Latin) as `--font-sans` and `--font-heading`, Geist Mono as
`--font-mono`.

## Static assets

`public/` holds `brand/`, `hero/`, `about/`, `why/`, `footer/`,
`images/products/<slug>/` and `images/socials/`. Use `next/image` with explicit
`width` and `height`; pass `priority` only for above-the-fold art.

## Conventions worth knowing

- `@/*` maps to `src/*` (`tsconfig.json`), and TypeScript runs in `strict` mode.
- shadcn is configured by `components.json`: style `base-nova`, RSC on, base
  colour neutral, lucide icons, `ui` alias `@/components/ui`. Add primitives
  with `npx shadcn@latest add <name>` rather than writing them by hand.
- `base-nova` sits on Base UI, so a `Button` rendered as a link takes
  `nativeButton={false} role="link" render={<Link href="..." />}`.
- No test setup exists yet. Verification is `npm run build` and `npm run lint`.
- This Next.js version has breaking changes against older docs. Read
  `node_modules/next/dist/docs/` before writing framework-level code, as
  `AGENTS.md` instructs.
