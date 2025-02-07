import { createClient } from "@supabase/supabase-js";
import { supabaseAnonKey, supabaseProjectURL } from "./env";

export const supabase = createClient(supabaseProjectURL, supabaseAnonKey)
