"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Replace with API call to subscribe the email
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <p className="text-primary font-medium">
        Thanks for joining! Weekly insights will arrive in your inbox.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-2 max-w-md mx-auto"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        aria-label="Email address"
        className="flex-1 bg-white border border-outline-variant px-6 py-4 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none"
      />
      <button
        type="submit"
        className="bg-primary text-on-primary px-8 py-4 rounded-xl text-label-md font-medium hover:bg-surface-tint transition-colors"
      >
        Join Guide
      </button>
    </form>
  );
}
