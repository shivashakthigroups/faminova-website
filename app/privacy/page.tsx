import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | FamiNova",
  description:
    "Learn how FamiNova collects, uses, stores and protects personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
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

      <section className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.15em] text-violet-600">
            Privacy
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Privacy Policy
          </h1>

          <p className="mt-4 text-sm text-slate-500">
            Last updated: 16 August 2026
          </p>

          <div className="mt-10 space-y-10 text-sm leading-7 text-slate-700">
            <Section title="1. Introduction">
              <p>
                FamiNova respects your privacy and is committed to
                handling personal information responsibly.
              </p>

              <p>
                This Privacy Policy explains the types of information
                that may be collected when you use FamiNova, why we
                use that information, how it may be stored or shared,
                and the choices available to you.
              </p>

              <p>
                This policy applies to the FamiNova website, member
                accounts, membership services, payment verification
                features and related digital services.
              </p>
            </Section>

            <Section title="2. Information We May Collect">
              <p>
                Depending on how you use FamiNova, we may collect
                information such as:
              </p>

              <ul className="list-disc space-y-2 pl-6">
                <li>Name and account profile information.</li>
                <li>Email address.</li>
                <li>
                  Information you voluntarily provide through your
                  profile or communications with us.
                </li>
                <li>
                  Membership plan and membership status information.
                </li>
                <li>
                  Payment amount, payment status and transaction
                  reference or UTR submitted for payment verification.
                </li>
                <li>
                  Account creation, login and authentication-related
                  information.
                </li>
                <li>
                  Technical information that may be generated when you
                  access the website, such as basic device, browser,
                  security or server log information.
                </li>
              </ul>
            </Section>

            <Section title="3. Information We Do Not Intend to Collect Through UPI Verification">
              <p>
                FamiNova&apos;s manual UPI payment verification process
                is designed to use transaction reference information
                necessary to identify and verify a membership payment.
              </p>

              <p>
                You should not send us your UPI PIN, ATM PIN, banking
                password, card PIN, OTP or other secret authentication
                credentials.
              </p>

              <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
                <p className="font-bold text-red-900">
                  FamiNova will never ask you to provide your UPI PIN,
                  banking password or OTP through the website.
                </p>
              </div>
            </Section>

            <Section title="4. How We Use Information">
              <p>
                We may use personal information where reasonably
                necessary to:
              </p>

              <ul className="list-disc space-y-2 pl-6">
                <li>Create and maintain your FamiNova account.</li>
                <li>Authenticate and secure account access.</li>
                <li>Maintain your member profile.</li>
                <li>Process and manage membership requests.</li>
                <li>Verify submitted membership payments.</li>
                <li>Activate, maintain, expire or renew memberships.</li>
                <li>Display payment and membership history.</li>
                <li>Respond to support or account enquiries.</li>
                <li>
                  Detect or prevent fraudulent, duplicate or
                  unauthorized payment submissions.
                </li>
                <li>
                  Maintain the security and reliability of the
                  platform.
                </li>
                <li>
                  Comply with applicable legal or regulatory
                  requirements.
                </li>
              </ul>
            </Section>

            <Section title="5. Account Authentication">
              <p>
                FamiNova uses account authentication technology to
                provide registration, login, email verification,
                password recovery and secure member access.
              </p>

              <p>
                Passwords and authentication credentials should be
                kept confidential. You should not share your password
                with another person.
              </p>
            </Section>

            <Section title="6. Payment Information">
              <p>
                When using direct UPI payment verification, FamiNova
                may receive and store information such as the amount,
                membership reference, transaction reference or UTR,
                payment status, submission time and verification
                status.
              </p>

              <p>
                A submitted transaction reference may be compared with
                merchant or payment records before a membership is
                approved.
              </p>

              <p>
                FamiNova does not treat the submission of a UTR alone
                as confirmation that money has been received.
              </p>
            </Section>

            <Section title="7. Service Providers">
              <p>
                FamiNova may use trusted technology providers to
                operate portions of the website and services,
                including services for website hosting,
                authentication, databases, infrastructure and
                communications.
              </p>

              <p>
                Such providers may process information where necessary
                to provide their services to FamiNova and are subject
                to their own applicable terms, security practices and
                privacy obligations.
              </p>
            </Section>

            <Section title="8. Sharing of Personal Information">
              <p>
                FamiNova does not sell your personal information.
              </p>

              <p>
                Information may be shared only where reasonably
                necessary with service providers supporting the
                operation of FamiNova, where required for payment or
                fraud verification, where you request or authorize it,
                or where disclosure is required by applicable law or
                lawful authority.
              </p>
            </Section>

            <Section title="9. Data Security">
              <p>
                FamiNova uses reasonable technical and organizational
                measures intended to protect account and membership
                information against unauthorized access, alteration,
                disclosure or loss.
              </p>

              <p>
                No internet-based service or electronic storage system
                can guarantee absolute security. Users should also
                protect their passwords, email accounts and devices.
              </p>
            </Section>

            <Section title="10. Administrative Access">
              <p>
                Access to administrative functions and payment
                verification information is restricted to authorized
                administrative users.
              </p>

              <p>
                Administrative access may be used for legitimate
                purposes such as reviewing payment submissions,
                managing memberships, addressing support issues and
                protecting the platform against misuse.
              </p>
            </Section>

            <Section title="11. Data Retention">
              <p>
                Personal information may be retained for as long as
                reasonably necessary to maintain your account,
                provide membership services, maintain transaction or
                membership records, resolve disputes, prevent fraud
                and comply with applicable obligations.
              </p>

              <p>
                Retention periods may differ depending on the type of
                information and the purpose for which it is held.
              </p>
            </Section>

            <Section title="12. Your Choices and Requests">
              <p>
                Subject to applicable law and relevant exceptions, you
                may contact FamiNova regarding personal information
                associated with your account, including requests to
                correct inaccurate information or enquiries regarding
                deletion of information.
              </p>

              <p>
                Some information may need to be retained where
                reasonably necessary for transaction records, fraud
                prevention, dispute resolution or legal compliance.
              </p>
            </Section>

            <Section title="13. Sensitive and Medical Information">
              <p>
                FamiNova is primarily a digital educational and
                membership platform. Users should avoid submitting
                unnecessary sensitive medical information through
                general contact forms, payment fields or other fields
                that do not specifically request such information.
              </p>

              <p>
                FamiNova&apos;s educational information is not a
                substitute for individual medical advice, diagnosis
                or treatment from a qualified healthcare
                professional.
              </p>
            </Section>

            <Section title="14. Cookies and Similar Technologies">
              <p>
                FamiNova and its technology providers may use cookies
                or similar browser technologies where necessary for
                authentication, session management, security and
                operation of the website.
              </p>

              <p>
                Additional analytics or optional technologies may be
                described or disclosed separately if introduced in
                the future.
              </p>
            </Section>

            <Section title="15. Children's Privacy">
              <p>
                FamiNova accounts and paid memberships are intended
                for persons who are legally capable of entering into
                the relevant transaction or who use the service with
                appropriate parent or guardian involvement where
                required by applicable law.
              </p>

              <p>
                Users should not knowingly provide personal
                information about a child unless it is appropriate and
                lawful to do so for the relevant service.
              </p>
            </Section>

            <Section title="16. External Links">
              <p>
                FamiNova may contain links to third-party websites or
                services. FamiNova is not responsible for the privacy
                practices or content of independent third-party
                websites.
              </p>

              <p>
                Users should review the privacy policy of any
                third-party service they choose to use.
              </p>
            </Section>

            <Section title="17. Changes to This Privacy Policy">
              <p>
                We may update this Privacy Policy when our services,
                technology or applicable requirements change.
              </p>

              <p>
                The latest version will be published on this page with
                the updated revision date.
              </p>
            </Section>

            <Section title="18. Contact FamiNova">
              <p>
                For privacy questions, account enquiries or requests
                relating to your personal information, contact:
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

          <div className="mt-12 border-t border-slate-200 pt-8">
            <div className="flex flex-wrap gap-5 text-sm font-semibold">
              <Link
                href="/terms"
                className="text-violet-700 hover:text-violet-900"
              >
                Terms & Conditions
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