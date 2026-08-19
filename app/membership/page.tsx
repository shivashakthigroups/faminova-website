"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

type MembershipPlan = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_months: number;
  features: string[];
  badge?: string;
};

type Membership = {
  id: string;
  user_id: string;
  plan_id: string;
  status: "pending" | "active" | "expired" | "cancelled";
  started_at: string | null;
  expires_at: string | null;
};

const membershipPlans: MembershipPlan[] = [
  {
    id: "basic",
    name: "Basic Membership",
    description:
      "A simple starter membership for accessing essential FamiNova educational and member services.",
    price: 49,
    duration_months: 1,
    badge: "Launch Offer",
    features: [
      "Digital educational resources",
      "Member account access",
      "Basic member dashboard access",
      "Membership status tracking",
      "General fertility awareness content",
    ],
  },
  {
    id: "standard",
    name: "Standard Membership",
    description:
      "Our recommended membership with wider access to FamiNova educational resources and member services.",
    price: 199,
    duration_months: 3,
    badge: "Most Popular",
    features: [
      "Everything in Basic",
      "Extended educational resources",
      "Enhanced member dashboard access",
      "Fertility myths vs facts content",
      "Priority access to member updates",
      "Membership validity tracking",
    ],
  },
  {
    id: "premium",
    name: "Premium Membership",
    description:
      "Premium access for members who want the broadest range of FamiNova digital educational services.",
    price: 499,
    duration_months: 6,
    badge: "Premium",
    features: [
      "Everything in Standard",
      "Premium educational resources",
      "Extended member services",
      "Priority member support",
      "Exclusive educational updates",
      "Advanced dashboard access",
      "Longer membership validity",
    ],
  },
];

