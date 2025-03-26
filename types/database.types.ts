export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

/**
 * Supabase全体の型定義
 */
export interface Database {
  public: {
    Tables: {
      // ==============================
      // usersテーブル
      // ==============================
      users: {
        Row: {
          /** UUID。PRIMARY KEY。Authなどで自動生成される想定 */
          id: string;
          /** ユーザー名（NOT NULL） */
          name: string;
          /** メールアドレス（NOT NULL） */
          email: string;
          /** プロフィール画像のパス（NULL許可） */
          image_path: string | null;
          /** 作成日時（NOT NULL, default=NOW()） */
          created_at: string;
          /** 更新日時（NOT NULL, default=NOW()） */
          updated_at: string;
        };
        Insert: {
          /** UUID。DB側で自動生成するなら省略可 */
          id?: string;
          name: string;
          email: string;
          image_path?: string | null;
          /** DBがNOW()を自動付与するなら省略可 */
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          image_path?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };

      // ==============================
      // postsテーブル
      // ==============================
      posts: {
        Row: {
          /** AUTO_INCREMENTの整数。PRIMARY KEY */
          id: number;
          /** users.idを参照（UUID） */
          user_id: string;
          /** categories.idを参照（INT） */
          category_id: number;
          /** タイトル（NOT NULL） */
          title: string;
          /** 記事内容（NOT NULL） */
          content: string;
          /** 画像パス（NULL許可） */
          image_path: string | null;
          /** 作成日時（NOT NULL, default=NOW()） */
          created_at: string;
          /** 更新日時（NOT NULL, default=NOW()） */
          updated_at: string;
        };
        Insert: {
          /** AUTO_INCREMENTはDB側で付与されるため省略可 */
          id?: number;
          user_id: string;
          category_id: number;
          title: string;
          content: string;
          image_path?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          category_id?: number;
          title?: string;
          content?: string;
          image_path?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };

      // ==============================
      // categoriesテーブル
      // ==============================
      categories: {
        Row: {
          /** AUTO_INCREMENTの整数。PRIMARY KEY */
          id: number;
          /** カテゴリ名（NOT NULL） */
          name: string;
          /** 作成日時（NOT NULL, default=NOW()） */
          created_at: string;
          /** 更新日時（NOT NULL, default=NOW()） */
          updated_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          created_at?: string;
          updated_at?: string;
        };
      };

      // ==============================
      // commentsテーブル
      // ==============================
      comments: {
        Row: {
          /** AUTO_INCREMENTの整数。PRIMARY KEY */
          id: number;
          /** users.idを参照（UUID） */
          user_id: string;
          /** posts.idを参照（INT） */
          post_id: number;
          /** コメント内容（NOT NULL） */
          content: string;
          /** 作成日時（NOT NULL, default=NOW()） */
          created_at: string;
          /** 更新日時（NOT NULL, default=NOW()） */
          updated_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          post_id: number;
          content: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          post_id?: number;
          content?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      // ビューがある場合はここに定義
    };
    Functions: {
      // ストアドファンクションがある場合はここに定義
    };
    Enums: {
      // 列挙型がある場合はここに定義
    };
  };
}
