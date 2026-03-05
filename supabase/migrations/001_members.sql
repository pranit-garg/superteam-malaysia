-- Members table: community members and core team
create table if not exists public.members (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  title         text,
  company       text,
  bio           text,
  photo_url     text,
  twitter_url   text,
  skills        text[] default '{}',
  badges        text[] default '{}',
  achievements  jsonb,
  is_core_team  boolean default false,
  is_featured   boolean default false,
  display_order int default 0,
  status        text default 'draft' check (status in ('draft', 'published')),
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);
