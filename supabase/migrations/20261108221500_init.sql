create table if not exists public.folders (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  folder_id uuid references public.folders(id) on delete cascade,
  title text not null,
  drive_file_id text not null,
  slug text not null unique,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists videos_folder_idx on public.videos(folder_id);

alter table public.folders enable row level security;
alter table public.videos enable row level security;

-- Default deny: tidak ada policy untuk anon/authenticated.
-- Semua akses data lewat server pakai service_role.

insert into public.folders (name, slug, sort_order)
values ('Umum', 'umum', 0)
on conflict (slug) do nothing;

insert into public.videos (folder_id, title, drive_file_id, slug, sort_order, is_active)
select id, 'Video Profil', '14cxv3LFQLMjXRzVAT5Tsbb8QKzTUCYeS', 'video-profil', 0, true
from public.folders
where slug = 'umum'
on conflict (slug) do nothing;
