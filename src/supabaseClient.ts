import { createClient } from "@supabase/supabase-js";

// Uzmi ove vrednosti iz Supabase projekta -> Settings -> API
const SUPABASE_URL = "https://jbwrajkwdfqdzvtozcta.supabase.co"; // tvoja Supabase URL
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impid3Jhamt3ZGZxZHp2dG96Y3RhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1NTQ3NjAsImV4cCI6MjA3NDEzMDc2MH0.aNMBhkk_usF-OnNN-AwT6PeTjxA1fd4GEoJ_iBt5Xoc"; // public anon key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