export default function MembershipPage() {
  const [currentMembership, setCurrentMembership] =
    useState<Membership | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadMembershipData();
  }, []);

  async function loadMembershipData() {
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
      data: membershipData,
      error: membershipError,
    } = await supabase
      .from("memberships")
      .select(`
        id,
        user_id,
        plan_id,
        status,
        started_at,
        expires_at
      `)
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      })
      .limit(1)
      .maybeSingle();

    if (membershipError) {
      console.error(
        "Membership loading error:",
        membershipError
      );

      setError(membershipError.message);
      setLoading(false);
      return;
    }

    if (membershipData) {
      setCurrentMembership(
        membershipData as Membership
      );
    } else {
      setCurrentMembership(null);
    }

    setLoading(false);
  }

  function getPlanName(planId: string) {
    return (
      membershipPlans.find(
        (plan) => plan.id === planId
      )?.name || "FamiNova Membership"
    );
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />

          <p className="mt-4 text-sm font-medium text-slate-600">
            Loading membership options...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-slate-950"
          >
            FamiNova
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Dashboard
            </Link>

            <Link
              href="/profile"
              className="hidden rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800 sm:block"
            >
              My Profile
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-5 pb-10 pt-14 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
            FamiNova Membership
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Choose the membership that suits you
          </h1>

          <p className="mt-5 text-base leading-7 text-slate-600">
            Select from Basic, Standard or Premium
            membership and continue using our direct
            UPI payment option.
          </p>
        </div>
      </section>

      {/* ERROR */}
      {error && (
        <section className="mx-auto max-w-7xl px-5">
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <strong>Something went wrong:</strong>{" "}
            {error}
          </div>
        </section>
      )}

      {/* CURRENT MEMBERSHIP */}
      {currentMembership && (
        <section className="mx-auto max-w-7xl px-5">
          <div className="mb-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">
              Your current membership
            </p>

            <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-950">
                  {getPlanName(
                    currentMembership.plan_id
                  )}
                </h2>

                <p className="mt-2 text-sm text-slate-600">
                  Status:{" "}
                  <span className="font-semibold capitalize text-slate-900">
                    {currentMembership.status}
                  </span>
                </p>

                {currentMembership.status ===
                  "active" &&
                  currentMembership.expires_at && (
                    <p className="mt-2 text-sm text-slate-600">
                      Valid until:{" "}
                      <span className="font-semibold text-slate-900">
                        {new Date(
                          currentMembership.expires_at
                        ).toLocaleDateString("en-IN")}
                      </span>
                    </p>
                  )}
              </div>

              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${
                  currentMembership.status === "active"
                    ? "bg-emerald-100 text-emerald-800"
                    : currentMembership.status ===
                        "pending"
                      ? "bg-amber-100 text-amber-800"
                      : currentMembership.status ===
                          "expired"
                        ? "bg-red-100 text-red-800"
                        : "bg-slate-100 text-slate-700"
                }`}
              >
                {currentMembership.status}
              </span>
            </div>

            {currentMembership.status ===
              "pending" && (
                <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <p className="text-sm font-bold text-amber-900">
                    Payment verification pending
                  </p>

                  <p className="mt-2 text-sm leading-6 text-amber-800">
                    Your membership will be activated
                    after your UPI payment amount and
                    transaction reference are verified.
                  </p>
                </div>
              )}
          </div>
        </section>
      )}

      {/* MEMBERSHIP PLANS */}
      <section className="mx-auto max-w-7xl px-5 pb-14">
        <div className="grid gap-7 lg:grid-cols-3">
          {membershipPlans.map((plan) => {
            const isStandard =
              plan.id === "standard";

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-3xl bg-white p-7 shadow-sm ${
                  isStandard
                    ? "border-2 border-emerald-600 shadow-lg"
                    : "border border-slate-200"
                }`}
              >
                {/* BADGE */}
                {plan.badge && (
                  <div
                    className={`absolute right-5 top-5 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide ${
                      isStandard
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {plan.badge}
                  </div>
                )}

                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  {plan.id === "basic"
                    ? "Starter Plan"
                    : plan.id === "standard"
                      ? "Recommended Plan"
                      : "Complete Plan"}
                </p>

                <h2 className="mt-4 pr-24 text-2xl font-bold text-slate-950">
                  {plan.name}
                </h2>

                <p className="mt-4 min-h-[96px] text-sm leading-6 text-slate-600">
                  {plan.description}
                </p>

                {/* PRICE */}
                <div
                  className={`mt-6 rounded-2xl p-5 ${
                    isStandard
                      ? "bg-emerald-50"
                      : "bg-slate-50"
                  }`}
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Membership Fee
                  </p>

                  <div className="mt-2">
                    <span className="text-5xl font-black tracking-tight text-slate-950">
                      ₹{plan.price}
                    </span>
                  </div>

                  {plan.id === "basic" && (
                    <p className="mt-2 text-sm font-semibold text-emerald-700">
                      Special Launch Offer
                    </p>
                  )}

                  <p className="mt-2 text-sm text-slate-500">
                    Valid for{" "}
                    <span className="font-semibold text-slate-700">
                      {plan.duration_months}{" "}
                      month
                      {plan.duration_months > 1
                        ? "s"
                        : ""}
                    </span>
                  </p>
                </div>

                {/* FEATURES */}
                <div className="my-6 border-t border-slate-200" />

                <ul className="flex-1 space-y-4">
                  {plan.features.map(
                    (feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-sm leading-6 text-slate-700"
                      >
                        <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                          ✓
                        </span>

                        <span>{feature}</span>
                      </li>
                    )
                  )}
                </ul>

                {/* PAYMENT BUTTON */}
                <Link
                  href={`/payment/upi?plan_id=${encodeURIComponent(
                    plan.id
                  )}&amount=${plan.price}`}
                  className={`mt-8 block w-full rounded-xl px-5 py-4 text-center text-base font-bold text-white transition ${
                    isStandard
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-slate-950 hover:bg-slate-800"
                  }`}
                >
                  Pay ₹{plan.price}
                </Link>

                <p className="mt-3 text-center text-xs leading-5 text-slate-500">
                  Direct UPI payment • Payment
                  verification required
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* PAYMENT PROCESS */}
      <section className="mx-auto max-w-7xl px-5 pb-10">
        <div className="rounded-3xl border border-slate-200 bg-white p-7">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Direct UPI Payment
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-950">
              Simple membership activation
            </h2>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">
                1
              </div>

              <h3 className="mt-4 font-bold text-slate-950">
                Choose your plan
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Select Basic, Standard or Premium
                membership.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">
                2
              </div>

              <h3 className="mt-4 font-bold text-slate-950">
                Scan & pay
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Scan the displayed merchant UPI QR and
                pay the exact membership amount.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">
                3
              </div>

              <h3 className="mt-4 font-bold text-slate-950">
                Submit UTR
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Submit your UPI Transaction ID / UTR
                for payment verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IMPORTANT INFORMATION */}
      <section className="mx-auto max-w-7xl px-5 pb-14">
        <div className="rounded-3xl border border-slate-200 bg-white p-7">
          <h2 className="text-lg font-bold text-slate-950">
            Important information
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            FamiNova membership provides digital
            educational resources and member services
            according to the membership plan selected
            by the member.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Membership activation occurs only after the
            submitted UPI payment reference and payment
            amount have been verified against the
            merchant payment record.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            FamiNova membership does guarantee
            medical treatment, pregnancy, fertility
            outcomes, donor matching, or any specific
            medical result.
          </p>

          <div className="mt-5 flex flex-wrap gap-5 text-sm">
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

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
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