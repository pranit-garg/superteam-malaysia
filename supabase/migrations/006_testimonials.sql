-- Testimonials table: community quotes and embedded tweets
create table if not exists public.testimonials (
  id               uuid primary key default gen_random_uuid(),
  author_name      text not null,
  author_title     text,
  author_photo_url text,
  content          text not null,
  tweet_url        text,
  is_tweet         boolean default false,
  display_order    int default 0,
  status           text default 'draft' check (status in ('draft', 'published')),
  created_at       timestamptz default now()
);
