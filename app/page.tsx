const topics = [
  {
    icon: "♡",
    title: "Fertility Basics",
    text: "Understand reproductive health, fertility factors and common terminology in simple language.",
  },
  {
    icon: "◌",
    title: "Fertility Planning",
    text: "Explore practical information that can help you prepare for conversations with qualified professionals.",
  },
  {
    icon: "＋",
    title: "Treatment Education",
    text: "Learn about common fertility-care pathways, tests and treatment options.",
  },
  {
    icon: "⌁",
    title: "Family Planning",
    text: "Access educational resources for making informed family-planning decisions.",
  },
];

const benefits = [
  "Premium fertility education",
  "Easy-to-understand guides",
  "Member-only resources",
  "Regularly updated content",
  "Private member dashboard",
  "Mobile-friendly experience",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-700 text-xl font-bold text-white">
              F
            </div>
            <div>
              <div className="text-xl font-bold tracking-tight text-slate-900">
                Fami<span className="text-teal-700">Nova</span>
              </div>
              <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
                Fertility Education
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#topics" className="text-slate-600 hover:text-teal-700">
              Explore
            </a>
            <a href="#how-it-works" className="text-slate-600 hover:text-teal-700">
              How It Works
            </a>
            <a href="#membership" className="text-slate-600 hover:text-teal-700">
              Membership
            </a>
            <a href="#faq" className="text-slate-600 hover:text-teal-700">
              FAQ
            </a>
          </nav>

          <a
            href="#membership"
            className="rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800"
          >
            Join for ₹149
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-emerald-50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-4 py-2 text-sm font-medium text-teal-800 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-teal-600" />
              Trusted fertility education
            </div>

            <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-slate-950 sm:text-6xl">
              Learn. Understand.
              <span className="block text-teal-700">Plan with confidence.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              FamiNova is a digital fertility education platform created to
              make reproductive-health information easier to understand and
              easier to access.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#membership"
                className="rounded-full bg-teal-700 px-7 py-3.5 text-center font-semibold text-white shadow-lg shadow-teal-700/20 transition hover:bg-teal-800"
              >
                Get Member Access — ₹149
              </a>
              <a
                href="#topics"
                className="rounded-full border border-slate-300 bg-white px-7 py-3.5 text-center font-semibold text-slate-700 transition hover:border-teal-400 hover:text-teal-700"
              >
                Explore Topics
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
              <span>✓ Educational resources</span>
              <span>✓ Private account</span>
              <span>✓ Mobile friendly</span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-teal-200/40 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-emerald-200/40 blur-3xl" />

            <div className="relative rounded-[2rem] border border-white bg-white p-6 shadow-2xl shadow-slate-900/10">
              <div className="rounded-[1.5rem] bg-gradient-to-br from-teal-700 to-emerald-600 p-8 text-white">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
                    FamiNova Member
                  </span>
                  <span className="text-2xl">♡</span>
                </div>

                <div className="mt-14">
                  <p className="text-sm text-teal-100">Your learning journey</p>
                  <h2 className="mt-2 text-3xl font-bold">
                    Knowledge for better decisions.
                  </h2>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-white/10 p-4">
                    <div className="text-2xl font-bold">50+</div>
                    <div className="mt-1 text-xs text-teal-100">Guides</div>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4">
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="mt-1 text-xs text-teal-100">Access</div>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4">
                    <div className="text-2xl font-bold">₹149</div>
                    <div className="mt-1 text-xs text-teal-100">Membership</div>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-lg font-bold text-slate-900">Fertility</div>
                  <div className="mt-1 text-xs text-slate-500">
                    Education
                  </div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-lg font-bold text-slate-900">Family</div>
                  <div className="mt-1 text-xs text-slate-500">
                    Planning
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-7 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-teal-700">
              ✓
            </div>
            <div>
              <div className="font-semibold">Education first</div>
              <div className="text-sm text-slate-500">
                Clear, accessible information
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-teal-700">
              ◇
            </div>
            <div>
              <div className="font-semibold">Privacy focused</div>
              <div className="text-sm text-slate-500">
                Designed with member privacy in mind
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-teal-700">
              +
            </div>
            <div>
              <div className="font-semibold">Always learning</div>
              <div className="text-sm text-slate-500">
                New educational resources
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section id="topics" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
              Explore FamiNova
            </p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
              Information that helps you understand your options.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Start with the topics that matter to you and build your
              understanding step by step.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {topics.map((topic) => (
              <div
                key={topic.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-2xl text-teal-700">
                  {topic.icon}
                </div>
                <h3 className="mt-5 text-xl font-bold">{topic.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {topic.text}
                </p>
                <a
                  href="#membership"
                  className="mt-5 inline-block text-sm font-semibold text-teal-700"
                >
                  Learn more →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
              Simple process
            </p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight">
              Start learning in three steps.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              ["01", "Create your account", "Sign up with your basic details and create your private member account."],
              ["02", "Choose membership", "Get access to the FamiNova educational library for ₹149."],
              ["03", "Explore & learn", "Read guides, explore resources and continue your fertility education journey."],
            ].map(([number, title, text]) => (
              <div
                key={number}
                className="rounded-3xl bg-white p-8 shadow-sm"
              >
                <div className="text-sm font-bold text-teal-700">{number}</div>
                <h3 className="mt-4 text-2xl font-bold">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership */}
      <section id="membership" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-2xl">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 sm:p-12">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-300">
                  FamiNova Membership
                </p>
                <h2 className="mt-4 text-4xl font-bold tracking-tight">
                  Your fertility learning library.
                </h2>
                <p className="mt-5 leading-7 text-slate-300">
                  Get digital access to FamiNova's educational resources and
                  member dashboard.
                </p>

                <div className="mt-8">
                  {benefits.map((benefit) => (
                    <div key={benefit} className="mb-3 flex gap-3">
                      <span className="text-teal-300">✓</span>
                      <span className="text-slate-200">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-teal-700 p-8 sm:p-12">
                <div className="text-sm font-medium text-teal-100">
                  Digital membership
                </div>
                <div className="mt-3 flex items-end gap-2">
                  <span className="text-6xl font-bold">₹149</span>
                  <span className="pb-2 text-teal-100">one-time</span>
                </div>

                <p className="mt-5 text-sm leading-6 text-teal-50">
                  Payment is for access to FamiNova digital educational
                  resources. FamiNova does not provide medical diagnosis or
                  clinical treatment.
                </p>

                <button
                  type="button"
                  className="mt-8 w-full rounded-full bg-white px-6 py-4 font-bold text-teal-800 transition hover:bg-teal-50"
                >
                  Join FamiNova — ₹149
                </button>

                <p className="mt-4 text-center text-xs text-teal-100">
                  Secure payment integration will be added next.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
              FAQ
            </p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight">
              Frequently asked questions
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {[
              [
                "What is FamiNova?",
                "FamiNova is a digital fertility education platform providing general educational resources and information.",
              ],
              [
                "Is FamiNova a medical clinic?",
                "No. FamiNova is an educational platform and does not replace consultation with a qualified healthcare professional.",
              ],
              [
                "What does the ₹149 membership cover?",
                "It is intended to provide access to FamiNova's digital educational resources and member area.",
              ],
              [
                "Can I get medical advice through FamiNova?",
                "FamiNova content is educational. Medical diagnosis and treatment decisions should be discussed with qualified healthcare professionals.",
              ],
            ].map(([question, answer]) => (
              <details
                key={question}
                className="group rounded-2xl border border-slate-200 bg-white p-6"
              >
                <summary className="cursor-pointer list-none font-semibold text-slate-900">
                  {question}
                  <span className="float-right text-teal-700 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 leading-7 text-slate-600">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row">
            <div>
              <div className="text-xl font-bold">
                Fami<span className="text-teal-700">Nova</span>
              </div>
              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                Fertility education designed to help people understand,
                prepare and make informed decisions.
              </p>
            </div>

            <div className="flex flex-wrap gap-5 text-sm text-slate-500">
              <a href="#" className="hover:text-teal-700">
                Privacy
              </a>
              <a href="#" className="hover:text-teal-700">
                Terms
              </a>
              <a href="#" className="hover:text-teal-700">
                Contact
              </a>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-6 text-xs leading-5 text-slate-400">
            © {new Date().getFullYear()} FamiNova. Educational information
            only. This platform is not a substitute for professional medical
            advice.
          </div>
        </div>
      </footer>
    </main>
  );
}