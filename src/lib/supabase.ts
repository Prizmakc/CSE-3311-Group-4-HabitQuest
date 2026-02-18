import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { supabaseConfig } from "../config/supabaseConfig";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? supabaseConfig.url;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? supabaseConfig.anonKey;

if (
  !supabaseUrl ||
  !supabaseAnonKey ||
  supabaseUrl.includes("REPLACE_WITH_YOUR_PROJECT") ||
  supabaseAnonKey.includes("REPLACE_WITH_YOUR_SUPABASE_ANON_KEY")
) {
  throw new Error(
    "Missing Supabase config. Add keys in src/config/supabaseConfig.ts or set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});
