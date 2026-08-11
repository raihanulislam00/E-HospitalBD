const features = [
  {
    title: "AI Symptom Triage",
    description: "Get preliminary guidance based on your symptoms using the E-HospitalBD assistant.",
    icon: "✦",
  },
  {
    title: "Find the Right Doctor",
    description: "Route patients to the correct specialist based on condition and urgency.",
    icon: "◎",
  },
  {
    title: "Book Appointments",
    description: "Reserve visits quickly with a clean booking flow connected to backend APIs.",
    icon: "▣",
  },
  {
    title: "Track & Manage",
    description: "View upcoming appointments and manage your care from one place.",
    icon: "◉",
  },
];

const steps = [
  {
    no: "01",
    title: "Describe Symptoms",
    description: "Share your health concern in plain language to begin the triage flow.",
  },
  {
    no: "02",
    title: "Get Guidance",
    description: "Review smart recommendations and next-step care suggestions.",
  },
  {
    no: "03",
    title: "Find Specialists",
    description: "See suitable specialists and care teams for your condition.",
  },
  {
    no: "04",
    title: "Book Appointment",
    description: "Choose a doctor, pick a date, and confirm the visit.",
  },
];

const specialties = [
  "Medicine Specialist",
  "Neurologist",
  "Cardiologist",
  "Orthopedic Specialist",
  "Pediatrician",
  "Oncologist",
];

