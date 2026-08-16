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

      {/* MAIN CONTENT */}
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
            {/* SECTION 1 */}
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

            {/* SECTION 2 */}
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

            {/* SECTION 3 */}
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

            {/* SECTION 4 */}
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

            {/* SECTION 5 */}
            <Section title="5. Failed or Unsuccessful Payments">
              <p>
                If a payment attempt fails and no amount is debited,
                there is no payment for FamiNova to refund.
              </p>

              <p>
                If your bank or UPI application shows that an amount
                was debited but FamiNova cannot confirm receipt, you
                should first check the final transaction status with
                your bank or UPI provider.
              </p>

              <p>
                You may also contact FamiNova with the transaction
                reference so that the payment can be reviewed.
              </p>
            </Section>

            {/* SECTION 6 */}
            <Section title="6. Duplicate Payments">
              <p>
                If the same membership is accidentally paid for more
                than once and FamiNova confirms receipt of duplicate
                payments, please contact us promptly.
              </p>

              <p>
                Confirmed duplicate payments will be reviewed and,
                where appropriate, the excess payment may be refunded
                to the applicable payment source or through another
                appropriate method after verification.
              </p>
            </Section>

            {/* SECTION 7 */}
            <Section title="7. Incorrect or False UTR Submissions">
              <p>
                A transaction reference or UTR that cannot be matched
                with a successfully received payment may be rejected.
              </p>

              <p>
                False, altered, reused or misleading transaction
                references do not create any entitlement to membership
                activation or a refund.
              </p>
            </Section>

            {/* SECTION 8 */}
            <Section title="8. Cancellation Before Membership Activation">
              <p>
                If you have made a payment but your membership has not
                yet been activated, you may contact FamiNova to request
                cancellation.
              </p>

              <p>
                The request will be reviewed together with the payment
                status and any membership access already provided.
              </p>
            </Section>

            {/* SECTION 9 */}
            <Section title="9. Refund Requests After Activation">
              <p>
                Because FamiNova memberships provide access to digital
                services and resources, refund eligibility after
                membership activation may depend on the circumstances
                of the request, the services already supplied and
                applicable consumer rights.
              </p>

              <p>
                A request will not automatically be rejected solely
                because a service is digital. Where applicable law
                provides a consumer with a refund or other remedy,
                those rights will continue to apply.
              </p>
            </Section>

            {/* SECTION 10 */}
            <Section title="10. How to Request a Refund">
              <p>
                To request review of a payment, cancellation or refund,
                contact FamiNova using the support email below.
              </p>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="font-black text-slate-950">
                  FamiNova Support
                </p>

                <p className="mt-2">
                  Email:{" "}
                  <a
                    href="mailto:shivashakthigroups01@gmail.com"
                    className="font-bold text-violet-700 hover:text-violet-900"
                  >
                    shivashakthigroups01@gmail.com
                  </a>
                </p>
              </div>

              <p>
                Please provide enough information for us to identify
                the transaction, including where applicable:
              </p>

              <ul className="list-disc space-y-2 pl-6">
                <li>Your registered FamiNova email address.</li>
                <li>Your name.</li>
                <li>Your membership plan.</li>
                <li>The payment amount.</li>
                <li>The UPI transaction reference or UTR.</li>
                <li>The date of payment.</li>
                <li>The reason for your refund or cancellation request.</li>
              </ul>

              <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
                <p className="font-bold text-red-900">
                  Never send your UPI PIN, OTP, ATM PIN, card PIN or
                  banking password to FamiNova.
                </p>
              </div>
            </Section>

            {/* SECTION 11 */}
            <Section title="11. Refund Review">
              <p>
                FamiNova may verify the payment, membership status and
                circumstances of the request before determining whether
                a refund is due.
              </p>

              <p>
                We may contact you for reasonable additional information
                where necessary to identify or verify the transaction.
              </p>
            </Section>

            {/* SECTION 12 */}
            <Section title="12. Approved Refunds">
              <p>
                Where a refund is approved, FamiNova will communicate
                the applicable refund method and status to the customer.
              </p>

              <p>
                The time required for funds to appear after a refund is
                processed may depend on the bank, UPI service or other
                payment provider involved.
              </p>
            </Section>

            {/* SECTION 13 */}
            <Section title="13. Membership After Refund">
              <p>
                Where a membership payment is fully refunded, the
                corresponding paid membership may be cancelled,
                deactivated or marked as refunded where appropriate.
              </p>
            </Section>

            {/* SECTION 14 */}
            <Section title="14. Chargebacks and Payment Disputes">
              <p>
                If you believe a payment has been made incorrectly,
                please contact FamiNova first so that we can investigate
                the transaction.
              </p>

              <p>
                Nothing in this policy prevents you from exercising
                rights available through your bank, payment provider
                or applicable law.
              </p>
            </Section>

            {/* SECTION 15 */}
            <Section title="15. Consumer Rights">
              <p>
                Nothing in this Refund & Cancellation Policy is intended
                to exclude, restrict or override consumer rights or
                remedies that cannot lawfully be excluded under
                applicable Indian law.
              </p>
            </Section>

            {/* SECTION 16 */}
            <Section title="16. Changes to This Policy">
              <p>
                FamiNova may update this policy when payment methods,
                membership services or applicable requirements change.
              </p>

              <p>
                The latest version will be displayed on this page with
                its updated revision date.
              </p>
            </Section>

            {/* SECTION 17 */}
            <Section title="17. Contact Us">
              <p>
                If you have questions regarding a payment, cancellation
                or refund request, contact us using the details below.
              </p>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="font-black text-slate-950">
                  FamiNova
                </p>

                <p className="mt-2">
                  Email:{" "}
                  <a
                    href="mailto:shivashakthigroups01@gmail.com"
                    className="font-bold text-violet-700 hover:text-violet-900"
                  >
                    shivashakthigroups01@gmail.com
                  </a>
                </p>

                <p className="mt-1">
                  Website: faminova.in
                </p>
              </div>
            </Section>
          </div>

          {/* LEGAL LINKS */}
          <div className="mt-12 border-t border-slate-200 pt-8">
            <div className="flex flex-wrap gap-5 text-sm font-semibold">
              <Link
                href="/terms"
                className="text-violet-700 hover:text-violet-900"
              >
                Terms & Conditions
              </Link>

              <Link
                href="/privacy"
                className="text-violet-700 hover:text-violet-900"
              >
                Privacy Policy
              </Link>

              <Link
                href="/contact"
                className="text-violet-700 hover:text-violet-900"
              >
                Contact Us
              </Link>

              <Link
                href="/"
                className="text-violet-700 hover:text-violet-900"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-5 py-8 text-center">
          <p className="text-xs leading-6 text-slate-500">
            © {new Date().getFullYear()} FamiNova. All rights reserved.
          </p>

          <p className="mt-2 text-xs leading-5 text-slate-400">
            FamiNova provides digital educational and membership
            services.
          </p>
        </div>
      </footer>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl font-black text-slate-950">
        {title}
      </h2>

      <div className="mt-4 space-y-4">
        {children}
      </div>
    </section>
  );
}