-- Stats table: key metrics displayed on the site
create table if not exists public.stats (
  id            uuid primary key default gen_random_uuid(),
  stat_key      text unique not null,
  label         text not null,
  value         int not null default 0,
  suffix        text,
  prefix        text,
  display_order int default 0
);
