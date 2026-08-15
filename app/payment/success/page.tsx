"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type VerifyResult = {
  success?: boolean;
  status?: string;
  message?: string;
  error?: string;
  membership?: {
    id?: string;
    status?: string;
    expires_at?: string | null;
  };
};

function PaymentSuccessContent() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("order_id");

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function verifyPayment() {
      if (!orderId) {
        setError("Payment order ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        setMessage("");

        const response = await fetch(
          `/api/cashfree/verify?order_id=${encodeURIComponent(orderId)}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        let data: VerifyResult = {};

        try {
          data = await response.json();
        } catch {
          throw new Error(
            "The payment verification server returned an invalid response."
          );
        }

        if (cancelled) {
          return;
        }

        if (!response.ok) {
          setError(
            data?.error ||
              data?.message ||
              "Unable to verify the payment."
          );

          setVerified(false);
          return;
        }

        const paymentStatus =
          data?.status?.toUpperCase() || "";

        setStatus(paymentStatus);

        if (
          data?.success === true ||
          paymentStatus === "PAID" ||
          data?.membership?.status === "active"
        ) {
          setVerified(true);

          setMessage(
            data?.message ||
              "Payment successful. Your membership has been activated."
          );
        } else {
          setVerified(false);

          setMessage(
            data?.message ||
              "Payment verification is still being processed."
          );
        }
      } catch (err) {
        console.error(
          "Payment verification error:",
          err
        );

        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to verify your payment."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    verifyPayment();

    return () => {
      cancelled = true;
    };
  }, [orderId]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-slate-950" />

          <h1 className="mt-6 text-2xl font-bold text-slate-950">
            Verifying your payment
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Please wait while we confirm your
            Cashfree payment and update your
            FamiNova membership.
          </p>

          {orderId && (
            <p className="mt-5 break-all rounded-xl bg-slate-50 p-3 text-xs text-slate-500">
              Order ID: {orderId}
            </p>
          )}

        </div>
      </main>
    );
  }

  if (verified) {
    return (
      <main className="min-h-screen bg-slate-50">

        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">

            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-slate-950"
            >
              FamiNova
            </Link>

            <Link
              href="/dashboard"
              className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white hover:bg-slate-800"
            >
              Dashboard
            </Link>

          </div>
        </header>

        <section className="mx-auto flex min-h-[75vh] max-w-2xl items-center justify-center px-5 py-16">

          <div className="w-full rounded-3xl border border-emerald-200 bg-white p-8 text-center shadow-sm sm:p-10">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
              <span className="text-4xl text-emerald-700">
                ✓
              </span>
            </div>

            <p className="mt-7 text-sm font-bold uppercase tracking-wider text-emerald-700">
              Payment Successful
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Your membership is active
            </h1>

            <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-slate-600">
              {message}
            </p>

            {status && (
              <div className="mx-auto mt-6 w-fit rounded-full bg-emerald-100 px-5 py-2 text-sm font-bold text-emerald-800">
                Payment Status: {status}
              </div>
            )}

            {orderId && (
              <div className="mt-7 rounded-2xl bg-slate-50 p-5 text-left">

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Payment Reference
                </p>

                <p className="mt-2 break-all text-sm font-bold text-slate-900">
                  {orderId}
                </p>

              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

              <Link
                href="/dashboard"
                className="rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white hover:bg-slate-800"
              >
                Go to Dashboard
              </Link>

              <Link
                href="/profile"
                className="rounded-xl border border-slate-300 px-6 py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                View Profile
              </Link>

            </div>

          </div>

        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">

          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-slate-950"
          >
            FamiNova
          </Link>

          <Link
            href="/dashboard"
            className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Dashboard
          </Link>

        </div>
      </header>

      <section className="mx-auto flex min-h-[75vh] max-w-2xl items-center justify-center px-5 py-16">

        <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
            <span className="text-4xl text-amber-700">
              !
            </span>
          </div>

          <h1 className="mt-7 text-3xl font-bold tracking-tight text-slate-950">
            Payment verification
          </h1>

          {error ? (
            <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-red-600">
              {error}
            </p>
          ) : (
            <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-slate-600">
              {message ||
                "Your payment is being processed. Please check your dashboard shortly."}
            </p>
          )}

          {orderId && (
            <div className="mt-7 rounded-2xl bg-slate-50 p-5 text-left">

              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Order ID
              </p>

              <p className="mt-2 break-all text-sm font-bold text-slate-900">
                {orderId}
              </p>

            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

            <Link
              href="/dashboard"
              className="rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white hover:bg-slate-800"
            >
              Go to Dashboard
            </Link>

            <Link
              href="/membership"
              className="rounded-xl border border-slate-300 px-6 py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              Membership
            </Link>

          </div>

        </div>

      </section>
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-50">
          <div className="text-center">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-950" />

            <p className="mt-4 text-sm text-slate-600">
              Loading payment status...
            </p>

          </div>
        </main>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}