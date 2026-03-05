-- Events table: meetups, hackathons, workshops synced from Luma or manually created
create table if not exists public.events (
  id               uuid primary key default gen_random_uuid(),
  luma_id          text unique,
  title            text not null,
  description      text,
  cover_url        text,
  start_at         timestamptz not null,
  end_at           timestamptz,
  timezone         text default 'Asia/Kuala_Lumpur',
  location_name    text,
  location_address text,
  meeting_url      text,
  luma_url         text,
  is_featured      boolean default false,
  event_type       text default 'meetup',
  status           text default 'draft' check (status in ('draft', 'published')),
  synced_at        timestamptz,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);
