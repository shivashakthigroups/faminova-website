import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions | FamiNova",
  description:
    "Terms and Conditions governing the use of FamiNova and its digital membership services.",
};

export default function TermsPage() {
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
            Legal
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Terms & Conditions
          </h1>

          <p className="mt-4 text-sm text-slate-500">
            Last updated: 16 August 2026
          </p>

          <div className="mt-10 space-y-10 text-sm leading-7 text-slate-700">
            {/* 1 */}
            <Section title="1. Introduction">
              <p>
                Welcome to FamiNova. These Terms & Conditions govern
                your access to and use of the FamiNova website,
                accounts, digital membership services, educational
                information and related features.
              </p>

              <p>
                By accessing FamiNova, creating an account, purchasing
                a membership or using our services, you agree to these
                Terms & Conditions.
              </p>

              <p>
                If you do not agree with these terms, you should not
                use the website or purchase a membership.
              </p>
            </Section>

            {/* 2 */}
            <Section title="2. Nature of FamiNova Services">
              <p>
                FamiNova provides digital educational information,
                membership services, account management and related
                online resources.
              </p>

              <p>
                Content made available through FamiNova is intended
                for general educational and informational purposes.
              </p>

              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <p className="font-bold text-amber-900">
                  Important Medical Disclaimer
                </p>

                <p className="mt-2 text-amber-900">
                  FamiNova does not provide medical diagnosis,
                  individual medical treatment, emergency medical
                  services or guarantees of pregnancy, conception,
                  fertility improvement or any particular medical or
                  biological outcome.
                </p>
              </div>

              <p>
                Information provided through FamiNova should not be
                used as a substitute for advice, diagnosis or
                treatment from a qualified healthcare professional.
                Users should consult an appropriately qualified
                healthcare professional regarding individual medical
                or fertility-related concerns.
              </p>
            </Section>

            {/* 3 */}
            <Section title="3. Account Registration">
              <p>
                Certain FamiNova services require you to create an
                account. You agree to provide accurate and current
                information when registering and maintaining your
                profile.
              </p>

              <p>
                You are responsible for maintaining the confidentiality
                of your login credentials and for activity performed
                through your account.
              </p>

              <p>
                You should notify FamiNova if you believe your account
                has been accessed without authorization.
              </p>
            </Section>

            {/* 4 */}
            <Section title="4. Membership">
              <p>
                FamiNova may offer paid digital membership plans.
                Membership features, duration, pricing and included
                services will be displayed on the website before
                payment.
              </p>

              <p>
                Membership access begins only after the applicable
                payment has been successfully verified and the
                membership has been activated by FamiNova.
              </p>

              <p>
                Membership does constitute a purchase of any
                guaranteed medical result or fertility outcome.
              </p>
            </Section>

            {/* 5 */}
            <Section title="5. Payments and UPI Verification">
              <p>
                FamiNova may accept membership payments through UPI or
                other payment methods displayed on the website.
              </p>

              <p>
                Where manual UPI verification is used, customers may
                be required to provide the UPI transaction reference
                number or UTR after completing payment.
              </p>

              <p>
                Submission of a UTR or transaction reference does not
                by itself constitute confirmation that payment has
                been received.
              </p>

              <p>
                FamiNova may verify the transaction against its
                merchant or bank payment records before activating a
                membership.
              </p>

              <p>
                Providing a false, altered, duplicate or misleading
                payment reference may result in rejection of the
                payment request and restriction or suspension of the
                associated account.
              </p>
            </Section>

            {/* 6 */}
            <Section title="6. Payment Verification">
              <p>
                Payments submitted for manual verification may remain
                in a pending or submitted status until reviewed.
              </p>

              <p>
                Membership activation occurs only after payment is
                verified as successfully received.
              </p>

              <p>
                If a submitted payment cannot be verified, FamiNova
                may reject the payment verification request and may
                ask the customer to provide additional transaction
                information.
              </p>
            </Section>

            {/* 7 */}
            <Section title="7. Refunds and Cancellations">
              <p>
                Refund eligibility, cancellation requirements and
                applicable processing procedures are governed by the
                FamiNova Refund Policy.
              </p>

              <p>
                Please review the Refund Policy before purchasing a
                membership.
              </p>

              <Link
                href="/refund"
                className="inline-flex font-bold text-violet-700 hover:text-violet-900"
              >
                View Refund Policy →
              </Link>
            </Section>

            {/* 8 */}
            <Section title="8. Membership Duration and Expiry">
              <p>
                Paid memberships remain active for the duration shown
                for the selected membership plan, beginning from the
                applicable activation date.
              </p>

              <p>
                When a membership expires, access to membership-only
                features may end or become restricted unless the
                membership is renewed.
              </p>
            </Section>

            {/* 9 */}
            <Section title="9. Acceptable Use">
              <p>You agree not to:</p>

              <ul className="list-disc space-y-2 pl-6">
                <li>
                  Use FamiNova for unlawful, fraudulent or abusive
                  purposes.
                </li>

                <li>
                  Submit false or misleading payment information.
                </li>

                <li>
                  Attempt to gain unauthorized access to another
                  person's account or administrative systems.
                </li>

                <li>
                  Interfere with the operation or security of the
                  website.
                </li>

                <li>
                  Copy, scrape, reproduce or redistribute protected
                  FamiNova content without authorization.
                </li>

                <li>
                  Use automated systems to misuse or overload the
                  website.
                </li>
              </ul>
            </Section>

            {/* 10 */}
            <Section title="10. Suspension and Termination">
              <p>
                FamiNova may suspend or restrict an account where
                reasonably necessary to protect the platform, other
                users or FamiNova from fraud, security threats,
                unlawful activity or material violations of these
                Terms.
              </p>

              <p>
                Where appropriate, users may contact FamiNova regarding
                an account restriction or payment verification issue.
              </p>
            </Section>

            {/* 11 */}
            <Section title="11. Educational Content">
              <p>
                FamiNova aims to provide useful educational
                information, but information may not apply to every
                individual situation.
              </p>

              <p>
                Medical and scientific knowledge may change over time.
                Users should obtain professional medical advice before
                making healthcare decisions.
              </p>
            </Section>

            {/* 12 */}
            <Section title="12. No Guarantee of Results">
              <p>
                Individual health, reproductive and fertility outcomes
                depend on many factors outside the control of
                FamiNova.
              </p>

              <p>
                FamiNova does promise or guarantee conception,
                pregnancy, childbirth, treatment success or any other
                particular health, fertility or biological result.
              </p>
            </Section>

            {/* 13 */}
            <Section title="13. Intellectual Property">
              <p>
                Unless otherwise stated, the FamiNova name, branding,
                website design, original text, graphics and other
                original platform content are owned by or licensed to
                FamiNova and are protected by applicable intellectual
                property laws.
              </p>

              <p>
                Membership does not transfer ownership of FamiNova
                intellectual property to the member.
              </p>
            </Section>

            {/* 14 */}
            <Section title="14. Third-Party Services">
              <p>
                FamiNova may rely on third-party technology providers
                for services such as website hosting, authentication,
                database infrastructure, communications or payment
                processing.
              </p>

              <p>
                Third-party services may be subject to their own terms,
                privacy policies and availability.
              </p>
            </Section>

            {/* 15 */}
            <Section title="15. Availability of the Website">
              <p>
                We aim to keep FamiNova available and functioning
                reliably. However, uninterrupted availability cannot
                be guaranteed.
              </p>

              <p>
                Access may occasionally be interrupted because of
                maintenance, upgrades, internet failures, security
                events or circumstances outside our reasonable
                control.
              </p>
            </Section>

            {/* 16 */}
            <Section title="16. Limitation of Liability">
              <p>
                To the extent permitted by applicable law, FamiNova
                will not be responsible for indirect, incidental or
                consequential losses arising solely from reliance on
                general educational information available through the
                platform.
              </p>

              <p>
                Nothing in these Terms is intended to exclude or limit
                any liability or consumer right that cannot lawfully
                be excluded or limited.
              </p>
            </Section>

            {/* 17 */}
            <Section title="17. Privacy">
              <p>
                Personal information collected through FamiNova is
                handled in accordance with our Privacy Policy and
                applicable requirements.
              </p>

              <Link
                href="/privacy"
                className="inline-flex font-bold text-violet-700 hover:text-violet-900"
              >
                View Privacy Policy →
              </Link>
            </Section>

            {/* 18 */}
            <Section title="18. Changes to These Terms">
              <p>
                FamiNova may update these Terms & Conditions when
                necessary to reflect changes to the platform, services
                or applicable requirements.
              </p>

              <p>
                The latest version will be published on this page with
                an updated revision date.
              </p>
            </Section>

            {/* 19 */}
            <Section title="19. Applicable Law">
              <p>
                These Terms are intended to operate in accordance with
                applicable laws of India, including applicable
                consumer protection, electronic commerce and data
                protection requirements.
              </p>

              <p>
                Nothing in these Terms limits rights available to a
                consumer under applicable law.
              </p>
            </Section>

            {/* 20 */}
            <Section title="20. Contact Us">
              <p>
                Questions regarding these Terms, membership or payment
                verification can be sent to:
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

          {/* BOTTOM LINKS */}
          <div className="mt-12 border-t border-slate-200 pt-8">
            <div className="flex flex-wrap gap-5 text-sm font-semibold">
              <Link
                href="/privacy"
                className="text-violet-700 hover:text-violet-900"
              >
                Privacy Policy
              </Link>

              <Link
                href="/refund"
                className="text-violet-700 hover:text-violet-900"
              >
                Refund Policy
              </Link>

              <Link
                href="/contact"
                className="text-violet-700 hover:text-violet-900"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-5 py-8 text-center text-xs leading-6 text-slate-500">
          © {new Date().getFullYear()} FamiNova. All rights reserved.
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