-- Enable required extensions
create extension if not exists "pgcrypto";

-- Booking status enums as check constraints for portability
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  pickup text not null,
  drop_location text not null,
  travel_date date not null,
  travel_time time not null,
  vehicle text not null,
  passengers integer not null check (passengers > 0),
  name text not null,
  phone text not null,
  utr text,
  payment_status text not null default 'pending' check (payment_status in ('pending', 'partial', 'paid', 'failed')),
  booking_status text not null default 'new' check (booking_status in ('new', 'confirmed', 'cancelled', 'completed')),
  advance_amount numeric(10,2) not null default 500,
  source text not null default 'website',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists bookings_created_at_idx on public.bookings (created_at desc);
create index if not exists bookings_payment_status_idx on public.bookings (payment_status);
create index if not exists bookings_booking_status_idx on public.bookings (booking_status);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists bookings_set_updated_at on public.bookings;
create trigger bookings_set_updated_at
before update on public.bookings
for each row
execute function public.set_updated_at();

alter table public.bookings enable row level security;

-- Allow public booking creation from the booking form.
drop policy if exists "Allow public insert" on public.bookings;
create policy "Allow public insert"
on public.bookings
for insert
to anon, authenticated
with check (true);

-- Allow admin read/update when using authenticated Supabase users.
drop policy if exists "Allow authenticated read" on public.bookings;
create policy "Allow authenticated read"
on public.bookings
for select
to authenticated
using (lower(auth.jwt() ->> 'email') = 'admin@kutchjannattoursandtravels.com');

drop policy if exists "Allow authenticated update" on public.bookings;
create policy "Allow authenticated update"
on public.bookings
for update
to authenticated
using (lower(auth.jwt() ->> 'email') = 'admin@kutchjannattoursandtravels.com')
with check (lower(auth.jwt() ->> 'email') = 'admin@kutchjannattoursandtravels.com');

-- Optional summary view for dashboards.
create or replace view public.booking_stats as
select
  count(*) as total_bookings,
  count(*) filter (where payment_status = 'paid') as paid_bookings,
  count(*) filter (where payment_status = 'partial') as partial_bookings,
  count(*) filter (where payment_status = 'pending') as pending_bookings,
  count(*) filter (where booking_status = 'confirmed') as confirmed_bookings,
  coalesce(sum(advance_amount) filter (where payment_status in ('partial', 'paid')), 0) as advance_collected
from public.bookings;

-- Cars table for dynamic fleet management from admin panel.
create table if not exists public.cars (
  id text primary key,
  name text not null,
  category text not null,
  passengers integer not null check (passengers > 0),
  luggage text not null,
  ac boolean not null default true,
  image text not null,
  description text not null,
  features text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists cars_created_at_idx on public.cars (created_at desc);

drop trigger if exists cars_set_updated_at on public.cars;
create trigger cars_set_updated_at
before update on public.cars
for each row
execute function public.set_updated_at();

alter table public.cars enable row level security;

drop policy if exists "Allow public cars read" on public.cars;
create policy "Allow public cars read"
on public.cars
for select
to anon, authenticated
using (true);

drop policy if exists "Allow admin cars insert" on public.cars;
create policy "Allow admin cars insert"
on public.cars
for insert
to authenticated
with check (lower(auth.jwt() ->> 'email') = 'admin@kutchjannattoursandtravels.com');

drop policy if exists "Allow admin cars update" on public.cars;
create policy "Allow admin cars update"
on public.cars
for update
to authenticated
using (lower(auth.jwt() ->> 'email') = 'admin@kutchjannattoursandtravels.com')
with check (lower(auth.jwt() ->> 'email') = 'admin@kutchjannattoursandtravels.com');

drop policy if exists "Allow admin cars delete" on public.cars;
create policy "Allow admin cars delete"
on public.cars
for delete
to authenticated
using (lower(auth.jwt() ->> 'email') = 'admin@kutchjannattoursandtravels.com');
