import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  "https://vpdhlsnakvnxrfglphmn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwZGhsc25ha3ZueHJmZ2xwaG1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMzkyOTIsImV4cCI6MjA5MTgxNTI5Mn0.VVUu7eM6AKqtgWasEU7yLtmS2tSe-d5rUqTmWHLBaC8",
  {
    auth: {
      persistSession: true,
      storage: typeof window !== "undefined" ? window.localStorage : undefined,
    }
  }
)
