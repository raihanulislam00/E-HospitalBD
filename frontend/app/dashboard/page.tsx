"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Patient = {
  id: string;
  name: string;
  email: string;
  phoneNo: string;
  location: {
    district: string;
    division: string;
  };
  dateOfBirth: string;
  createdAt: string;
};

const sidebarItems = [
  { label: "Dashboard", href: "/dashboard", active: true, icon: "⌂" },
  { label: "Chat with AI", href: "/dashboard/chat", icon: "💬" },
  { label: "Appointments", icon: "📅" },
  { label: "Doctors", icon: "🩺" },
  { label: "Medical Records", icon: "📁" },
  { label: "Prescriptions", icon: "💊" },
  { label: "Health Profile", icon: "🫀" },
  { label: "Settings", icon: "⚙" },
  { label: "Logout", danger: true, icon: "↩" },
];

const quickActions = [
  { label: "Find a Doctor", color: "text-blue-600", icon: "🔎" },
  { label: "Book Appointment", color: "text-blue-600", icon: "📆" },
  { label: "Upload Reports", color: "text-blue-600", icon: "☁" },
  { label: "Emergency Help", color: "text-rose-600", icon: "☎" },
];

const consultations = [
  {
    title: "Fever & Cold",
    doctor: "Dr. Rashid Khan",
    date: "10 May 2024",
    accent: "bg-violet-100 text-violet-700",
  },
  {
    title: "Headache",
    doctor: "Dr. Saba Anwar",
    date: "02 May 2024",
    accent: "bg-fuchsia-100 text-fuchsia-700",
  },
  {
    title: "Stomach Pain",
    doctor: "Dr. Farzana Ahmed",
    date: "20 Apr 2024",
    accent: "bg-amber-100 text-amber-700",
  },
];

const healthStats = [
  { label: "Age", value: "28", subtext: "Years", accent: "text-violet-600" },
  { label: "Blood Group", value: "B+", subtext: "Positive", accent: "text-rose-500" },
  { label: "Total Appointments", value: "05", subtext: "This Year", accent: "text-blue-600" },
  { label: "Health Score", value: "85%", subtext: "Good", accent: "text-emerald-600" },
];

const statIcons = ["🎂", "🩸", "📊", "💚"];

const welcomeChips = [
  { label: "24/7 care", icon: "🌙" },
  { label: "Fast booking", icon: "⚡" },
  { label: "Secure records", icon: "🔒" },
];

const tips = [
  "Drink plenty of water and stay hydrated.",
  "Get at least 7–8 hours of sleep daily.",
  "Eat balanced meals with fruits and vegetables.",
  "Regular exercise for at least 30 minutes.",
];

