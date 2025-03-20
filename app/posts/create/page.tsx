"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createPost, uploadImageToStorage } from "@/lib/api/posts";
import { useRouter } from "next/navigation";
// import { getCurrentUserId } from "@/lib/api/auth"; // 認証ユーザーの取得

export const formSchema = z.object({
  title: z.string().min(2, { message: "タイトルは2文字以上で入力してください。" }),
  images: z.object({ url: z.string() }).array(),
  category: z.enum(["value"], { message: "カテゴリーを選択してください。" }),
  content: z
    .string()
    .min(10, { message: "本文は10文字以上で入力してください。" })
    .max(1000, { message: "本文は1000文字以内で入力してください。" }),
});

const CreateBBSPage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      images: [],
      category: undefined,
      content: "",
    },
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target.files?.[0];

    if (file) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    try {
      // const user_id = await getCurrentUserId(); // ログインユーザーのIDを取得
      const user_id = "c9bda6ca-27a5-444c-8839-0d50c3761fae"; // 一時的にダミーのUUIDを使用

      if (!user_id) {
        alert("ログインしていません。");
        return;
      }

      let imageUrl = "dummy-image-path.jpg";
      if (image) {
        imageUrl = await uploadImageToStorage(image, "posts");
      }

      const postData = {
        title: values.title,
        content: values.content,
        category_id: 1,
        image_path: imageUrl,
      };

      const result = await createPost(postData.title, postData.content, postData.category_id, postData.image_path);
      if (result) {
        router.push("/");
      } else {
        alert("記事の投稿に失敗しました");
      }
    } catch (error) {
      console.error("投稿エラー:", error);
      alert("記事の投稿に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full sm:w-3/4 lg:w-1/2 p-4 sm:p-6 mx-auto">
        <h2 className="text-2xl font-bold text-center sm:hidden">Create Blog</h2>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <FormLabel className="text-xl sm:text-2xl font-bold">Title</FormLabel>
              <FormControl className="w-full ">
                <Input placeholder="タイトルを入力" className="focus-visible:ring-0 " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={() => (
            <FormItem>
              <FormControl>
                <Card className="border-dashed border-gray-400 w-full">
                  {preview ? (
                    <div>
                      <Image src={preview} alt="Preview" layout="responsive" width={400} height={300} />
                      <Button onClick={removeImage} type="button">
                        ×
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m-7 7l7-7 7 7"></path>
                      </svg>
                      <label>
                        <Input
                          type="file"
                          id="fileUpload"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="mt-2 rounded-full bg-sky-500 hover:bg-blue-500 text-black mb-4"
                          onClick={() => document.getElementById("fileUpload")?.click()}
                        >
                          Upload Image
                        </Button>
                      </label>
                    </div>
                  )}
                </Card>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel className="text-sm font-semibold">Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-32 text-sm border-gray-300 shadow-sm">
                      <SelectValue placeholder="カテゴリーを選択" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="value">value</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="ブログ本文を入力"
                  className="bg-gray-100 shadow-md w-full focus-visible:ring-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" className="bg-sky-500 hover:bg-blue-500" disabled={isSubmitting}>
            {isSubmitting ? "Posting..." : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateBBSPage;
