# Tech Stack

Everything this project runs on, and what each piece is for. Versions are the
ranges in `package.json`; see `package-lock.json` for what is actually
installed. How the pieces fit together is in `docs/ARCHITECTURE.md`.

## Core

| Package | Version | Role |
| --- | --- | --- |
| `next` | 16.3.3 | App Router, React Server Components, static prerendering, `next/image`, `next/font`. Note: this version renames `middleware.ts` to `proxy.ts` and differs from older docs - read `node_modules/next/dist/docs/` before writing framework-level code |
| `react` / `react-dom` | 19.2.8 | UI runtime |
| `typescript` | ^5 | `strict` mode, `noEmit`, `@/*` -> `src/*` path alias (`tsconfig.json`) |

## Internationalisation

| Package | Version | Role |
| --- | --- | --- |
| `next-intl` | ^4.13.7 | Locale routing (`th` default, `en`; prefix always shown), middleware locale detection, `useTranslations` / `getTranslations`, locale-aware `Link` and router |

Wired up in `next.config.ts` (`createNextIntlPlugin`), `src/proxy.ts`, and
`src/i18n/{routing,request,navigation,locale}.ts`. UI copy lives in
`messages/th.json` and `messages/en.json`; content copy is inline in the data
files.

## Styling and UI

| Package | Version | Role |
| --- | --- | --- |
| `tailwindcss` + `@tailwindcss/postcss` | ^4 | Utility CSS. v4 style: no `tailwind.config`, everything is configured in `src/app/globals.css` via `@theme inline` and CSS variables |
| `shadcn` | ^4.19.0 | Component registry CLI and its `shadcn/tailwind.css` base layer. Style `base-nova`, base colour neutral, configured in `components.json` |
| `@base-ui/react` | ^1.7.0 | Headless primitives underneath `base-nova` shadcn components (dropdown, table, etc.). Its `render` prop is how a `Button` becomes a link |
| `lucide-react` | ^1.34.0 | Icon set |
| `motion` | ^13.1.1 | Scroll-in reveals and slideshows (`motion/react`), wrapped by `src/components/fade-in-up.tsx` |
| `tw-animate-css` | ^1.4.0 | Animation utilities imported by `globals.css` |
| `clsx` + `tailwind-merge` | ^2.1.1 / ^3.6.0 | The `cn()` helper in `src/lib/utils.ts` |
| `class-variance-authority` | ^0.7.1 | Variant props on shadcn primitives |

Fonts come from `next/font/google`: Anuphan (variable, Thai + Latin) for sans
and headings, Geist Mono for mono.

## Tooling

| Package | Version | Role |
| --- | --- | --- |
| `eslint` + `eslint-config-next` | ^9 / 16.3.3 | Lint, flat config in `eslint.config.mjs` (core-web-vitals + TypeScript rules) |
| `@types/node`, `@types/react`, `@types/react-dom` | ^20 / ^19 / ^19 | Type definitions |

## Not in the stack

No database, ORM, CMS, API layer, auth, analytics, form handler, or test
runner. All content is static TypeScript and JSON, and the site builds to
static HTML. Do not add a dependency without checking whether something above
already covers the need.

## Commands

```bash
npm run dev     # next dev
npm run build   # next build - run this before calling a task done
npm run start   # next start
npm run lint    # eslint
```
