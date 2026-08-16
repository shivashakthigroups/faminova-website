"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";

function ManualUpiPaymentContent() {
  const searchParams = useSearchParams();

  const planId = searchParams.get("plan_id");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [planName, setPlanName] = useState("");
  const [amount, setAmount] = useState<number>(0);

  const [utr, setUtr] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadPlan();
  }, [planId]);

  async function loadPlan() {
    setLoading(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    if (!planId) {
      setError("Membership plan was not selected.");
      setLoading(false);
      return;
    }

    const { data: plan, error: planError } =
      await supabase
        .from("membership_plans")
        .select("id, name, price, active")
        .eq("id", planId)
        .eq("active", true)
        .single();

    if (planError || !plan) {
      setError(
        "Membership plan could not be found."
      );
      setLoading(false);
      return;
    }

    setPlanName(plan.name);
    setAmount(Number(plan.price));

    setLoading(false);
  }

  async function submitPayment() {
    setError("");
    setMessage("");

    const cleanUtr = utr.trim();

    if (!cleanUtr) {
      setError(
        "Please enter your UPI Transaction ID / UTR."
      );
      return;
    }

    if (cleanUtr.length < 6) {
      setError(
        "Please enter a valid UPI Transaction ID / UTR."
      );
      return;
    }

    setSubmitting(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        window.location.href = "/login";
        return;
      }

      const response = await fetch(
        "/api/payment/manual/submit",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
            Authorization:
              `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            planId,
            utr: cleanUtr,
          }),
        }
      );

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error(
          "The server returned an invalid response."
        );
      }

      if (!response.ok) {
        setError(
          data?.error ||
            "Unable to submit payment verification request."
        );

        setSubmitting(false);
        return;
      }

      setMessage(
        `Payment submitted successfully. ${
          data?.payment?.orderId
            ? `Order ID: ${data.payment.orderId}. `
            : ""
        }Your payment is pending verification.`
      );

      setUtr("");
    } catch (err) {
      console.error(
        "Manual payment error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while submitting the payment."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-slate-950" />

          <p className="mt-4 text-sm text-slate-600">
            Loading payment details...
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
            className="text-2xl font-bold text-slate-950"
          >
            FamiNova
          </Link>

          <Link
            href="/dashboard"
            className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            Dashboard
          </Link>

        </div>
      </header>

      <section className="mx-auto max-w-5xl px-5 py-12">

        <div className="grid gap-8 lg:grid-cols-2">

          {/* Left side */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

            <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
              FamiNova Membership Payment
            </p>

            <h1 className="mt-3 text-3xl font-bold text-slate-950">
              Pay using UPI
            </h1>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              Scan the merchant QR using PhonePe,
              Google Pay, BHIM or another UPI app.
              After payment, submit the transaction
              reference below for verification.
            </p>

            <div className="mt-7 rounded-2xl bg-slate-50 p-5">

              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Selected Plan
              </p>

              <p className="mt-2 text-xl font-bold text-slate-950">
                {planName}
              </p>

              <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Exact Amount
              </p>

              <p className="mt-2 text-4xl font-bold text-slate-950">
                ₹
                {amount.toLocaleString(
                  "en-IN",
                  {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }
                )}
              </p>

            </div>

            <div className="mt-7">

              <p className="text-sm font-bold text-slate-950">
                Payment steps
              </p>

              <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <li>
                  1. Open any UPI payment app.
                </li>

                <li>
                  2. Scan the merchant QR shown
                  on this page.
                </li>

                <li>
                  3. Confirm the merchant name
                  before paying.
                </li>

                <li>
                  4. Pay exactly ₹
                  {amount.toLocaleString("en-IN")}.
                </li>

                <li>
                  5. Copy the UPI Transaction ID /
                  UTR from the successful payment.
                </li>

                <li>
                  6. Enter it on this page and
                  submit for verification.
                </li>
              </ol>

            </div>

            <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-5">

              <p className="text-sm font-bold text-amber-900">
                Payment verification required
              </p>

              <p className="mt-2 text-sm leading-6 text-amber-800">
                Submitting a transaction number does
                not automatically activate your
                membership. The payment will be
                checked against the merchant payment
                record first.
              </p>

            </div>

          </div>

          {/* Right side */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

            <div className="text-center">

              <p className="text-sm font-bold text-slate-950">
                Scan & Pay
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Pay the exact membership amount
                shown on the left.
              </p>

              <img
                src="/phonepe-qr.png"
                alt="Shiva Shakthi Medicals PhonePe merchant QR"
                className="mx-auto mt-5 w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-2"
              />

              <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Merchant
              </p>

              <p className="mt-1 text-lg font-bold text-slate-950">
                Shiva Shakthi Medicals
              </p>

              <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                UPI ID
              </p>

              <p className="mt-1 break-all text-lg font-bold text-slate-950">
                Q261134362@ybl
              </p>

            </div>

            <div className="mt-8 border-t border-slate-200 pt-7">

              <label
                htmlFor="utr"
                className="text-sm font-bold text-slate-950"
              >
                UPI Transaction ID / UTR
              </label>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Enter the transaction reference shown
                by your UPI app after successful
                payment.
              </p>

              <input
                id="utr"
                type="text"
                value={utr}
                onChange={(event) =>
                  setUtr(event.target.value)
                }
                placeholder="Example: UPI transaction reference"
                autoComplete="off"
                className="mt-3 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900"
              />

              {error && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">
                  {error}
                </div>
              )}

              {message && (
                <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-800">
                  {message}
                </div>
              )}

              <button
                type="button"
                onClick={submitPayment}
                disabled={submitting}
                className="mt-5 w-full rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting
                  ? "Submitting..."
                  : "Submit Payment for Verification"}
              </button>

              <Link
                href="/membership"
                className="mt-4 block text-sm font-semibold text-slate-600 underline underline-offset-4"
              >
                Back to Membership
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

function PaymentPageFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50">

      <div className="text-center">

        <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-slate-950" />

        <p className="mt-4 text-sm text-slate-600">
          Loading payment page...
        </p>

      </div>

    </main>
  );
}

export default function ManualUpiPaymentPage() {
  return (
    <Suspense fallback={<PaymentPageFallback />}>
      <ManualUpiPaymentContent />
    </Suspense>
  );
}