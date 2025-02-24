import Link from "next/link";

export default function SignUp() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <main className="w-full px-4">
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold text-center mb-8">Sign Up</h1>
          
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-bold text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="w-full p-2 border rounded-md bg-gray-100"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-bold text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full p-2 border rounded-md bg-gray-100"
              />
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
              />
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
};