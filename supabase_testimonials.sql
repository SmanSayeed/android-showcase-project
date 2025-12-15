-- Testimonials Table
create table testimonials (
  id int primary key generated always as identity,
  name text not null,
  role text not null,
  content text not null,
  image_url text,
  rating int default 5,
  created_at timestamptz default now()
);

-- Enable RLS
alter table testimonials enable row level security;

-- Policies
create policy "Public read testimonials" on testimonials for select using (true);
create policy "Admin all testimonials" on testimonials for all using (auth.role() = 'authenticated');
