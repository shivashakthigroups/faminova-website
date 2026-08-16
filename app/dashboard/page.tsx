"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import type { User } from "@supabase/supabase-js";

type MembershipPlan = {
  id: string;
  name: string;
  price: number;
  duration_months: number;
};

type MembershipInfo = {
  id: string;
  status: "pending" | "active" | "expired" | "cancelled";
  started_at: string | null;
  expires_at: string | null;
  membership_plans: MembershipPlan | null;
};

/*
 * Supabase can return the related membership_plans
 * relationship as an array.
 *
 * We normalize that response into the single
 * MembershipPlan object used by this dashboard.
 */
type RawMembershipInfo = {
  id: string;
  status: "pending" | "active" | "expired" | "cancelled";
  started_at: string | null;
  expires_at: string | null;
  membership_plans:
    | MembershipPlan[]
    | MembershipPlan
    | null;
};

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] =
    useState<User | null>(null);

  const [membership, setMembership] =
    useState<MembershipInfo | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [loggingOut, setLoggingOut] =
    useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadDashboard() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      if (!mounted) return;

      setUser(user);

      const {
        data,
        error,
      } = await supabase
        .from("memberships")
        .select(
          `
          id,
          status,
          started_at,
          expires_at,
          membership_plans (
            id,
            name,
            price,
            duration_months
          )
        `
        )
        .eq(
          "user_id",
          user.id
        )
        .order(
          "created_at",
          {
            ascending: false,
          }
        )
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error(
          "Membership loading error:",
          error
        );

        setLoading(false);
        return;
      }

      if (data) {
        /*
         * Supabase relationship data may be returned
         * as an array even when only one related plan
         * is expected.
         */
        const raw =
          data as unknown as RawMembershipInfo;

        let plan: MembershipPlan | null =
          null;

        if (
          Array.isArray(
            raw.membership_plans
          )
        ) {
          plan =
            raw.membership_plans[0] ??
            null;
        } else {
          plan =
            raw.membership_plans ??
            null;
        }

        const normalizedMembership:
          MembershipInfo = {
          id: raw.id,

          status:
            raw.status,

          started_at:
            raw.started_at,

          expires_at:
            raw.expires_at,

          membership_plans:
            plan,
        };

        setMembership(
          normalizedMembership
        );
      } else {
        setMembership(null);
      }

      setLoading(false);
    }

    loadDashboard();

    const {
      data: {
        subscription,
      },
    } =
      supabase.auth.onAuthStateChange(
        (_event, session) => {
          if (!session?.user) {
            router.replace("/login");
          } else if (mounted) {
            setUser(
              session.user
            );
          }
        }
      );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

  async function handleLogout() {
    setLoggingOut(true);

    const {
      error,
    } =
      await supabase.auth.signOut();

    if (error) {
      console.error(
        "Logout error:",
        error
      );

      setLoggingOut(false);
      return;
    }

    router.replace("/login");
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />

          <p className="mt-4 text-sm text-slate-600">
            Loading your dashboard...
          </p>
        </div>
      </main>
    );
  }

  const displayName =
    user?.user_metadata
      ?.full_name ||
    user?.email?.split(
      "@"
    )[0] ||
    "Member";

  const status =
    membership?.status;

  const statusLabel =
    status === "active"
      ? "Active"
      : status === "pending"
        ? "Pending"
        : status === "expired"
          ? "Expired"
          : status === "cancelled"
            ? "Cancelled"
            : "No Membership";

  const statusClass =
    status === "active"
      ? "bg-emerald-100 text-emerald-800"
      : status === "pending"
        ? "bg-amber-100 text-amber-800"
        : status === "expired"
          ? "bg-red-100 text-red-800"
          : status === "cancelled"
            ? "bg-slate-200 text-slate-700"
            : "bg-slate-100 text-slate-700";

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">

          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-slate-950"
          >
            FamiNova
          </Link>

          <div className="flex items-center gap-3">

            <Link
              href="/profile"
              className="hidden rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:block"
            >
              My Profile
            </Link>

            <button
              onClick={
                handleLogout
              }
              disabled={
                loggingOut
              }
              className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loggingOut
                ? "Logging out..."
                : "Logout"}
            </button>

          </div>
        </div>
      </header>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-5 py-10">

        {/* Welcome */}
        <div className="rounded-3xl bg-slate-950 p-7 text-white shadow-sm sm:p-10">

          <p className="text-sm font-semibold text-slate-300">
            FamiNova Member Dashboard
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome, {displayName}
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            Manage your FamiNova account,
            profile and membership
            information from one secure
            place.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">

            <Link
              href="/profile"
              className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-100"
            >
              Manage My Profile →
            </Link>

            <Link
              href="/membership"
              className="rounded-xl border border-slate-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              View Membership →
            </Link>

          </div>
        </div>

        {/* Membership */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">

            <div>

              <p className="text-sm font-semibold text-slate-500">
                Membership
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-950">
                {membership
                  ?.membership_plans
                  ?.name ||
                  "No membership selected"}
              </h2>

              {membership?.membership_plans && (
                <p className="mt-2 text-sm text-slate-600">

                  ₹
                  {Number(
                    membership
                      .membership_plans
                      .price
                  ).toLocaleString(
                    "en-IN"
                  )}

                  {" / "}

                  {
                    membership
                      .membership_plans
                      .duration_months
                  }

                  {" month"}

                  {membership
                    .membership_plans
                    .duration_months >
                  1
                    ? "s"
                    : ""}

                </p>
              )}

            </div>

            <span
              className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-bold ${statusClass}`}
            >
              {statusLabel}
            </span>

          </div>

          {/* Pending */}
          {membership?.status ===
            "pending" && (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">

              <p className="text-sm font-bold text-amber-900">
                Membership request pending
              </p>

              <p className="mt-2 text-sm leading-6 text-amber-800">
                Your membership selection
                has been recorded.
                Payment has not been
                collected and your
                membership has not yet
                been activated.
              </p>

            </div>
          )}

          {/* Active */}
          {membership?.status ===
            "active" && (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">

              <p className="text-sm font-bold text-emerald-900">
                Your membership is active.
              </p>

              {membership.expires_at && (
                <p className="mt-2 text-sm text-emerald-800">
                  Expires on{" "}
                  {new Date(
                    membership.expires_at
                  ).toLocaleDateString(
                    "en-IN"
                  )}
                </p>
              )}

            </div>
          )}

          {/* No membership */}
          {!membership && (
            <div className="mt-6">

              <Link
                href="/membership"
                className="inline-block rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"
              >
                Choose a Membership
              </Link>

            </div>
          )}

          {/* Existing membership */}
          {membership && (
            <Link
              href="/membership"
              className="mt-6 inline-block text-sm font-bold text-slate-950 underline underline-offset-4"
            >
              View Membership
              Options →
            </Link>
          )}

        </div>

        {/* Account cards */}
        <div className="mt-8 grid gap-5 lg:grid-cols-3">

          <Link
            href="/profile"
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-400 hover:shadow-md"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-lg">
              👤
            </div>

            <h2 className="mt-5 text-lg font-bold text-slate-950">
              My Profile
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              View and update your basic
              account information.
            </p>

            <span className="mt-5 inline-block text-sm font-bold text-slate-950">
              Manage Profile →
            </span>

          </Link>

          <Link
            href="/membership"
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-400 hover:shadow-md"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-lg">
              ⭐
            </div>

            <h2 className="mt-5 text-lg font-bold text-slate-950">
              Membership
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              View available membership
              plans and your current
              membership status.
            </p>

            <span className="mt-5 inline-block text-sm font-bold text-slate-950">
              View Membership →
            </span>

          </Link>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-lg">
              🔐
            </div>

            <h2 className="mt-5 text-lg font-bold text-slate-950">
              Account Security
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Your account authentication
              is managed through Supabase
              Authentication.
            </p>

            <span className="mt-5 inline-block text-sm font-semibold text-emerald-700">
              Account authenticated
            </span>

          </div>

        </div>

        {/* Account information */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

            <div>

              <p className="text-sm font-semibold text-slate-500">
                Account Information
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-950">
                Your account
              </h2>

            </div>

            <Link
              href="/profile"
              className="text-sm font-bold text-slate-950 underline underline-offset-4"
            >
              Edit profile →
            </Link>

          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-2">

            <div className="rounded-2xl bg-slate-50 p-5">

              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Email
              </p>

              <p className="mt-2 break-all text-sm font-semibold text-slate-900">
                {user?.email ||
                  "Not available"}
              </p>

            </div>

            <div className="rounded-2xl bg-slate-50 p-5">

              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Account status
              </p>

              <p className="mt-2 text-sm font-semibold text-emerald-700">
                Active
              </p>

            </div>

          </div>
        </div>

        {/* Important information */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">

          <h2 className="text-xl font-bold text-slate-950">
            Important information
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            FamiNova membership provides
            digital educational and member
            services only. Membership does
            not itself purchase or guarantee
            donor material, donor matching,
            medical treatment, pregnancy,
            biological material, or any
            specific fertility outcome.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-sm">

            <Link
              href="/privacy"
              className="font-semibold text-slate-950 underline underline-offset-4"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="font-semibold text-slate-950 underline underline-offset-4"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/contact"
              className="font-semibold text-slate-950 underline underline-offset-4"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="mt-10 border-t border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">

          <p>
            ©{" "}
            {new Date().getFullYear()}{" "}
            FamiNova. All rights reserved.
          </p>

          <div className="flex gap-4">

            <Link
              href="/privacy"
              className="hover:text-slate-900"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="hover:text-slate-900"
            >
              Terms
            </Link>

            <Link
              href="/contact"
              className="hover:text-slate-900"
            >
              Contact
            </Link>

          </div>

        </div>

      </footer>

    </main>
  );
}
<Link
  href="/payments"
  className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-center text-sm font-bold text-slate-900 transition hover:bg-slate-50"
>
  Payment History
</Link>