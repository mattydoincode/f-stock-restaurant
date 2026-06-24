# Goethena — Restaurant Website Builder MVP

A website builder that lets restaurant owners create polished, mobile-ready sites by filling in structured forms (info, menu, photos) and selecting a theme. Not a drag-and-drop editor — a guided, opinionated tool.

## Tech Stack

| Layer     | Technology                                                           |
|-----------|----------------------------------------------------------------------|
| Framework | Next.js 16 (App Router, Turbopack)                                   |
| Language  | TypeScript ~5.9 (strict mode)                                        |
| UI        | React 19, Tailwind CSS v4, shadcn/ui v4 (base-nova / @base-ui/react) |
| Database  | SQLite via Prisma 7 + better-sqlite3 driver adapter                  |
| Icons     | lucide-react                                                         |
| Toasts    | sonner                                                               |

## Prerequisites

- **Node.js 24.x** (LTS Krypton) — use [nvm](https://github.com/nvm-sh/nvm):
  ```bash
  nvm install   # reads .nvmrc → lts/krypton
  nvm use
  ```
- **npm** (ships with Node)

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file
cp .env.sample .env

# 3. Generate Prisma client
npx prisma generate

# 4. Run initial migration (creates SQLite DB)
npx prisma migrate dev --name init

# 5. Seed demo data
npx tsx prisma/seed.ts

# 6. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The seed creates a published demo restaurant at [/s/bella-cucina](http://localhost:3000/s/bella-cucina).

## Project Structure

```
src/
  app/                          Next.js App Router
    api/
      restaurant/route.ts       GET/POST/PUT — single restaurant CRUD
      menu/route.ts             GET/POST/PUT/DELETE — menu section CRUD
      menu/items/route.ts       POST/PUT/DELETE — menu item CRUD
      upload/route.ts           POST — image upload to public/uploads/
    dashboard/                  Admin dashboard (client components)
      onboarding/               Guided first-run wizard
      info/                     Restaurant info form (auto-save)
      menu/                     Menu editor (sections + items)
      photos/                   Photo gallery manager
      theme/                    Template + color scheme selector
      preview/                  Live preview + publish/share toolbar
    s/[slug]/                   Published restaurant site (SSR, server components)
  components/
    ui/                         shadcn/ui components (12 installed)
    dashboard/                  Dashboard-specific components
    site/
      templates/                Restaurant site templates
        bistro/                 Dark/elegant fine dining theme
        fresh/                  Bright/modern casual theme
        trattoria/              Warm/rustic family theme
        registry.ts             Maps theme id → component
  hooks/                        React hooks (useRestaurant, useMenu, useGallery, etc.)
  services/                     Business logic (restaurant, menu, upload)
  types/                        TypeScript interfaces (restaurant, menu, theme)
  lib/                          Utilities (prisma client, slugify, errors, site-utils)
  generated/prisma/             Prisma client (auto-generated, gitignored)
prisma/
  schema.prisma                 Data models (Restaurant, MenuSection, MenuItem)
  seed.ts                       Demo data seeder
  migrations/                   Migration history
```

## Key Architecture Decisions

**Hexagonal layers**: API routes (transport) → services (business logic) → Prisma (data). Routes parse requests and format responses; services throw typed errors; routes catch and translate to HTTP status codes.

**Single restaurant**: No auth, no multi-tenancy. `getRestaurant()` returns the one restaurant. Designed for a single-owner use case.

**Prisma 7 driver adapter**: Prisma 7 requires an explicit driver adapter. The SQLite adapter (`@prisma/adapter-better-sqlite3`) is passed to `PrismaClient({ adapter })` in `src/lib/prisma.ts`. Import from `@/generated/prisma/client` (not
`@/generated/prisma` — there's no index file in v7).

**JSON fields in SQLite**: `hours`, `galleryImages`, and `dietaryTags` are stored as JSON strings in SQLite. The service layer handles serialization/deserialization.

**Template system**: Three templates share a `TemplateProps` interface. A registry maps theme IDs to components. Color schemes are applied via CSS custom properties (`--site-primary`, `--site-accent`). Templates are server components — no client JS on
published sites.

**shadcn/ui v4**: Uses `@base-ui/react`, not Radix. There is no `asChild` prop — use controlled state for Dialog and `buttonVariants()` for styled links.

## npm Scripts

| Script              | Purpose                                         |
|---------------------|-------------------------------------------------|
| `npm run dev`       | Start dev server                                |
| `npm run build`     | Production build                                |
| `npm run start`     | Start production server                         |
| `npm run clean`     | Remove .next/                                   |
| `npm run fullclean` | Remove .next/, node_modules/, package-lock.json |

## Database

**SQLite** via Prisma 7. The database file lives at `prisma/dev.db` (gitignored).

```bash
# Generate client after schema changes
npx prisma generate

# Create a migration
npx prisma migrate dev --name describe_change

# Reset database and re-seed
npx prisma migrate reset

# Browse data
npx prisma studio
```

The seed script (`prisma/seed.ts`) is excluded from `tsconfig.json` and runs via `tsx`, not the Next.js build.

## Environment Variables

| Variable       | Required | Default                | Description                                     |
|----------------|----------|------------------------|-------------------------------------------------|
| `DATABASE_URL` | Yes      | `file:./prisma/dev.db` | SQLite database path (relative to project root) |

## Adding shadcn Components

```bash
npx shadcn@latest add <component-name>
```

Currently installed: button, input, label, card, tabs, textarea, select, dialog, sonner, switch, badge, separator. Config is in `components.json`.

## Deploying to Railway

Railway can run Next.js apps with SQLite if you use a persistent volume.

### Setup

1. Create a new Railway project from this repo
2. Add a **Volume** mounted at `/data` (SQLite needs persistent storage)
3. Set environment variables:

| Variable       | Value                                    |
|----------------|------------------------------------------|
| `DATABASE_URL` | `file:/data/restaurant.db`               |
| `PORT`         | `3000` (Railway sets this automatically) |

4. Set the build command: `npx prisma generate && npx prisma migrate deploy && npm run build`
5. Set the start command: `npm run start`

### Notes

- `prisma migrate deploy` runs migrations without prompts (production-safe)
- The volume at `/data` persists the SQLite database across deploys
- Uploaded images in `public/uploads/` are **not persisted** across deploys with this setup — for production, switch to an external storage service (S3, Cloudflare R2, etc.) and update `src/services/upload.service.ts`
- Railway's free tier supports this stack; no external database service needed
- For a custom domain, configure it in Railway's project settings and update the share URL logic accordingly

### Production Considerations

If scaling beyond a single instance or needing robust file storage:

- **Database**: Switch from SQLite to PostgreSQL — change the Prisma provider and adapter (`@prisma/adapter-pg`), update `DATABASE_URL` to a Postgres connection string
- **Image uploads**: Replace local file storage with S3/R2 — the upload service (`src/services/upload.service.ts`) is the only file that needs changing
- **Auth**: The MVP has no authentication — add it before exposing the dashboard publicly
