-- Partners table: ecosystem partners, sponsors, media, infrastructure
create table if not exists public.partners (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  logo_url      text,
  website_url   text,
  description   text,
  partner_type  text default 'ecosystem' check (partner_type in ('ecosystem', 'sponsor', 'media', 'infrastructure')),
  display_order int default 0,
  status        text default 'draft' check (status in ('draft', 'published')),
  created_at    timestamptz default now()
);
