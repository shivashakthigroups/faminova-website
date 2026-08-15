"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("order_id");

  const [checking, setChecking] = useState(true);
  const [message, setMessage] = useState(
    "Checking your payment..."
  );

  useEffect(() => {
    async function checkPayment() {
      if (!orderId) {
        setMessage("Payment order ID was not found.");
        setChecking(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/cashfree/verify?order_id=${encodeURIComponent(
            orderId
          )}`
        );

        const data = await response.json();

        if (!response.ok) {
          setMessage(
            data?.error ||
              "We could not verify the payment yet."
          );
          setChecking(false);
          return;
        }

        if (data.status === "PAID") {
          setMessage(
            "Payment successful! Your membership is being activated."
          );
        } else if (data.status === "ACTIVE") {
          setMessage(
            "Payment successful! Your membership is active."
          );
        } else {
          setMessage(
            "Your payment is still being processed. Please check your dashboard shortly."
          );
        }
      } catch (error) {
        console.error(error);

        setMessage(
          "We could not verify your payment right now."
        );
      }

      setChecking(false);
    }

    checkPayment();
  }, [orderId]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">
          {checking ? "⏳" : "✓"}
        </div>

        <h1 className="mt-6 text-3xl font-bold text-slate-950">
          {checking
            ? "Verifying Payment"
            : "Payment Status"}
        </h1>

        <p className="mt-4 text-sm leading-7 text-slate-600">
          {message}
        </p>

        {orderId && (
          <p className="mt-4 break-all text-xs text-slate-400">
            Order: {orderId}
          </p>
        )}

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/dashboard"
            className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"
          >
            Go to Dashboard
          </Link>

          <Link
            href="/membership"
            className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            View Membership
          </Link>
        </div>
      </div>
    </main>
  );
}