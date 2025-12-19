-- Create a table for the Privacy Policy page content
create table if not exists public.privacy_policy_page (
  id uuid default gen_random_uuid() primary key,
  title text not null default 'Privacy Policy',
  description text default 'Your privacy is important to us. This policy outlines how Aptic Studio collects, uses, and protects your personal information.',
  content text default '<p>We are currently updating our privacy policy. Please check back later.</p>',
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.privacy_policy_page enable row level security;

-- Drop existing policies if they exist to avoid errors on re-run
drop policy if exists "Enable read access for all users" on public.privacy_policy_page;
drop policy if exists "Enable insert for authenticated users only" on public.privacy_policy_page;
drop policy if exists "Enable update for authenticated users only" on public.privacy_policy_page;

-- Create policies
create policy "Enable read access for all users"
  on public.privacy_policy_page for select
  using (true);

-- Allow admin to insert/update (we will strictly enforce this via server actions or app logic)
create policy "Enable write access for service role"
  on public.privacy_policy_page for all
  using (auth.role() = 'service_role');
  
-- Also allow authenticated users (which are likely admins in this context based on existing pattern) to update
-- Ideally we should check for specific admin role but following existing patterns:
create policy "Enable update for authenticated users only"
  on public.privacy_policy_page for update
  using (auth.role() = 'authenticated');
  
create policy "Enable insert for authenticated users only"
  on public.privacy_policy_page for insert
  with check (auth.role() = 'authenticated');

-- Insert default content if the table is empty
insert into public.privacy_policy_page (title, description, content)
select 
  'Privacy Policy', 
  'Your privacy is important to us. This policy outlines how Aptic Studio collects, uses, and protects your personal information.',
  '<h2>1. Information We Collect</h2><p>We collect information you provide directly to us, such as when you create or modify your account...</p>'
where not exists (select 1 from public.privacy_policy_page);

-- Force schema cache reload to ensure PostgREST sees the new table
NOTIFY pgrst, 'reload schema';
