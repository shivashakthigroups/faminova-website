"use client";

import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 font-bold text-white">
              F
            </div>

            <div>
              <div className="text-xl font-bold">FamiNova</div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Fertility Education
              </div>
            </div>
          </a>

          <a
            href="/"
            className="text-sm font-semibold text-slate-600 hover:text-slate-950"
          >
            ← Back to Home
          </a>
        </div>
      </header>

      {/* Login */}
      <section className="flex min-h-[calc(100vh-81px)] items-center px-5 py-12">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
              Member Login
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">
              Welcome back
            </h1>

            <p className="mt-4 leading-7 text-slate-600">
              Sign in to access your FamiNova member area.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
            {submitted ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-2xl text-white">
                  ✓
                </div>

                <h2 className="mt-5 text-2xl font-bold text-slate-950">
                  Login submitted
                </h2>

                <p className="mt-3 leading-7 text-slate-600">
                  This is currently a demonstration login form. Secure
                  authentication will be connected in the next stage.
                </p>

                <a
                  href="/"
                  className="mt-6 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white hover:bg-slate-800"
                >
                  Return to Home
                </a>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-bold text-slate-900"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-bold text-slate-900"
                    >
                      Password
                    </label>

                    <a
                      href="/forgot-password"
                      className="text-xs font-semibold text-emerald-700 hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                {/* Remember */}
                <label className="flex items-center gap-3 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    name="remember"
                    className="h-4 w-4 rounded border-slate-300"
                  />
                  Remember me
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full rounded-xl bg-slate-950 px-6 py-4 text-sm font-bold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                >
                  Sign In
                </button>

                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>

                  <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-xs font-medium text-slate-400">
                      NEW TO FAMINOVA?
                    </span>
                  </div>
                </div>

                <a
                  href="/register"
                  className="block w-full rounded-xl border border-slate-300 px-6 py-4 text-center text-sm font-bold text-slate-900 transition hover:bg-slate-50"
                >
                  Create an Account
                </a>
              </form>
            )}
          </div>

          <p className="mt-6 text-center text-xs leading-5 text-slate-500">
            FamiNova provides digital educational and membership services.
            Membership guarantee medical treatment, donor matching,
            pregnancy, biological material or any specific fertility outcome.
          </p>

          <p className="mt-6 text-center text-sm text-slate-500">
            Need help?{" "}
            <a
              href="/contact"
              className="font-semibold text-emerald-700 hover:underline"
            >
              Contact FamiNova
            </a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-8 text-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} FamiNova. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}