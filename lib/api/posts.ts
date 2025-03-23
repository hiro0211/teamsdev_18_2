import { supabase } from "../supabaseClient";

export type PostType = {
  id: number;
  user_id: string;
  user_name?: string;
  category_id: number;
  category_name?: string;
  title: string;
  content: string;
  image_path?: string;
  created_at?: string;
  updated_at: string;
};

// category_nameとuser_nameをマッピングするための型
export type RawPostType = PostType & {
  users?: { name: string } | null;
  categories?: { name: string } | null;
};

const fetchAllArticles = async (): Promise<PostType[]> => {
  const { data, error } = await supabase
    .from("posts")
    .select(`*, users(name), categories(name)`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("記事データの取得に失敗しました:", error);
    return [];
  }

  return data.map((post) => ({
    ...post,
    user_name: (post.users as { name: string }).name,
    category_name: (post.categories as { name: string }).name,
  }));
};

const fetchUserArticles = async (userId: string): Promise<PostType[]> => {
  const { data, error } = await supabase
    .from("posts")
    .select<string, RawPostType>(`*, users(name), categories(name)`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("ユーザーの記事データの取得に失敗しました:", error);
    return [];
  }

  return (data ?? []).map((post) => ({
    ...post,
    user_name: post.users?.name ?? "",
    category_name: post.categories?.name ?? "",
  }));
};

export async function fetchPaginatedPosts(
  page: number,
  limit: number,
  options?: { userId?: string },
): Promise<{ data: PostType[]; total: number }> {
  // 何件目から何件目まで取得するか(range)を計算
  const start = (page - 1) * limit;
  const end = start + limit - 1;

  // クエリを構築する
  let query = supabase
    .from("posts")
    .select<string, RawPostType>(`*, users(name), categories(name)`, { count: "exact" });

  // もしuserIdが指定されていれば、そのユーザーの投稿だけにフィルターする
  if (options?.userId) {
    query = query.eq("user_id", options.userId);
  }

  // ページネーションと並び順を適用
  const { data, count, error } = await query.range(start, end).order("updated_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  // 取得データを map して、users.name を user_name に、categories.name を category_name に入れる
  const typedData: PostType[] = (data ?? []).map((post) => ({
    ...post,
    user_name: post.users?.name ?? "",
    category_name: post.categories?.name ?? "",
  }));

  return {
    data: typedData,
    total: count ?? 0,
  };
}
// ユーザーの投稿をページネーションで取得 プロフィールページで使用
export async function fetchPaginatedUserPosts(
  userId: string,
  page: number,
  limit: number,
): Promise<{ data: PostType[]; total: number }> {
  const start = (page - 1) * limit;
  const end = start + limit - 1;

  const { data, count, error } = await supabase
    .from("posts")
    .select<string, RawPostType>(`*, users(name), categories(name)`, { count: "exact" })
    .eq("user_id", userId)
    .range(start, end)
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
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
}

// 記事詳細を取得する
export const getPostDetail = async (id: string) => {
  const { data, error } = await supabase.from("posts").select("*, user: users(name, id)").eq("id", id).single();

  // エラーが発生した場合はエラーを投げる
  if (error || !data) {
    throw error || new Error("記事を取得できませんでした。");
  }

  return data;
};

export { fetchAllArticles, fetchUserArticles };
