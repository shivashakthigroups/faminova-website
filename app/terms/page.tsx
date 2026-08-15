export default function TermsPage() {
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

      {/* Terms */}
      <section className="mx-auto max-w-4xl px-5 py-16 lg:py-24">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-10 lg:p-14">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
            FamiNova
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Terms &amp; Conditions
          </h1>

          <p className="mt-4 text-sm text-slate-500">
            Last updated: August 15, 2026
          </p>

          <div className="mt-10 space-y-10 text-slate-600">
            {/* 1 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                1. Acceptance of Terms
              </h2>

              <p className="mt-4 leading-7">
                By accessing or using the FamiNova website, you agree to these
                Terms &amp; Conditions. If you do not agree with these terms,
                please do not use the website or its services.
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                2. About FamiNova
              </h2>

              <p className="mt-4 leading-7">
                FamiNova is an online platform intended to provide educational
                and informational resources relating to fertility and
                reproductive-health topics.
              </p>

              <p className="mt-4 leading-7">
                The specific services available through the website may change
                from time to time.
              </p>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                3. Educational Information Only
              </h2>

              <p className="mt-4 leading-7">
                Information provided through FamiNova is intended for general
                educational and informational purposes.
              </p>

              <p className="mt-4 leading-7">
                It is medical advice and does replace consultation
                with a qualified healthcare professional.
              </p>

              <p className="mt-4 leading-7">
                You should seek appropriate professional medical advice for
                individual health, fertility or reproductive-health concerns.
              </p>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                4. Membership
              </h2>

              <p className="mt-4 leading-7">
                FamiNova may offer paid digital membership services. Where
                applicable, the membership fee provides access to the specific
                digital educational resources described on the membership page
                at the time of purchase.
              </p>

              <p className="mt-4 leading-7">
                Membership does by itself provide or guarantee medical
                treatment, fertility treatment, pregnancy, donor material,
                biological material, donor matching or any particular medical
                outcome.
              </p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                5. User Information
              </h2>

              <p className="mt-4 leading-7">
                You agree to provide accurate information when creating an
                account, submitting an enquiry or purchasing a service.
              </p>

              <p className="mt-4 leading-7">
                You are responsible for maintaining the confidentiality of
                your account credentials and for activity carried out through
                your account.
              </p>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                6. Prohibited Use
              </h2>

              <p className="mt-4 leading-7">
                You agree not to use FamiNova to:
              </p>

              <ul className="mt-4 list-disc space-y-2 pl-6 leading-7">
                <li>Break or attempt to break applicable laws</li>
                <li>Submit fraudulent or misleading information</li>
                <li>Impersonate another person</li>
                <li>Interfere with website security</li>
                <li>Attempt unauthorised access to accounts or systems</li>
                <li>Upload malicious software or harmful content</li>
                <li>Abuse, threaten or harass other users or staff</li>
              </ul>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                7. Intellectual Property
              </h2>

              <p className="mt-4 leading-7">
                Unless otherwise stated, the FamiNova website, branding,
                logos, text, graphics, design and original educational
                materials are owned by or licensed to FamiNova.
              </p>

              <p className="mt-4 leading-7">
                You may not reproduce, distribute, sell, modify or commercially
                exploit our content without prior written permission.
              </p>
            </section>

            {/* 8 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                8. Payments
              </h2>

              <p className="mt-4 leading-7">
                If paid services are offered, applicable prices and payment
                terms will be displayed before purchase.
              </p>

              <p className="mt-4 leading-7">
                Payments may be processed by third-party payment providers.
                Additional terms from those payment providers may apply.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                9. Refunds and Cancellations
              </h2>

              <p className="mt-4 leading-7">
                Refunds and cancellations are governed by the FamiNova Refund
                Policy applicable to the service purchased.
              </p>

              <p className="mt-4 leading-7">
                Please review the Refund Policy before completing a purchase.
              </p>
            </section>

            {/* 10 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                10. Third-Party Services
              </h2>

              <p className="mt-4 leading-7">
                FamiNova may use third-party services for hosting, payments,
                analytics, communications, security and other technical
                functions.
              </p>

              <p className="mt-4 leading-7">
                FamiNova is not responsible for interruptions or failures
                caused solely by third-party services.
              </p>
            </section>

            {/* 11 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                11. Availability
              </h2>

              <p className="mt-4 leading-7">
                We aim to keep the website available and functioning properly,
                but we do not guarantee uninterrupted or error-free access at
                all times.
              </p>
            </section>

            {/* 12 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                12. Limitation of Liability
              </h2>

              <p className="mt-4 leading-7">
                To the extent permitted by applicable law, FamiNova will not
                be responsible for losses arising from reliance on general
                educational information, temporary website unavailability,
                third-party service failures or circumstances beyond our
                reasonable control.
              </p>
            </section>

            {/* 13 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                13. Medical Guarantee
              </h2>

              <p className="mt-4 leading-7">
                FamiNova does guarantee fertility, pregnancy, treatment
                results, medical outcomes or any particular health result.
              </p>
            </section>

            {/* 14 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                14. Changes to These Terms
              </h2>

              <p className="mt-4 leading-7">
                We may update these Terms &amp; Conditions from time to time.
                Updated terms will be published on this page with a revised
                date.
              </p>
            </section>

            {/* 15 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                15. Governing Law
              </h2>

              <p className="mt-4 leading-7">
                These Terms &amp; Conditions are intended to operate subject to
                applicable laws and regulations. The final governing-law and
                jurisdiction provisions should be reviewed and confirmed by
                appropriate legal counsel before the website begins commercial
                operations.
              </p>
            </section>

            {/* Contact */}
            <section className="rounded-2xl bg-slate-50 p-6">
              <h2 className="text-2xl font-bold text-slate-950">
                16. Contact FamiNova
              </h2>

              <p className="mt-4 leading-7">
                If you have questions about these Terms &amp; Conditions,
                contact us:
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
              <a href="/privacy" className="hover:text-slate-950">
                Privacy
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