export default function DashboardPage() {
  const [patient] = useState<Patient | null>(() => {
    if (typeof window === "undefined") return null;

    const storedPatient = localStorage.getItem("ehospitalbd-patient");
    if (!storedPatient) return null;

    try {
      return JSON.parse(storedPatient) as Patient;
    } catch {
      return null;
    }
  });

  const firstName = useMemo(() => {
    if (!patient?.name) return "Rahman";
    return patient.name.split(" ")[0] ?? patient.name;
  }, [patient]);

  return (
    <main className="min-h-screen bg-[#f5f7ff] px-3 py-3 text-slate-900 sm:px-4 sm:py-4">
      <div className="mx-auto min-h-[calc(100vh-1.5rem)] max-w-[1600px] overflow-hidden rounded-[26px] border border-slate-200/70 bg-white shadow-[0_24px_90px_rgba(15,23,42,0.08)]">
        <header className="flex items-center justify-between border-b border-slate-200/70 px-5 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-sky-500 via-blue-600 to-cyan-400 text-white shadow-lg shadow-blue-200">
              <span className="text-lg font-black">✚</span>
            </div>
            <div>
              <p className="text-[1.05rem] font-extrabold tracking-tight text-slate-950">
                MediCare AI
              </p>
              <p className="text-xs text-slate-500">Smart Healthcare Assistant</p>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button
              type="button"
              className="relative grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm"
              aria-label="Notifications"
            >
              <span className="text-lg">🔔</span>
              <span className="absolute right-1 top-0 grid h-5 w-5 place-items-center rounded-full bg-rose-500 text-[11px] font-bold text-white">
                3
              </span>
            </button>

            <button
              type="button"
              className="flex items-center gap-3 rounded-full px-2 py-1 text-left transition hover:bg-slate-50"
            >
              <div className="h-11 w-11 overflow-hidden rounded-full bg-gradient-to-br from-amber-200 to-orange-300">
                <div className="grid h-full w-full place-items-center text-lg">👤</div>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-slate-900">
                  Hello, {patient?.name ?? `Rahman`} 👋
                </p>
                <p className="text-xs text-slate-500">{patient?.email ?? "Welcome back"}</p>
              </div>
              <span className="text-slate-400">⌄</span>
            </button>
          </div>
        </header>

        <div className="grid min-h-[calc(100vh-5.5rem)] lg:grid-cols-[260px_minmax(0,1fr)_320px]">
          <aside className="hidden border-r border-slate-200/70 bg-white px-4 py-5 lg:block">
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.label === "Logout" ? "/login" : item.href ?? "#"}
                  onClick={
                    item.label === "Logout"
                      ? () => {
                          localStorage.removeItem("ehospitalbd-token");
                          localStorage.removeItem("ehospitalbd-patient");
                        }
                      : undefined
                  }
                  className={[
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                    item.active
                      ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 shadow-sm"
                      : item.danger
                        ? "text-rose-500 hover:bg-rose-50"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "grid h-8 w-8 place-items-center rounded-xl text-sm",
                      item.active
                        ? "bg-white text-blue-600"
                        : item.danger
                          ? "bg-rose-50 text-rose-500"
                          : "bg-slate-100 text-slate-500",
                    ].join(" ")}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-8 rounded-[1.75rem] bg-[linear-gradient(180deg,#f8fbff,#eef4ff)] p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Need Help?</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Our support team is available 24/7
              </p>
              <a
                href="#"
                className="mt-5 inline-flex w-full items-center justify-center rounded-2xl border border-blue-100 bg-white px-4 py-3 text-sm font-semibold text-blue-700 shadow-sm transition hover:border-blue-200"
              >
                Contact Support
              </a>
            </div>
          </aside>

          <section className="overflow-y-auto bg-[linear-gradient(180deg,#ffffff,#fbfcff)] px-4 py-5 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                Welcome back, {firstName}! 👋
              </h1>
              <p className="mt-2 text-sm text-slate-500 sm:text-base">
                How can I help you with your health today?
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {welcomeChips.map((chip) => (
                  <span
                    key={chip.label}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm"
                  >
                    <span>{chip.icon}</span>
                    {chip.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100 p-6 shadow-sm">
              <div className="grid gap-6 lg:grid-cols-[auto_minmax(0,1fr)]">
                <div className="flex items-center justify-center">
                  <div className="grid h-28 w-28 place-items-center rounded-full bg-white shadow-[0_16px_40px_rgba(59,130,246,0.18)]">
                    <div className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-slate-900 to-slate-700 text-3xl text-cyan-300">
                      🤖
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="mb-3 inline-flex rounded-full bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-blue-700">
                      AI Concierge
                    </div>
                    <h2 className="text-2xl font-extrabold text-slate-950">Hello {firstName},</h2>
                    <p className="mt-1 text-lg text-slate-600">I&apos;m your AI health assistant.</p>
                    <p className="mt-2 max-w-xl text-base leading-7 text-slate-600">
                      Describe your symptoms or choose from the quick options below.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 rounded-full bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center">
                    <input
                      type="text"
                      placeholder="Type your symptoms here..."
                      className="w-full border-none bg-transparent text-sm text-slate-600 outline-none placeholder:text-slate-400"
                    />
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        type="button"
                        className="grid h-11 w-11 place-items-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-200"
                        aria-label="Send symptoms"
                      >
                        ➜
                      </button>
                      <button
                        type="button"
                        className="grid h-11 w-11 place-items-center rounded-full bg-slate-100 text-slate-500"
                        aria-label="Voice input"
                      >
                        🎙
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {["I have a fever", "Severe headache", "Stomach pain", "View my bookings"].map((item) => (
                      <button
                        key={item}
                        type="button"
                        className="group rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:text-blue-700"
                      >
                        <span className="mr-2 opacity-70 transition group-hover:opacity-100">✦</span>
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-[2rem] border border-slate-200/70 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-4">
                <h3 className="text-lg font-bold text-slate-900">Upcoming Appointments</h3>
                <a href="#" className="text-sm font-semibold text-blue-600">
                  View all
                </a>
              </div>

              <div className="rounded-[1.5rem] border border-slate-100 bg-[#fbfcff] p-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-full bg-blue-100 text-3xl">
                      👨‍⚕️
                    </div>
                    <div>
                      <p className="text-base font-bold text-slate-900">Dr. Mahmudul Hasan</p>
                      <p className="text-sm text-slate-600">Medicine Specialist</p>
                      <p className="mt-1 text-sm text-slate-500">Evercare Hospital, Dhaka</p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[420px]">
                    <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                      <p className="text-sm font-semibold text-slate-900">25 May 2024</p>
                      <p className="text-xs text-slate-500">Saturday</p>
                    </div>
                    <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                      <p className="text-sm font-semibold text-slate-900">10:30 AM</p>
                      <p className="text-xs text-slate-500">Visit time</p>
                    </div>
                    <div className="space-y-2 rounded-2xl bg-white px-4 py-3 shadow-sm">
                      <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                        Confirmed
                      </span>
                      <a
                        href="#"
                        className="inline-flex rounded-full border border-blue-100 px-3 py-1 text-xs font-semibold text-blue-700"
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-[2rem] border border-slate-200/70 bg-white p-5 shadow-sm">
              <h3 className="mb-5 text-lg font-bold text-slate-900">Health Summary</h3>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {healthStats.map((item, index) => (
                  <div
                    key={item.label}
                    className="rounded-[1.5rem] border border-slate-100 bg-[#fbfcff] p-5 shadow-[0_8px_30px_rgba(15,23,42,0.03)]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className={`text-sm font-semibold ${item.accent}`}>{item.label}</p>
                      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-lg shadow-sm">
                        {statIcons[index]}
                      </span>
                    </div>
                    <p className="mt-5 text-3xl font-black text-slate-950">{item.value}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.subtext}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-[2rem] border border-slate-200/70 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">AI Health Tips for You</h3>
              <p className="mt-1 text-sm text-slate-500">Stay healthy with these personalized tips</p>

              <div className="mt-5 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <ul className="space-y-4">
                  {tips.map((tip) => (
                    <li key={tip} className="flex items-start gap-3 text-sm text-slate-600">
                      <span className="mt-0.5 text-emerald-500">✓</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>

                <div className="rounded-[1.75rem] bg-[linear-gradient(180deg,#f9fbff,#edf4ff)] p-6 text-center">
                  <div className="mx-auto grid max-w-[260px] place-items-center rounded-[1.5rem] bg-white px-6 py-8 shadow-sm">
                    <div className="text-7xl">🧑‍⚕️</div>
                    <div className="mt-4 inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                      Health Care Support
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside className="hidden overflow-y-auto border-l border-slate-200/70 bg-[#fbfcff] px-4 py-5 lg:block">
            <div className="rounded-[2rem] bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">Quick Actions</h3>
              <div className="mt-5 space-y-4">
                {quickActions.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-sm"
                  >
                    <span className={`grid h-9 w-9 place-items-center rounded-xl bg-slate-100 ${item.color}`}>
                      <span className="text-base">{item.icon}</span>
                    </span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-[2rem] bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-slate-900">Recent Consultations</h3>
                <a href="#" className="text-sm font-semibold text-blue-600">
                  View all
                </a>
              </div>

              <div className="mt-5 space-y-5">
                {consultations.map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className={`grid h-11 w-11 place-items-center rounded-2xl ${item.accent}`}>
                      ⊙
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                      <p className="text-sm text-slate-600">{item.doctor}</p>
                      <p className="text-xs text-slate-400">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-[2rem] bg-emerald-50 p-5 shadow-sm">
              <p className="text-sm font-bold text-emerald-700">Medical Disclaimer</p>
              <p className="mt-3 text-sm leading-7 text-emerald-900/80">
                MediCare AI provides preliminary information and guidance only. It does not replace professional medical advice, diagnosis, or treatment.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
