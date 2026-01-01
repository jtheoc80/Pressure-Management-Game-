import { createClient } from "@supabase/supabase-js";

// Client-side Supabase client (uses anon key)
export function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

// Server-side Supabase client (uses service role key for admin operations)
export function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase environment variables for admin client");
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// Database types
export interface LessonProgressRow {
  id: string;
  user_id: string;
  lesson_id: string;
  best_score: number;
  completed_at: string | null;
  attempts: number;
  created_at: string;
  updated_at: string;
}

export interface UserUnlocksRow {
  user_id: string;
  psv_play: boolean;
  tank_flame_play: boolean;
  coach_mode_off: boolean;
  created_at: string;
  updated_at: string;
}
