"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setError("");

    if (password.length < 8) {
      setError(
        "Password must contain at least 8 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } =
      await supabase.auth.updateUser({
        password,
      });

    setLoading(false);

    if (error) {
      console.error("Password update error:", error);

      setError(
        "Unable to update your password. The reset link may have expired. Please request a new one."
      );
      return;
    }

    setSuccess(true);
  }

  if (success) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="text-5xl">
            ✓
          </div>

          <h1 className="mt-5 text-3xl font-bold text-slate-950">
            Password updated
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Your FamiNova password has been changed successfully.
          </p>

          <Link
            href="/login"
            className="mt-7 block rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white"
          >
            Login to FamiNova
          </Link>
        </div>
      </main>
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
          Create new password
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          Enter a new password for your FamiNova account.
        </p>

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
              htmlFor="password"
              className="text-sm font-semibold text-slate-700"
            >
              New password
            </label>

            <input
              id="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-950"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="text-sm font-semibold text-slate-700"
            >
              Confirm new password
            </label>

            <input
              id="confirmPassword"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-950"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white disabled:opacity-60"
          >
            {loading
              ? "Updating..."
              : "Update Password"}
          </button>
        </form>
      </div>
    </main>
  );
}