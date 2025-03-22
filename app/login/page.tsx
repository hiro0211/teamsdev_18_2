"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState,useEffect  } from "react";
import { useForm } from "react-hook-form";
import { login, LoginSchema } from "../../lib/api/auth";
import { isAuthenticated } from "@/lib/api/auth"; 

export default function Login() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(LoginSchema) });

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      if (authenticated) {
        router.push("/"); 
      }
    };

    checkAuth();
  }, [router]);

  const onSubmit = async (data: { email: string; password: string }) => {
    setErrorMessage(null);
    const res = await login(data.email, data.password);

    if (res.error) {
      setErrorMessage(res.error);
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {/* Main Content */}
      <main className="w-full px-4">
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold text-center mb-8">Sign In</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-bold text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                {...register("email")}
                className="w-full p-2 border rounded-md bg-gray-100"
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-bold text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                {...register("password")}
                className="w-full p-2 border rounded-md bg-gray-100"
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>

            {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-2 bg-blue-500 text-white text-sm rounded-full hover:bg-blue-600 transition-colors"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-500 hover:text-blue-600">
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
