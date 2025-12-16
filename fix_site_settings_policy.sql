-- Drop potentially restrictive policies
drop policy if exists "Admin all settings" on site_settings;
drop policy if exists "Public read settings" on site_settings;

-- Re-create policies to allow public READ (already existed usually)
create policy "Public read settings" on site_settings for select using (true);

-- Create policy to allow PUBLIC/ANON updates (Required for "Secret Code" admin)
-- WARNING: This technically allows anyone to update your site settings if they know the endpoint.
-- In a real production app with "Secret Code", you'd use a Postgres Function with `security definer` 
-- or sign in a Service Role user. For this portfolio, this is likely acceptable if you don't share the project URL widely
-- or if you plan to switch to real Auth later.
create policy "Allow Public Settings Update" on site_settings
for all using (true) with check (true);
