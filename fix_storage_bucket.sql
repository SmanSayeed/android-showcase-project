-- Forcefully ensure the 'images' bucket exists and is public
insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do update set public = true;

-- Drop all policies for the images bucket to ensure a clean slate
drop policy if exists "Public Access" on storage.objects;
drop policy if exists "Allow Public Uploads" on storage.objects;
drop policy if exists "Allow Public Update" on storage.objects;
drop policy if exists "Allow Public Delete" on storage.objects;
drop policy if exists "Admin Insert" on storage.objects;

-- Create a single, permissive policy for the 'images' bucket
create policy "Public Access"
on storage.objects for all
using ( bucket_id = 'images' )
with check ( bucket_id = 'images' );

-- Reload the schema cache to apply changes immediately
NOTIFY pgrst, 'reload schema';
