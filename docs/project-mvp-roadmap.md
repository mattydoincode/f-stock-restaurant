# Restaurant Website Builder — MVP Roadmap

## Vision

A website builder that helps restaurant owners create unique, compelling, and useful websites for their restaurants — without needing design or coding skills.

---

## Market Research

### What Diners Expect

- 91% of guests check a restaurant's website before ordering (Owner.com survey, n=1,300)
- 84% specifically look for photos of menu items
- 75% want to see a menu and order online
- 66% discover restaurants via Google search
- 77% check the website before deciding where to eat
- Adding online ordering yields ~18% increase in sales (TouchBistro 2026)

### Competitive Landscape

| Segment | Players | Price Range |
|---------|---------|-------------|
| General builders + restaurant add-ons | Wix, Squarespace, Shopify, GoDaddy | $7–50/mo |
| Restaurant-specific platforms | BentoBox, Owner.com, Menubly, Flavor Plate, GloriaFood | $10–200/mo |

Our differentiator: purpose-built for restaurants, fast to set up, polished output, no bloat.

### Key Insight

Restaurant owners don't want a drag-and-drop builder — they want to enter their information and get a beautiful result. The most successful restaurant-specific platforms (BentoBox, Owner.com, Menubly) use guided flows and structured forms, not freeform editors. Speed to value is the primary metric: a live site within 15 minutes.

### Research Sources

