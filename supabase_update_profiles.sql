
-- Profiles (Links to Auth Users)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  role text not null check (role in ('super-admin', 'admin', 'user')),
  created_at timestamptz default now()
);

-- Enable RLS
alter table profiles enable row level security;

-- Profiles Policies
create policy "Public read profiles" on profiles for select using (true);

-- Only super-admin can insert/update/delete profiles (technically handled via Supabase Admin in Server Actions, but good for completeness)
-- For client-side, we might restrict this, but we are using Server Actions with Service Role for management.
-- So standard RLS for "viewing" could be:
create policy "Authenticated view profiles" on profiles for select using (auth.role() = 'authenticated');
