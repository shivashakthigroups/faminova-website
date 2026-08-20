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

type Payment = {
  id: string;
  user_id: string;
  status: string;
  payment_reference: string | null;
  payment_amount: number | null;
  created_at: string;
  started_at: string | null;
  expires_at: string | null;
  membership_plans: Plan | null;
};

type RawPayment = {
  id: string;
  user_id: string;
  status: string;
  payment_reference: string | null;
  payment_amount: number | null;
  created_at: string;
  started_at: string | null;
  expires_at: string | null;
  membership_plans: Plan | Plan[] | null;
};

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    checkAdmin();
  }, []);

  async function checkAdmin() {
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

    await loadPayments();
  }

  async function loadPayments() {
    setLoading(true);
    setError("");

    const { data, error: paymentError } = await supabase
      .from("memberships")
      .select(`
        id,
        user_id,
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

    if (paymentError) {
      console.error("Payment loading error:", paymentError);
      setError(paymentError.message);
      setLoading(false);
      return;
    }

    const formatted: Payment[] = (data ?? []).map((item) => {
      const raw = item as unknown as RawPayment;

      let plan: Plan | null = null;

      if (Array.isArray(raw.membership_plans)) {
        plan = raw.membership_plans[0] ?? null;
      } else {
        plan = raw.membership_plans ?? null;
      }

      return {
        id: raw.id,
        user_id: raw.user_id,
        status: raw.status,
        payment_reference: raw.payment_reference,
        payment_amount: raw.payment_amount,
        created_at: raw.created_at,
        started_at: raw.started_at,
        expires_at: raw.expires_at,
        membership_plans: plan,
      };
    });

    setPayments(formatted);
    setLoading(false);
  }

  async function approvePayment(paymentId: string) {
    const confirmed = window.confirm(
      "Have you verified this payment in your UPI account?"
    );

    if (!confirmed) return;

    setProcessing(paymentId);
    setError("");
    setMessage("");

    const { error: approveError } = await supabase.rpc(
      "approve_membership",
      {
        membership_id: paymentId,
      }
    );

    if (approveError) {
      console.error(approveError);
      setError(approveError.message);
      setProcessing(null);
      return;
    }

    setMessage("Payment approved and membership activated.");
    setProcessing(null);

    await loadPayments();
  }

  async function declinePayment(paymentId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to decline this payment?"
    );

    if (!confirmed) return;

    setProcessing(paymentId);
    setError("");
    setMessage("");

    const { error: declineError } = await supabase.rpc(
      "reject_membership",
      {
        membership_id: paymentId,
      }
    );

    if (declineError) {
      console.error(declineError);
      setError(declineError.message);
      setProcessing(null);
      return;
    }

    setMessage("Payment declined.");
    setProcessing(null);

    await loadPayments();
  }

  function getStatusClass(status: string) {
    if (status === "pending") {
      return "bg-amber-100 text-amber-800";
    }

    if (status === "active") {
      return "bg-emerald-100 text-emerald-800";
    }

    if (status === "cancelled") {
      return "bg-red-100 text-red-700";
    }

    if (status === "expired") {
      return "bg-slate-200 text-slate-700";
    }

    return "bg-slate-100 text-slate-700";
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-950" />

          <p className="mt-4 text-sm text-slate-600">
            Loading payments...
          </p>
        </div>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5">
        <div className="max-w-lg rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-950">
            Admin Access Required
          </h1>

          <p className="mt-3 text-slate-600">
            You do not have permission to access payment approvals.
          </p>

          <Link
            href="/dashboard"
            className="mt-6 inline-block rounded-xl bg-slate-950 px-6 py-3 font-bold text-white"
          >
            Dashboard
          </Link>
        </div>
      </main>
    );
  }

  const pendingPayments = payments.filter(
    (payment) => payment.status === "pending"
  );

  const approvedPayments = payments.filter(
    (payment) => payment.status === "active"
  );

  return (
    <main className="min-h-screen bg-slate-50">

      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">

          <div>
            <Link
              href="/"
              className="text-2xl font-bold text-slate-950"
            >
              FamiNova
            </Link>

            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-500">
              Admin Payments
            </p>
          </div>

          <div className="flex gap-3">

            <Link
              href="/dashboard"
              className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold"
            >
              Dashboard
            </Link>

            <button
              onClick={loadPayments}
              className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white"
            >
              Refresh
            </button>

          </div>

        </div>
      </header>

      {/* TITLE */}
      <section className="mx-auto max-w-7xl px-5 pb-8 pt-10">

        <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
          Payment Verification
        </p>

        <h1 className="mt-3 text-4xl font-bold text-slate-950">
          Membership Payment Approvals
        </h1>

        <p className="mt-3 text-slate-600">
          Verify UPI payments before activating memberships.
        </p>

      </section>

      {/* STATS */}
      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-8 md:grid-cols-3">

        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-500">
            Total Payments
          </p>

          <p className="mt-2 text-4xl font-black">
            {payments.length}
          </p>
        </div>

        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
          <p className="text-sm font-semibold text-amber-700">
            Pending Approval
          </p>

          <p className="mt-2 text-4xl font-black text-amber-900">
            {pendingPayments.length}
          </p>
        </div>

        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
          <p className="text-sm font-semibold text-emerald-700">
            Approved
          </p>

          <p className="mt-2 text-4xl font-black text-emerald-900">
            {approvedPayments.length}
          </p>
        </div>

      </section>

      {/* MESSAGES */}
      <section className="mx-auto max-w-7xl px-5">

        {error && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
            {message}
          </div>
        )}

      </section>

      {/* PENDING PAYMENTS */}
      <section className="mx-auto max-w-7xl px-5 pb-10">

        <div className="mb-5 flex items-center justify-between">

          <h2 className="text-2xl font-bold text-slate-950">
            Pending Payments
          </h2>

          <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-800">
            {pendingPayments.length}
          </span>

        </div>

        {pendingPayments.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">

            <p className="font-semibold text-slate-700">
              No pending payments.
            </p>

            <p className="mt-2 text-sm text-slate-500">
              New membership payment submissions will appear here.
            </p>

          </div>
        ) : (
          <div className="space-y-5">

            {pendingPayments.map((payment) => (
              <div
                key={payment.id}
                className="rounded-3xl border-2 border-amber-200 bg-white p-6 shadow-sm"
              >

                <div className="flex flex-col justify-between gap-6 lg:flex-row">

                  <div className="flex-1">

                    <div className="flex flex-wrap items-center gap-3">

                      <h3 className="text-xl font-bold text-slate-950">
                        {payment.membership_plans?.name ??
                          "Membership"}
                      </h3>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${getStatusClass(
                          payment.status
                        )}`}
                      >
                        {payment.status}
                      </span>

                    </div>

                    <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                      <div>
                        <p className="text-xs font-bold uppercase text-slate-400">
                          Amount
                        </p>

                        <p className="mt-1 text-2xl font-black text-slate-950">
                          ₹
                          {Number(
                            payment.payment_amount ??
                              payment.membership_plans?.price ??
                              0
                          ).toLocaleString("en-IN")}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase text-slate-400">
                          UTR
                        </p>

                        <p className="mt-1 break-all font-mono text-sm font-bold text-slate-950">
                          {payment.payment_reference ||
                            "Not available"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase text-slate-400">
                          Plan Duration
                        </p>

                        <p className="mt-1 font-semibold">
                          {payment.membership_plans
                            ?.duration_months ?? "-"}{" "}
                          month(s)
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase text-slate-400">
                          Submitted
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          {new Date(
                            payment.created_at
                          ).toLocaleString("en-IN")}
                        </p>
                      </div>

                    </div>

                    <div className="mt-5 rounded-2xl bg-slate-50 p-4">

                      <p className="text-xs font-bold uppercase text-slate-400">
                        User ID
                      </p>

                      <p className="mt-1 break-all font-mono text-xs text-slate-700">
                        {payment.user_id}
                      </p>

                    </div>

                  </div>

                  {/* BUTTONS */}
                  <div className="flex min-w-[190px] flex-col gap-3">

                    <button
                      onClick={() =>
                        approvePayment(payment.id)
                      }
                      disabled={
                        processing === payment.id
                      }
                      className="rounded-xl bg-emerald-600 px-5 py-3.5 font-bold text-white hover:bg-emerald-700 disabled:opacity-50"
                    >
                      {processing === payment.id
                        ? "Processing..."
                        : "✓ Approve Payment"}
                    </button>

                    <button
                      onClick={() =>
                        declinePayment(payment.id)
                      }
                      disabled={
                        processing === payment.id
                      }
                      className="rounded-xl border border-red-300 bg-white px-5 py-3.5 font-bold text-red-700 hover:bg-red-50 disabled:opacity-50"
                    >
                      Decline
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </section>

      {/* ALL TRANSACTIONS */}
      <section className="mx-auto max-w-7xl px-5 pb-14">

        <h2 className="mb-5 text-2xl font-bold text-slate-950">
          Recent Transactions
        </h2>

        <div className="space-y-3">

          {payments.map((payment) => (
            <div
              key={payment.id}
              className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center"
            >

              <div>

                <p className="font-bold text-slate-950">
                  {payment.membership_plans?.name ??
                    "Membership"}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {new Date(
                    payment.created_at
                  ).toLocaleString("en-IN")}
                </p>

              </div>

              <div className="flex items-center gap-4">

                <p className="font-black">
                  ₹
                  {Number(
                    payment.payment_amount ??
                      payment.membership_plans?.price ??
                      0
                  ).toLocaleString("en-IN")}
                </p>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${getStatusClass(
                    payment.status
                  )}`}
                >
                  {payment.status}
                </span>

              </div>

            </div>
          ))}

        </div>

      </section>

    </main>
  );
}