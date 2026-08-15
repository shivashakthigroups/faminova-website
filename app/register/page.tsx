"use client";

import { FormEvent, useState } from "react";

export default function RegisterPage() {
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

      {/* Registration */}
      <section className="px-5 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
              FamiNova Membership
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Create your account
            </h1>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
              Register to access FamiNova&apos;s digital educational and
              membership services.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
            {submitted ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-2xl text-white">
                  ✓
                </div>

                <h2 className="mt-5 text-2xl font-bold text-slate-950">
                  Registration details received
                </h2>

                <p className="mt-3 leading-7 text-slate-600">
                  This demonstration form has been submitted successfully.
                  Account creation and secure authentication will be connected
                  in the next stage.
                </p>

                <a
                  href="/"
                  className="mt-6 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white hover:bg-slate-800"
                >
                  Return to Home
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-bold text-slate-900"
                  >
                    Full Name
                  </label>

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

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

                {/* Mobile */}
                <div>
                  <label
                    htmlFor="mobile"
                    className="mb-2 block text-sm font-bold text-slate-900"
                  >
                    Mobile Number
                  </label>

                  <input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                {/* Country */}
                <div>
                  <label
                    htmlFor="country"
                    className="mb-2 block text-sm font-bold text-slate-900"
                  >
                    Country
                  </label>

                  <select
                    id="country"
                    name="country"
                    defaultValue="India"
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  >
                    <option value="India">India</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-bold text-slate-900"
                  >
                    Password
                  </label>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    placeholder="Create a password"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />

                  <p className="mt-2 text-xs text-slate-500">
                    Use at least 8 characters.
                  </p>
                </div>

                {/* Terms */}
                <div className="rounded-2xl bg-slate-50 p-5">
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="terms"
                      required
                      className="mt-1 h-4 w-4 rounded border-slate-300"
                    />

                    <span className="text-sm leading-6 text-slate-600">
                      I agree to the{" "}
                      <a
                        href="/terms"
                        className="font-semibold text-emerald-700 hover:underline"
                      >
                        Terms &amp; Conditions
                      </a>{" "}
                      and{" "}
                      <a
                        href="/privacy"
                        className="font-semibold text-emerald-700 hover:underline"
                      >
                        Privacy Policy
                      </a>
                      .
                    </span>
                  </label>
                </div>

                {/* Educational acknowledgement */}
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                  <p className="text-sm leading-6 text-slate-700">
                    FamiNova provides general educational and digital
                    membership services. And guarantee
                    medical treatment, pregnancy, donor matching, donor
                    material, biological material or any specific fertility
                    outcome.
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full rounded-xl bg-slate-950 px-6 py-4 text-sm font-bold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                >
                  Create Account
                </button>

                <p className="text-center text-sm text-slate-500">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="font-bold text-emerald-700 hover:underline"
                  >
                    Sign in
                  </a>
                </p>
              </form>
            )}
          </div>

          {/* Contact */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              Need help?{" "}
              <a
                href="/contact"
                className="font-semibold text-emerald-700 hover:underline"
              >
                Contact FamiNova
              </a>
            </p>
          </div>
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