-- Run in Supabase SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text, role text not null default 'user' check (role in ('user','admin')),
  created_at timestamptz not null default now());

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title_uz text not null, title_en text not null,
  description_uz text, description_en text,
  image_url text, category text, technologies text[] not null default '{}',
  github_url text, demo_url text, featured boolean not null default false,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now());

create or replace function public.set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;
drop trigger if exists projects_updated on public.projects;
create trigger projects_updated before update on public.projects for each row execute function public.set_updated_at();

-- Auto-create a 'user' profile on signup (role can never be chosen by the client).
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin insert into public.profiles(id,email) values (new.id,new.email) on conflict do nothing; return new; end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- security definer avoids recursive RLS on profiles
create or replace function public.is_admin() returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') $$;

alter table public.profiles enable row level security;
alter table public.projects enable row level security;

drop policy if exists "profiles read own" on public.profiles;
create policy "profiles read own" on public.profiles for select to authenticated using (id = auth.uid());
-- No insert/update/delete policies on profiles: roles are changed only via SQL editor.

drop policy if exists "projects public read" on public.projects;
create policy "projects public read" on public.projects for select to anon, authenticated using (true);
drop policy if exists "projects admin insert" on public.projects;
create policy "projects admin insert" on public.projects for insert to authenticated with check (public.is_admin());
drop policy if exists "projects admin update" on public.projects;
create policy "projects admin update" on public.projects for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "projects admin delete" on public.projects;
create policy "projects admin delete" on public.projects for delete to authenticated using (public.is_admin());

-- Storage bucket
insert into storage.buckets (id,name,public) values ('portfolio-images','portfolio-images',true) on conflict (id) do nothing;
drop policy if exists "images public read" on storage.objects;
create policy "images public read" on storage.objects for select using (bucket_id='portfolio-images');
drop policy if exists "images admin insert" on storage.objects;
create policy "images admin insert" on storage.objects for insert to authenticated with check (bucket_id='portfolio-images' and public.is_admin());
drop policy if exists "images admin update" on storage.objects;
create policy "images admin update" on storage.objects for update to authenticated using (bucket_id='portfolio-images' and public.is_admin());
drop policy if exists "images admin delete" on storage.objects;
create policy "images admin delete" on storage.objects for delete to authenticated using (bucket_id='portfolio-images' and public.is_admin());

-- After creating your user in Authentication > Users, make it admin:
-- update public.profiles set role='admin' where email='YOUR_EMAIL';

-- SAMPLE DATA: placeholders only. Replace/delete from the admin panel. No GitHub/demo links are invented.
insert into public.projects (title_uz,title_en,description_uz,description_en,category,technologies,featured) values
('Smart Finance Dashboard','Smart Finance Dashboard','[Namuna] Moliyaviy ma''lumotlar paneli.','[Sample] Personal finance dashboard.','React','{React,Tailwind CSS}',true),
('MovieHub','MovieHub','[Namuna] Filmlarni qidirish ilovasi.','[Sample] Movie search app.','JavaScript','{JavaScript,REST API}',true),
('E-Commerce Store','E-Commerce Store','[Namuna] Onlayn do''kon.','[Sample] Online store.','Fullstack','{React,Supabase}',true),
('Weather App','Weather App','[Namuna] Ob-havo ilovasi.','[Sample] Weather app.','JavaScript','{JavaScript,REST API}',false),
('Task Manager','Task Manager','[Namuna] Vazifalar menejeri.','[Sample] Task manager.','React','{React,Supabase}',false),
('Restaurant Website','Restaurant Website','[Namuna] Restoran sayti.','[Sample] Restaurant website.','Frontend','{HTML5,CSS3,JavaScript}',false),
('GitHub Profile Explorer','GitHub Profile Explorer','[Namuna] GitHub profillarini ko''rish.','[Sample] Explore GitHub profiles.','React','{React,REST API}',false),
('Expense Tracker','Expense Tracker','[Namuna] Xarajatlar hisobi.','[Sample] Expense tracking.','React','{React,Tailwind CSS}',false),
('Quiz Platform','Quiz Platform','[Namuna] Test platformasi.','[Sample] Quiz platform.','Fullstack','{React,Supabase}',false),
('Admin Dashboard','Admin Dashboard','[Namuna] Boshqaruv paneli.','[Sample] Admin dashboard.','UI/UX','{React,Figma}',false),
('ITLive Course Platform','ITLive Course Platform','[Namuna] Kurs platformasi.','[Sample] Course platform.','Fullstack','{React,Supabase}',false),
('Personal Portfolio','Personal Portfolio','[Namuna] Shaxsiy portfolio.','[Sample] Personal portfolio.','Frontend','{React,Tailwind CSS,Supabase}',false);
