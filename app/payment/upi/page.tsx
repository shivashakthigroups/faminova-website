"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";

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
  description: string | null;
  price: number;
  duration_months: number;
  active: boolean;
};

const PLAN_DETAILS: Record<PlanSlug, SelectedPlan> = {
  basic: {
    slug: "basic",
    name: "Basic Membership",
    price: 49,
    description:
      "Essential FamiNova digital educational resources and member services.",
  },

  standard: {
    slug: "standard",
    name: "Standard Membership",
    price: 199,
    description:
      "Extended FamiNova educational resources and member services.",
  },

  premium: {
    slug: "premium",
    name: "Premium Membership",
    price: 499,
    description:
      "Premium access to FamiNova digital educational resources and member services.",
  },
};

export default function UpiPaymentPage() {
  const [selectedPlan, setSelectedPlan] =
    useState<SelectedPlan | null>(null);

  const [databasePlan, setDatabasePlan] =
    useState<DatabasePlan | null>(null);

  const [utr, setUtr] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [qrError, setQrError] = useState(false);

  useEffect(() => {
    initialisePayment();
  }, []);

  async function initialisePayment() {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams(
        window.location.search
      );

      const planParam = params
        .get("plan_id")
        ?.toLowerCase()
        .trim();

      if (
        !planParam ||
        !["basic", "standard", "premium"].includes(
          planParam
        )
      ) {
        setError("Invalid membership plan selected.");
        setLoading(false);
        return;
      }

      const slug = planParam as PlanSlug;
      const plan = PLAN_DETAILS[slug];

      setSelectedPlan(plan);

      // Check logged-in user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        window.location.href = "/login";
        return;
      }

      // Find corresponding real Supabase plan
      const {
        data: planData,
        error: planError,
      } = await supabase
        .from("membership_plans")
        .select(`
          id,
          name,
          description,
          price,
          duration_months,
          active
        `)
        .eq("active", true)
        .eq("price", plan.price)
        .limit(1)
        .maybeSingle();

      if (planError) {
        console.error(
          "Plan loading error:",
          planError
        );

        setError(planError.message);
        setLoading(false);
        return;
      }

      if (!planData) {
        setError(
          `No active ₹${plan.price} membership plan was found in Supabase.`
        );
        setLoading(false);
        return;
      }

      setDatabasePlan(planData as DatabasePlan);
      setLoading(false);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load the payment page."
      );

      setLoading(false);
    }
  }

  async function submitPayment(
    event: FormEvent
  ) {
    event.preventDefault();

    setError("");

    if (!selectedPlan || !databasePlan) {
      setError(
        "Membership plan could not be verified."
      );
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

      // Check duplicate transaction ID
      const {
        data: existingReference,
        error: referenceError,
      } = await supabase
        .from("memberships")
        .select("id")
        .eq("payment_reference", cleanUtr)
        .limit(1)
        .maybeSingle();

      if (
        !referenceError &&
        existingReference
      ) {
        setError(
          "This UPI Transaction ID / UTR has already been submitted."
        );
        setSubmitting(false);
        return;
      }

      // Create pending membership
      const { error: insertError } =
        await supabase
          .from("memberships")
          .insert({
            user_id: user.id,
            plan_id: databasePlan.id,
            status: "pending",
            payment_reference: cleanUtr,
            payment_amount: selectedPlan.price,
          });

      if (insertError) {
        console.error(
          "Membership insert error:",
          insertError
        );

        setError(insertError.message);
        setSubmitting(false);
        return;
      }

      setSuccess(true);
      setUtr("");
      setSubmitting(false);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to submit payment information. Please try again."
      );

      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-slate-950" />

          <p className="mt-4 text-sm font-medium text-slate-600">
            Loading payment details...
          </p>
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
            className="text-2xl font-bold tracking-tight text-slate-950"
          >
            FamiNova
          </Link>

          <Link
            href="/membership"
            className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Back to Membership
          </Link>

        </div>
      </header>

      <section className="mx-auto max-w-5xl px-5 py-12">

        {/* INVALID PLAN */}
        {error && !selectedPlan && (
          <div className="rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm">

            <h1 className="text-2xl font-bold text-slate-950">
              Payment page unavailable
            </h1>

            <p className="mt-3 text-sm text-red-700">
              {error}
            </p>

            <Link
              href="/membership"
              className="mt-6 inline-block rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white"
            >
              Choose Membership
            </Link>

          </div>
        )}

        {selectedPlan && (
          <>
            {/* TITLE */}
            <div className="mx-auto max-w-3xl text-center">

              <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
                Direct UPI Payment
              </p>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">
                Complete Your Membership Payment
              </h1>

              <p className="mt-4 text-base leading-7 text-slate-600">
                Scan the QR below, pay the exact
                membership amount and submit your UPI
                Transaction ID / UTR.
              </p>

            </div>

            {/* SUCCESS */}
            {success ? (
              <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-emerald-200 bg-white p-8 text-center shadow-sm">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl font-bold text-emerald-700">
                  ✓
                </div>

                <h2 className="mt-5 text-2xl font-bold text-slate-950">
                  Payment Details Submitted
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Your transaction reference has been
                  submitted successfully. Your membership
                  is now pending payment verification.
                </p>

                <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-left">

                  <p className="text-sm font-bold text-amber-900">
                    Verification Required
                  </p>

                  <p className="mt-2 text-sm leading-6 text-amber-800">
                    Your payment amount and transaction
                    reference will be checked against the
                    merchant UPI payment record before
                    membership activation.
                  </p>

                </div>

                <Link
                  href="/dashboard"
                  className="mt-7 inline-block rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white"
                >
                  Go to Dashboard
                </Link>

              </div>
            ) : (
              <div className="mt-10 grid gap-7 lg:grid-cols-2">

                {/* LEFT SIDE - QR */}
                <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

                  <div className="flex items-start justify-between gap-4">

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Selected Membership
                      </p>

                      <h2 className="mt-2 text-2xl font-bold text-slate-950">
                        {selectedPlan.name}
                      </h2>
                    </div>

                    {selectedPlan.slug === "basic" && (
                      <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700">
                        Launch Offer
                      </span>
                    )}

                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {selectedPlan.description}
                  </p>

                  {/* PRICE */}
                  <div className="mt-6 rounded-2xl bg-emerald-50 p-5 text-center">

                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                      Exact Amount To Pay
                    </p>

                    <p className="mt-2 text-5xl font-black text-slate-950">
                      ₹{selectedPlan.price}
                    </p>

                  </div>

                  {/* QR SCANNER */}
                  <div className="mt-7 text-center">

                    <h3 className="text-lg font-bold text-slate-950">
                      Scan & Pay
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      Scan using Google Pay, PhonePe,
                      Paytm, BHIM or another UPI app
                    </p>

                    {!qrError ? (
                      <div className="mx-auto mt-6 max-w-[320px] rounded-3xl border-2 border-slate-200 bg-white p-5 shadow-md">

                        <img
                          src="/faminova-upi-qr.png"
                          alt="FamiNova UPI Payment QR Code"
                          className="mx-auto block h-auto w-full object-contain"
                          onError={() =>
                            setQrError(true)
                          }
                        />

                      </div>
                    ) : (
                      <div className="mx-auto mt-6 max-w-[320px] rounded-3xl border-2 border-red-200 bg-red-50 p-7">

                        <p className="text-base font-bold text-red-700">
                          QR image not found
                        </p>

                        <p className="mt-3 text-sm leading-6 text-red-600">
                          Add your QR image as
                          public/faminova-upi-qr.png
                        </p>

                      </div>
                    )}

                    <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">

                      <p className="text-sm text-emerald-700">
                        Pay exactly
                      </p>

                      <p className="mt-1 text-3xl font-black text-emerald-900">
                        ₹{selectedPlan.price}
                      </p>

                    </div>

                    <p className="mt-4 text-xs leading-5 text-slate-500">
                      Verify the merchant name in your
                      UPI application before making the
                      payment.
                    </p>

                  </div>

                </div>

                {/* RIGHT SIDE - UTR */}
                <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    After Payment
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-slate-950">
                    Submit Transaction Details
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    After successfully paying
                    ₹{selectedPlan.price}, enter the
                    UPI Transaction ID / UTR shown in
                    your payment application.
                  </p>

                  {error && (
                    <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
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
                      placeholder="Enter Transaction ID / UTR"
                      autoComplete="off"
                      maxLength={100}
                      required
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-950 outline-none focus:border-slate-950"
                    />

                    <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">

                      <p className="text-sm font-bold text-amber-900">
                        Important
                      </p>

                      <p className="mt-2 text-sm leading-6 text-amber-800">
                        Submit your transaction reference
                        only after completing the actual
                        payment. Entering a transaction
                        number does not automatically
                        activate membership.
                      </p>

                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="mt-6 w-full rounded-xl bg-emerald-600 px-5 py-4 text-base font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submitting
                        ? "Submitting..."
                        : "Submit Payment for Verification"}
                    </button>

                  </form>

                </div>

              </div>
            )}
          </>
        )}

      </section>

      {/* PAYMENT INFO */}
      <section className="mx-auto max-w-5xl px-5 pb-14">

        <div className="rounded-3xl border border-slate-200 bg-white p-6">

          <h2 className="text-lg font-bold text-slate-950">
            Payment Information
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Membership activation occurs only after the
            submitted UPI transaction reference and
            payment amount have been verified against
            the merchant payment record.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            FamiNova membership provides digital
            educational resources and member services.
            Membership does not guarantee medical
            treatment, pregnancy, fertility outcomes,
            donor matching, or any specific medical
            result.
          </p>

          <div className="mt-5 flex flex-wrap gap-5 text-sm">

            <Link
              href="/terms"
              className="font-semibold text-slate-950 underline underline-offset-4"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/privacy"
              className="font-semibold text-slate-950 underline underline-offset-4"
            >
              Privacy Policy
            </Link>

            <Link
              href="/refund"
              className="font-semibold text-slate-950 underline underline-offset-4"
            >
              Refund Policy
            </Link>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">

        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-7 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © {new Date().getFullYear()} FamiNova.
            All rights reserved.
          </p>

          <Link
            href="/contact"
            className="font-semibold hover:text-slate-900"
          >
            Contact Us
          </Link>

        </div>

      </footer>

    </main>
  );
}