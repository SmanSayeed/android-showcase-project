-- 1. Force PostgREST to refresh its schema cache
NOTIFY pgrst, 'reload config';

-- 2. Verify the table exists by selecting one row
SELECT * FROM about_page_settings LIMIT 1;