- [Owner.com — 6 Elements of a Perfect Restaurant Website](https://www.owner.com/blog/restaurant-website-design) — survey of 1,300 US diners
- [TouchBistro — 2026 State of Restaurants Report](https://www.touchbistro.com/blog/state-of-restaurants-report/) — survey of 600+ operators
- [Expert Market — Best Website Builders for Restaurants](https://www.expertmarket.com/website-builders/best-website-builders-for-restaurants)
- [Menubly — 10 Best Restaurant Website Builders](https://www.menubly.com/blog/best-restaurant-website-builders/)
- [BentoBox — Restaurant Websites](https://www.getbento.com/products/restaurant-websites/) — feature analysis of the premium restaurant-specific platform
- [Toast — Restaurant Industry Statistics](https://pos.toasttab.com/blog/on-the-line/restaurant-management-statistics)
- [DEV Community — Top 5 Page Builders for React](https://dev.to/fede_bonel_tozzi/top-5-page-builders-for-react-190g) — evaluated Puck, OpenPage, Craft.js, GrapesJS; concluded template-based approach is better fit for restaurant vertical

---

## Feature Tiers

### Tier 1 — Core MVP (must ship)

These are the features 90%+ of diners expect on any restaurant website.

1. **Onboarding flow** — Restaurant name, cuisine type, description, branding (logo, colors)
2. **Template selection** — Curated, polished restaurant-specific themes (3–5 templates)
3. **Menu editor** — Sections (Appetizers, Mains, Desserts, Drinks, etc.), items with name, description, price, photo, and dietary tags (vegan, gluten-free, etc.)
4. **Restaurant info editor** — Hours of operation, location with embedded map, phone number, email
5. **Photo gallery** — Hero images, food photography, ambiance shots
6. **Preview & publish** — Live preview, one-click publish, shareable URL
7. **Mobile-optimized output** — All generated sites must be responsive and fast on mobile

### Tier 2 — High Value (post-MVP, drives revenue)

8. **Online ordering** — Pickup/delivery ordering with cart and checkout
9. **Reservation system** — Table booking with date/time/party-size selection
10. **SEO fundamentals** ✅ — Text-based menus (not PDF), meta tags, structured data (schema.org/Restaurant). *Implemented: JSON-LD, OpenGraph/Twitter meta, sitemap.xml, robots.txt.*

### Tier 3 — Differentiators (future)

11. **Events & specials** — Announce happy hours, live music, seasonal menus
12. **Gift cards** — Digital gift card purchase and redemption
13. **Customer reviews** — Display testimonials or aggregate review scores
14. **Email/SMS marketing** — Collect subscriber emails, send promotions
15. **QR code menus** — Generate QR codes linking to the digital menu
16. **Analytics dashboard** — Page views, menu clicks, popular items

---

## MVP User Flow

```
Restaurant Owner Arrives
        │
        ▼
Onboarding Wizard
  ├─ Restaurant name, cuisine, description
  ├─ Upload logo
  └─ Choose color scheme / theme
        │
        ▼
Dashboard
  ├─ Menu Editor ──────► Add sections → Add items (name, desc, price, photo, tags)
  ├─ Info Editor ──────► Hours, location, contact details
  ├─ Photo Gallery ────► Upload and arrange images
  └─ Theme Settings ───► Switch template, adjust colors
        │
        ▼
Preview ──► Publish ──► Live Site (shareable URL)
```

## Key Design Principles

- **Speed to value** — A restaurant owner should have a live site within 15 minutes
- **Opinionated defaults** — Beautiful out of the box; customization is optional, not required
- **Content-first** — The food and the story are the stars; the builder gets out of the way
- **Mobile-first** — The generated site must look great on phones (where most diners discover restaurants)

---

## Technical Architecture

### Version Constraints

| Dependency | Version | Notes |
|-----------|---------|-------|
| Node.js | LTS Krypton (24.x) | Current LTS |
| TypeScript | 5.x (latest 5.x) | Pinned ~5.9 |
| Next.js | 16.x (latest stable) | App Router + Turbopack |
| React | 19.x | Latest stable, ships with Next.js 16 |

### Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Next.js 16 (App Router) | Single app: builder dashboard + API + published sites |
| Language | TypeScript 5.x | Type safety throughout |
| Styling | Tailwind CSS v4 | Rapid, polished UI development |
| UI Components | shadcn/ui (latest) | Pre-built, accessible, customizable components |
| Database | SQLite via Prisma | Zero-config, file-based persistence |
| Images | next/image + local uploads | Optimized image serving |

### Approach: Template-Based

Not a drag-and-drop builder. Restaurant owners fill in structured forms (info, menu, photos), select a theme, and the system renders a polished site. This mirrors what BentoBox, Menubly, and Owner.com do — guided flows, not freeform editing.

### Route Structure

```
/                       → Landing page (marketing / redirect to dashboard)
/dashboard              → Builder dashboard overview
/dashboard/menu         → Menu editor (sections + items)
/dashboard/info         → Hours, location, contact
/dashboard/photos       → Photo gallery management
/dashboard/theme        → Template selection and color customization
/dashboard/preview      → Live preview of the restaurant site
/api/restaurant         → CRUD API for restaurant data
/api/menu               → CRUD API for menu sections and items
/api/upload             → Image upload endpoint
/s/[slug]               → Published restaurant site (SSR, public-facing)
```

### Data Model (Prisma)

```
Restaurant    1──* MenuSection    1──* MenuItem
    │                                      │
    ├── name, slug, cuisine, description   ├── name, description, price
    ├── logo, heroImage                    ├── image, dietary tags
    ├── phone, email, address, mapEmbed    └── sortOrder, available
    ├── hours (JSON)
    ├── theme, colorScheme
    ├── published (boolean)
    └── galleryImages (JSON)
```

### No Auth for MVP

Authentication is out of scope. The builder operates as a single-user tool. This keeps the scope tight and the code simple.

---

## Project Setup (IntelliJ)

### Prerequisites

- Node.js 24.x (LTS Krypton) — verify with `node --version`
- npm (ships with Node)
- IntelliJ IDEA with JavaScript/TypeScript plugin enabled

### Step 1: Create the Next.js Project

```bash
npx create-next-app@latest goethena-restaurant-mvp \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-eslint
cd goethena-restaurant-mvp
```

Flags explained:
- `--typescript` — TypeScript configuration
- `--tailwind` — Tailwind CSS v4 pre-configured
- `--app` — App Router (not Pages Router)
- `--src-dir` — Source code under `src/` (clean separation)
- `--import-alias "@/*"` — Path alias for `src/` imports
- `--no-eslint` — Per project conventions, eslint is not used

### Step 2: Pin TypeScript to 5.x

```bash
npm install --save-dev typescript@~5.9
npx tsc --version  # verify 5.9.x
```

### Step 3: Initialize Prisma with SQLite

```bash
npm install prisma --save-dev
npm install @prisma/client
npx prisma init --datasource-provider sqlite
```

This creates `prisma/schema.prisma` and `.env` with `DATABASE_URL="file:./prisma/dev.db"`.

### Step 4: Install shadcn/ui

```bash
npx shadcn@latest init
```

Accept defaults (base-nova style, Tailwind CSS, `@/components` path). Then install components as needed:

```bash
npx shadcn@latest add button input label card tabs textarea select dialog
```

### Step 5: Open in IntelliJ

1. **File → Open** → select the `goethena-restaurant-mvp` directory
2. IntelliJ auto-detects the Node.js project
3. **Settings → Languages & Frameworks → TypeScript** → set the TypeScript version to the project's `node_modules/typescript` (not the bundled one)
4. **Settings → Languages & Frameworks → Node.js** → set the Node interpreter to your Node 24.x installation
5. Verify Tailwind CSS plugin is enabled for autocomplete (**Settings → Plugins → Tailwind CSS**)

### Step 6: Verify Everything Works

```bash
npm run dev
```

Open `http://localhost:3000` — you should see the Next.js default page.

### Step 7: Copy This Roadmap

Copy `docs/project-mvp-roadmap.md` into the new project root under `docs/`.

---

## Implementation Plan

### Phase 1: Foundation (database + API)

**Goal:** Working API that stores and retrieves restaurant data.

1. Define Prisma schema — `Restaurant`, `MenuSection`, `MenuItem` models
2. Run initial migration (`npx prisma migrate dev --name init`)
3. Create Prisma client singleton (`src/lib/prisma.ts`)
4. Build API routes:
   - `POST/GET/PUT /api/restaurant` — create, read, update restaurant
   - `POST/GET/PUT/DELETE /api/menu` — CRUD for menu sections and items
   - `POST /api/upload` — image upload (save to `public/uploads/`)
5. Seed script with sample restaurant data for development

### Phase 2: Builder Dashboard

**Goal:** Restaurant owner can enter all their information through a polished UI.

1. Dashboard layout with sidebar navigation (`/dashboard`)
2. **Restaurant info form** (`/dashboard/info`) — name, cuisine, description, phone, email, address, hours of operation
3. **Menu editor** (`/dashboard/menu`) — add/edit/delete sections and items with inline editing, drag-to-reorder, photo upload per item, dietary tag selection
4. **Photo gallery** (`/dashboard/photos`) — upload hero image, gallery images, drag-to-reorder
5. **Theme selector** (`/dashboard/theme`) — choose from 3 templates, pick a primary color scheme
6. All forms auto-save or save on action with clear feedback

### Phase 3: Restaurant Site Templates

**Goal:** Beautiful, responsive restaurant websites rendered from stored data.

1. Build 3 distinct restaurant theme components:
   - **"Bistro"** — warm, elegant, suited for fine dining (dark backgrounds, serif fonts, large food photos)
   - **"Fresh"** — bright, modern, suited for casual/fast-casual (white space, sans-serif, grid layout)
   - **"Trattoria"** — rustic, cozy, suited for family restaurants (earth tones, textured backgrounds, handwritten-style accents)
2. Each theme renders these sections from the same data:
   - Hero banner (restaurant name, tagline, hero image)
   - About / story section
   - Full menu with sections, items, prices, dietary tags, and photos
   - Photo gallery
   - Hours + location with embedded map
   - Contact info / footer
3. All themes are fully responsive (mobile-first)

### Phase 4: Preview & Publish

**Goal:** Owner can preview their site and publish it to a shareable URL.

1. **Preview page** (`/dashboard/preview`) — renders the selected theme with current data, full-width, with a "back to editor" bar at top
2. **Publish action** — sets `published: true` on the restaurant, generates/confirms the slug
3. **Public site route** (`/s/[slug]`) — SSR page that fetches restaurant data and renders the selected theme
4. Share button with copyable URL

### Phase 5: Polish & Demo Readiness

**Goal:** The product feels complete and professional.

1. Landing page (`/`) — explains what the product does, CTA to start building
2. Onboarding wizard — guided first-run experience (name → cuisine → template → dashboard)
3. Empty states — helpful prompts when no menu items, no photos, etc.
4. Loading states and error handling throughout
5. Seed data — a demo restaurant pre-populated so evaluators can see a published site immediately
6. Mobile responsiveness of the dashboard itself (not just published sites)

---

## Verification Plan

### Manual Testing Checklist

- [ ] `npm run dev` starts without errors
- [ ] Can create a restaurant through the onboarding wizard
- [ ] Can add menu sections and items with photos
- [ ] Can set hours, location, and contact info
- [ ] Can upload and arrange gallery photos
- [ ] Can switch between 3 themes and see the preview update
- [ ] Preview shows a complete, polished restaurant site
- [ ] Publish produces a shareable URL at `/s/[slug]`
- [ ] Published site renders correctly on mobile (Chrome DevTools responsive mode)
- [ ] Published site renders correctly on desktop
- [ ] All 3 themes render correctly with the same data

### Build Verification

```bash
npm run build       # Production build completes without errors
npm run start       # Production server starts and serves correctly
npx prisma studio   # Database browser works (useful for debugging)
```

---

## Out of Scope for MVP

- User authentication / multi-tenancy
- Custom domain support
- Payment processing / checkout
- User authentication for diners
- Multi-location management
- POS integration
- Delivery logistics
- Drag-and-drop page editing
- Email/SMS marketing
- Analytics
