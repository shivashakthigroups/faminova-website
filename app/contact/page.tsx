import Link from "next/link";

export const metadata = {
  title: "Contact Us | FamiNova",
  description:
    "Contact FamiNova for membership, account, payment verification and general support.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <Link
            href="/"
            className="text-2xl font-black tracking-tight text-violet-700"
          >
            FamiNova
          </Link>

          <Link
            href="/"
            className="text-sm font-semibold text-slate-600 transition hover:text-violet-700"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-violet-100 blur-3xl" />
        <div className="absolute -right-24 top-20 h-80 w-80 rounded-full bg-fuchsia-100 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-5 py-16 text-center sm:py-20">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-violet-600">
            Support
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Contact FamiNova
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600">
            Need help with your account, membership or payment
            verification? Our support contact details are available
            below.
          </p>
        </div>
      </section>

      {/* SUPPORT CARDS */}
      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="grid gap-5 md:grid-cols-3">
          <SupportCard
            icon="01"
            title="Account Support"
            text="Help with registration, login, profile access and account-related questions."
          />

          <SupportCard
            icon="02"
            title="Membership Support"
            text="Questions regarding membership activation, status, expiry or renewal."
          />

          <SupportCard
            icon="03"
            title="Payment Support"
            text="Help with UPI payment submission, UTR verification and payment status."
          />
        </div>

        {/* CONTACT BOX */}
        <div className="mt-8 grid gap-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2 sm:p-9">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.15em] text-violet-600">
              Email Support
            </p>

            <h2 className="mt-3 text-3xl font-black">
              How can we help?
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-600">
              Send us an email with enough information for us to
              identify your account or payment issue.
            </p>

            <a
              href="mailto:shivashakthigroups01@gmail.com"
              className="mt-7 inline-flex rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-violet-700"
            >
              Email FamiNova Support
            </a>
          </div>

          <div className="rounded-2xl bg-slate-50 p-6">
            <p className="text-sm font-black text-slate-950">
              Official Support Email
            </p>

            <a
              href="mailto:shivashakthigroups01@gmail.com"
              className="mt-3 block break-all font-bold text-violet-700 hover:text-violet-900"
            >
              shivashakthigroups01@gmail.com
            </a>

            <div className="mt-6 border-t border-slate-200 pt-5">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                Website
              </p>

              <p className="mt-2 font-semibold">
                faminova.in
              </p>
            </div>
          </div>
        </div>

        {/* PAYMENT HELP */}
        <div className="mt-8 rounded-3xl border border-violet-200 bg-violet-50 p-6 sm:p-9">
          <h2 className="text-2xl font-black text-slate-950">
            Contacting us about a payment?
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-700">
            To help us identify your payment, include the following
            information in your email:
          </p>

          <ul className="mt-5 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
            <Item text="Your registered FamiNova email" />
            <Item text="Your name" />
            <Item text="Membership plan" />
            <Item text="Payment amount" />
            <Item text="UPI transaction reference / UTR" />
            <Item text="Payment date" />
          </ul>
        </div>

        {/* SECURITY WARNING */}
        <div className="mt-8 rounded-3xl border border-red-200 bg-red-50 p-6 sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.15em] text-red-700">
            Payment Safety
          </p>

          <h2 className="mt-3 text-xl font-black text-red-950">
            Never share your UPI PIN, OTP or banking password.
          </h2>

          <p className="mt-3 text-sm leading-7 text-red-900">
            FamiNova will never ask you to provide your UPI PIN,
            ATM PIN, card PIN, OTP, internet banking password or
            similar secret banking credentials for payment
            verification.
          </p>
        </div>

        {/* MEDICAL NOTICE */}
        <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.15em] text-amber-800">
            Medical Notice
          </p>

          <p className="mt-3 text-sm leading-7 text-amber-950">
            FamiNova provides digital educational and membership
            services. Our support email is not an emergency medical
            service and should not be used for urgent medical care,
            diagnosis or treatment. For medical concerns, contact an
            appropriately qualified healthcare professional.
          </p>
        </div>

        {/* LINKS */}
        <div className="mt-10 flex flex-wrap justify-center gap-5 border-t border-slate-200 pt-8 text-sm font-semibold">
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
            href="/refund"
            className="text-violet-700 hover:text-violet-900"
          >
            Refund Policy
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-8 text-center text-xs leading-6 text-slate-500">
          © {new Date().getFullYear()} FamiNova. All rights reserved.
        </div>
      </footer>
    </main>
  );
}

function SupportCard({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-xs font-black text-violet-700">
        {icon}
      </div>

      <h2 className="mt-5 text-lg font-black">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {text}
      </p>
    </div>
  );
}

function Item({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3 rounded-xl bg-white/70 p-3">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-black text-white">
        ✓
      </span>

      <span>{text}</span>
    </li>
  );
}