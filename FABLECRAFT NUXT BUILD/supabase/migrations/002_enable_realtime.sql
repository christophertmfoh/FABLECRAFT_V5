-- Enable real-time for profiles table
-- This allows the dashboard to receive live updates when profile data changes

-- First, ensure the publication exists
DROP PUBLICATION IF EXISTS supabase_realtime CASCADE;
CREATE PUBLICATION supabase_realtime;

-- Add the profiles table to the real-time publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;

-- Note: After running this migration, you may need to restart your Supabase instance
-- or refresh the real-time connections for changes to take effect