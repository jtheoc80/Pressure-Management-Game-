-- Training Academy Progress Tables
-- Run this migration in your Supabase SQL editor

-- Table: lesson_progress
-- Tracks user progress through academy lessons
CREATE TABLE IF NOT EXISTS lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  best_score INTEGER NOT NULL DEFAULT 0,
  completed_at TIMESTAMPTZ,
  attempts INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Unique constraint on user + lesson combination
  UNIQUE(user_id, lesson_id)
);

-- Index for faster lookups by user
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user_id ON lesson_progress(user_id);

-- Table: user_unlocks
-- Tracks which features each user has unlocked through training
CREATE TABLE IF NOT EXISTS user_unlocks (
  user_id TEXT PRIMARY KEY,
  psv_play BOOLEAN NOT NULL DEFAULT FALSE,
  tank_flame_play BOOLEAN NOT NULL DEFAULT FALSE,
  coach_mode_off BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Row Level Security (RLS) policies
-- Enable RLS on both tables
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_unlocks ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only read their own lesson progress
CREATE POLICY "Users can read own lesson progress" ON lesson_progress
  FOR SELECT
  USING (auth.uid()::text = user_id OR auth.role() = 'service_role');

-- Policy: Users can insert their own lesson progress
CREATE POLICY "Users can insert own lesson progress" ON lesson_progress
  FOR INSERT
  WITH CHECK (auth.uid()::text = user_id OR auth.role() = 'service_role');

-- Policy: Users can update their own lesson progress
CREATE POLICY "Users can update own lesson progress" ON lesson_progress
  FOR UPDATE
  USING (auth.uid()::text = user_id OR auth.role() = 'service_role');

-- Policy: Users can read their own unlocks
CREATE POLICY "Users can read own unlocks" ON user_unlocks
  FOR SELECT
  USING (auth.uid()::text = user_id OR auth.role() = 'service_role');

-- Policy: Users can insert their own unlocks
CREATE POLICY "Users can insert own unlocks" ON user_unlocks
  FOR INSERT
  WITH CHECK (auth.uid()::text = user_id OR auth.role() = 'service_role');

-- Policy: Users can update their own unlocks
CREATE POLICY "Users can update own unlocks" ON user_unlocks
  FOR UPDATE
  USING (auth.uid()::text = user_id OR auth.role() = 'service_role');

-- Note: For Clerk auth, user_id will be the Clerk user ID (e.g., "user_2abc...")
-- The service role key is used server-side to bypass RLS

-- Optional: Function to update updated_at timestamp automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for lesson_progress
DROP TRIGGER IF EXISTS update_lesson_progress_updated_at ON lesson_progress;
CREATE TRIGGER update_lesson_progress_updated_at
  BEFORE UPDATE ON lesson_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for user_unlocks
DROP TRIGGER IF EXISTS update_user_unlocks_updated_at ON user_unlocks;
CREATE TRIGGER update_user_unlocks_updated_at
  BEFORE UPDATE ON user_unlocks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
