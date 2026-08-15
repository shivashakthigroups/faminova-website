export default function AboutPage() {
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

          <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
            <a href="/" className="text-slate-600 hover:text-slate-950">
              Home
            </a>
            <a href="/about" className="text-emerald-700">
              About
            </a>
            <a
              href="/membership"
              className="text-slate-600 hover:text-slate-950"
            >
              Membership
            </a>
            <a href="/contact" className="text-slate-600 hover:text-slate-950">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-300">
              About FamiNova
            </p>

            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              A trusted digital space for fertility education and informed
              decisions.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              FamiNova is designed to make fertility-related information easier
              to understand, easier to access and more responsible to navigate.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
              Our Purpose
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Making fertility information more accessible.
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              Fertility and reproductive health can involve complex information
              and important personal decisions. FamiNova aims to provide a
              clear, respectful and user-friendly digital environment where
              people can learn about relevant topics and access educational
              resources.
            </p>

            <p className="mt-5 leading-8 text-slate-600">
              Our focus is on responsible information, privacy-conscious
              digital services and a straightforward experience for people
              looking to understand fertility-related subjects.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-6">
                <div className="text-3xl font-bold text-emerald-700">01</div>
                <h3 className="mt-4 font-bold text-slate-950">
                  Education
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Clear educational resources designed for easier
                  understanding.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-6">
                <div className="text-3xl font-bold text-emerald-700">02</div>
                <h3 className="mt-4 font-bold text-slate-950">
                  Privacy
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  A privacy-conscious approach to user information and
                  communication.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-6">
                <div className="text-3xl font-bold text-emerald-700">03</div>
                <h3 className="mt-4 font-bold text-slate-950">
                  Transparency
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Clear information about our services, policies and
                  limitations.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-6">
                <div className="text-3xl font-bold text-emerald-700">04</div>
                <h3 className="mt-4 font-bold text-slate-950">
                  Responsible Access
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Helping users find information without making unsupported
                  medical promises.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Provide */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
              What We Provide
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Digital resources built around education.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <article className="rounded-3xl border border-slate-200 p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-xl">
                📚
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-950">
                Educational Resources
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Accessible information covering fertility and reproductive
                health topics for general educational purposes.
              </p>
            </article>

            <article className="rounded-3xl border border-slate-200 p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-xl">
                👥
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-950">
                Member Services
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Digital membership services designed to provide access to
                selected educational content and resources.
              </p>
            </article>

            <article className="rounded-3xl border border-slate-200 p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-xl">
                💬
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-950">
                Support &amp; Enquiries
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                A simple way for visitors and members to contact FamiNova with
                questions about our digital services.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
              Our Principles
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Built on clarity, respect and responsibility.
            </h2>
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-950">
                Clear Communication
              </h3>
              <p className="mt-2 leading-7 text-slate-600">
                We aim to communicate our services, pricing, policies and
                limitations clearly.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-950">
                Respect for Personal Information
              </h3>
              <p className="mt-2 leading-7 text-slate-600">
                We take privacy seriously and aim to collect only information
                that is reasonably required for the relevant service.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-950">
                No Unreasonable Promises
              </h3>
              <p className="mt-2 leading-7 text-slate-600">
                FamiNova promise pregnancy, fertility treatment
                results, medical outcomes or any specific biological outcome.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-950">
                Professional Guidance Matters
              </h3>
              <p className="mt-2 leading-7 text-slate-600">
                Educational information should  advice from a
                qualified healthcare professional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Important Disclaimer */}
      <section className="bg-emerald-950 text-white">
        <div className="mx-auto max-w-5xl px-5 py-16 text-center lg:py-20">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">
            Important Information
          </p>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            FamiNova is an educational digital platform.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl leading-8 text-emerald-50/80">
            Membership and digital services purchase or guarantee donor
            material, donor matching, medical treatment, pregnancy, biological
            material or any specific fertility outcome. Medical decisions
            should always be discussed with an appropriately qualified
            healthcare professional.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
        <div className="rounded-[2rem] bg-slate-950 px-7 py-12 text-center text-white sm:px-12">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Explore FamiNova
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
            Learn more about our digital membership services or contact us
            with your questions.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/membership"
              className="rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-400"
            >
              View Membership
            </a>

            <a
              href="/contact"
              className="rounded-full border border-slate-600 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              Contact FamiNova
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-bold text-slate-950">FamiNova</div>
              <p className="mt-1 text-sm text-slate-500">
                Fertility education and digital member services.
              </p>
            </div>

            <div className="flex flex-wrap gap-5 text-sm text-slate-500">
              <a href="/privacy" className="hover:text-slate-950">
                Privacy
              </a>

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

          <div className="mt-8 border-t border-slate-200 pt-6 text-xs leading-6 text-slate-500">
            © {new Date().getFullYear()} FamiNova. All rights reserved.
            Information provided through FamiNova is for general educational
            purposes and is a substitute for professional medical advice.
          </div>
        </div>
      </footer>
    </main>
  );
}