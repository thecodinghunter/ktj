-- ============================================================
-- FIX: Allow anon key to read bookings and manage cars
-- Run this in Supabase → SQL Editor
-- ============================================================

-- ---- BOOKINGS ----

-- Drop the old policy that required authenticated email
drop policy if exists "Allow authenticated read" on public.bookings;
drop policy if exists "Allow authenticated update" on public.bookings;

-- Allow anon (your website's key) to SELECT all bookings
create policy "Allow anon read bookings"
on public.bookings
for select
to anon, authenticated
using (true);

-- Allow anon to UPDATE bookings (for admin status changes)
create policy "Allow anon update bookings"
on public.bookings
for update
to anon, authenticated
using (true)
with check (true);

-- ---- CARS ----

-- Drop the old policies that required authenticated email
drop policy if exists "Allow admin cars insert" on public.cars;
drop policy if exists "Allow admin cars update" on public.cars;
drop policy if exists "Allow admin cars delete" on public.cars;

-- Allow anon to INSERT cars (admin adding new cars)
create policy "Allow anon cars insert"
on public.cars
for insert
to anon, authenticated
with check (true);

-- Allow anon to UPDATE cars (admin editing cars)
create policy "Allow anon cars update"
on public.cars
for update
to anon, authenticated
using (true)
with check (true);

-- Allow anon to DELETE cars (admin deleting cars)
create policy "Allow anon cars delete"
on public.cars
for delete
to anon, authenticated
using (true);
