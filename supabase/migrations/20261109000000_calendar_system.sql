-- Migration: Sistem Kalender Terintegrasi & System Status
-- Tables: calendar_notes, system_status

create table if not exists public.calendar_notes (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  note text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.system_status (
  id int primary key default 1,
  last_ping timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.calendar_notes enable row level security;
alter table public.system_status enable row level security;

-- Default deny: all server access uses service_role
-- Insert initial system_status row if not present
insert into public.system_status (id, last_ping)
values (1, now())
on conflict (id) do nothing;

-- Index for date queries
create index if not exists calendar_notes_date_idx on public.calendar_notes(date);
