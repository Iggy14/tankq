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
  `mobile-nav`, `products-nav-menu`, `product-gallery`, `product-catalogue`,
  the slideshows, plus `ui/dropdown-menu` and `ui/table`.

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
in code and its copy under a key prefix: `hero/stats-strip.tsx` holds
`[{ key: "experience", Icon: Trophy }, ...]` and reads
`home.stats.experienceValue`. `th.json` and `en.json` must stay key-for-key
identical.

Navigate with `Link` / `useRouter` / `usePathname` from `@/i18n/navigation`,
never from `next/navigation` directly: those wrappers add and strip the locale
prefix.

## Product catalogue

`src/lib/products.ts` holds the `Product[]` and the accessors
(`getProductBySlug`, `getFeaturedProducts`, `getAllProducts`,
`getRelatedProducts`, `getProductsByCategory`). Pages import the accessors,
never the array, so the storage can change later without touching page code.

A `Product` carries `id`, `slug`, localized `title` and `description`, `images`
(public paths, first is the cover), `featured`, `order`, and optionally
`specs?: ProductSpec[]` and `sections?: ProductSection[]`. Images live at
`public/images/products/<slug>/<n>.webp`.

### Specs

`src/lib/product-specs.ts` holds `ProductSpec` - the at-a-glance facts shown as
one row under the description on a detail page, above the CTA buttons. A spec is
a localized `label` of a couple of words (material, use, brand) plus an optional
`icon`.

`icon` is an id, not a component: the ids are frozen into `ProductSpecIconId`
and the lucide icon each resolves to lives in `SPEC_ICONS` in
`src/components/product-specs.tsx`. Same split as the category pills - the lib
file stays pure content, and a new id without a row in the registry fails to
compile. A spec with no `icon` renders a bullet dot instead, so a fact with no
sensible icon still fits the row.

### Categories

`src/lib/product-categories.ts` holds the top-level grouping every product
belongs to: an `id`, a localized `title`, and an `order`. The array is declared
`as const satisfies readonly ProductCategory[]`, so its ids collapse into the
`ProductCategoryId` union that types `Product.categoryId` - a product naming a
category that does not exist fails to compile. Read a category name as
`category.title[locale]`, same as any other content.

Adding a category means adding a row there; adding a product means picking one
of those ids. Group with `getProductsByCategory(id)`, list with
`getAllProductCategories()`, resolve one with `getProductCategoryById(id)`. The
accessors return `ProductCategoryEntry`, not the wider `ProductCategory`, so
`category.id` stays the literal union at the call site.

The pill icons are a second registry - `CATEGORY_ICONS` in
`product-catalogue/category-filter.tsx`, a
`Record<ProductCategoryId, LucideIcon>` - so a new category needs a row in the
data file *and* an icon there, or it fails to compile. Categories with no
products still get a pill; selecting one shows `products.emptyCategory`.

### The `?category=` filter

`src/lib/product-category-url.ts` is the contract: the `CATEGORY_PARAM` key, the
`ActiveCategory` type (`ProductCategoryId | "all"`), `parseActiveCategory()`
(anything unrecognised falls back to "all") and `productsHref()`. Three places
read it - the listing pills, the header dropdown and the mobile menu - so it
sits in `src/lib` rather than inside any one of them. `productsHref("all")`
returns a bare string on purpose: next-intl serializes a `query` object
unconditionally, so an empty one would leave a trailing "?" behind.

The selection lives in the URL rather than component state, because the header
links into a category from any page. That shapes `product-catalogue/`:

```
index.tsx           reads useSearchParams, picks the active category
catalogue-view.tsx  the pills + grid for a given `active` - pure props
category-filter.tsx the pill row; pills are Links, not buttons
```

`useSearchParams` suspends during a prerender, and in this Next version a
static page that calls it outside a `<Suspense>` **fails the build**. The page
wraps it and passes the unfiltered view as the fallback:

```tsx
<Suspense fallback={<CatalogueView products={allProducts} active="all" />}>
  <ProductCatalogue products={allProducts} />
</Suspense>
```

