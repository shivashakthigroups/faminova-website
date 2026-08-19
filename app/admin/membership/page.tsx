"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";

type Plan = {
  id: string;
  name: string;
  price: number;
  duration_months: number;
};

type Membership = {
  id: string;
  user_id: string;
  plan_id: string;
  status: string;
  payment_reference: string | null;
  payment_amount: number | null;
  created_at: string;
  started_at: string | null;
  expires_at: string | null;
  membership_plans: Plan | null;
};

type RawMembership = {
  id: string;
  user_id: string;
  plan_id: string;
  status: string;
  payment_reference: string | null;
  payment_amount: number | null;
  created_at: string;
  started_at: string | null;
  expires_at: string | null;
  membership_plans: Plan | Plan[] | null;
};

export default function AdminMembershipsPage() {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    checkAdminAndLoad();
  }, []);

  async function checkAdminAndLoad() {
    setLoading(true);
    setError("");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      window.location.href = "/login";
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.error(profileError);
      setError(profileError.message);
      setLoading(false);
      return;
    }

    if (profile?.role !== "admin") {
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    setIsAdmin(true);
    await loadMemberships();
  }

  async function loadMemberships() {
    setError("");

    const { data, error: membershipError } = await supabase
      .from("memberships")
      .select(`
        id,
        user_id,
        plan_id,
        status,
        payment_reference,
        payment_amount,
        created_at,
        started_at,
        expires_at,
        membership_plans (
          id,
          name,
          price,
          duration_months
        )
      `)
      .order("created_at", {
        ascending: false,
      });

    if (membershipError) {
      console.error(membershipError);
      setError(membershipError.message);
      setLoading(false);
      return;
    }

    const formatted: Membership[] = (data ?? []).map((item) => {
      const raw = item as unknown as RawMembership;

      let plan: Plan | null = null;

      if (Array.isArray(raw.membership_plans)) {
        plan = raw.membership_plans[0] ?? null;
      } else {
        plan = raw.membership_plans ?? null;
      }

      return {
        id: raw.id,
        user_id: raw.user_id,
        plan_id: raw.plan_id,
        status: raw.status,
        payment_reference: raw.payment_reference,
        payment_amount: raw.payment_amount,
        created_at: raw.created_at,
        started_at: raw.started_at,
        expires_at: raw.expires_at,
        membership_plans: plan,
      };
    });

    setMemberships(formatted);
    setLoading(false);
  }

  async function approveMembership(membershipId: string) {
    const confirmed = window.confirm(
      "Have you verified this UPI payment in your merchant payment account?"
    );

    if (!confirmed) {
      return;
    }

    setProcessingId(membershipId);
    setError("");
    setMessage("");

    const { error: approveError } = await supabase.rpc(
      "approve_membership",
      {
        membership_id: membershipId,
      }
    );

    if (approveError) {
      console.error(approveError);
      setError(approveError.message);
      setProcessingId(null);
      return;
    }

    setMessage("Membership approved successfully.");
    setProcessingId(null);

    await loadMemberships();
  }

  async function rejectMembership(membershipId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to reject this membership?"
    );

    if (!confirmed) {
      return;
    }

    setProcessingId(membershipId);
    setError("");
    setMessage("");

    const { error: rejectError } = await supabase.rpc(
      "reject_membership",
      {
        membership_id: membershipId,
      }
    );

    if (rejectError) {
      console.error(rejectError);
      setError(rejectError.message);
      setProcessingId(null);
      return;
    }

    setMessage("Membership rejected.");
    setProcessingId(null);

    await loadMemberships();
  }

  function statusStyle(status: string) {
    if (status === "active") {
      return "bg-emerald-100 text-emerald-800";
    }

    if (status === "pending") {
      return "bg-amber-100 text-amber-800";
    }

    if (status === "expired") {
      return "bg-red-100 text-red-800";
    }

    if (status === "cancelled") {
      return "bg-slate-200 text-slate-700";
    }

    return "bg-slate-100 text-slate-700";
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-slate-950" />

          <p className="mt-4 text-sm text-slate-600">
            Loading admin dashboard...
          </p>
        </div>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5">
        <div className="w-full max-w-lg rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-2xl">
            🔒
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-950">
            Admin Access Required
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Your account does not have permission to access this page.
          </p>

          <Link
            href="/dashboard"
            className="mt-6 inline-block rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white"
          >
            Go to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  const pendingCount = memberships.filter(
    (membership) => membership.status === "pending"
  ).length;

  const activeCount = memberships.filter(
    (membership) => membership.status === "active"
  ).length;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <div>
            <Link
              href="/"
              className="text-2xl font-bold text-slate-950"
            >
              FamiNova
            </Link>

            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Admin Portal
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/dashboard"
              className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
            >
              Dashboard
            </Link>

            <button
              onClick={loadMemberships}
              className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white"
            >
              Refresh
            </button>
          </div>
        </div>
      </header>

      {/* Heading */}
      <section className="mx-auto max-w-7xl px-5 pb-8 pt-10">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
          Administration
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
          Membership Payments
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          Review submitted UPI payment references and activate memberships
          only after confirming payment in your merchant UPI account.
        </p>
      </section>

      {/* Stats */}
      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-8 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <p className="text-sm font-semibold text-slate-500">
            Total Memberships
          </p>

          <p className="mt-2 text-4xl font-black text-slate-950">
            {memberships.length}
          </p>
        </div>

        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
          <p className="text-sm font-semibold text-amber-700">
            Pending Verification
          </p>

          <p className="mt-2 text-4xl font-black text-amber-900">
            {pendingCount}
          </p>
        </div>

        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
          <p className="text-sm font-semibold text-emerald-700">
            Active Memberships
          </p>

          <p className="mt-2 text-4xl font-black text-emerald-900">
            {activeCount}
          </p>
        </div>
      </section>

      {/* Messages */}
      <section className="mx-auto max-w-7xl px-5">
        {message && (
          <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}
      </section>

      {/* Membership List */}
      <section className="mx-auto max-w-7xl px-5 pb-14">
        {memberships.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
            <p className="font-semibold text-slate-700">
              No memberships found.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {memberships.map((membership) => (
              <div
                key={membership.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col justify-between gap-5 lg:flex-row">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-bold text-slate-950">
                        {membership.membership_plans?.name ??
                          "Membership"}
                      </h2>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${statusStyle(
                          membership.status
                        )}`}
                      >
                        {membership.status}
                      </span>
                    </div>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                          Amount
                        </p>

                        <p className="mt-1 text-lg font-bold text-slate-950">
                          ₹
                          {Number(
                            membership.payment_amount ??
                              membership.membership_plans?.price ??
                              0
                          ).toLocaleString("en-IN")}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                          UPI / UTR
                        </p>

                        <p className="mt-1 break-all font-mono text-sm font-semibold text-slate-950">
                          {membership.payment_reference ??
                            "Not available"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                          Submitted
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-800">
                          {new Date(
                            membership.created_at
                          ).toLocaleString("en-IN")}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                          Duration
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-800">
                          {membership.membership_plans
                            ?.duration_months ?? "-"}{" "}
                          month(s)
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                        User ID
                      </p>

                      <p className="mt-1 break-all font-mono text-xs text-slate-700">
                        {membership.user_id}
                      </p>
                    </div>

                    {membership.status === "active" && (
                      <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                        <p className="text-sm font-semibold text-emerald-900">
                          Active Membership
                        </p>

                        {membership.started_at && (
                          <p className="mt-2 text-xs text-emerald-800">
                            Started:{" "}
                            {new Date(
                              membership.started_at
                            ).toLocaleDateString("en-IN")}
                          </p>
                        )}

                        {membership.expires_at && (
                          <p className="mt-1 text-xs text-emerald-800">
                            Expires:{" "}
                            {new Date(
                              membership.expires_at
                            ).toLocaleDateString("en-IN")}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Admin Actions */}
                  {membership.status === "pending" && (
                    <div className="flex min-w-[180px] flex-col gap-3">
                      <button
                        onClick={() =>
                          approveMembership(membership.id)
                        }
                        disabled={
                          processingId === membership.id
                        }
                        className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {processingId === membership.id
                          ? "Processing..."
                          : "✓ Approve"}
                      </button>

                      <button
                        onClick={() =>
                          rejectMembership(membership.id)
                        }
                        disabled={
                          processingId === membership.id
                        }
                        className="rounded-xl border border-red-300 bg-white px-5 py-3 text-sm font-bold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Warning */}
      <section className="mx-auto max-w-7xl px-5 pb-14">
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="font-bold text-amber-950">
            Before approving
          </h2>

          <p className="mt-2 text-sm leading-7 text-amber-800">
            Always verify the UPI Transaction ID / UTR, amount received and
            payment status in your merchant UPI account before approving a
            membership.
          </p>
        </div>
      </section>
    </main>
  );
}