-- Dashboard Tables Migration
-- Creates tables for todos, projects, writing goals, and writing statistics

-- =====================================================
-- TODOS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.todos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  due_date TIMESTAMP WITH TIME ZONE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for todos
CREATE INDEX IF NOT EXISTS todos_user_id_idx ON public.todos(user_id);
CREATE INDEX IF NOT EXISTS todos_completed_idx ON public.todos(completed);

-- RLS for todos
ALTER TABLE public.todos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own todos" 
  ON public.todos FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own todos" 
  ON public.todos FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own todos" 
  ON public.todos FOR UPDATE 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own todos" 
  ON public.todos FOR DELETE 
  USING (auth.uid() = user_id);

-- =====================================================
-- PROJECTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT CHECK (type IN ('novel', 'short-story', 'poetry', 'screenplay', 'blog', 'other')) DEFAULT 'other',
  status TEXT CHECK (status IN ('draft', 'in-progress', 'review', 'completed', 'published', 'archived')) DEFAULT 'draft',
  genre TEXT,
  word_count INTEGER DEFAULT 0,
  target_word_count INTEGER,
  content JSONB, -- Store chapters/sections as JSON
  tags TEXT[],
  is_public BOOLEAN DEFAULT false,
  last_edited_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for projects
CREATE INDEX IF NOT EXISTS projects_user_id_idx ON public.projects(user_id);
CREATE INDEX IF NOT EXISTS projects_status_idx ON public.projects(status);
CREATE INDEX IF NOT EXISTS projects_type_idx ON public.projects(type);
CREATE INDEX IF NOT EXISTS projects_updated_at_idx ON public.projects(updated_at DESC);

-- RLS for projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own projects" 
  ON public.projects FOR SELECT 
  USING (auth.uid() = user_id OR is_public = true);

CREATE POLICY "Users can create their own projects" 
  ON public.projects FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects" 
  ON public.projects FOR UPDATE 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects" 
  ON public.projects FOR DELETE 
  USING (auth.uid() = user_id);

-- =====================================================
-- WRITING GOALS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.writing_goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  daily_goal INTEGER DEFAULT 500,
  weekly_goal INTEGER DEFAULT 3500,
  monthly_goal INTEGER DEFAULT 15000,
  yearly_goal INTEGER DEFAULT 180000,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for writing goals
CREATE INDEX IF NOT EXISTS writing_goals_user_id_idx ON public.writing_goals(user_id);

-- RLS for writing goals
ALTER TABLE public.writing_goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own goals" 
  ON public.writing_goals FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own goals" 
  ON public.writing_goals FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own goals" 
  ON public.writing_goals FOR UPDATE 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- WRITING STATISTICS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.writing_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  words_written INTEGER DEFAULT 0,
  minutes_written INTEGER DEFAULT 0,
  projects_worked_on UUID[], -- Array of project IDs
  goal_met BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, date)
);

-- Indexes for writing stats
CREATE INDEX IF NOT EXISTS writing_stats_user_id_idx ON public.writing_stats(user_id);
CREATE INDEX IF NOT EXISTS writing_stats_date_idx ON public.writing_stats(date DESC);
CREATE INDEX IF NOT EXISTS writing_stats_user_date_idx ON public.writing_stats(user_id, date DESC);

-- RLS for writing stats
ALTER TABLE public.writing_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own stats" 
  ON public.writing_stats FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own stats" 
  ON public.writing_stats FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stats" 
  ON public.writing_stats FOR UPDATE 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- WRITING SESSIONS TABLE (for tracking writing time)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.writing_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  ended_at TIMESTAMP WITH TIME ZONE,
  words_start INTEGER DEFAULT 0,
  words_end INTEGER,
  duration_minutes INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for writing sessions
CREATE INDEX IF NOT EXISTS writing_sessions_user_id_idx ON public.writing_sessions(user_id);
CREATE INDEX IF NOT EXISTS writing_sessions_project_id_idx ON public.writing_sessions(project_id);
CREATE INDEX IF NOT EXISTS writing_sessions_started_at_idx ON public.writing_sessions(started_at DESC);

-- RLS for writing sessions
ALTER TABLE public.writing_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own sessions" 
  ON public.writing_sessions FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own sessions" 
  ON public.writing_sessions FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sessions" 
  ON public.writing_sessions FOR UPDATE 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- TRIGGER FUNCTIONS
-- =====================================================

-- Update timestamp trigger (reusable)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply update timestamp triggers
CREATE TRIGGER update_todos_updated_at 
  BEFORE UPDATE ON public.todos 
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at 
  BEFORE UPDATE ON public.projects 
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_writing_goals_updated_at 
  BEFORE UPDATE ON public.writing_goals 
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to calculate writing streak
CREATE OR REPLACE FUNCTION public.calculate_writing_streak(p_user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  streak INTEGER := 0;
  check_date DATE := CURRENT_DATE;
  found_gap BOOLEAN := false;
BEGIN
  WHILE NOT found_gap LOOP
    IF EXISTS (
      SELECT 1 FROM public.writing_stats
      WHERE user_id = p_user_id 
      AND date = check_date 
      AND goal_met = true
    ) THEN
      streak := streak + 1;
      check_date := check_date - INTERVAL '1 day';
    ELSE
      found_gap := true;
    END IF;
  END LOOP;
  
  RETURN streak;
END;
$$ LANGUAGE plpgsql;

-- Function to get user's total words written
CREATE OR REPLACE FUNCTION public.get_total_words_written(p_user_id UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN COALESCE(
    (SELECT SUM(words_written) FROM public.writing_stats WHERE user_id = p_user_id),
    0
  );
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- INITIAL DATA SETUP
-- =====================================================

-- Create default writing goals for new users
CREATE OR REPLACE FUNCTION public.create_default_writing_goals()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.writing_goals (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create default goals when user signs up
CREATE TRIGGER on_auth_user_created_goals
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.create_default_writing_goals();

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;