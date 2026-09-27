# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ Next.js 16 — Not Standard Next.js

This project runs **Next.js 16.2.9** with **React 19**. APIs, conventions, and file structure have breaking changes from Next.js 14/15. Before writing any Next.js code, read the relevant guide in `node_modules/next/dist/docs/` (especially `01-app/` for App Router patterns). Heed deprecation notices.

Key Next.js 16 differences visible in this codebase:
- **`params` is a `Promise`** — must `await params` in page components and `generateMetadata` (see `src/app/diseases/[slug]/page.tsx`)
- For fast client-side navigations, Suspense alone is insufficient — the route must also export `unstable_instant`. See `node_modules/next/dist/docs/01-app/02-guides/instant-navigation.mdx`

## Commands

```bash
npm run dev       # Start dev server (next dev)
npm run build     # Production build (next build)
npm run start     # Serve production build
npm run lint      # ESLint (no custom script)
```

No test framework is configured.

## Architecture

**Mediatlas** — a healthcare clinical encyclopedia UI. Early-stage: 3 routes, mock data, several dependencies installed but not wired up.

### Routing (App Router, Server Components by default)

| Route | File | Notes |
|---|---|---|
| `/` | `src/app/page.tsx` | Home/landing |
| `/login` | `src/app/login/page.tsx` | Server wrapper → client `LoginForm` |
| `/diseases` | `src/app/diseases/page.tsx` | Async server component, calls `fetchAllDiseases()` |
| `/diseases/[slug]` | `src/app/diseases/[slug]/page.tsx` | SSG via `generateStaticParams` + `generateMetadata` |

### Data & API Layer

- **`src/lib/diseases.ts`** — API service layer. All three exports currently return mock JSON. Function signatures are stable; swap internals with real `fetch()` calls when the backend is ready (TODO comments mark each spot).
- **`src/types/disease.ts`** — `DiseaseListItem` and `DiseaseDetail` interfaces (nested types for symptoms, risk factors, treatment steps, FAQs, etc.).
- **`src/data/mock/`** — JSON mock files (`diseases-list.json`, `disease-detail-type-2-diabetes.json`).
- **`src/service/api/`** — Scaffolded directory for future API client code.

### Component Organization

```
src/components/
  ui/          → shadcn/ui primitives (button, card, dialog, dropdown-menu, input, sheet)
  auth/        → LoginForm (client component)
  diseases/    → DiseaseSearchList (client), DiseaseIcon, SectionNav (client with scroll tracking)
  layout/      → Header (server), Footer (server)
```

Pages and layouts are server components by default. Only interactive components are marked `"use client"`.

### Styling

- **Tailwind CSS v4** with `@theme inline` (CSS-variable-based theming in `src/app/globals.css`)
- **Material Design 3** color system — MD3 surface/primary/secondary/outline/error tokens defined as CSS custom properties (e.g., `--color-surface`, `--color-on-surface`, `--color-primary-container`)
- **shadcn/ui** (radix-nova style) — add components via `npx shadcn add <component>`
- Custom utility classes: `.canvas-bg` (radial gradient), `.glass-card` (glassmorphism), `.no-scrollbar` (hide scrollbars)
- Fonts: **Inter** (body / `font-sans`), **Plus Jakarta Sans** (headings / `font-heading`)

### Installed but Not Yet Wired

These dependencies are in `package.json` but have no integration code yet:
- **Zustand** (`src/store/` is empty) — for client state
- **React Query** (`src/providers/` has no QueryClientProvider) — for server state
- **Axios** — for HTTP requests
- **React Hook Form** + **Zod** — for form handling/validation
- Other empty scaffolded dirs: `src/constants/`, `src/hooks/`, `src/providers/`

## Path Aliases

`@/*` maps to `./src/*` (configured in `tsconfig.json`).
