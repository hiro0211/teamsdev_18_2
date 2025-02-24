"use client";

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      images: [],
      category: undefined,
      content: "",
    },
  });

  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file)); //画像をプレビュー
    }
  };

  const removeImage = () => {
    setImage(null);
  };

    const onSubmit=()=>{
        console.log("test");
    };
  const onSubmit = (data: any) => {
    console.log(data);
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
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Card className="border-dashed border-gray-400 w-full">
                  {image ? (
                    <div>
                      <img src={image} alt="Preview" />
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
          <Button type="submit" className="bg-sky-500 hover:bg-blue-500">
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateBBSPage;
