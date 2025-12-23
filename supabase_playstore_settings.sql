-- Add play_store_url column to site_settings table if it doesn't exist

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'site_settings'
        AND column_name = 'play_store_url'
    ) THEN
        ALTER TABLE site_settings ADD COLUMN play_store_url TEXT DEFAULT '';
    END IF;
END $$;
