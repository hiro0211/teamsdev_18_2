import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

// SupabaseのURLとAnonキーを環境変数から取得
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 環境変数が設定されていない場合はエラーを投げる
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URLかAnon Keyが設定されていません");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
