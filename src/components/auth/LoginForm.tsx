"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, ShieldCheck, Stethoscope } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="w-full max-w-[440px] relative z-10">
      {/* Card Head */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-surface-container-high mb-4">
          <Stethoscope className="text-primary" size={32} />
        </div>
        <h1 className="font-heading text-[32px] leading-[40px] font-semibold text-on-surface tracking-tight mb-1">
          Welcome Back
        </h1>
        <p className="text-base text-on-surface-variant">
          Clinical clarity starts here.
        </p>
      </div>

      {/* Glass Card */}
      <div className="glass-card rounded-xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="text-sm font-medium tracking-[0.01em] text-on-surface"
            >
              Email Address
            </label>
            <div className="relative group">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors"
                size={20}
              />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@medical-institution.com"
                className="w-full h-12 pl-12 pr-4 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-base placeholder:text-outline-variant"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="text-sm font-medium tracking-[0.01em] text-on-surface"
              >
                Password
              </label>
              <Link
                href="#"
                className="text-sm font-medium tracking-[0.01em] text-primary hover:underline transition-all"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors"
                size={20}
              />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full h-12 pl-12 pr-4 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-base placeholder:text-outline-variant"
              />
            </div>
          </div>

          {/* CTA */}
          <button
            type="submit"
            className="w-full h-12 bg-primary text-on-primary text-sm font-medium tracking-[0.01em] rounded-lg hover:bg-on-primary-fixed-variant transition-colors shadow-sm active:scale-[0.98] duration-200"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-outline-variant" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-outline text-xs font-semibold tracking-[0.02em]">
              Authorized Access Only
            </span>
          </div>
        </div>

        {/* Secondary Action */}
        <div className="text-center">
          <p className="text-base text-on-surface-variant">
            New to Mediatas?{" "}
            <Link
              href="#"
              className="text-primary font-semibold hover:underline"
            >
              Request an Account
            </Link>
          </p>
        </div>
      </div>

      {/* Trust Badge */}
      <div className="mt-8 bg-[#EFF6FF] border-l-4 border-primary p-4 rounded-r-lg">
        <div className="flex gap-4">
          <ShieldCheck className="text-primary shrink-0" size={24} />
          <div>
            <p className="text-sm font-bold tracking-[0.01em] text-primary">
              Secure Verification
            </p>
            <p className="text-xs font-semibold tracking-[0.02em] text-muted-foreground">
              Your clinical data is protected by end-to-end encryption and
              HIPAA-compliant architecture.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}