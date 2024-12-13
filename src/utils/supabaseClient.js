import { createClient } from "@supabase/supabase-js";
import { supabaseAnonKey, supabaseProjectURL } from "./env";

export const supabaseClient = createClient(supabaseProjectURL, supabaseAnonKey)