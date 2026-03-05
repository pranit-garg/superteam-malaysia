-- Announcements table: pinned banners, news items
create table if not exists public.announcements (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  body         text,
  body_md      text,
  image_url    text,
  link_url     text,
  is_pinned    boolean default false,
  status       text default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at   timestamptz default now()
);
