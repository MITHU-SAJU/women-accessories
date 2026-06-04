import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if keys are actually configured and not default placeholders
const isConfigured = 
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes("your-project-id") && 
  !supabaseAnonKey.includes("your-supabase-anonymous-key");

export const isSupabaseConfigured = !!isConfigured;

// Initialize the client. If not configured, export a mock or null client to avoid exceptions
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
