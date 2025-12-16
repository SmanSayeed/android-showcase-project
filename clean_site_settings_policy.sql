-- Drop ALL policies on site_settings so we can start fresh
drop policy if exists "Allow Public Settings Update" on site_settings;
drop policy if exists "Admin all settings" on site_settings;
drop policy if exists "Public read settings" on site_settings;

-- Re-enable RLS
alter table site_settings enable row level security;

-- 1. Allow Public Read (Anyone can see the site name/logo)
create policy "Public read settings" on site_settings 
for select using (true);

-- 2. Allow Public Update/Insert (Required for your Secret Code Admin)
create policy "Allow Public Settings Update" on site_settings
for all using (true) with check (true);
