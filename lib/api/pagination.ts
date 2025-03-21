import { supabase } from "@/lib/supabaseClient";
import { PostType, RawPostType } from "./posts";

export async function fetchPaginatedPosts(page: number, limit: number): Promise<{ data: PostType[]; total: number }> {
  try {
    // 何件目から何件目まで取得するか(range)を計算
    const start = (page - 1) * limit;
    const end = start + limit - 1;

    // postsテーブルからデータを取得（count: "exact"で全件数も取得）
    const { data, count, error } = await supabase
      .from("posts")
      .select(`*,users (name),categories (name)`, { count: "exact" })
      .range(start, end) // ページネーションの範囲
      .order("updated_at", { ascending: false });

    if (error) {
      alert(error.message);
      return { data: [], total: 0 };
    }

    // 取得データを map して、users.name を user_name に、categories.name を category_name に入れる
    const typedData: PostType[] = ((data as RawPostType[]) ?? []).map((post) => ({
      ...post,
      user_name: post.users?.name ?? "", // user_name に代入
      category_name: post.categories?.name ?? "", // category_name に代入
    }));

    return {
      data: typedData,
      total: count ?? 0,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("未知のエラーが検出されました。");
    }
    return { data: [], total: 0 };
  }
}

// ユーザーの投稿をページネーションで取得 プロフィールページで使用
export async function fetchPaginatedUserPosts(
  userId: string,
  page: number,
  limit: number,
): Promise<{ data: PostType[]; total: number }> {
  try {
    const start = (page - 1) * limit;
    const end = start + limit - 1;

    const { data, count, error } = await supabase
      .from("posts")
      .select(`*, users(name), category(name)`, { count: "exact" })
      .eq("user_id", userId)
      .range(start, end)
      .order("updated_at", { ascending: false });

    if (error) {
      alert(error.message);
      return { data: [], total: 0 };
    }

    // 取得データを map して、users.name を user_name に、categories.name を category_name に入れる
    const typedData: PostType[] = ((data as RawPostType[]) ?? []).map((post) => ({
      ...post,
      user_name: post.users?.name ?? "", // user_name に代入
      category_name: post.categories?.name ?? "", // category_name に代入
    }));

    return {
      data: typedData,
      total: count ?? 0,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("未知のエラーが検出されました。");
    }
    return { data: [], total: 0 };
  }
}
