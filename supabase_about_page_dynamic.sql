
-- Create about_page table if it doesn't exist
CREATE TABLE IF NOT EXISTS about_page (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL DEFAULT 'About Aptic Studio',
    description TEXT NOT NULL DEFAULT 'Building Apps That Solve Real Problems',
    content TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS (idempotent operation)
ALTER TABLE about_page ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to ensure clean state and avoid "already exists" errors
DROP POLICY IF EXISTS "Allow public read access" ON about_page;
DROP POLICY IF EXISTS "Allow admin write access" ON about_page;

-- Create policy for public read access
CREATE POLICY "Allow public read access" ON about_page
    FOR SELECT
    USING (true);

-- Create policy for admin write access (authenticated users)
CREATE POLICY "Allow admin write access" ON about_page
    FOR ALL
    USING (auth.role() = 'authenticated');

-- Insert initial default data only if table is empty
INSERT INTO about_page (title, description, content)
SELECT 'About Aptic Studio', 'Building Apps That Solve Real Problems', 'Aptic Studio is a forward-thinking mobile development company dedicated to solving local challenges through innovative technology. We believe in creating apps that make everyday tasks easier and more efficient for our community.'
WHERE NOT EXISTS (SELECT 1 FROM about_page);

-- Grant permissions to anonymous and authenticated roles (standard setup)
GRANT SELECT ON about_page TO anon, authenticated;
GRANT ALL ON about_page TO authenticated;
GRANT ALL ON about_page TO service_role;
