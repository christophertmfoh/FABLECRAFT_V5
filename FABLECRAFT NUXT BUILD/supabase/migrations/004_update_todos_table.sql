-- Update todos table to add priority and category columns

-- Add priority column if it doesn't exist
ALTER TABLE public.todos 
ADD COLUMN IF NOT EXISTS priority TEXT 
CHECK (priority IN ('low', 'medium', 'high'));

-- Add category column if it doesn't exist  
ALTER TABLE public.todos
ADD COLUMN IF NOT EXISTS category TEXT;

-- Create index on priority for faster filtering
CREATE INDEX IF NOT EXISTS todos_priority_idx ON public.todos(priority);

-- Create index on category for faster filtering
CREATE INDEX IF NOT EXISTS todos_category_idx ON public.todos(category);