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

const healthStats = [
  { label: "Age", value: "28", subtext: "Years", accent: "text-violet-600" },
  { label: "Blood Group", value: "B+", subtext: "Positive", accent: "text-rose-500" },
  { label: "Total Appointments", value: "05", subtext: "This Year", accent: "text-blue-600" },
  { label: "Health Score", value: "85%", subtext: "Good", accent: "text-emerald-600" },
];

const statIcons = ["🎂", "🩸", "📊", "💚"];

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

        <div className="grid min-h-[calc(100vh-5.5rem)] lg:grid-cols-[260px_minmax(0,1fr)]">
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
          </section>
        </div>
      </div>
    </main>
  );
}
