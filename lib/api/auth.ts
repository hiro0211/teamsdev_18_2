import { supabase } from "@/lib/supabaseClient";
import { z } from "zod";
import { SignUpSchema } from "../validation/signUpSchema";

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

export const signUpUser = async (data: SignUpSchema) => {
  try {
    // Supabase Auth にユーザー登録
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (authError) {
      throw new Error(authError.message);
    }

    // ユーザーID取得
    const userId = authData.user?.id;
    if (!userId) {
      throw new Error("ユーザーIDの取得に失敗しました。");
    }

    // DB users テーブルに登録
    const { error: dbError } = await supabase.from("users").insert([
      {
        id: userId,
        name: data.name,
        email: data.email,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);

    if (dbError) {
      throw new Error(dbError.message);
    }

    return { success: true, message: "登録が完了しました" };
  } catch (error) {
    return { success: false, message: `エラーが発生しました。${error}` };
  }
};
