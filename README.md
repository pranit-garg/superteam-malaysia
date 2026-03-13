# Superteam Malaysia

Community website for Superteam Malaysia, the Malaysian chapter of the global Superteam network focused on growing the Solana ecosystem.

**Live:** [https://my.superteam.fun](https://my.superteam.fun)

## Deliverables

| Deliverable | Link |
|------------|------|
| Live site | [https://my.superteam.fun](https://my.superteam.fun) |
| GitHub repo | [github.com/pranit-garg/superteam-malaysia](https://github.com/pranit-garg/superteam-malaysia) |
| Figma file | [Figma Design](https://www.figma.com/design/fMrDpMgv6p5lqM1uFgV4rn) |

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Lenis (smooth scroll)
- Supabase (PostgreSQL + Auth + Storage)
- Vercel (hosting + cron)

## Features

- Animated landing page with 10 cinematic sections
- Member directory with search and skill filtering
- Admin panel with CRUD for all content types (members, events, partners, testimonials, announcements, page content)
- Luma event sync via API with Vercel cron (daily 8am UTC)
- ISR with on-demand revalidation after admin edits
- SEO optimized: metadata, dynamic OG image, sitemap, robots.txt, JSON-LD structured data (Organization, FAQPage, Event)
- Responsive design (mobile + desktop)
- Image upload to Supabase Storage
- Accessibility: skip-to-content link, ARIA labels, focus-visible states, reduced motion support

## Prerequisites

- Node.js 18+
- npm
- A Supabase account (or Supabase CLI for local development)

## Getting Started

### 1. Clone and Install

```bash
git clone https://github.com/pranit-garg/superteam-malaysia.git
cd superteam-malaysia
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL (e.g. `https://abc.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public API key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only, never exposed to client) |
| `LUMA_API_KEY` | (Optional) Luma API key for event sync |
| `LUMA_CALENDAR_ID` | (Optional) Luma calendar ID to sync events from |
| `CRON_SECRET` | Secret token to authorize the `/api/events/sync` cron endpoint |
| `REVALIDATION_SECRET` | Secret token to authorize the `/api/revalidate` ISR endpoint |

### 3. Database Setup

Run the consolidated migration in the Supabase SQL Editor or via CLI:

```bash
# Using Supabase CLI
supabase db push

# Or manually in the SQL Editor:
# 1. Run supabase/migrations/001_initial_schema.sql
# 2. Run supabase/seed.sql for initial data
```

The migration creates all 8 tables (members, events, partners, testimonials, stats, page_content, announcements, admin_profiles) with Row Level Security policies and updated-at triggers.

The seed file populates initial data from the community (2 members, 25 partners, 5 stats, 12 testimonials, 7 FAQ items).

### 4. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000.

### 5. Build for Production

```bash
npm run build
npm start
```

## Admin Panel (CMS)

The admin dashboard is at `/admin`. It provides full CRUD management for all content types with role-based access control.

### How It Works

1. Go to `/admin/login` and sign in with your admin credentials
2. The dashboard shows counts for each content type (members, events, partners, etc.)
3. Use the sidebar to navigate between sections
4. Each section supports: list, add, edit, delete, publish/unpublish
5. Changes trigger ISR revalidation so the public site updates within seconds

### Roles

| Role | Permissions |
|------|------------|
| **Admin** | Full CRUD on all content, can delete items, can manage other admin/editor users |
| **Editor** | Can add and edit content, cannot delete items or manage users |

The sidebar displays a green "Admin" or blue "Editor" badge based on your role.

### Creating the First Admin User

1. Create a user in the Supabase Auth dashboard (Authentication > Users > Add user)
2. Insert a row into `admin_profiles` linking to that user:

```sql
insert into public.admin_profiles (id, display_name, role)
values ('YOUR_USER_UUID', 'Your Name', 'admin');
```

3. Log in at `/admin/login` with the credentials you created

### Admin Sections

| Section | What It Manages |
|---------|----------------|
| Members | Community member profiles (name, title, company, bio, photo, skills, badges) |
| Events | Upcoming events (also auto-synced from Luma) |
| Partners | Ecosystem and infrastructure partner logos |
| Stats | Homepage statistics (e.g. "20 Members", "50 Events") |
| Testimonials | Wall of Love quotes |
| Announcements | Community announcements with pinning and publish status |
| Content | Editable page content blocks (hero text, mission statement, etc.) |
| Media | Image upload and management via Supabase Storage |

## Luma Integration

Events are synced from Luma via a daily Vercel cron job:

- **Endpoint:** `/api/events/sync`
- **Schedule:** Daily at 8:00 AM UTC (configured in `vercel.json`)
- **Required env vars:** `LUMA_API_KEY`, `LUMA_CALENDAR_ID`, `CRON_SECRET`

Events synced from Luma are matched by `luma_id` to avoid duplicates. New events default to `draft` status and must be published via the admin panel.

## Deployment

### Vercel (Recommended)

1. Push your repository to GitHub
2. Import the project in the Vercel dashboard
3. Add all environment variables from `.env.example`
4. Deploy

```bash
vercel --prod
```

The `vercel.json` cron configuration is automatically picked up on deploy.

## Project Structure

```
superteam-malaysia/
  app/
    admin/              Admin CMS dashboard
      announcements/    Announcement CRUD pages
      content/          Page content editor
      events/           Event CRUD pages
      login/            Admin login
      media/            Media library
      members/          Member CRUD pages
      partners/         Partner CRUD pages
    api/
      events/sync/      Luma event sync endpoint (Vercel cron)
      revalidate/       On-demand ISR revalidation
      upload/           File upload handler
    members/            Member directory page
    page.tsx            Landing page (10 sections)
    layout.tsx          Root layout with metadata + JSON-LD
    sitemap.ts          Dynamic sitemap generation
    robots.ts           Robots.txt generation
    opengraph-image.tsx Dynamic OG image
  components/
    landing/            Landing page sections (Hero, Mission, Stats,
                        Events, MemberSpotlight, Partners, WallOfLove,
                        FAQ, JoinCTA)
    layout/             Header, Footer, SmoothScroll, ScrollProgress
    ui/                 Reusable components (Button, GlowCard, Accordion, etc.)
    admin/              Admin dashboard components
    members/            Member directory components
    providers/          Context providers
  data/                 Static/seed data (members, faq, stats, partners, testimonials)
  lib/
    animations.ts       Framer Motion variants and easing
    constants.ts        Site config, skills list, links
    utils.ts            Utility functions (clsx/tailwind-merge)
    hooks/              Custom React hooks
    luma/               Luma API client and types
    supabase/           Supabase clients (browser, server, admin) and types
  public/
    fonts/              Self-hosted Satoshi font (woff2)
    botanicals/         Botanical SVG overlays
    images/             Static images (members, partners, og)
  supabase/
    migrations/         SQL migration files
    seed.sql            Seed data
  middleware.ts         Supabase auth session refresh
  vercel.json           Cron job configuration
```

## Design

The site follows a **Tropical Futurism** aesthetic: a dark cinematic canvas layered with botanical overlays, glowing accents, and scroll-triggered animations.

- **Font:** Satoshi (self-hosted from Fontshare CDN)
- **Color palette:**
  - Background: `#0d1a12`
  - Solana Purple (primary): `#5523DE`
  - Solana Green (secondary): `#0AB172`
  - Malaysian Gold: `#d4a246`
  - Text: `#ffffff`, muted: `#c8c8d0`
- **Effects:** Glassmorphism header, glow cards, botanical SVG overlays, parallax sections, scroll-triggered Framer Motion animations
- **Accessibility:** Skip-to-content link, reduced motion support, semantic HTML, focus-visible outlines, custom scrollbar

## Responsive Design

The site is built mobile-first with breakpoints at:
- **Mobile:** < 640px (single column, stacked layouts)
- **Tablet:** 640px - 1024px (2-column grids, adjusted spacing)
- **Desktop:** 1024px+ (full multi-column layouts, all effects enabled)
- **Wide:** 1440px+ (max-width containers, no layout breakage)

## License

MIT

---

Built for the [Superteam Earn](https://superteam.fun) Malaysia Website Design & Build Challenge.
