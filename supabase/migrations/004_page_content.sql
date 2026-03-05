-- Page content table: CMS-style key-value content blocks
create table if not exists public.page_content (
  id           uuid primary key default gen_random_uuid(),
  section_key  text unique not null,
  content_type text default 'text' check (content_type in ('text', 'markdown', 'image', 'json')),
  value        text not null,
  metadata     jsonb,
  updated_by   text,
  updated_at   timestamptz default now()
);
