# Decisions Log

## 2026-03-05: Design direction chosen: Tropical Futurism
- Cinematic + immersive scroll-driven experience
- Malaysian tropical nature (Forest City, JB) meets Solana tech identity
- Botanical line-art overlays in Solana green (#14F195) animated on scroll
- Brand ref: Apple product deep-dives meet Solana dark technical identity

## 2026-03-05: Font stack
- Satoshi (self-hosted from Fontshare) for display/headings
- Space Grotesk (next/font/google) for body text
- Geist Mono (next/font/google) for data/stats
- No Inter/Roboto/Arial anywhere

## 2026-03-05: Supabase as CMS backend
- Direct Supabase tables (not headless CMS like Sanity/Strapi)
- Custom admin dashboard built into the app at /admin
- Supabase Auth with email/password for admin access
- RLS policies for public read, admin write

## 2026-03-05: Framer Motion only (no GSAP)
- Avoids bundle bloat
- All animation variants centralized in lib/animations.ts
- Lenis for smooth scroll (lerp: 0.08, duration: 1.4)

## 2026-03-05: Next.js 16 compatibility
- Cannot use dynamic() with ssr: false in Server Components
- Client components imported directly instead
- searchParams/headers() must be awaited

## 2026-03-05: ISR strategy
- Landing page: revalidate every 3600s
- Members page: revalidate every 1800s
- On-demand revalidation via /api/revalidate after admin edits
