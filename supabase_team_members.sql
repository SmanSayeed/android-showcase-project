-- Create team_members table
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    image_url TEXT,
    bio TEXT,
    social_links JSONB DEFAULT '[]'::JSONB, -- Array of { platform: string, url: string }
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Public can view team members
CREATE POLICY "Public can view team members" 
ON public.team_members FOR SELECT 
USING (true);

-- Authenticated users (admins) can insert, update, delete
CREATE POLICY "Admins can insert team members" 
ON public.team_members FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Admins can update team members" 
ON public.team_members FOR UPDATE 
TO authenticated 
USING (true);

CREATE POLICY "Admins can delete team members" 
ON public.team_members FOR DELETE 
TO authenticated 
USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_team_members_updated_at
    BEFORE UPDATE ON public.team_members
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
