-- Setup Todos Table for Fablecraft Dashboard
-- Run this SQL in your Supabase SQL Editor (supabase.com -> SQL Editor)

-- Create todos table
CREATE TABLE IF NOT EXISTS public.todos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT false NOT NULL,
  due_date TIMESTAMPTZ,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high')),
  category TEXT,
  order_index INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.todos ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own todos"
  ON public.todos FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own todos"
  ON public.todos FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own todos"
  ON public.todos FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own todos"
  ON public.todos FOR DELETE
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS todos_user_id_idx ON public.todos(user_id);
CREATE INDEX IF NOT EXISTS todos_priority_idx ON public.todos(priority);
CREATE INDEX IF NOT EXISTS todos_category_idx ON public.todos(category);
CREATE INDEX IF NOT EXISTS todos_completed_idx ON public.todos(completed);
CREATE INDEX IF NOT EXISTS todos_due_date_idx ON public.todos(due_date);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_todos_updated_at 
  BEFORE UPDATE ON public.todos 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Enable real-time updates for todos table
ALTER PUBLICATION supabase_realtime ADD TABLE public.todos;

-- Grant permissions
GRANT ALL ON public.todos TO authenticated;
GRANT ALL ON public.todos TO service_role;

-- Success message
SELECT 'Todos table created successfully! Your todo widget should now work.' as message;