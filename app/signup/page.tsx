"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpSchema } from "@/lib/validation/signUpSchema";
import { signUpUser } from "@/lib/api/auth";
import { isAuthenticated } from "@/lib/api/auth";

export default function SignUp() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      if (authenticated) {
        router.push("/");
      }
    };
    checkAuth();
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    //初期値
    defaultValues: { name: "", email: "", password: "" },
    //入力値の検証
    resolver: zodResolver(signUpSchema),
  });

  //送信
  const onSubmit: SubmitHandler<SignUpSchema> = async (data) => {
    const { success, message } = await signUpUser(data);
    setMessage(message);

    if (success) {
      router.push("/");
    }

    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <main className="w-full px-4">
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold text-center mb-8">Sign Up</h1>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-bold text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="w-full p-2 border rounded-md bg-gray-100"
                {...register("name", { required: true })}
              />
              <div className="my-3 text-center text-sm text-red-500">{errors.name?.message}</div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-bold text-gray-700">
                Email
              </label>
              <input
                type="text"
                id="email"
                placeholder="Enter your email"
                className="w-full p-2 border rounded-md bg-gray-100"
                {...register("email", { required: true })}
              />
              <div className="my-3 text-center text-sm text-red-500">{errors.email?.message}</div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-bold text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full p-2 border rounded-md bg-gray-100"
                {...register("password", { required: true })}
              />
              <div className="my-3 text-center text-sm text-red-500">{errors.password?.message}</div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-2 bg-blue-500 text-white text-sm rounded-full hover:bg-blue-600 transition-colors"
              >
                Sign Up
              </button>
            </div>
          </form>

          {message && <div className="my-5 text-center text-sm text-red-500">{message}</div>}

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:text-blue-600">
              Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
