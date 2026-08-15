export default function ContactPage() {
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

      {/* Main */}
      <section className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
              Contact FamiNova
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
              We&apos;re here to help.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Have a question about FamiNova, our educational resources or
              membership? Contact our support team and we&apos;ll review your
              enquiry.
            </p>

            <div className="mt-10 space-y-5">
              {/* Email */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Email
                </p>

                <a
                  href="mailto:shivashakthigroups01@gmail.com"
                  className="mt-2 block break-all font-semibold text-slate-950 hover:text-emerald-700"
                >
                  shivashakthigroups01@gmail.com
                </a>
              </div>

              {/* Mobile */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Mobile / WhatsApp
                </p>

                <a
                  href="tel:+919972016119"
                  className="mt-2 block font-semibold text-slate-950 hover:text-emerald-700"
                >
                  +91 99720 16119
                </a>

                <a
                  href="https://wa.me/919972016119"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  Chat on WhatsApp
                </a>
              </div>

              {/* Support */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Support
                </p>

                <p className="mt-2 text-slate-600">
                  For membership, website and educational-resource enquiries,
                  please contact us by email, phone or WhatsApp.
                </p>
              </div>

              {/* Important */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Important
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  FamiNova provides educational information and
                  provide diagnosis, medical treatment or emergency medical
                  services.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl sm:p-10">
            <h2 className="text-2xl font-bold text-slate-950">
              Send us a message
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Complete the form below and our team will review your enquiry.
            </p>

            <form className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Full name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Mobile number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your mobile number"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Enquiry type
                </label>

                <select
                  id="subject"
                  name="subject"
                  required
                  defaultValue=""
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="membership">Membership</option>
                  <option value="education">Educational resources</option>
                  <option value="website">Website support</option>
                  <option value="general">General enquiry</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="How can we help?"
                  required
                  className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                />
              </div>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 rounded border-slate-300"
                />

                <span className="text-xs leading-5 text-slate-500">
                  I understand that FamiNova is an educational platform and
                  that submitting this form does not create a doctor-patient
                  relationship.
                </span>
              </label>

              <button
                type="submit"
                className="w-full rounded-full bg-slate-950 px-6 py-4 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                Send Enquiry
              </button>

              <p className="text-center text-xs leading-5 text-slate-400">
                Please do not include sensitive medical information in this
                contact form.
              </p>
            </form>
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

              <a href="/terms" className="hover:text-slate-950">
                Terms
              </a>

              <a href="/refund" className="hover:text-slate-950">
                Refund Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}