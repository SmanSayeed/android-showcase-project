-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. About Page Settings
CREATE TABLE IF NOT EXISTS about_page_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_badge_text TEXT DEFAULT 'ApticStudio',
  hero_title_part1 TEXT DEFAULT 'Building Apps That',
  hero_title_highlight TEXT DEFAULT 'Solve Real Problems',
  hero_subtitle TEXT DEFAULT 'We are a creative mobile development company creating innovative solutions for real-world challenges — from AI-powered tools to smart business applications.',
  
  -- Main Content Body
  main_content_title TEXT DEFAULT 'Innovative Software <br/> Solutions from <span class="text-primary">Aptic</span>',
  main_content_text_1 TEXT DEFAULT 'Aptic Studio is a forward-thinking mobile development company dedicated to solving local challenges through innovative technology. We believe in creating apps that make everyday tasks easier and more efficient for our community.',
  main_content_text_2 TEXT DEFAULT 'From our flagship AI Scanner that transforms document management to our upcoming platforms, we''re committed to building practical solutions that truly matter.',

  -- Values Grid Headers
  value_1_title TEXT DEFAULT 'Mission Driven',
  value_1_desc TEXT DEFAULT 'Creating technology solutions that address real challenges faced by our communities.',
  value_2_title TEXT DEFAULT 'Innovation First',
  value_2_desc TEXT DEFAULT 'Leveraging cutting-edge AI and mobile technologies to build smart, intuitive applications.',
  value_3_title TEXT DEFAULT 'User Focused',
  value_3_desc TEXT DEFAULT 'Designing experiences that are accessible, easy to use, and truly helpful for everyday users.',
  value_4_title TEXT DEFAULT 'Global Impact',
  value_4_desc TEXT DEFAULT 'Proud to build solutions that serve and empower our local and global communities.',

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. About Stats
CREATE TABLE IF NOT EXISTS about_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  sub_label TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. About Products
CREATE TABLE IF NOT EXISTS about_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT,
  description TEXT,
  icon_name TEXT DEFAULT 'Code2', -- e.g., 'ScanLine', 'Code2', 'Car'
  color_theme TEXT DEFAULT 'blue', -- 'green', 'blue', 'orange'
  primary_button_text TEXT,
  primary_button_link TEXT DEFAULT '#',
  is_featured BOOLEAN DEFAULT false,
  is_coming_soon BOOLEAN DEFAULT false,
  features TEXT[], -- Array of feature strings
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE about_page_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_products ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public read about settings" ON about_page_settings;
DROP POLICY IF EXISTS "Public insert about settings" ON about_page_settings;
DROP POLICY IF EXISTS "Public update about settings" ON about_page_settings;

DROP POLICY IF EXISTS "Public read about stats" ON about_stats;
DROP POLICY IF EXISTS "Public insert about stats" ON about_stats;
DROP POLICY IF EXISTS "Public update about stats" ON about_stats;

DROP POLICY IF EXISTS "Public read about products" ON about_products;
DROP POLICY IF EXISTS "Public insert about products" ON about_products;
DROP POLICY IF EXISTS "Public update about products" ON about_products;

-- Re-create Policies
CREATE POLICY "Public read about settings" ON about_page_settings FOR SELECT USING (true);
CREATE POLICY "Public insert about settings" ON about_page_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update about settings" ON about_page_settings FOR UPDATE USING (true);

CREATE POLICY "Public read about stats" ON about_stats FOR SELECT USING (true);
CREATE POLICY "Public insert about stats" ON about_stats FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update about stats" ON about_stats FOR UPDATE USING (true);

CREATE POLICY "Public read about products" ON about_products FOR SELECT USING (true);
CREATE POLICY "Public insert about products" ON about_products FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update about products" ON about_products FOR UPDATE USING (true);


-- Seed Data (Only if empty)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM about_page_settings) THEN
        INSERT INTO about_page_settings (id) VALUES (gen_random_uuid());
    END IF;

    IF NOT EXISTS (SELECT 1 FROM about_stats) THEN
        INSERT INTO about_stats (value, label, sub_label, order_index) VALUES
        ('20+', 'Apps Published', NULL, 1),
        ('AI', 'Powered Solutions', NULL, 2),
        ('100%', 'Client Satisfaction', NULL, 3);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM about_products) THEN
        INSERT INTO about_products (title, category, description, icon_name, color_theme, primary_button_text, is_featured, is_coming_soon, features, order_index) VALUES
        ('Aptic AI Scanner', 'QR, OCR & PDF', 'Transform your phone into a powerful document scanner with AI-powered OCR, QR code scanning, and instant PDF creation.', 'ScanLine', 'green', 'Get on Play Store', true, false, ARRAY['Smart OCR Recognition', 'PDF Export & Sharing'], 1),
        ('Aptic Code Studio', 'AI-Powered IDE', 'Your intelligent coding companion. Write, debug, and deploy code directly from your mobile device with AI assistance.', 'Code2', 'blue', 'Visit App Site', false, false, ARRAY['Multi-Language Support', 'Built-in Terminal'], 2),
        ('Tripzy', 'Ride Sharing', 'A revolutionary ride-hailing app designed specifically for local transportation ecosystems. Fair pricing for everyone.', 'Car', 'orange', 'Notify Me', false, true, ARRAY['Easy Booking', 'Real-time Tracking'], 3);
    END IF;
END $$;
