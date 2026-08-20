"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";

type Payment = {
  id: string;
  user_id: string;
  plan_id: string;
  status: string;
  payment_reference: string | null;
  payment_amount: number | null;
  created_at: string;
  started_at: string | null;
  expires_at: string | null;
  plan_name: string | null;
  plan_price: number | null;
  duration_months: number | null;
};

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    initializeAdmin();
  }, []);

  async function initializeAdmin() {
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

    await loadPayments();
  }

  async function loadPayments() {
    setLoading(true);
    setError("");

    const { data, error: paymentError } = await supabase.rpc(
      "admin_list_memberships"
    );

    if (paymentError) {
      console.error("Admin payment loading error:", paymentError);

      const msg = paymentError.message || "";

      if (
        msg.toLowerCase().includes("unauthorized") ||
        msg.toLowerCase().includes("admin access")
      ) {
        setAuthorized(false);
        setLoading(false);
        return;
      }

      setAuthorized(true);
      setError(msg);
      setLoading(false);
      return;
    }

    setAuthorized(true);
    setPayments((data ?? []) as Payment[]);
    setLoading(false);
  }

  async function approvePayment(paymentId: string) {
    const confirmed = window.confirm(
      "Have you verified this UPI payment in your payment account?"
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
      console.error("Approve error:", approveError);
      setError(approveError.message);
      setProcessing(null);
      return;
    }

    setMessage(
      "Payment approved successfully. Membership is now active."
    );

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

    const { error: rejectError } = await supabase.rpc(
      "reject_membership",
      {
        membership_id: paymentId,
      }
    );

    if (rejectError) {
      console.error("Decline error:", rejectError);
      setError(rejectError.message);
      setProcessing(null);
      return;
    }

    setMessage("Payment declined.");
    setProcessing(null);

    await loadPayments();
  }

  function statusClass(status: string) {
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
            Loading admin payments...
          </p>
        </div>
      </main>
    );
  }

  if (authorized === false) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5">
        <div className="w-full max-w-lg rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl">
            🔒
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-950">
            Admin Access Required
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Please log in using the FamiNova account that has admin
            permission.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-block rounded-xl bg-slate-950 px-6 py-3 font-bold text-white"
          >
            Login
          </Link>
        </div>
      </main>
    );
  }

  const pendingPayments = payments.filter(
    (payment) => payment.status === "pending"
  );

  const activePayments = payments.filter(
    (payment) => payment.status === "active"
  );

  return (
    <main className="min-h-screen bg-slate-50">
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
              className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
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

      <section className="mx-auto max-w-7xl px-5 pb-8 pt-10">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
          Payment Verification
        </p>

        <h1 className="mt-3 text-4xl font-bold text-slate-950">
          Membership Payment Approvals
        </h1>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          Review UPI payment details before activating a membership.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-8 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <p className="text-sm font-semibold text-slate-500">
            Total Transactions
          </p>

          <p className="mt-2 text-4xl font-black text-slate-950">
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
            Active Memberships
          </p>

          <p className="mt-2 text-4xl font-black text-emerald-900">
            {activePayments.length}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5">
        {error && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <strong>Error:</strong> {error}
          </div>
        )}

        {message && (
          <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
            {message}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-950">
            Pending Payments
          </h2>

          <span className="rounded-full bg-amber-100 px-4 py-1.5 text-sm font-bold text-amber-800">
            {pendingPayments.length}
          </span>
        </div>

        {pendingPayments.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
            <p className="font-semibold text-slate-700">
              No pending payments.
            </p>

            <p className="mt-2 text-sm text-slate-500">
              New UPI membership submissions will appear here.
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
                        {payment.plan_name || "Membership"}
                      </h3>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${statusClass(
                          payment.status
                        )}`}
                      >
                        {payment.status}
                      </span>
                    </div>

                    <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                          Amount
                        </p>

                        <p className="mt-1 text-2xl font-black text-slate-950">
                          ₹
                          {Number(
                            payment.payment_amount ??
                              payment.plan_price ??
                              0
                          ).toLocaleString("en-IN")}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                          UPI / UTR
                        </p>

                        <p className="mt-1 break-all font-mono text-sm font-bold text-slate-950">
                          {payment.payment_reference || "Not available"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                          Duration
                        </p>

                        <p className="mt-1 font-semibold text-slate-800">
                          {payment.duration_months ?? "-"} month(s)
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                          Submitted
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-800">
                          {new Date(
                            payment.created_at
                          ).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                        User ID
                      </p>

                      <p className="mt-1 break-all font-mono text-xs text-slate-700">
                        {payment.user_id}
                      </p>
                    </div>
                  </div>

                  <div className="flex min-w-[200px] flex-col gap-3">
                    <button
                      onClick={() => approvePayment(payment.id)}
                      disabled={processing === payment.id}
                      className="rounded-xl bg-emerald-600 px-5 py-3.5 font-bold text-white hover:bg-emerald-700 disabled:opacity-50"
                    >
                      {processing === payment.id
                        ? "Processing..."
                        : "✓ Approve Payment"}
                    </button>

                    <button
                      onClick={() => declinePayment(payment.id)}
                      disabled={processing === payment.id}
                      className="rounded-xl border border-red-300 bg-white px-5 py-3.5 font-bold text-red-700 hover:bg-red-50 disabled:opacity-50"
                    >
                      Decline Payment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-14">
        <h2 className="mb-5 text-2xl font-bold text-slate-950">
          Recent Transactions
        </h2>

        {payments.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-slate-600">
              No transactions found.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center"
              >
                <div>
                  <p className="font-bold text-slate-950">
                    {payment.plan_name || "Membership"}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {new Date(
                      payment.created_at
                    ).toLocaleString("en-IN")}
                  </p>

                  {payment.payment_reference && (
                    <p className="mt-1 break-all font-mono text-xs text-slate-500">
                      UTR: {payment.payment_reference}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <p className="font-black text-slate-950">
                    ₹
                    {Number(
                      payment.payment_amount ??
                        payment.plan_price ??
                        0
                    ).toLocaleString("en-IN")}
                  </p>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${statusClass(
                      payment.status
                    )}`}
                  >
                    {payment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}