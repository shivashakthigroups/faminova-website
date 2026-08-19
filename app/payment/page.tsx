"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

type PlanSlug = "basic" | "standard" | "premium";

type SelectedPlan = {
  slug: PlanSlug;
  name: string;
  price: number;
  description: string;
};

type DatabasePlan = {
  id: string;
  name: string;
  price: number;
  duration_months: number;
};

const PLANS: Record<PlanSlug, SelectedPlan> = {
  basic: {
    slug: "basic",
    name: "Basic Membership",
    price: 49,
    description: "Essential FamiNova membership access.",
  },

  standard: {
    slug: "standard",
    name: "Standard Membership",
    price: 199,
    description: "Extended FamiNova membership access.",
  },

  premium: {
    slug: "premium",
    name: "Premium Membership",
    price: 499,
    description: "Premium FamiNova membership access.",
  },
};

export default function UpiPaymentPage() {
  const [plan, setPlan] = useState<SelectedPlan | null>(null);
  const [databasePlan, setDatabasePlan] =
    useState<DatabasePlan | null>(null);

  const [utr, setUtr] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [qrFailed, setQrFailed] = useState(false);

  useEffect(() => {
    loadPaymentPage();
  }, []);

  async function loadPaymentPage() {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams(window.location.search);

      const planId = params
        .get("plan_id")
        ?.toLowerCase()
        .trim();

      if (
        !planId ||
        !["basic", "standard", "premium"].includes(planId)
      ) {
        setError("Invalid membership plan.");
        setLoading(false);
        return;
      }

      const selected = PLANS[planId as PlanSlug];

      setPlan(selected);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        window.location.href = "/login";
        return;
      }

      const {
        data: dbPlan,
        error: planError,
      } = await supabase
        .from("membership_plans")
        .select(`
          id,
          name,
          price,
          duration_months
        `)
        .eq("active", true)
        .eq("price", selected.price)
        .limit(1)
        .maybeSingle();

      if (planError) {
        setError(planError.message);
        setLoading(false);
        return;
      }

      if (!dbPlan) {
        setError(
          `No active ₹${selected.price} membership plan found in Supabase.`
        );
        setLoading(false);
        return;
      }

      setDatabasePlan(dbPlan as DatabasePlan);
      setLoading(false);
    } catch (err) {
      console.error(err);

      setError("Unable to load payment page.");
      setLoading(false);
    }
  }

  async function submitPayment(event: FormEvent) {
    event.preventDefault();

    setError("");

    if (!plan || !databasePlan) {
      setError("Membership plan could not be verified.");
      return;
    }

    const cleanUtr = utr.trim();

    if (cleanUtr.length < 8) {
      setError(
        "Please enter a valid UPI Transaction ID / UTR."
      );
      return;
    }

    setSubmitting(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        window.location.href = "/login";
        return;
      }

      // Check whether this UTR has already been submitted
      const {
        data: existingPayment,
        error: checkError,
      } = await supabase
        .from("memberships")
        .select("id")
        .eq("payment_reference", cleanUtr)
        .limit(1)
        .maybeSingle();

      if (!checkError && existingPayment) {
        setError(
          "This UPI Transaction ID / UTR has already been submitted."
        );
        setSubmitting(false);
        return;
      }

      const { error: insertError } = await supabase
        .from("memberships")
        .insert({
          user_id: user.id,
          plan_id: databasePlan.id,
          status: "pending",
          payment_reference: cleanUtr,
          payment_amount: plan.price,
        });

      if (insertError) {
        console.error(insertError);
        setError(insertError.message);
        setSubmitting(false);
        return;
      }

      setUtr("");
      setSuccess(true);
      setSubmitting(false);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to submit payment details. Please try again."
      );

      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />

          <p className="mt-4 text-sm font-medium text-slate-600">
            Loading payment...
          </p>
        </div>
      </main>
    );
  }

  if (!plan) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5">
        <div className="max-w-lg rounded-3xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-950">
            Payment Page Error
          </h1>

          <p className="mt-3 text-red-600">
            {error || "Invalid membership plan."}
          </p>

          <Link
            href="/membership"
            className="mt-6 inline-block rounded-xl bg-slate-950 px-6 py-3 font-bold text-white"
          >
            Back to Membership
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HEADER */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <Link
            href="/"
            className="text-2xl font-bold text-slate-950"
          >
            FamiNova
          </Link>

          <Link
            href="/membership"
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
          >
            Back
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-5 py-12">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
            Secure UPI Payment
          </p>

          <h1 className="mt-3 text-4xl font-bold text-slate-950">
            Complete Your Payment
          </h1>

          <p className="mt-3 text-slate-600">
            Scan the QR code and pay the exact membership
            amount.
          </p>
        </div>

        {success ? (
          <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-emerald-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl font-bold text-emerald-700">
              ✓
            </div>

            <h2 className="mt-5 text-2xl font-bold text-slate-950">
              Payment Submitted
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Your payment details have been submitted
              successfully.
            </p>

            <p className="mt-2 leading-7 text-slate-600">
              Your membership is currently pending
              payment verification.
            </p>

            <Link
              href="/dashboard"
              className="mt-7 inline-block rounded-xl bg-slate-950 px-6 py-3 font-bold text-white"
            >
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-7 lg:grid-cols-2">
            {/* PAYMENT / QR */}

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Selected Plan
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-slate-950">
                    {plan.name}
                  </h2>
                </div>

                {plan.slug === "basic" && (
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                    Launch Offer
                  </span>
                )}
              </div>

              <p className="mt-4 text-sm text-slate-600">
                {plan.description}
              </p>

              {/* AMOUNT */}

              <div className="mt-6 rounded-2xl bg-emerald-50 p-5 text-center">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Amount To Pay
                </p>

                <p className="mt-2 text-5xl font-black text-slate-950">
                  ₹{plan.price}
                </p>
              </div>

              {/* QR CODE */}

              <div className="mt-7 text-center">
                <h3 className="text-xl font-bold text-slate-950">
                  Scan QR Code
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Scan using Google Pay, PhonePe, Paytm,
                  BHIM or any UPI app
                </p>

                <div className="mx-auto mt-6 flex min-h-[300px] max-w-[330px] items-center justify-center rounded-3xl border-2 border-slate-200 bg-white p-5 shadow-md">
                  {!qrFailed ? (
                    <img
                      src="/faminova-upi-qr.png"
                      alt="FamiNova UPI Payment QR Code"
                      width={300}
                      height={300}
                      className="block h-auto max-h-[300px] w-full max-w-[300px] object-contain"
                      onLoad={() => setQrFailed(false)}
                      onError={() => setQrFailed(true)}
                    />
                  ) : (
                    <div className="p-5">
                      <p className="font-bold text-red-600">
                        QR Code Not Found
                      </p>

                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        Make sure the QR image is saved as:
                      </p>

                      <p className="mt-2 break-all rounded-lg bg-slate-100 p-2 text-xs font-bold text-slate-800">
                        public/faminova-upi-qr.png
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                  <p className="text-sm text-emerald-700">
                    Pay exactly
                  </p>

                  <p className="mt-1 text-3xl font-black text-emerald-900">
                    ₹{plan.price}
                  </p>
                </div>

                <p className="mt-4 text-xs leading-5 text-slate-500">
                  Check the merchant name displayed in
                  your UPI app before completing payment.
                </p>
              </div>
            </div>

            {/* UTR */}

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                After Payment
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-950">
                Submit Payment Details
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                After paying ₹{plan.price}, copy the UPI
                Transaction ID / UTR from your payment
                application and enter it below.
              </p>

              {error && (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              <form
                onSubmit={submitPayment}
                className="mt-6"
              >
                <label
                  htmlFor="utr"
                  className="text-sm font-bold text-slate-900"
                >
                  UPI Transaction ID / UTR
                </label>

                <input
                  id="utr"
                  type="text"
                  value={utr}
                  onChange={(event) =>
                    setUtr(event.target.value)
                  }
                  placeholder="Enter UPI Transaction ID / UTR"
                  required
                  autoComplete="off"
                  maxLength={100}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-4 text-slate-950 outline-none focus:border-emerald-600"
                />

                <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <p className="font-bold text-amber-900">
                    Important
                  </p>

                  <p className="mt-2 text-sm leading-6 text-amber-800">
                    Submit the UTR only after making the
                    payment. Your membership will be
                    activated only after payment
                    verification.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-6 w-full rounded-xl bg-emerald-600 px-5 py-4 text-base font-bold text-white hover:bg-emerald-700 disabled:opacity-50"
                >
                  {submitting
                    ? "Submitting..."
                    : "Submit Payment for Verification"}
                </button>
              </form>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}