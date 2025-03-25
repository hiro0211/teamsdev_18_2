import { supabase } from "../supabaseClient";
import { getCurrentUserId } from "@/lib/api/auth";

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

// 記事一覧を取得する
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

// 記事詳細を取得する
export const getPostDetail = async (id: string) => {
  const { data, error } = await supabase.from("posts").select("*, user: users(name, id)").eq("id", id).single();

  // エラーが発生した場合はエラーを投げる
  if (error || !data) {
    throw error || new Error("記事を取得できませんでした。");
  }

  return data;
};

export const createPost = async (
  title: string,
  content: string,
  category_id: number,
  image_path: string = "dummy-image-path.jpg",
) => {
  const user_id = (await getCurrentUserId())!;

  const { data, error } = await supabase
    .from("posts")
    .insert([
      {
        user_id,
        title,
        content,
        category_id,
        image_path,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])
    .select();

  if (error) {
    console.error("記事の作成に失敗しました:", error);
    throw new Error("記事の作成に失敗しました。");
  }

  return data;
};

export const uploadImageToStorage = async (file: File, bucketName: string = "posts") => {
  const fileName = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage.from(bucketName).upload(fileName, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    console.error("画像アップロードに失敗しました:", error);
    throw error;
  }

  return supabase.storage.from(bucketName).getPublicUrl(data.path).data.publicUrl;
};
