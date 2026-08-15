"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { supabase } from "../../lib/supabase";

type MembershipPlan = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  duration_months: number;
  active: boolean;
};

type Membership = {
  id: string;
  user_id: string;
  plan_id: string;
  status: "pending" | "active" | "expired" | "cancelled";
  started_at: string | null;
  expires_at: string | null;
  membership_plans: MembershipPlan | null;
};

declare global {
  interface Window {
    Cashfree: (options: {
      mode: "sandbox" | "production";
    }) => {
      checkout: (options: {
        paymentSessionId: string;
        redirectTarget?: string;
      }) => void;
    };
  }
}

export default function MembershipPage() {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [currentMembership, setCurrentMembership] =
    useState<Membership | null>(null);

  const [loading, setLoading] = useState(true);
  const [selectingPlan, setSelectingPlan] = useState<string | null>(null);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadMembershipData();
  }, []);

  async function loadMembershipData() {
    setLoading(true);
    setError("");
    setMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    const { data: planData, error: planError } = await supabase
      .from("membership_plans")
      .select("id, name, description, price, duration_months, active")
      .eq("active", true)
      .order("price", { ascending: true });

    if (planError) {
      console.error(planError);
      setError(planError.message);
      setLoading(false);
      return;
    }

    setPlans(planData ?? []);

    const { data: membershipData, error: membershipError } =
      await supabase
        .from("memberships")
        .select(
          `
          id,
          user_id,
          plan_id,
          status,
          started_at,
          expires_at,
          membership_plans (
            id,
            name,
            description,
            price,
            duration_months,
            active
          )
        `
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

    if (membershipError) {
      console.error(membershipError);
      setError(membershipError.message);
      setLoading(false);
      return;
    }

    setCurrentMembership(
      membershipData as Membership | null
    );

    setLoading(false);
  }

  async function startCashfreePayment(planId: string) {
    setSelectingPlan(planId);
    setError("");
    setMessage("");

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        window.location.href = "/login";
        return;
      }

      const response = await fetch(
        "/api/cashfree/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            planId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Create order error:", data);

        setError(
          data?.error ||
            "Unable to create the payment order."
        );

        setSelectingPlan(null);
        return;
      }

      if (!data.paymentSessionId) {
        setError(
          "Cashfree payment session was not created."
        );

        setSelectingPlan(null);
        return;
      }

      if (!window.Cashfree) {
        setError(
          "Cashfree Checkout is still loading. Please try again."
        );

        setSelectingPlan(null);
        return;
      }

      const cashfree = window.Cashfree({
        mode: "sandbox",
      });

      cashfree.checkout({
        paymentSessionId: data.paymentSessionId,
        redirectTarget: "_self",
      });
    } catch (error) {
      console.error(
        "Cashfree payment error:",
        error
      );

      setError(
        "Something went wrong while starting the payment."
      );

      setSelectingPlan(null);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />

          <p className="mt-4 text-sm text-slate-600">
            Loading membership options...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Cashfree Checkout SDK */}
      <Script
        src="https://sdk.cashfree.com/js/v3/cashfree.js"
        strategy="afterInteractive"
      />

      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-slate-950"
          >
            FamiNova
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Dashboard
            </Link>

            <Link
              href="/profile"
              className="hidden rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white hover:bg-slate-800 sm:block"
            >
              My Profile
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pb-8 pt-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            FamiNova Membership
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Choose your membership
          </h1>

          <p className="mt-5 text-base leading-7 text-slate-600">
            Select the membership option that suits your needs and access
            available FamiNova digital educational and member services.
          </p>
        </div>
      </section>

      {/* Messages */}
      <section className="mx-auto max-w-6xl px-5">
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">
            <strong>Something went wrong:</strong> {error}
          </div>
        )}

        {message && (
          <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-800">
            {message}
          </div>
        )}
      </section>

      {/* Current membership */}
      {currentMembership && (
        <section className="mx-auto max-w-6xl px-5">
          <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">
              Your current membership
            </p>

            <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-950">
                  {currentMembership.membership_plans?.name ??
                    "Membership"}
                </h2>

                <p className="mt-1 text-sm text-slate-600">
                  Status:{" "}
                  <span className="font-semibold capitalize text-slate-900">
                    {currentMembership.status}
                  </span>
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold capitalize text-slate-700">
                {currentMembership.status}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Plans */}
      <section className="mx-auto max-w-6xl px-5 pb-12">
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-3xl border bg-white p-7 shadow-sm ${
                index === 1
                  ? "border-slate-950 ring-1 ring-slate-950"
                  : "border-slate-200"
              }`}
            >
              {index === 1 && (
                <div className="absolute right-6 top-6 rounded-full bg-slate-950 px-3 py-1 text-xs font-bold text-white">
                  Popular
                </div>
              )}

              <h2 className="text-xl font-bold text-slate-950">
                {plan.name}
              </h2>

              <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-600">
                {plan.description}
              </p>

              <div className="mt-6">
                <span className="text-4xl font-bold text-slate-950">
                  ₹{Number(plan.price).toLocaleString("en-IN")}
                </span>

                <span className="ml-2 text-sm text-slate-500">
                  / {plan.duration_months} month
                  {plan.duration_months > 1 ? "s" : ""}
                </span>
              </div>

              <div className="my-6 border-t border-slate-200" />

              <ul className="space-y-3 text-sm text-slate-600">
                <li>✓ Digital educational resources</li>
                <li>✓ Member account access</li>
                <li>✓ Sperm dontation</li>
                <li>✓ Full required sperm collecting kit</li>
              </ul>

              <button
                type="button"
                onClick={() =>
                  startCashfreePayment(plan.id)
                }
                disabled={selectingPlan !== null}
                className="mt-8 w-full rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {selectingPlan === plan.id
                  ? "Opening Payment..."
                  : "Select Membership"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mx-auto max-w-6xl px-5 pb-14">
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-950">
            Important information
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            FamiNova membership provides digital educational and member
            services purchase or guarantee donor material, donor matching,
            medical treatment, pregnancy, biological material, or any
            specific fertility outcome.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Membership selection on this page does not currently collect
            payment. Payment processing will be added separately after the
            membership and security systems have been fully tested.
          </p>

          <div className="mt-5 flex flex-wrap gap-4 text-sm">
            <Link
              href="/privacy"
              className="font-semibold text-slate-950 underline underline-offset-4"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="font-semibold text-slate-950 underline underline-offset-4"
            >
              Terms & Conditions
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

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-7 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} FamiNova. All rights reserved.
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