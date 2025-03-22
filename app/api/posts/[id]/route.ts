import { supabase } from "@/lib/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

type PostData = {
  user_id: string;
};

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    //認証情報取得関数未作成のため仮でgetSessionにしてコメントアウト
    // const session =await getSession(req)
    // if(!session){
    //     return NextResponse.json({error:"Unauthorized"},{status:401})
    // }

    const postId = params.id;
    const body = await req.json();
    const { category_id, title, content, image_path, updated_at } = body;

    if (!category_id || !title || !content || !image_path || !updated_at) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    //記事の作成者を取得
    const { data: post, error: fetchError } = await supabase
      .from("posts")
      .select("user_id")
      .eq("id", postId)
      .single<PostData>();

    if (fetchError || !post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    //認証情報更新関数未作成のためsessionにエラーが出るのでコメントアウト
    // if(post.user_id !== session.user.id){
    //     return NextResponse.json({error:"Forbidden:Not the owner"},{status:403})
    // }

    //記事を更新
    const { error: updateError } = await supabase
      .from("posts")
      .update({ category_id, title, content, image_path, updated_at })
      .eq("id", postId);

    if (updateError) {
      return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
    }

    return NextResponse.json({ message: "Post updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating post", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
