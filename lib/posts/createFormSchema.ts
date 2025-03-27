import { z } from "zod";

export const createFormSchema = z.object({
  title: z.string().min(2, { message: "タイトルは2文字以上で入力してください。" }),
  images: z.object({ url: z.string() }).array(),
  category: z.enum(["value"], { message: "カテゴリーを選択してください。" }),
  content: z
    .string()
    .min(10, { message: "本文は10文字以上で入力してください。" })
    .max(1000, { message: "本文は1000文字以内で入力してください。" }),
});
