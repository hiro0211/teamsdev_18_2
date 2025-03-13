import { supabase } from "@/lib/supabaseClient";
import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: z.string().min(6, "パスワードは6文字以上で入力してください"),
});

export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error("ログインエラー", error.message);
    return { error: error.message };
  }

  return { user: data.user };
};

export const getCurrentUserId = async (): Promise<string | null> => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    console.error("ログインユーザーの取得に失敗しました:", error);
    return null;
  }

  return user.id;
};
