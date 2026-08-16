"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

type RawMembership = {
  id: string;
  user_id: string;
  plan_id: string;
  status: "pending" | "active" | "expired" | "cancelled";
  started_at: string | null;
  expires_at: string | null;
  membership_plans:
    | MembershipPlan
    | MembershipPlan[]
    | null;
};

export default function MembershipPage() {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [currentMembership, setCurrentMembership] =
    useState<Membership | null>(null);

  const [loading, setLoading] = useState(true);
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
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      window.location.href = "/login";
      return;
    }

    const {
      data: planData,
      error: planError,
    } = await supabase
      .from("membership_plans")
      .select(
        `
        id,
        name,
        description,
        price,
        duration_months,
        active
        `
      )
      .eq("active", true)
      .order("price", {
        ascending: true,
      });

    if (planError) {
      console.error(
        "Membership plans error:",
        planError
      );

      setError(planError.message);
      setLoading(false);
      return;
    }

    setPlans(planData ?? []);

    const {
      data: membershipData,
      error: membershipError,
    } = await supabase
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
      const raw =
        membershipData as unknown as RawMembership;

      let plan:
        MembershipPlan | null = null;

      if (
        Array.isArray(
          raw.membership_plans
        )
      ) {
        plan =
          raw.membership_plans[0] ??
          null;
      } else {
        plan =
          raw.membership_plans ??
          null;
      }

      setCurrentMembership({
        id: raw.id,
        user_id: raw.user_id,
        plan_id: raw.plan_id,
        status: raw.status,
        started_at:
          raw.started_at,
        expires_at:
          raw.expires_at,
        membership_plans:
          plan,
      });
    } else {
      setCurrentMembership(null);
    }

    setLoading(false);
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
            Select the membership option that suits your needs
            and continue to the direct UPI payment page.
          </p>

        </div>

      </section>

      {/* Messages */}
      <section className="mx-auto max-w-6xl px-5">

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">
            <strong>
              Something went wrong:
            </strong>{" "}
            {error}
          </div>
        )}

        {message && (
          <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-800">
            {message}
          </div>
        )}

      </section>

      {/* Current Membership */}
      {currentMembership && (
        <section className="mx-auto max-w-6xl px-5">

          <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <p className="text-sm font-semibold text-slate-500">
              Your current membership
            </p>

            <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

              <div>

                <h2 className="text-2xl font-bold text-slate-950">
                  {currentMembership
                    .membership_plans
                    ?.name ??
                    "Membership"}
                </h2>

                <p className="mt-1 text-sm text-slate-600">
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
                        ).toLocaleDateString(
                          "en-IN"
                        )}
                      </span>

                    </p>
                  )}

              </div>

              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${
                  currentMembership.status ===
                  "active"
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
                    If you have submitted your UPI transaction reference,
                    your membership will be activated after the payment
                    is verified.
                  </p>

                </div>
              )}

          </div>

        </section>
      )}

      {/* Membership Plans */}
      <section className="mx-auto max-w-6xl px-5 pb-12">

        {plans.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center">

            <p className="text-sm text-slate-600">
              No membership plans are currently available.
            </p>

          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">

            {plans.map(
              (
                plan,
                index
              ) => (
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
                      ₹
                      {Number(
                        plan.price
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </span>

                    <span className="ml-2 text-sm text-slate-500">
                      /{" "}
                      {plan.duration_months}{" "}
                      month
                      {plan.duration_months >
                      1
                        ? "s"
                        : ""}
                    </span>

                  </div>

                  <div className="my-6 border-t border-slate-200" />

                  <ul className="space-y-3 text-sm text-slate-600">

                    <li>
                      ✓ Digital educational resources
                    </li>

                    <li>
                      ✓ Member account access
                    </li>

                    <li>
                      ✓ Membership services available
                      under the selected plan
                    </li>

                    <li>
                      ✓ Membership status and validity
                      tracking
                    </li>

                  </ul>

                  <Link
                    href={`/payment/upi?plan_id=${encodeURIComponent(
                      plan.id
                    )}`}
                    className="mt-8 block w-full rounded-xl bg-slate-950 px-5 py-3.5 text-center text-sm font-bold text-white transition hover:bg-slate-800"
                  >
                    Pay Membership
                  </Link>

                </div>
              )
            )}

          </div>
        )}

      </section>

      {/* UPI Info */}
      <section className="mx-auto max-w-6xl px-5 pb-8">

        <div className="rounded-3xl border border-slate-200 bg-white p-6">

          <h2 className="text-lg font-bold text-slate-950">
            Direct UPI payment
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            After selecting a membership, you will be shown the merchant
            UPI QR and the exact membership amount. After making the
            payment, submit the UPI Transaction ID / UTR for verification.
          </p>

          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">

            <p className="text-sm font-semibold text-amber-900">
              Membership activation is not automatic from a submitted
              transaction number.
            </p>

            <p className="mt-2 text-sm leading-6 text-amber-800">
              The payment reference and amount are checked against the
              merchant payment record before membership is approved.
            </p>

          </div>

        </div>

      </section>

      {/* Important Information */}
      <section className="mx-auto max-w-6xl px-5 pb-14">

        <div className="rounded-3xl border border-slate-200 bg-white p-6">

          <h2 className="text-lg font-bold text-slate-950">
            Important information
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            FamiNova membership provides digital educational
            and member services according to the selected plan.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Membership payments are accepted through the displayed
            merchant UPI option. Membership activation occurs only
            after the submitted payment reference and payment amount
            have been manually verified against the merchant payment record.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Membership does guarantee medical treatment,
            pregnancy, fertility outcomes, donor matching,
            or any specific medical result.
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
            ©{" "}
            {new Date().getFullYear()}{" "}
            FamiNova. All rights reserved.
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