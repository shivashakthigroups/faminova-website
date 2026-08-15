"use client";

import { useState } from "react";

export default function DashboardPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#f7f8f6] text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 font-bold text-white">
              F
            </div>

            <div>
              <div className="text-xl font-bold">FamiNova</div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Member Portal
              </div>
            </div>
          </a>

          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 hover:bg-slate-50"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-800">
                M
              </div>

              <div className="hidden text-left sm:block">
                <p className="text-sm font-bold">Member</p>
                <p className="text-xs text-slate-500">FamiNova Account</p>
              </div>

              <span className="text-xs text-slate-400">▼</span>
            </button>

            {menuOpen && (
              <div className="absolute right-0 z-20 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                <a
                  href="/"
                  className="block rounded-lg px-4 py-3 text-sm hover:bg-slate-50"
                >
                  Home
                </a>

                <a
                  href="/contact"
                  className="block rounded-lg px-4 py-3 text-sm hover:bg-slate-50"
                >
                  Contact Support
                </a>

                <a
                  href="/login"
                  className="block rounded-lg px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  Sign Out
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Dashboard */}
      <section className="mx-auto max-w-7xl px-5 py-8 lg:py-12">
        {/* Welcome */}
        <div className="rounded-[2rem] bg-slate-950 p-7 text-white sm:p-10">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">
              Member Dashboard
            </p>

            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome to FamiNova
            </h1>

            <p className="mt-4 max-w-2xl leading-7 text-slate-300">
              Your member area for accessing FamiNova&apos;s digital
              educational resources and account services.
            </p>
          </div>
        </div>

        {/* Status Cards */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm font-semibold text-slate-500">
              Membership
            </p>

            <p className="mt-3 text-xl font-bold text-emerald-700">
              Active
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Demonstration account
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm font-semibold text-slate-500">
              Resources
            </p>

            <p className="mt-3 text-xl font-bold text-slate-950">
              Available
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Educational content
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm font-semibold text-slate-500">
              Account
            </p>

            <p className="mt-3 text-xl font-bold text-slate-950">
              Verified
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Demonstration status
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm font-semibold text-slate-500">
              Support
            </p>

            <p className="mt-3 text-xl font-bold text-slate-950">
              Available
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Contact our team
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          {/* Resources */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-7 sm:p-9">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
                  Member Resources
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-950">
                  Explore educational content
                </h2>
              </div>

              <span className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700">
                Member Access
              </span>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {/* Resource 1 */}
              <article className="rounded-2xl border border-slate-200 p-6 transition hover:border-emerald-300 hover:shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-xl">
                  📚
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-950">
                  Fertility Education
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  General educational information about fertility and
                  reproductive health topics.
                </p>

                <button
                  type="button"
                  className="mt-5 text-sm font-bold text-emerald-700"
                >
                  Explore →
                </button>
              </article>

              {/* Resource 2 */}
              <article className="rounded-2xl border border-slate-200 p-6 transition hover:border-emerald-300 hover:shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-xl">
                  🧭
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-950">
                  Understanding Options
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Educational resources designed to help users understand
                  fertility-related terminology and options.
                </p>

                <button
                  type="button"
                  className="mt-5 text-sm font-bold text-emerald-700"
                >
                  Explore →
                </button>
              </article>

              {/* Resource 3 */}
              <article className="rounded-2xl border border-slate-200 p-6 transition hover:border-emerald-300 hover:shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-xl">
                  🔐
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-950">
                  Privacy &amp; Safety
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Learn about account privacy, responsible information sharing
                  and digital safety.
                </p>

                <a
                  href="/privacy"
                  className="mt-5 inline-block text-sm font-bold text-emerald-700"
                >
                  Read Policy →
                </a>
              </article>

              {/* Resource 4 */}
              <article className="rounded-2xl border border-slate-200 p-6 transition hover:border-emerald-300 hover:shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-xl">
                  💬
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-950">
                  Member Support
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Have a question about your account or digital membership?
                  Contact the FamiNova team.
                </p>

                <a
                  href="/contact"
                  className="mt-5 inline-block text-sm font-bold text-emerald-700"
                >
                  Contact Us →
                </a>
              </article>
            </div>
          </section>

          {/* Account */}
          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-7">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
                My Account
              </p>

              <h2 className="mt-3 text-xl font-bold text-slate-950">
                Member information
              </h2>

              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Name
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    FamiNova Member
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Email
                  </p>

                  <p className="mt-1 break-all font-semibold text-slate-800">
                    member@example.com
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Membership
                  </p>

                  <p className="mt-1 font-semibold text-emerald-700">
                    Active
                  </p>
                </div>
              </div>

              <div className="mt-7 border-t border-slate-200 pt-6">
                <button
                  type="button"
                  className="w-full rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-800 hover:bg-slate-50"
                >
                  Account Settings
                </button>
              </div>
            </div>

            <div className="rounded-[2rem] bg-emerald-950 p-7 text-white">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-300">
                Need Help?
              </p>

              <h2 className="mt-3 text-xl font-bold">
                We&apos;re here to help.
              </h2>

              <p className="mt-3 text-sm leading-6 text-emerald-50/80">
                Contact FamiNova if you have questions about your digital
                membership or account.
              </p>

              <a
                href="/contact"
                className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-emerald-950 hover:bg-emerald-50"
              >
                Contact Support
              </a>
            </div>
          </aside>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h3 className="font-bold text-slate-950">
            Important Information
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-700">
            FamiNova provides general educational and digital membership
            services. Information available through the platform is a
            substitute for professional medical advice. Membership does not
            guarantee medical treatment, pregnancy, donor matching, donor
            material, biological material or any specific fertility outcome.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8">
          <div className="flex flex-col gap-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} FamiNova. All rights reserved.
            </p>

            <div className="flex flex-wrap gap-5">
              <a href="/privacy" className="hover:text-slate-950">
                Privacy
              </a>

              <a href="/terms" className="hover:text-slate-950">
                Terms
              </a>

              <a href="/refund" className="hover:text-slate-950">
                Refund
              </a>

              <a href="/contact" className="hover:text-slate-950">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}