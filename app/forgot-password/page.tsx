"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    const redirectTo =
      window.location.hostname === "localhost"
        ? "http://localhost:3000/reset-password"
        : "https://faminova.in/reset-password";

    const { error } =
      await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo,
        }
      );

    setLoading(false);

    if (error) {
      console.error("Password reset error:", error);

      setError(
        "Unable to send the password reset email. Please try again."
      );

      return;
    }

    // Don't reveal whether an account exists for an email.
    setMessage(
      "If an account exists for this email address, a password reset link has been sent."
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-12">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <Link
          href="/"
          className="text-2xl font-bold text-slate-950"
        >
          FamiNova
        </Link>

        <h1 className="mt-8 text-3xl font-bold text-slate-950">
          Forgot password?
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          Enter your registered email address and we will
          send you a secure password reset link.
        </p>

        {message && (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-800">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-7 space-y-5"
        >
          <div>
            <label
              htmlFor="email"
              className="text-sm font-semibold text-slate-700"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-950"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Sending..."
              : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-sm font-semibold text-slate-900 underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </main>
  );
}