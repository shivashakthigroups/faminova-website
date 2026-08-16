import Link from "next/link";

export const metadata = {
  title: "Refund & Cancellation Policy | FamiNova",
  description:
    "Refund and cancellation policy for FamiNova digital membership services.",
};

export default function RefundPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
          <Link
            href="/"
            className="text-2xl font-black tracking-tight text-violet-700"
          >
            FamiNova
          </Link>

          <Link
            href="/"
            className="text-sm font-semibold text-slate-600 hover:text-violet-700"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* CONTENT */}
      <section className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.15em] text-violet-600">
            Payments
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Refund & Cancellation Policy
          </h1>

          <p className="mt-4 text-sm text-slate-500">
            Last updated: 16 August 2026
          </p>

          <div className="mt-10 space-y-10 text-sm leading-7 text-slate-700">
            <Section title="1. Introduction">
              <p>
                This Refund & Cancellation Policy explains how refund
                and cancellation requests relating to FamiNova digital
                membership services are handled.
              </p>

              <p>
                Please read this policy before purchasing a FamiNova
                membership.
              </p>
            </Section>

            <Section title="2. Digital Membership Services">
              <p>
                FamiNova provides digital educational and membership
                services. Membership access is activated after the
                applicable payment has been successfully verified.
              </p>

              <p>
                The applicable membership price, duration and available
                features are displayed before payment.
              </p>
            </Section>

            <Section title="3. Direct UPI Payments">
              <p>
                FamiNova may accept membership payments through direct
                UPI payment methods displayed on the website.
              </p>

              <p>
                After completing a UPI payment, the customer may be
                required to submit the relevant transaction reference
                number or UTR for verification.
              </p>

              <p>
                Submission of a UTR does not by itself confirm that
                FamiNova has received the payment.
              </p>
            </Section>

            <Section title="4. Pending Payment Verification">
              <p>
                A payment may remain in a pending or submitted status
                while FamiNova verifies the transaction against
                available merchant or payment records.
              </p>

              <p>
                Membership will normally be activated only after the
                payment has been confirmed as successfully received.
              </p>

              <div className="rounded-2xl border border-violet-200 bg-violet-50 p-5">
                <p className="font-bold text-violet-900">
                  Customers should not make a second payment simply
                  because their first payment is still awaiting
                  verification.
                </p>
              </div>
            </Section>

            <Section title="5. Failed or Unsuccessful Payments">
              <p>
                If a payment attempt fails and no amount is debited,
                there is no payment for FamiNova to refund.
              </p>

              <p>
                If your bank or UPI