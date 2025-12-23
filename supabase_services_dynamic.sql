-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY, -- using text id like 'android', 'ios' to match existing routes
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  full_description TEXT,
  features TEXT[],
  icon_name TEXT DEFAULT 'Smartphone',
  color_theme TEXT DEFAULT 'from-[#3b82f6] to-[#06b6d4]',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Admin all services" ON services FOR ALL USING (auth.role() = 'authenticated');

-- Insert default data
INSERT INTO services (id, title, description, full_description, features, icon_name, color_theme, order_index)
VALUES 
(
  'android', 
  'Android Application Development', 
  'High-quality Android applications built with modern technologies and best practices for optimal performance.', 
  'We specialize in creating robust, scalable, and user-friendly Android applications. Using Kotlin and Jetpack Compose, we deliver native experiences that leverage the full power of the Android ecosystem. From concept to deployment, we ensure your app is secure, performant, and ready for millions of users.', 
  ARRAY['Native Android Development (Kotlin)', 'Jetpack Compose UI', 'Offline-first Architecture', 'Google Play Store Optimization'], 
  'Smartphone', 
  'from-[#3b82f6] to-[#06b6d4]',
  1
),
(
  'ios', 
  'iOS Application Development', 
  'Professional iOS applications designed with intuitive interfaces and seamless user experiences.', 
  'Our iOS development team crafts elegant and powerful apps for iPhone and iPad. utilizing Swift and SwiftUI. We adhere strictly to Apple''s Human Interface Guidelines to provide users with the polished experience they expect. Whether it''s a consumer app or an enterprise solution, we deliver excellence.', 
  ARRAY['Native iOS Development (Swift)', 'SwiftUI & UIKit', 'Core Data & CloudKit', 'App Store Compliance'], 
  'Smartphone', 
  'from-[#c084fc] to-[#7c3aed]',
  2
),
(
  'game', 
  'Android Game Development', 
  'Engaging mobile games with stunning graphics and immersive gameplay for Android platform.', 
  'We bring game ideas to life with Unity and modern Android game engines. Our expertise covers 2D and 3D games, optimizing graphics and performance for a wide range of devices. We focus on player retention, smooth mechanics, and monetization strategies.', 
  ARRAY['Unity & Unreal Engine', '2D & 3D Game Design', 'Performance Optimization', 'In-App Purchases & Ads'], 
  'Gamepad2', 
  'from-[#ec4899] to-[#f43f5e]',
  3
),
(
  'ui-ux', 
  'UI/UX Design', 
  'Creative and intuitive user interface designs that enhance user engagement and satisfaction.', 
  'We design user interfaces that are not only visually appealing but also easy to use. Our process starts with wireframing and prototyping to ensure the user flow is logical and efficient. We use modern design tools like Figma to create high-fidelity mockups that align with your brand identity.', 
  ARRAY['User Research & Personas', 'Wireframing & Prototyping', 'Design Systems (Figma)', 'Usability Testing'], 
  'Layout', 
  'from-[#f97316] to-[#ea580c]',
  4
)
ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  full_description = EXCLUDED.full_description,
  features = EXCLUDED.features,
  icon_name = EXCLUDED.icon_name,
  color_theme = EXCLUDED.color_theme;
