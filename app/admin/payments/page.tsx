"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import { supabase } from "../../../lib/supabase";

type ManualPayment = {
  id: string;
  user_id: string;
  membership_id: string;
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

export default function AdminPaymentsPage() {
  const [payments, setPayments] =
    useState<ManualPayment[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [processing, setProcessing] =
    useState<string | null>(null);

  const [error, setError] =
    useState("");

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    loadPayments();
  }, []);

  async function getToken() {
    const {
      data: { session },
    } =
      await supabase.auth.getSession();

    return session?.access_token;
  }

  async function loadPayments() {
    setLoading(true);
    setError("");

    const token =
      await getToken();

    if (!token) {
      window.location.href =
        "/login";
      return;
    }

    const response =
      await fetch(
        "/api/admin/manual-payments",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      setError(
        data?.error ||
          "Unable to load payments."
      );

      setLoading(false);
      return;
    }

    setPayments(
      data?.payments ?? []
    );

    setLoading(false);
  }

  async function handleAction(
    paymentId: string,
    action: "approve" | "reject"
  ) {
    const confirmed =
      window.confirm(
        action === "approve"
          ? "Have you verified this payment in PhonePe and want to activate the membership?"
          : "Reject this payment submission?"
      );

    if (!confirmed) {
      return;
    }

    setProcessing(paymentId);
    setError("");
    setMessage("");

    const token =
      await getToken();

    if (!token) {
      window.location.href =
        "/login";
      return;
    }

    const response =
      await fetch(
        "/api/admin/manual-payments/action",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            paymentId,
            action,
          }),
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      setError(
        data?.error ||
          "Unable to process payment."
      );

      setProcessing(null);
      return;
    }

    setMessage(
      data?.message ||
        "Payment updated."
    );

    await loadPayments();

    setProcessing(null);
  }

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

            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Admin
            </p>

          </div>

          <Link
            href="/dashboard"
            className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700"
          >
            Dashboard
          </Link>

        </div>

      </header>

      <section className="mx-auto max-w-7xl px-5 py-10">

        <h1 className="text-3xl font-bold text-slate-950">
          Payment Verification
        </h1>

        <p className="mt-3 text-sm text-slate-600">
          Confirm the UTR and amount in your
          PhonePe merchant account before approving.
        </p>

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
            {message}
          </div>
        )}

        {loading ? (
          <p className="mt-8 text-sm text-slate-600">
            Loading payments...
          </p>
        ) : payments.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-sm text-slate-600">
              No payment submissions yet.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-5">

            {payments.map(
              (payment) => (
                <div
                  key={payment.id}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >

                  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

                    <div>
                      <p className="text-xs font-semibold uppercase text-slate-500">
                        Order ID
                      </p>

                      <p className="mt-2 break-all text-sm font-bold text-slate-950">
                        {payment.order_id}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase text-slate-500">
                        Amount
                      </p>

                      <p className="mt-2 text-xl font-bold text-slate-950">
                        ₹
                        {Number(
                          payment.amount
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase text-slate-500">
                        UTR
                      </p>

                      <p className="mt-2 break-all text-sm font-bold text-slate-950">
                        {payment.utr ||
                          "Not provided"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase text-slate-500">
                        Status
                      </p>

                      <p className="mt-2 text-sm font-bold uppercase text-slate-950">
                        {
                          payment.payment_status
                        }
                      </p>
                    </div>

                  </div>

                  <div className="mt-5 border-t border-slate-200 pt-5">

                    <p className="text-xs text-slate-500">
                      User ID:
                      {" "}
                      {payment.user_id}
                    </p>

                    {payment.submitted_at && (
                      <p className="mt-1 text-xs text-slate-500">
                        Submitted:
                        {" "}
                        {new Date(
                          payment.submitted_at
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </p>
                    )}

                  </div>

                  {payment.payment_status ===
                    "submitted" && (
                    <div className="mt-6 flex flex-wrap gap-3">

                      <button
                        onClick={() =>
                          handleAction(
                            payment.id,
                            "approve"
                          )
                        }
                        disabled={
                          processing ===
                          payment.id
                        }
                        className="rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white disabled:opacity-50"
                      >
                        Approve Payment
                      </button>

                      <button
                        onClick={() =>
                          handleAction(
                            payment.id,
                            "reject"
                          )
                        }
                        disabled={
                          processing ===
                          payment.id
                        }
                        className="rounded-xl bg-red-700 px-5 py-3 text-sm font-bold text-white disabled:opacity-50"
                      >
                        Reject
                      </button>

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