That is why `catalogue-view.tsx` is split out and re-exported from `index.tsx` -
the fallback is what lands in the build-time HTML, so it has to be the real grid
rather than a skeleton, and no page reaches past the folder boundary to get it.
Keep it that way: moving the `useSearchParams` call up into the page, or reading
the server `searchParams` prop, turns `/products` from SSG into a dynamic route.

The header's Products item is `src/components/products-nav-menu.tsx`, built on
`ui/navigation-menu` (Base UI opens it on hover with no extra props). Its
trigger is `render={<Link href="/products" />} nativeButton={false}`, so the
item is still a real link to the unfiltered page. It does not read
`useSearchParams` to highlight the current category - the header is on every
page, and that would force a Suspense boundary onto all of them. `MobileNav`
carries the same categories as indented `children` under its Products item,
since hover does not exist on a phone.

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

## Project showcase

`src/lib/projects.ts` holds the `Project[]` and the accessors
(`getAllProjects`, `getProjectBySlug`, `getFeaturedProjects`). A project is a
delivered job told as a short case study: `industry`, `province`, `year`, a
localized `title`, and the `problem` / `solution` / `result` triad that a card
renders together. It also carries `slug`, `images`, `featured` and `order`,
same as a product. `images` is empty on every entry today - there is no project
photography yet, so a renderer must cope with a job that has no cover.

The two labels on a card are ids, not free text. `src/lib/project-tags.ts`
holds two registries - `projectTankTypes` (the kind of tank or job) and
`projectApplications` (what the tank is used for) - each declared
`as const satisfies readonly ProjectTag[]`, so their ids collapse into the
`ProjectTankTypeId` and `ProjectApplicationId` unions that type
`Project.tankTypeId` and `Project.applicationId`. A new label needs a row in
that file before a project can name it, or it fails to compile. List with
`getAllProjectTankTypes()` / `getAllProjectApplications()`, resolve one for
display with `getProjectTankTypeById(id)` / `getProjectApplicationById(id)` and
read it as `tag.title[locale]`.

`/projects` is still the placeholder page; the data above exists ahead of the
UI. See `docs/TODO.md`.

## Components

```
src/components/
  ui/               shadcn primitives: breadcrumb, button, card, dropdown-menu,
                    navigation-menu, section, table
  product-sections/ the section registry above
  footer/           multi-part blocks, each folded into one folder (see below)
  hero/
  why-tankq/
  *.tsx             single-file page-level blocks: header, our-story,
                    process-roadmap, ...
```

Page-level blocks are self-contained: each reads its own copy through
`useTranslations`, so a page composes them with no props. Split anything that
grows past one job.

### Blocks that grow into several files

A block that needs more than one file gets a folder rather than a run of
sibling `<block>-<part>.tsx` files:

```
src/components/why-tankq/
  index.tsx        exports the block itself (WhyTankQ) and composes the parts
  backdrop.tsx     the parts, named for their role only - the folder already
  showcase.tsx     says which block they belong to
  slideshow.tsx    shared state: SlideshowProvider, useSlideshow, Slides, reasons

src/components/footer/
  index.tsx        Footer: the CTA band, the lower band, the copyright bar
  cta-band.tsx     CtaBand: closing pitch, contact CTA, LINE QR, tank
  tank.tsx         Tank: the breakout tank photo and its scroll-in rise
  link-columns.tsx LinkColumns: the lower grid, plus its private LinkColumn

src/components/hero/
  index.tsx        Hero: the navy band (top half) over the stats strip
  slideshow.tsx    Slideshow: the looping photo panel behind the band
  stats-strip.tsx  StatsStrip: the section's bottom half, the five stats
  stat-item.tsx    StatItem: one stat, and the viewport latch for its count-up
  animated-stat-value.tsx  AnimatedStatValue: the count-up itself
```

Rules: the parts are private to the folder and import each other by relative
path (`./slideshow`); everything outside imports only the folder
(`@/components/why-tankq`), which resolves to `index.tsx`. Drop the block name
from the parts - `Showcase`, not `WhyTankQShowcase`. Convert a block to this
shape when it reaches a second file; leave one-file blocks as they are.

Data a block shares with another part of the site does not belong in either of
them: it goes in `src/lib` (e.g. `src/lib/social-links.ts`, read by both the
footer and the home page's "follow us" section). Data only one component ever
renders stays next to it.

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
