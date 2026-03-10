-- ============================================================
-- Superteam Malaysia: Initial Database Schema
-- ============================================================
-- Consolidated migration covering all tables, triggers, and RLS policies.
-- Run this in the Supabase SQL Editor or via `supabase db push`.

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ============================================================
-- Members
-- ============================================================
create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text,
  company text,
  bio text,
  photo_url text,
  twitter_url text,
  skills text[] default '{}',
  badges text[] default '{}',
  achievements jsonb,
  is_core_team boolean default false,
  is_featured boolean default false,
  display_order integer default 0,
  status text default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- Events
-- ============================================================
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  luma_id text unique,
  title text not null,
  description text,
  cover_url text,
  start_at timestamptz not null,
  end_at timestamptz,
  timezone text default 'Asia/Kuala_Lumpur',
  location_name text,
  location_address text,
  meeting_url text,
  luma_url text,
  is_featured boolean default false,
  event_type text default 'meetup',
  status text default 'draft' check (status in ('draft', 'published')),
  synced_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- Partners
-- ============================================================
create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  website_url text,
  description text,
  partner_type text default 'ecosystem' check (partner_type in ('ecosystem', 'sponsor', 'media', 'infrastructure')),
  display_order integer default 0,
  status text default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz default now()
);

-- ============================================================
-- Testimonials
-- ============================================================
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  author_name text not null,
  author_title text,
  author_photo_url text,
  content text not null,
  tweet_url text,
  is_tweet boolean default false,
  display_order integer default 0,
  status text default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz default now()
);

-- ============================================================
-- Stats
-- ============================================================
create table if not exists public.stats (
  id uuid primary key default gen_random_uuid(),
  stat_key text not null unique,
  label text not null,
  value integer not null,
  suffix text,
  prefix text,
  display_order integer default 0
);

-- ============================================================
-- Page Content
-- ============================================================
create table if not exists public.page_content (
  id uuid primary key default gen_random_uuid(),
  section_key text not null,
  content_type text default 'text' check (content_type in ('text', 'markdown', 'image', 'json')),
  value text not null,
  metadata jsonb,
  updated_by text,
  updated_at timestamptz default now()
);

-- ============================================================
-- Announcements
-- ============================================================
create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text,
  body_md text,
  image_url text,
  link_url text,
  is_pinned boolean default false,
  status text default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz default now()
);

-- ============================================================
-- Admin Profiles
-- ============================================================
create table if not exists public.admin_profiles (
  id uuid primary key references auth.users on delete cascade,
  display_name text not null,
  role text default 'editor' check (role in ('admin', 'editor'))
);

-- ============================================================
-- Updated-at trigger function
-- ============================================================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger members_updated_at before update on public.members
  for each row execute function public.handle_updated_at();

create trigger events_updated_at before update on public.events
  for each row execute function public.handle_updated_at();

-- ============================================================
-- Row Level Security
-- ============================================================

alter table public.members enable row level security;
alter table public.events enable row level security;
alter table public.partners enable row level security;
alter table public.testimonials enable row level security;
alter table public.stats enable row level security;
alter table public.page_content enable row level security;
alter table public.announcements enable row level security;
alter table public.admin_profiles enable row level security;

-- Anon: read published content
create policy "Public can read published members" on public.members for select using (status = 'published');
create policy "Public can read published events" on public.events for select using (status = 'published');
create policy "Public can read published partners" on public.partners for select using (status = 'published');
create policy "Public can read published testimonials" on public.testimonials for select using (status = 'published');
create policy "Public can read stats" on public.stats for select using (true);
create policy "Public can read page_content" on public.page_content for select using (true);
create policy "Public can read published announcements" on public.announcements for select using (status = 'published');

-- Authenticated admins: full access
create policy "Admins have full access to members" on public.members for all using (
  exists (select 1 from public.admin_profiles where id = auth.uid())
);
create policy "Admins have full access to events" on public.events for all using (
  exists (select 1 from public.admin_profiles where id = auth.uid())
);
create policy "Admins have full access to partners" on public.partners for all using (
  exists (select 1 from public.admin_profiles where id = auth.uid())
);
create policy "Admins have full access to testimonials" on public.testimonials for all using (
  exists (select 1 from public.admin_profiles where id = auth.uid())
);
create policy "Admins have full access to stats" on public.stats for all using (
  exists (select 1 from public.admin_profiles where id = auth.uid())
);
create policy "Admins have full access to page_content" on public.page_content for all using (
  exists (select 1 from public.admin_profiles where id = auth.uid())
);
create policy "Admins have full access to announcements" on public.announcements for all using (
  exists (select 1 from public.admin_profiles where id = auth.uid())
);
create policy "Admins can read own profile" on public.admin_profiles for select using (id = auth.uid());

-- Use a security definer function to avoid infinite recursion when checking admin_profiles
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (select 1 from public.admin_profiles where id = auth.uid() and role = 'admin');
$$;

create policy "Admins have full access to admin_profiles" on public.admin_profiles for all using (public.is_admin());
