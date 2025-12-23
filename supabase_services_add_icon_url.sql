-- Add icon_url to services table
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'services'
        AND column_name = 'icon_url'
    ) THEN
        ALTER TABLE services ADD COLUMN icon_url TEXT;
    END IF;
END $$;
