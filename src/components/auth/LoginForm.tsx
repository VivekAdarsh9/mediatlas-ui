"use client";

import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    console.log({
      email,
      password,
    });
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">

        <h1 className="text-3xl font-bold mb-2">
          Welcome Back
        </h1>

        <p className="text-slate-500 mb-8">
          Access your Mediatas account.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="block mb-2 text-sm font-medium">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full h-12 border border-slate-300 rounded-xl px-4 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full h-12 border border-slate-300 rounded-xl px-4 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

      </div>
    </div>
  );
}