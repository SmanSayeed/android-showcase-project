-- Site Settings
create table site_settings (
  id int primary key generated always as identity,
  site_name text not null default 'My Portfolio',
  logo_url text,
  contact_email text,
  whatsapp_number text
);
insert into site_settings (site_name) values ('My Portfolio');

-- Projects
create table projects (
  id int primary key generated always as identity,
  title text not null,
  description text,
  full_description text, -- For rich text
  image_url text,
  tags text[], -- Array of strings
  features text[], -- Array of strings
  created_at timestamptz default now()
);

-- Social Links
create table social_links (
  id int primary key generated always as identity,
  platform text not null,
  url text not null,
  is_active boolean default true,
  icon_name text -- e.g. "Github", "Twitter"
);

-- Contact Messages
create table contact_messages (
  id int primary key generated always as identity,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now(),
  read boolean default false
);

-- Enable RLS (Row Level Security)
alter table site_settings enable row level security;
alter table projects enable row level security;
alter table social_links enable row level security;
alter table contact_messages enable row level security;

-- Policies (Public Read, Admin Write)

-- Site Settings
create policy "Public read settings" on site_settings for select using (true);
create policy "Admin all settings" on site_settings for all using (auth.role() = 'authenticated');

-- Projects
create policy "Public read projects" on projects for select using (true);
create policy "Admin all projects" on projects for all using (auth.role() = 'authenticated');

-- Social Links
create policy "Public read socials" on social_links for select using (true);
create policy "Admin all socials" on social_links for all using (auth.role() = 'authenticated');

-- Contact Messages
-- FIX: For INSERT policies, using STRICTLY 'with check'
create policy "Anon create messages" on contact_messages for insert with check (true);
create policy "Admin read messages" on contact_messages for select using (auth.role() = 'authenticated');

-- Storage Bucket for Images (If not already created via UI)
insert into storage.buckets (id, name, public) 
values ('images', 'images', true)
on conflict (id) do nothing;

-- Storage Policies
-- Note: 'storage.objects' policies sometimes require specific syntax depending on Supabase version, 
-- but these are standard.
create policy "Public Access" on storage.objects for select using ( bucket_id = 'images' );
create policy "Admin Insert" on storage.objects for insert with check ( bucket_id = 'images' and auth.role() = 'authenticated' );
