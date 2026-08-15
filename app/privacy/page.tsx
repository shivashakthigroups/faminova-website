export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#fbfaf7] text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 font-bold text-white">
              F
            </div>

            <div>
              <div className="text-xl font-bold">FamiNova</div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Fertility Education
              </div>
            </div>
          </a>

          <a
            href="/"
            className="text-sm font-semibold text-slate-600 hover:text-slate-950"
          >
            ← Back to Home
          </a>
        </div>
      </header>

      {/* Privacy Policy */}
      <section className="mx-auto max-w-4xl px-5 py-16 lg:py-24">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-10 lg:p-14">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
            FamiNova
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-4 text-sm text-slate-500">
            Last updated: August 15, 2026
          </p>

          <div className="mt-10 space-y-10 text-slate-600">
            {/* 1 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                1. Introduction
              </h2>

              <p className="mt-4 leading-7">
                FamiNova respects your privacy and is committed to protecting
                the personal information you provide when using our website,
                membership services and educational resources.
              </p>

              <p className="mt-4 leading-7">
                This Privacy Policy explains what information we may collect,
                how we use it, how we protect it and the choices available to
                you.
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                2. Information We May Collect
              </h2>

              <p className="mt-4 leading-7">
                Depending on how you use FamiNova, we may collect information
                such as:
              </p>

              <ul className="mt-4 list-disc space-y-2 pl-6 leading-7">
                <li>Name</li>
                <li>Email address</li>
                <li>Mobile phone number</li>
                <li>Account and membership information</li>
                <li>Messages or enquiries submitted through our website</li>
                <li>Technical information such as browser and device data</li>
                <li>Website usage information</li>
              </ul>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                3. Sensitive Information
              </h2>

              <p className="mt-4 leading-7">
                FamiNova does not require users to submit sensitive medical
                information through the general contact form.
              </p>

              <p className="mt-4 leading-7">
                Please do not submit medical records, diagnoses, genetic
                information, reproductive-health records or other highly
                sensitive information through ordinary website forms unless a
                specific service clearly requests such information through an
                appropriate secure process.
              </p>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                4. How We Use Information
              </h2>

              <p className="mt-4 leading-7">
                Information may be used to:
              </p>

              <ul className="mt-4 list-disc space-y-2 pl-6 leading-7">
                <li>Create and manage user accounts</li>
                <li>Provide membership and digital educational services</li>
                <li>Respond to customer enquiries</li>
                <li>Provide website support</li>
                <li>Process legitimate transactions</li>
                <li>Improve our website and services</li>
                <li>Maintain website security</li>
                <li>Comply with applicable legal obligations</li>
              </ul>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                5. Communications
              </h2>

              <p className="mt-4 leading-7">
                We may contact you using the contact information you provide
                for purposes such as responding to enquiries, providing
                account or membership information, sending important service
                notices and communicating about transactions.
              </p>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                6. Payments
              </h2>

              <p className="mt-4 leading-7">
                If FamiNova offers paid digital services, payments may be
                processed through third-party payment providers.
              </p>

              <p className="mt-4 leading-7">
                Payment providers may process payment-related information
                according to their own privacy policies and terms. FamiNova
                does not intend to store complete card numbers, CVV numbers or
                other payment credentials on its own website.
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                7. Cookies and Technical Information
              </h2>

              <p className="mt-4 leading-7">
                Our website may use cookies, local storage or similar
                technologies to maintain functionality, understand website
                usage, improve performance and provide security.
              </p>

              <p className="mt-4 leading-7">
                You may be able to control cookies through your browser
                settings. Disabling certain cookies may affect website
                functionality.
              </p>
            </section>

            {/* 8 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                8. Sharing of Information
              </h2>

              <p className="mt-4 leading-7">
                We do not intend to sell your personal information.
              </p>

              <p className="mt-4 leading-7">
                Information may be shared with service providers where
                reasonably necessary to operate the website or provide
                requested services, such as hosting, payment processing,
                email delivery, security, analytics or technical support.
              </p>

              <p className="mt-4 leading-7">
                Information may also be disclosed where required by applicable
                law, regulation, court order or lawful governmental request.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                9. Data Security
              </h2>

              <p className="mt-4 leading-7">
                We take reasonable technical and organisational measures to
                protect personal information against unauthorised access,
                alteration, disclosure or destruction.
              </p>

              <p className="mt-4 leading-7">
                However, no internet transmission or electronic storage system
                can be guaranteed to be completely secure.
              </p>
            </section>

            {/* 10 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                10. Data Retention
              </h2>

              <p className="mt-4 leading-7">
                We retain personal information only for as long as reasonably
                necessary for the purposes described in this policy, to
                maintain legitimate business records, resolve disputes,
                enforce agreements or comply with applicable legal
                requirements.
              </p>
            </section>

            {/* 11 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                11. Your Choices and Rights
              </h2>

              <p className="mt-4 leading-7">
                Depending on applicable law, you may have rights relating to
                your personal information, including requesting access,
                correction or deletion of certain information.
              </p>

              <p className="mt-4 leading-7">
                To make a privacy-related request, contact us using the details
                below.
              </p>
            </section>

            {/* 12 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                12. Children&apos;s Privacy
              </h2>

              <p className="mt-4 leading-7">
                FamiNova is not intended to collect personal information from
                children without appropriate consent or legal basis.
              </p>

              <p className="mt-4 leading-7">
                If you believe a child has provided personal information to us
                improperly, please contact us so that we can review the matter.
              </p>
            </section>

            {/* 13 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                13. Third-Party Websites
              </h2>

              <p className="mt-4 leading-7">
                Our website may contain links to third-party websites or
                services. We are not responsible for the privacy practices or
                content of those third parties.
              </p>

              <p className="mt-4 leading-7">
                We recommend reviewing the privacy policy of any third-party
                service before providing personal information.
              </p>
            </section>

            {/* 14 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                14. Educational Information Disclaimer
              </h2>

              <p className="mt-4 leading-7">
                FamiNova provides educational and informational resources.
                Content on this website should be treated as a substitute
                for professional medical advice, diagnosis or treatment.
              </p>

              <p className="mt-4 leading-7">
                Users should consult an appropriately qualified healthcare
                professional regarding individual medical or fertility
                concerns.
              </p>
            </section>

            {/* 15 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                15. Changes to This Policy
              </h2>

              <p className="mt-4 leading-7">
                We may update this Privacy Policy from time to time to reflect
                changes in our services, technology, legal requirements or
                privacy practices.
              </p>

              <p className="mt-4 leading-7">
                Any updated version will be posted on this page with a revised
                update date.
              </p>
            </section>

            {/* 16 */}
            <section className="rounded-2xl bg-slate-50 p-6">
              <h2 className="text-2xl font-bold text-slate-950">
                16. Contact Us
              </h2>

              <p className="mt-4 leading-7">
                If you have questions, requests or concerns regarding this
                Privacy Policy, please contact FamiNova:
              </p>

              <div className="mt-5 space-y-2 text-sm">
                <p>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:shivashakthigroups01@gmail.com"
                    className="font-semibold text-emerald-700 hover:underline"
                  >
                    shivashakthigroups01@gmail.com
                  </a>
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  <a
                    href="tel:+919972016119"
                    className="font-semibold text-emerald-700 hover:underline"
                  >
                    +91 99720 16119
                  </a>
                </p>

                <p>
                  <strong>Website:</strong>{" "}
                  <a
                    href="https://www.faminova.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-emerald-700 hover:underline"
                  >
                    www.faminova.in
                  </a>
                </p>
              </div>
            </section>

            <div className="border-t border-slate-200 pt-8">
              <a
                href="/"
                className="inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                ← Return to FamiNova
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} FamiNova. All rights reserved.
            </p>

            <div className="flex gap-5 text-sm text-slate-500">
              <a href="/terms" className="hover:text-slate-950">
                Terms
              </a>

              <a href="/refund" className="hover:text-slate-950">
                Refund Policy
              </a>

              <a href="/contact" className="hover:text-slate-950">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}