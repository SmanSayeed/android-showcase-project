    -- Drop existing prohibitive policy if it exists (or just create a new permissive one)
    drop policy if exists "Admin Insert" on storage.objects;

    -- Create a policy that allows anyone to insert images
    -- WARNING: This allows unauthenticated uploads. Since you are using a custom
    -- "Secret Code" auth that doesn't actually sign into Supabase, this is required
    -- unless you implement real Supabase Auth.
    create policy "Allow Public Uploads" on storage.objects
    for insert with check ( bucket_id = 'images' );

    -- Also allow update/delete if needed
    create policy "Allow Public Update" on storage.objects
    for update using ( bucket_id = 'images' );

    create policy "Allow Public Delete" on storage.objects
    for delete using ( bucket_id = 'images' );
