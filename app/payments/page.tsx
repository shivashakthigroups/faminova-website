"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

type PaymentRecord = {
  id: string;
  order_id: string;
  amount: number;
  utr: string | null;
  payment_status:
    | "pending"
    | "submitted"
    | "approved"
    | "rejected";
  submitted_at: string | null;
  verified_at: string | null;
  admin_note: string | null;
  created_at: string;
};

export default function PaymentHistoryPage() {
  const [payments, setPayments] =
    useState<PaymentRecord[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadPayments();
  }, []);

  async function loadPayments() {
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

    const {
      data,
      error: paymentError,
    } = await supabase
      .from("manual_payments")
      .select(
        `
        id,
        order_id,
        amount,
        utr,
        payment_status,
        submitted_at,
        verified_at,
        admin_note,
        created_at
        `
      )
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      });

    if (paymentError) {
      console.error(
        "Payment history error:",
        paymentError
      );

      setError(
        "Unable to load your payment history."
      );

      setLoading(false);
      return;
    }

    setPayments(
      (data ?? []) as PaymentRecord[]
    );

    setLoading(false);
  }

  function statusLabel(
    status: PaymentRecord["payment_status"]
  ) {
    if (status === "approved") {
      return "Approved";
    }

    if (status === "rejected") {
      return "Rejected";
    }

    if (status === "submitted") {
      return "Pending Verification";
    }

    return "Pending";
  }

  function statusClass(
    status: PaymentRecord["payment_status"]
  ) {
    if (status === "approved") {
      return "bg-emerald-100 text-emerald-800";
    }

    if (status === "rejected") {
      return "bg-red-100 text-red-800";
    }

    if (status === "submitted") {
      return "bg-amber-100 text-amber-800";
    }

    return "bg-slate-100 text-slate-700";
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">

        <div className="text-center">

          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-slate-950" />

          <p className="mt-4 text-sm text-slate-600">
            Loading payment history...
          </p>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">

          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-slate-950"
          >
            FamiNova
          </Link>

          <div className="flex gap-3">

            <Link
              href="/dashboard"
              className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              Dashboard
            </Link>

            <Link
              href="/membership"
              className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white hover:bg-slate-800"
            >
              Membership
            </Link>

          </div>

        </div>

      </header>

      <section className="mx-auto max-w-6xl px-5 py-10">

        <div className="max-w-3xl">

          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            FamiNova Payments
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Payment History
          </h1>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            View your submitted UPI payments and their
            verification status.
          </p>

        </div>

        {error && (
          <div className="mt-7 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {error}
          </div>
        )}

        {payments.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">

            <h2 className="text-xl font-bold text-slate-950">
              No payments yet
            </h2>

            <p className="mt-3 text-sm text-slate-600">
              You have not submitted any membership
              payment for verification.
            </p>

            <Link
              href="/membership"
              className="mt-6 inline-block rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white"
            >
              View Membership Plans
            </Link>

          </div>
        ) : (
          <div className="mt-8 space-y-5">

            {payments.map(
              (payment) => (
                <div
                  key={payment.id}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >

                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">

                    <div>

                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Order ID
                      </p>

                      <p className="mt-2 break-all text-sm font-bold text-slate-950">
                        {payment.order_id}
                      </p>

                    </div>

                    <span
                      className={`w-fit rounded-full px-4 py-2 text-sm font-bold ${statusClass(
                        payment.payment_status
                      )}`}
                    >
                      {statusLabel(
                        payment.payment_status
                      )}
                    </span>

                  </div>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    <div className="rounded-2xl bg-slate-50 p-4">

                      <p className="text-xs font-semibold uppercase text-slate-500">
                        Amount
                      </p>

                      <p className="mt-2 text-lg font-bold text-slate-950">
                        ₹
                        {Number(
                          payment.amount
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </p>

                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">

                      <p className="text-xs font-semibold uppercase text-slate-500">
                        UTR
                      </p>

                      <p className="mt-2 break-all text-sm font-bold text-slate-950">
                        {payment.utr ||
                          "Not available"}
                      </p>

                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">

                      <p className="text-xs font-semibold uppercase text-slate-500">
                        Submitted
                      </p>

                      <p className="mt-2 text-sm font-semibold text-slate-950">

                        {payment.submitted_at
                          ? new Date(
                              payment.submitted_at
                            ).toLocaleString(
                              "en-IN"
                            )
                          : "Not available"}

                      </p>

                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">

                      <p className="text-xs font-semibold uppercase text-slate-500">
                        Verified
                      </p>

                      <p className="mt-2 text-sm font-semibold text-slate-950">

                        {payment.verified_at
                          ? new Date(
                              payment.verified_at
                            ).toLocaleString(
                              "en-IN"
                            )
                          : "Pending"}

                      </p>

                    </div>

                  </div>

                  {payment.payment_status ===
                    "submitted" && (
                    <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">

                      <p className="text-sm font-bold text-amber-900">
                        Payment verification pending
                      </p>

                      <p className="mt-2 text-sm leading-6 text-amber-800">
                        Your payment reference has been
                        submitted. Membership will be
                        activated after the transaction
                        and amount are verified.
                      </p>

                    </div>
                  )}

                  {payment.payment_status ===
                    "approved" && (
                    <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">

                      <p className="text-sm font-bold text-emerald-900">
                        Payment approved
                      </p>

                      <p className="mt-2 text-sm leading-6 text-emerald-800">
                        Your payment has been verified
                        and the related membership has
                        been activated.
                      </p>

                    </div>
                  )}

                  {payment.payment_status ===
                    "rejected" && (
                    <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4">

                      <p className="text-sm font-bold text-red-900">
                        Payment could not be verified
                      </p>

                      <p className="mt-2 text-sm leading-6 text-red-800">
                        Please check the submitted UTR,
                        amount and payment details.
                      </p>

                      {payment.admin_note && (
                        <p className="mt-3 text-sm font-semibold text-red-900">
                          Note:{" "}
                          {payment.admin_note}
                        </p>
                      )}

                    </div>
                  )}

                </div>
              )
            )}

          </div>
        )}

      </section>

    </main>
  );
}