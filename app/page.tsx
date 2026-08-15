const benefits = [
  {
    number: "01",
    title: "Trusted Information",
    description:
      "Understand fertility, reproductive health and assisted reproductive technologies through simple, educational resources.",
  },
  {
    number: "02",
    title: "Learn at Your Pace",
    description:
      "Explore guides, FAQs and educational content designed for people who want clear information without unnecessary complexity.",
  },
  {
    number: "03",
    title: "Private & Respectful",
    description:
      "We aim to provide a respectful digital environment where visitors can learn about sensitive fertility topics.",
  },
];

const steps = [
  {
    number: "01",
    title: "Explore",
    description:
      "Browse our fertility education resources and understand the basics of reproductive health.",
  },
  {
    number: "02",
    title: "Become a Member",
    description:
      "Join the FamiNova educational membership to access member-focused digital resources.",
  },
  {
    number: "03",
    title: "Keep Learning",
    description:
      "Access educational materials and continue learning at your own pace.",
  },
];

const faqs = [
  {
    question: "What is FamiNova?",
    answer:
      "FamiNova is a digital fertility education and information platform designed to make reproductive-health information easier to understand.",
  },
  {
    question: "What does the ₹149 membership provide?",
    answer:
      "The ₹149 membership is intended for access to FamiNova's digital educational and member resources. It purchase or guarantee medical treatment, donor material, donor matching or biological material.",
  },
  {
    question: "Does FamiNova provide medical treatment?",
    answer:
      "yes. FamiNova is an educational platform and is not a substitute for consultation, diagnosis or treatment from a qualified medical professional.",
  },
  {
    question: "Does membership guarantee a donor or fertility outcome?",
    answer:
      "yes. Membership does not guarantee donor availability, matching, pregnancy, treatment outcomes or access to biological material.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fbfaf7] text-slate-900">
      {/* Top announcement */}
      <div className="bg-slate-950 px-4 py-3 text-center text-sm text-white">
        <span className="font-medium">
          Clear fertility information. Thoughtful guidance. Private learning.
        </span>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-[#fbfaf7]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-lg font-bold text-white shadow-sm">
              F
            </div>

            <div>
              <div className="text-xl font-bold tracking-tight text-slate-950">
                FamiNova
              </div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500">
                Fertility Education
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#about"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              About
            </a>
            <a
              href="#learn"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              Learn
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              How It Works
            </a>
            <a
              href="#faq"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              FAQ
            </a>
          </nav>

          <a
            href="#membership"
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Join for ₹149
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-emerald-100/50 blur-3xl" />
        <div className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Fertility education platform
            </div>

            <h1 className="max-w-3xl text-5xl font-bold leading-[1.02] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Better information for your
              <span className="block text-slate-500">fertility journey.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
              FamiNova brings fertility and reproductive-health information
              together in a simple, respectful and easy-to-understand digital
              experience.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#membership"
                className="rounded-full bg-slate-950 px-7 py-4 text-center text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Explore Membership
              </a>

              <a
                href="#learn"
                className="rounded-full border border-slate-300 bg-white px-7 py-4 text-center text-sm font-semibold text-slate-800 transition hover:border-slate-500"
              >
                Explore Resources
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
              <span>✓ Educational resources</span>
              <span>✓ Private learning experience</span>
              <span>✓ Simple explanations</span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative">
            <div className="relative mx-auto max-w-xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 shadow-2xl">
              <div className="rounded-[1.5rem] bg-slate-950 p-7 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      FamiNova
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold">
                      Understand. Learn. Prepare.
                    </h2>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-xl">
                    ♡
                  </div>
                </div>

                <div className="mt-10 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white/10 p-5">
                    <div className="text-2xl">01</div>
                    <div className="mt-2 font-semibold">Fertility Basics</div>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Learn the fundamentals in plain language.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/10 p-5">
                    <div className="text-2xl">02</div>
                    <div className="mt-2 font-semibold">ART Education</div>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Understand assisted reproductive technologies.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/10 p-5">
                    <div className="text-2xl">03</div>
                    <div className="mt-2 font-semibold">Helpful Resources</div>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Discover structured educational material.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/10 p-5">
                    <div className="text-2xl">04</div>
                    <div className="mt-2 font-semibold">Private Learning</div>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Learn in a respectful digital environment.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-4 hidden rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-xl sm:block">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Designed for
              </p>
              <p className="mt-1 font-semibold text-slate-900">
                Simple, private learning
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-24">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
              About FamiNova
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Information should feel understandable.
            </h2>
          </div>

          <div>
            <p className="text-lg leading-8 text-slate-600">
              Fertility can involve unfamiliar terminology, complex decisions
              and a lot of information. FamiNova is designed to make the
              educational side of that journey easier to navigate.
            </p>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Our platform focuses on educational content and resources so
              visitors can build their understanding before speaking with
              qualified healthcare professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Learn */}
      <section id="learn" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
            Learn with FamiNova
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Explore fertility topics without the jargon.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Our educational experience is structured around useful information
            that helps you understand the terminology and processes involved in
            reproductive health.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {benefits.map((benefit) => (
            <article
              key={benefit.number}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-sm font-bold text-emerald-700">
                {benefit.number}
              </div>

              <h3 className="mt-12 text-2xl font-bold text-slate-950">
                {benefit.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                {benefit.description}
              </p>

              <div className="mt-8 h-px bg-slate-200" />

              <a
                href="#membership"
                className="mt-5 inline-block text-sm font-semibold text-slate-950"
              >
                Learn more →
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">
              How it works
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              A simpler way to learn.
            </h2>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-3xl border border-white/10 bg-white/[0.06] p-7"
              >
                <div className="text-sm font-semibold text-emerald-300">
                  {step.number}
                </div>

                <h3 className="mt-10 text-2xl font-bold">{step.title}</h3>

                <p className="mt-4 leading-7 text-slate-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership */}
      <section id="membership" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
              Membership
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Start learning with FamiNova.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Get access to FamiNova's digital educational and member-focused
              resources for a simple one-time membership fee.
            </p>

            <div className="mt-8 flex items-end gap-3">
              <span className="text-6xl font-bold tracking-tight text-slate-950">
                ₹149
              </span>
              <span className="pb-2 text-slate-500">membership</span>
            </div>

            <a
              href="/membership"
              className="mt-8 inline-flex rounded-full bg-slate-950 px-7 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Continue to Membership
            </a>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-slate-950">
              What membership is for
            </h3>

            <ul className="mt-7 space-y-5">
              {[
                "Sperm fertility resources",
                "Member-focused digital content",
                "Helpful guides and explanations",
                "A structured learning experience",
                "Access to future educational resources",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                    ✓
                  </span>
                  <span className="text-slate-600">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl bg-slate-50 p-5 text-sm leading-6 text-slate-500">
              Membership is for
              purchase or guarantee donor material, donor matching,
              medical treatment, pregnancy, biological material or any
              particular fertility outcome.
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
              FAQ
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Frequently asked questions
            </h2>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-[#fbfaf7] p-6"
              >
                <summary className="cursor-pointer list-none pr-8 text-lg font-semibold text-slate-950">
                  {faq.question}
                  <span className="float-right text-slate-400 transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-4 max-w-3xl leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] bg-emerald-700 px-7 py-14 text-white sm:px-12 lg:px-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-100">
                Begin your learning journey
              </p>

              <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
                Clear information can be the first step.
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-emerald-50">
                Explore FamiNova and build your understanding of fertility and
                reproductive health.
              </p>
            </div>

            <a
              href="#membership"
              className="rounded-full bg-white px-7 py-4 text-center text-sm font-bold text-slate-950 transition hover:bg-slate-100"
            >
              Join for ₹149
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 font-bold text-white">
                  F
                </div>

                <div className="text-xl font-bold text-slate-950">
                  FamiNova
                </div>
              </div>

              <p className="mt-5 max-w-md leading-7 text-slate-500">
                A digital fertility education platform designed to make
                reproductive-health information easier to understand.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-950">Explore</h3>

              <div className="mt-4 space-y-3 text-sm text-slate-500">
                <a className="block hover:text-slate-950" href="#about">
                  About
                </a>
                <a className="block hover:text-slate-950" href="#learn">
                  Learn
                </a>
                <a className="block hover:text-slate-950" href="#how-it-works">
                  How It Works
                </a>
                <a className="block hover:text-slate-950" href="#faq">
                  FAQ
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-slate-950">Important</h3>

              <div className="mt-4 space-y-3 text-sm text-slate-500">
                <a className="block hover:text-slate-950" href="/privacy">
                  Privacy Policy
                </a>
                <a className="block hover:text-slate-950" href="/terms">
                  Terms & Conditions
                </a>
                <a className="block hover:text-slate-950" href="/refund">
                  Refund Policy
                </a>
                <a className="block hover:text-slate-950" href="/contact">
                  Contact
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-slate-200 pt-7">
            <p className="text-xs leading-6 text-slate-500">
              FamiNova provides information and is a medical
              provider. Information on this website is a diagnosis,
              treatment recommendation or substitute for professional medical
              advice. Please consult a qualified healthcare professional for
              individual medical guidance.
            </p>

            <p className="mt-4 text-xs text-slate-400">
              © {new Date().getFullYear()} FamiNova. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}