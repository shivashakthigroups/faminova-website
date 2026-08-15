export default function MembershipPage() {
  return (
    <main className="min-h-screen bg-[#fbfaf7] text-slate-900">
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

      <section className="mx-auto max-w-5xl px-5 py-20">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
            FamiNova Membership
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
            Learn with confidence.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Access FamiNova&apos;s digital fertility education and
            member-focused resources.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl sm:p-10">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              One-time membership
            </p>

            <div className="mt-4 text-6xl font-bold text-slate-950">
              ₹149
            </div>

            <p className="mt-3 text-slate-500">
              Digital educational membership
            </p>
          </div>

          <div className="my-8 h-px bg-slate-200" />

          <h2 className="text-xl font-bold text-slate-950">
            Membership includes
          </h2>

          <ul className="mt-6 space-y-4">
            {[
              "Sperm fertility resources",
              "Simple explanations of reproductive-health topics",
              "Member-focused digital guides",
              "Access to educational articles and resources",
              "Future educational content as it becomes available",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                  ✓
                </span>

                <span className="leading-6 text-slate-600">{item}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="mt-9 w-full rounded-full bg-slate-950 px-6 py-4 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            Continue
          </button>

          <p className="mt-5 text-center text-xs leading-5 text-slate-500">
            Membership provides digital educational/member services.
            purchase or guarantee donor material, donor matching,
            medical treatment, pregnancy, biological material or any specific
            fertility outcome.
          </p>
        </div>
      </section>
    </main>
  );
}<p className="mt-5 text-center text-xs leading-5 text-slate-500">
  The FamiNova membership fee covers access to our digital educational and
  informational services. We will provide members with fertility-related
  educational resources, guides, articles and other member resources made
  available through the FamiNova platform. Membership include or
  guarantee donor material, donor matching, sperm or other biological
  material, medical treatment, fertility procedures, pregnancy, or any
  specific medical outcome.
</p>