const stats = [
  { value: "10k+", label: "Trusted patients" },
  { value: "4.8/5", label: "Average rating" },
  { value: "24/7", label: "Support" },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f6f9ff] text-slate-900">
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-700 text-xl text-white shadow-lg shadow-blue-200">
              ✚
            </div>
            <div>
              <p className="text-lg font-extrabold tracking-tight text-slate-900">
                MediCare AI
              </p>
              <p className="text-xs text-slate-500">Smart Healthcare Assistant</p>
            </div>
          </div>

          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
            {['Home', 'Features', 'How It Works', 'Find Doctors', 'About Us', 'Contact'].map((item) => (
              <a key={item} href="#" className="transition hover:text-blue-700">
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 text-sm font-semibold">
            <a
              href="#login"
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
            >
              Login
            </a>
            <a
              href="#signup"
              className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2.5 text-white shadow-lg shadow-blue-200 transition hover:from-blue-700 hover:to-blue-800"
            >
              Sign Up
            </a>
          </div>
        </div>
      </header>

      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(59,130,246,0.18),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(14,165,233,0.14),transparent_20%),radial-gradient(circle_at_70%_70%,rgba(191,219,254,0.45),transparent_30%)]" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center">
            <span className="mb-5 inline-flex w-fit rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
              AI-Powered Triage. Expert Care. Anytime.
            </span>
            <h1 className="max-w-2xl text-5xl font-black leading-[1.05] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              <span className="block">AI-Powered Triage.</span>
              <span className="block bg-gradient-to-r from-blue-600 via-blue-700 to-sky-500 bg-clip-text text-transparent">
                Expert Care. Anytime.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Describe symptoms, get AI-guided support, find the right specialist, and book appointments in one place. The frontend stays clean and presentation-focused while the backend handles patient login and dashboard access.
            </p>

            <ul className="mt-7 space-y-3 text-slate-700">
              {[
                'AI Symptom Assessment',
                'Specialist Recommendations',
                'Easy Appointment Booking',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                    ✓
                  </span>
                  <span className="text-sm sm:text-base">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="http://localhost:8000/patient/login"
                className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-sm font-semibold text-white shadow-xl shadow-blue-200 transition hover:translate-y-[-1px] hover:from-blue-700 hover:to-blue-800"
              >
                Start Health Assessment →
              </a>
              <a
                href="#find-doctor"
                className="rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
              >
                Find a Doctor →
              </a>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-3">
                {['A', 'B', 'C'].map((item) => (
                  <div
                    key={item}
                    className="grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-slate-200 text-xs font-bold text-slate-600 shadow"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm text-slate-500">Trusted by 10,000+ patients</p>
                <p className="text-sm font-semibold text-amber-500">★★★★★ 4.8/5</p>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute left-6 top-10 h-36 w-36 rounded-full bg-blue-200/40 blur-3xl" />
            <div className="absolute right-8 bottom-12 h-44 w-44 rounded-full bg-sky-200/40 blur-3xl" />

            <div className="relative w-full max-w-[540px] rounded-[2.5rem] border border-white/70 bg-white/85 p-5 shadow-[0_30px_100px_rgba(37,99,235,0.16)] backdrop-blur-xl">
              <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="rounded-[2rem] border border-slate-100 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-sky-500" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">MediCare AI</p>
                        <p className="text-xs text-emerald-500">● Online</p>
                      </div>
                    </div>
                    <span className="text-slate-400">⋯</span>
                  </div>

                  <div className="mt-5 space-y-4">
                    <div className="w-fit rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700 shadow-sm">
                      Hello! 👋<br />How can I help you with your health today?
                    </div>
                    <div className="ml-auto w-fit rounded-2xl bg-blue-600 px-4 py-3 text-sm text-white shadow-lg shadow-blue-200">
                      I have high fever and severe headache.
                    </div>
                    <div className="w-fit rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700 shadow-sm">
                      I understand your concern. Based on your symptoms, you may need to consult a specialist.
                    </div>

                    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                        Recommended Specialist
                      </p>
                      <div className="mt-3 rounded-2xl bg-slate-50 p-3">
                        <p className="font-semibold text-slate-900">Medicine Specialist</p>
                        <p className="text-sm text-slate-500">Fever • Headache • Infection</p>
                      </div>
                      <button className="mt-3 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200">
                        View Available Doctors
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-400">
                    <span>Type your symptoms...</span>
                    <span className="ml-auto grid h-9 w-9 place-items-center rounded-full bg-blue-600 text-white">➤</span>
                  </div>
                </div>

                <div className="hidden h-[420px] w-[160px] rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-800 to-slate-900 p-3 shadow-xl lg:block">
                  <div className="h-full rounded-[1.5rem] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),_transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-3 text-white">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span>Live Chat</span>
                      <span>⚕</span>
                    </div>
                    <div className="mt-10 rounded-2xl border border-white/10 bg-white/10 p-3 text-xs leading-5 text-slate-100">
                      Our assistant is ready to guide you to the right care.
                    </div>
                    <div className="mt-4 rounded-2xl bg-blue-600 p-3 text-xs leading-5 text-white">
                      Secure login is handled by the backend.
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.5rem] border border-slate-100 bg-white p-4 text-center shadow-sm"
                  >
                    <p className="text-2xl font-black text-slate-950">{item.value}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-4 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-4 lg:p-6">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-[1.5rem] border border-slate-100 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
            >
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-xl text-blue-700">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-950">{feature.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-blue-600">Simple Process</p>
          <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">How MediCare AI Works</h2>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-4">
          {steps.map((step) => (
            <article key={step.no} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-full border border-blue-100 bg-blue-50 text-sm font-black text-blue-700">
                  {step.no}
                </div>
                <div>
                  <h3 className="font-bold text-slate-950">{step.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{step.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="find-doctor" className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-blue-600">Our Specialties</p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">Find Care Across Specialties</h2>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {specialties.map((specialty) => (
              <div
                key={specialty}
                className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-6 text-center text-sm font-semibold text-slate-800 shadow-sm"
              >
                {specialty}
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <a href="#" className="text-sm font-semibold text-blue-700 transition hover:text-blue-800">
              View All Specialties →
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 rounded-[2rem] bg-gradient-to-r from-slate-100 to-blue-50 px-6 py-6 text-center shadow-sm md:flex-row md:text-left">
          <div>
            <h3 className="text-2xl font-black text-slate-950">Your Health Is Our Priority</h3>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
              Start your health assessment now and take the first step towards better care.
            </p>
          </div>
          <a
            href="http://localhost:8000/patient/login"
            className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:from-blue-700 hover:to-blue-800"
          >
            Start Health Assessment →
          </a>
        </div>

        <div className="mt-5 grid gap-3 text-center text-sm text-slate-500 sm:grid-cols-4">
          {['100% Secure & Private', 'HIPAA Compliant', 'Trusted Medical Network', '24/7 AI Support'].map((item) => (
            <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
              {item}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}