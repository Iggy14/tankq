# TankQ

Bilingual (Thai / English) marketing and catalogue website for **TankQ**, an FRP (fiberglass) and PE tank manufacturer. Live at [www.tankq-solution.com](https://www.tankq-solution.com).

The site is fully static: no database, no API routes, no auth. All content is TypeScript data and JSON message files, so every page is prerendered at build time.

## Features

- Thai (default) and English, with locale-prefixed routes (`/th/...`, `/en/...`)
- Product catalogue with category filtering (`?category=`) and per-product detail pages
- Composable detail-page sections: size tables, bullet and numbered lists, image grids, articles with zoomable diagrams
- Project showcase, after-sales services, about, quality and contact pages
- SEO: per-page metadata, `metadataBase`, BreadcrumbList JSON-LD
- Responsive layout with a sliding mobile menu and a floating contact button

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router) and React 19
- TypeScript (strict)
- [next-intl](https://next-intl.dev) for i18n
- [Tailwind CSS](https://tailwindcss.com) v4 and [shadcn/ui](https://ui.shadcn.com) (`base-nova` style, on Base UI)
- [Motion](https://motion.dev) for animation, [Lucide](https://lucide.dev) for icons

Full list with versions: [`docs/TECH-STACKS.md`](docs/TECH-STACKS.md).

## Getting started

Requires Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root redirects to `/th`.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (prerenders every route) |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

To preview a production build on your local network:

```bash
npm run build
npm run start -- -H 0.0.0.0
```

There is no test suite yet. Verify changes with `npm run build` and `npm run lint`.

### Environment

| Variable | Purpose | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin used for metadata and JSON-LD | `https://www.tankq-solution.com` |

## Project structure

```
src/
  app/[locale]/     Pages and layout (home, products, about, ...)
  components/       UI blocks; shadcn primitives in ui/
  i18n/             next-intl routing, request config, navigation helpers
  lib/              Content data (products, projects, services) and helpers
  proxy.ts          Locale detection (Next 16's name for middleware)
messages/           th.json and en.json - static UI text
public/             Images and brand assets
docs/               Architecture, tech stack and TODO notes
```

## Content model

There are two kinds of text, and each has one home:

- **UI text** (nav, buttons, labels, page headings) lives in `messages/th.json` and `messages/en.json`. Keep both files key-for-key identical.
- **Content** (product titles, descriptions, spec tables) lives inline in the data files with both languages side by side, e.g. `title: { th: "...", en: "..." }`, read as `product.title[locale]`.

To add a product, edit `src/lib/products.ts` and drop its images in `public/images/products/<slug>/`. Detail-page sections go in `src/lib/product-section-data.ts`, keyed by product id.

## Documentation

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) - how the site is structured and the patterns for extending it
- [`docs/TECH-STACKS.md`](docs/TECH-STACKS.md) - dependencies and what each is for
- [`docs/TODO.md`](docs/TODO.md) - deferred work
- [`AGENTS.md`](AGENTS.md) / [`CLAUDE.md`](CLAUDE.md) - conventions for AI coding assistants

## Deployment

The site runs on a self-hosted VPS. Build with `npm run build` and serve with `npm run start`.

## License

Proprietary. All rights reserved by TankQ.
