import { supabase } from "@/lib/supabaseClient";
import { SignUpSchema } from "../validation/signUpSchema";

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
