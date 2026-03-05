# Superteam Malaysia

> The official website for Superteam Malaysia, the home for Solana builders in Malaysia.

**Live:** https://superteam-malaysia-one.vercel.app
**GitHub:** https://github.com/pranit-garg/superteam-malaysia

## Overview

Superteam Malaysia is the local chapter of the global Superteam network, connecting builders, creators, and talent in the Solana ecosystem across Malaysia. This website serves as the community hub, featuring events, member directory, partner showcase, and a full admin CMS.

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Smooth Scroll | Lenis |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Hosting | Vercel |

## Features

- 10-section cinematic landing page with "Tropical Futurism" design
- Member directory with search and skill filtering
- Full admin CMS (members, events, partners, content, announcements, media)
- Luma event sync via API with Vercel cron (daily 8am UTC)
- Supabase integration (auth, database, storage)
- JSON-LD structured data (Organization, FAQPage, Event schemas)
- Responsive design with accessibility (skip nav, ARIA, focus-visible, reduced motion)
- OG images, sitemap, robots.txt

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/pranit-garg/superteam-malaysia.git
cd superteam-malaysia
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Luma (optional, for event sync)
LUMA_API_KEY=your_luma_api_key
LUMA_CALENDAR_ID=your_calendar_id

# Cron secret (for Luma sync endpoint)
CRON_SECRET=your_cron_secret

# Revalidation secret
REVALIDATION_SECRET=your_revalidation_secret
```

### Development

```bash
npm run dev
```

Open http://localhost:3000.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
superteam-malaysia/
  app/
    admin/              # Admin CMS dashboard
      announcements/    # Announcement CRUD pages
      content/          # Page content editor
      events/           # Event CRUD pages
      login/            # Admin login
      media/            # Media library
      members/          # Member CRUD pages
      partners/         # Partner CRUD pages
    api/
      events/sync/      # Luma event sync endpoint (Vercel cron)
      revalidate/       # On-demand ISR revalidation
      upload/           # File upload handler
    members/            # Member directory page
    page.tsx            # Landing page (10 sections)
    layout.tsx          # Root layout with metadata + JSON-LD
    sitemap.ts          # Dynamic sitemap generation
    robots.ts           # Robots.txt generation
    opengraph-image.tsx # Dynamic OG image
  components/
    landing/            # Landing page sections
      HeroSection.tsx
      MissionSection.tsx
      StatsSection.tsx
      EventsSection.tsx
      MemberSpotlight.tsx
      PartnersSection.tsx
      WallOfLove.tsx
      FAQSection.tsx
      JoinCTA.tsx
    layout/             # Header, Footer, SmoothScroll, ScrollProgress
    ui/                 # Reusable components (Button, GlowCard, Accordion, etc.)
    admin/              # Admin dashboard components
    members/            # Member directory components
    providers/          # Context providers
  data/                 # Sample/seed data
    members.ts
    faq.ts
    stats.ts
    partners.ts
    testimonials.ts
  lib/
    animations.ts       # Framer Motion variants and easing
    constants.ts        # Site config, skills list, links
    utils.ts            # Utility functions (clsx/tailwind-merge)
    hooks/              # Custom React hooks
    luma/               # Luma API client and types
    supabase/           # Supabase clients (browser, server, admin) and types
  public/
    fonts/              # Self-hosted Satoshi font (woff2)
    botanicals/         # Botanical SVG overlays
    images/             # Static images
    og/                 # OG image assets
  supabase/
    migrations/         # SQL migration files (8 tables)
    seed.sql            # Seed data
  middleware.ts         # Supabase auth session refresh
  vercel.json           # Cron job configuration
```

## Supabase Setup

1. Create a Supabase project at https://supabase.com
2. Run the migration files in `supabase/migrations/` in order:
   - `001_members.sql`
   - `002_events.sql`
   - `003_partners.sql`
   - `004_page_content.sql`
   - `005_announcements.sql`
   - `006_testimonials.sql`
   - `007_stats.sql`
   - `008_admin_profiles.sql`
3. Optionally run `supabase/seed.sql` for initial data
4. Set up Row Level Security (RLS) policies
5. Add your Supabase credentials to `.env.local`

## Luma Integration

The site syncs events from Luma via a daily cron job:
- API endpoint: `/api/events/sync`
- Cron schedule: Daily at 8:00 AM UTC (configured in `vercel.json`)
- Requires `LUMA_API_KEY`, `LUMA_CALENDAR_ID`, and `CRON_SECRET` in environment variables

## Admin Dashboard

Access the admin panel at `/admin`. Features:
- Member management (add, edit, remove)
- Event management with Luma sync
- Partner and content management
- Announcement system
- Media library

Authentication is handled via Supabase Auth with the admin login page at `/admin/login`.

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

```bash
vercel --prod
```

The `vercel.json` cron configuration is automatically picked up on deploy.

## Design System

- **Aesthetic:** Tropical Futurism (dark theme, cinematic scroll, botanical overlays)
- **Fonts:** Satoshi (display, self-hosted), Space Grotesk (body, Google Fonts), Geist Mono (code)
- **Colors:**
  - Background: `#0a0a0f`
  - Solana Green (primary): `#14F195`
  - Solana Purple (secondary): `#9945FF`
  - Malaysian Gold: `#d4a246`
  - Text: `#ffffff` / muted `#a1a1aa`
- **Effects:** Glassmorphism header, glow cards, botanical SVG overlays, scroll-triggered animations
- **Accessibility:** Skip-to-content link, reduced motion support, custom scrollbar, semantic HTML

## License

MIT

---

Built for the [Superteam Earn](https://superteam.fun) Malaysia Website Design & Build Challenge.
