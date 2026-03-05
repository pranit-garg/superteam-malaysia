-- Admin profiles table: links auth.users to admin roles
create table if not exists public.admin_profiles (
  id           uuid primary key references auth.users on delete cascade,
  display_name text not null,
  role         text default 'editor' check (role in ('admin', 'editor'))
);

-- ============================================================
-- Row Level Security policies for all tables
-- ============================================================

-- Helper: check if current user is an admin
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.admin_profiles
    where id = auth.uid()
  );
$$ language sql security definer stable;

-- ---------- members ----------
alter table public.members enable row level security;

create policy "Public can read published members"
  on public.members for select
  using (status = 'published');

create policy "Admins have full access to members"
  on public.members for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------- events ----------
alter table public.events enable row level security;

create policy "Public can read published events"
  on public.events for select
  using (status = 'published');

create policy "Admins have full access to events"
  on public.events for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------- partners ----------
alter table public.partners enable row level security;

create policy "Public can read published partners"
  on public.partners for select
  using (status = 'published');

create policy "Admins have full access to partners"
  on public.partners for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------- page_content ----------
alter table public.page_content enable row level security;

create policy "Public can read all page content"
  on public.page_content for select
  using (true);

create policy "Admins have full access to page_content"
  on public.page_content for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------- announcements ----------
alter table public.announcements enable row level security;

create policy "Public can read published announcements"
  on public.announcements for select
  using (status = 'published');

create policy "Admins have full access to announcements"
  on public.announcements for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------- testimonials ----------
alter table public.testimonials enable row level security;

create policy "Public can read published testimonials"
  on public.testimonials for select
  using (status = 'published');

create policy "Admins have full access to testimonials"
  on public.testimonials for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------- stats ----------
alter table public.stats enable row level security;

create policy "Public can read all stats"
  on public.stats for select
  using (true);

create policy "Admins have full access to stats"
  on public.stats for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------- admin_profiles ----------
alter table public.admin_profiles enable row level security;

create policy "Admins can read all profiles"
  on public.admin_profiles for select
  using (public.is_admin());

create policy "Only admin role can manage profiles"
  on public.admin_profiles for all
  using (
    exists (
      select 1 from public.admin_profiles
      where id = auth.uid() and role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.admin_profiles
      where id = auth.uid() and role = 'admin'
    )
  );
