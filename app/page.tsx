import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-5 lg:px-8">
          {/* LOGO */}
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/faminova-logo.png"
              alt="FamiNova - Learn Support Grow"
              width={340}
              height={110}
              priority
              className="h-12 w-auto object-contain sm:h-14 md:h-16"
            />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden items-center gap-7 lg:flex">
            <Link
              href="/about"
              className="text-sm font-semibold text-slate-600 transition hover:text-violet-700"
            >
              About
            </Link>

            <Link
              href="/membership"
              className="text-sm font-semibold text-slate-600 transition hover:text-violet-700"
            >
              Membership
            </Link>

            <Link
              href="/contact"
              className="text-sm font-semibold text-slate-600 transition hover:text-violet-700"
            >
              Contact
            </Link>
          </nav>

          {/* LOGIN / REGISTER */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="rounded-xl border border-slate-300 px-3 py-2.5 text-xs font-bold text-slate-800 transition hover:bg-slate-50 sm:px-4 sm:text-sm"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-slate-950 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-violet-700 sm:px-4 sm:text-sm"
            >
              Join FamiNova
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-violet-100 blur-3xl" />
        <div className="absolute -right-24 top-24 h-96 w-96 rounded-full bg-fuchsia-100 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-16 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
          <div>
            <div className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-violet-700">
              Digital Education & Membership Platform
            </div>

            <h1 className="mt-7 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Better information for your{" "}
              <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                family journey.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
              FamiNova is a digital educational membership platform
              designed to provide accessible information, member
              resources and a simple, secure membership experience.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="rounded-2xl bg-slate-950 px-7 py-4 text-center text-sm font-bold text-white shadow-lg shadow-slate-200 transition hover:-translate-y-0.5 hover:bg-violet-700"
              >
                Create Free Account
              </Link>

              <Link
                href="/membership"
                className="rounded-2xl border border-slate-300 bg-white px-7 py-4 text-center text-sm font-bold text-slate-900 transition hover:bg-slate-50"
              >
                Explore Membership
              </Link>
            </div>

            {/* TRUST ITEMS */}
            <div className="mt-9 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
              <MiniTrust
                title="Secure"
                text="Member accounts"
              />

              <MiniTrust
                title="Simple"
                text="UPI payments"
              />

              <MiniTrust
                title="Transparent"
                text="Status tracking"
              />
            </div>
          </div>

          {/* HERO MEMBERSHIP CARD */}
          <div className="relative">
            <div className="absolute inset-8 rounded-[3rem] bg-gradient-to-br from-violet-200 to-fuchsia-200 blur-3xl" />

            <div className="relative rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-200/70 sm:p-8">
              <div className="rounded-[1.7rem] bg-gradient-to-br from-slate-950 via-violet-950 to-violet-700 p-7 text-white sm:p-9">
                <div className="flex items-center justify-between gap-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-200">
                      FamiNova Membership
                    </p>

                    <h2 className="mt-3 text-3xl font-black">
                      One simple member experience.
                    </h2>
                  </div>

                  <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-2xl sm:flex">
                    ✦
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <FeatureLine text="Create and manage your account" />
                  <FeatureLine text="Access membership information" />
                  <FeatureLine text="Simple UPI payment submission" />
                  <FeatureLine text="Track payment verification status" />
                  <FeatureLine text="View membership status and history" />
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-emerald-50 p-5">
                  <div className="text-2xl">✓</div>

                  <p className="mt-3 text-sm font-black text-slate-950">
                    Payment Tracking
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    View submitted and verified payments.
                  </p>
                </div>

                <div className="rounded-2xl bg-violet-50 p-5">
                  <div className="text-2xl">◉</div>

                  <p className="mt-3 text-sm font-black text-slate-950">
                    Member Dashboard
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    Manage membership from one place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-violet-600">
              Simple Process
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight">
              Getting started is easy.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Create your account, choose your membership and manage
              everything through your FamiNova dashboard.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <StepCard
              number="01"
              title="Create your account"
              text="Register with your email and securely access your personal FamiNova dashboard."
            />

            <StepCard
              number="02"
              title="Choose membership"
              text="Review the available membership option and proceed through the member payment process."
            />

            <StepCard
              number="03"
              title="Track your status"
              text="After submitting payment details, track verification and membership status directly from your account."
            />
          </div>
        </div>
      </section>

      {/* WHY FAMINOVA */}
      <section>
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-violet-600">
                Why FamiNova
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                Built around clarity and accessibility.
              </h2>

              <p className="mt-6 text-base leading-8 text-slate-600">
                We believe educational information should be presented
                clearly and membership management should be
                straightforward. FamiNova combines both in one digital
                experience.
              </p>

              <Link
                href="/about"
                className="mt-7 inline-flex font-bold text-violet-700 transition hover:text-violet-900"
              >
                Learn more about FamiNova →
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <InfoCard
                icon="01"
                title="Member focused"
                text="A straightforward account experience designed around members."
              />

              <InfoCard
                icon="02"
                title="Transparent payments"
                text="Submitted payment references can be tracked from the member account."
              />

              <InfoCard
                icon="03"
                title="Secure accounts"
                text="Account authentication and member information are protected through secure systems."
              />

              <InfoCard
                icon="04"
                title="Accessible online"
                text="Use FamiNova from your phone, tablet or computer."
              />
            </div>
          </div>
        </div>
      </section>

      {/* IMPORTANT NOTICE */}
      <section className="bg-amber-50">
        <div className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
          <div className="rounded-3xl border border-amber-200 bg-white/70 p-7 sm:p-9">
            <p className="text-sm font-black uppercase tracking-[0.15em] text-amber-800">
              Important Information
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-700">
              FamiNova provides digital educational and membership
              services. Information available through the platform is
              intended for general educational purposes and should 
              replace diagnosis, treatment or individual medical advice
              from a qualified healthcare professional. FamiNova 
              not guarantee pregnancy, fertility outcomes or any
              specific medical result.
            </p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-violet-950 to-violet-800 px-7 py-12 text-white sm:px-12 lg:flex lg:items-center lg:justify-between lg:py-14">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-300">
              Join FamiNova
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Ready to get started?
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              Create your FamiNova account and explore the available
              membership services.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0">
            <Link
              href="/register"
              className="rounded-xl bg-white px-6 py-3.5 text-center text-sm font-black text-slate-950 transition hover:bg-violet-50"
            >
              Create Account
            </Link>

            <Link
              href="/membership"
              className="rounded-xl border border-white/20 px-6 py-3.5 text-center text-sm font-black text-white transition hover:bg-white/10"
            >
              View Membership
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <Image
                src="/faminova-logo.png"
                alt="FamiNova"
                width={260}
                height={85}
                className="h-14 w-auto object-contain"
              />

              <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
                Digital educational and membership services designed
                around a simple member experience.
              </p>
            </div>

            <div>
              <p className="text-sm font-black text-slate-950">
                Explore
              </p>

              <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600">
                <Link
                  href="/about"
                  className="transition hover:text-violet-700"
                >
                  About
                </Link>

                <Link
                  href="/membership"
                  className="transition hover:text-violet-700"
                >
                  Membership
                </Link>

                <Link
                  href="/contact"
                  className="transition hover:text-violet-700"
                >
                  Contact
                </Link>

                <Link
                  href="/login"
                  className="transition hover:text-violet-700"
                >
                  Login
                </Link>
              </div>
            </div>

            <div>
              <p className="text-sm font-black text-slate-950">
                Legal
              </p>

              <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600">
                <Link
                  href="/privacy"
                  className="transition hover:text-violet-700"
                >
                  Privacy Policy
                </Link>

                <Link
                  href="/terms"
                  className="transition hover:text-violet-700"
                >
                  Terms & Conditions
                </Link>

                <Link
                  href="/refund"
                  className="transition hover:text-violet-700"
                >
                  Refund Policy
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-200 pt-7">
            <p className="text-xs leading-6 text-slate-500">
              © {new Date().getFullYear()} FamiNova. All rights
              reserved.
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-400">
              FamiNova provides digital educational and membership
              services and does provide medical diagnosis or
              treatment.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* =========================
   SMALL TRUST CARD
========================= */

function MiniTrust({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-black text-slate-950">
        {title}
      </p>

      <p className="mt-1 text-[11px] leading-4 text-slate-500">
        {text}
      </p>
    </div>
  );
}

/* =========================
   FEATURE LINE
========================= */

function FeatureLine({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-white/10 px-4 py-3">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-xs font-black text-slate-950">
        ✓
      </span>

      <span className="text-sm font-semibold text-slate-100">
        {text}
      </span>
    </div>
  );
}

/* =========================
   PROCESS CARD
========================= */

function StepCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-sm font-black text-violet-700">
        {number}
      </div>

      <h3 className="mt-5 text-xl font-black text-slate-950">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        {text}
      </p>
    </div>
  );
}

/* =========================
   INFORMATION CARD
========================= */

function InfoCard({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:border-violet-200 hover:bg-violet-50/50">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-xs font-black text-violet-700">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-black text-slate-950">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {text}
      </p>
    </div>
  );
}