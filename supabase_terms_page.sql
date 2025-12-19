
-- Create terms_page table if it doesn't exist
CREATE TABLE IF NOT EXISTS terms_page (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL DEFAULT 'Terms & Conditions',
    description TEXT NOT NULL DEFAULT 'Please read these terms carefully before using our services.',
    content TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS (idempotent operation)
ALTER TABLE terms_page ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to ensure clean state and avoid "already exists" errors
DROP POLICY IF EXISTS "Allow public read access" ON terms_page;
DROP POLICY IF EXISTS "Allow admin write access" ON terms_page;

-- Create policy for public read access
CREATE POLICY "Allow public read access" ON terms_page
    FOR SELECT
    USING (true);

-- Create policy for admin write access (authenticated users)
CREATE POLICY "Allow admin write access" ON terms_page
    FOR ALL
    USING (auth.role() = 'authenticated');

-- Insert initial default data only if table is empty
INSERT INTO terms_page (title, description, content)
SELECT 'Terms & Conditions', 'Please read these terms carefully before using our services.', 'Welcome to our Terms and Conditions. These terms apply to all visitors, users, and others who access or use the Service.'
WHERE NOT EXISTS (SELECT 1 FROM terms_page);

-- Grant permissions to anonymous and authenticated roles (standard setup)
GRANT SELECT ON terms_page TO anon, authenticated;
GRANT ALL ON terms_page TO authenticated;
GRANT ALL ON terms_page TO service_role;
