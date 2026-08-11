"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  text: string;
  time: string;
};

const sidebarItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Chat with AI", href: "/dashboard/chat", active: true },
  { label: "Appointments", href: "#" },
  { label: "Doctors", href: "#" },
  { label: "Medical Records", href: "#" },
  { label: "Prescriptions", href: "#" },
  { label: "Health Profile", href: "#" },
  { label: "Settings", href: "#" },
  { label: "Logout", href: "/login", danger: true },
];

const quickPrompts = [
  "I have a fever and body pain",
  "Need advice for headache",
  "Suggest a doctor near me",
  "Can I book an appointment?",
];

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    role: "assistant",
    text: "Hello! I’m your AI health assistant. Tell me your symptoms and I’ll help you figure out the next best step.",
    time: "Just now",
  },
  {
    id: 2,
    role: "user",
    text: "I have a fever and sore throat.",
    time: "Just now",
  },
  {
    id: 3,
    role: "assistant",
    text: "Based on those symptoms, you may want to rest, stay hydrated, and consider seeing a Medicine Specialist if the fever persists.",
    time: "Just now",
  },
];

export default function ChatWithAIPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");

  const patientName = useMemo(() => {
    if (typeof window === "undefined") return "Rahman";

    const storedPatient = localStorage.getItem("ehospitalbd-patient");
    if (!storedPatient) return "Rahman";

    try {
      const parsed = JSON.parse(storedPatient) as { name?: string };
      return parsed.name?.split(" ")[0] ?? "Rahman";
    } catch {
      return "Rahman";
    }
  }, []);

  const sendMessage = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content) return;

    setMessages((current) => [
      ...current,
      {
        id: current.length + 1,
        role: "user",
        text: content,
        time: "Just now",
      },
      {
        id: current.length + 2,
        role: "assistant",
        text: "Thanks for sharing. I can help you with symptom guidance, specialist suggestions, and next steps. If you have severe symptoms, please seek immediate medical care.",
        time: "Just now",
      },
    ]);
    setInput("");
  };

  return (
    <main className="min-h-screen bg-[#f5f7ff] px-3 py-3 text-slate-900 sm:px-4 sm:py-4">
      <div className="mx-auto min-h-[calc(100vh-1.5rem)] max-w-[1600px] overflow-hidden rounded-[26px] border border-slate-200/70 bg-white shadow-[0_24px_90px_rgba(15,23,42,0.08)]">
        <header className="flex items-center justify-between border-b border-slate-200/70 px-5 py-4 sm:px-6 lg:px-8">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-sky-500 via-blue-600 to-cyan-400 text-white shadow-lg shadow-blue-200">
              <span className="text-lg font-black">✚</span>
            </div>
            <div>
              <p className="text-[1.05rem] font-extrabold tracking-tight text-slate-950">
                MediCare AI
              </p>
              <p className="text-xs text-slate-500">Smart Healthcare Assistant</p>
            </div>
          </Link>

          <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            AI Chat for {patientName}
          </div>
        </header>

        <div className="grid min-h-[calc(100vh-5.5rem)] lg:grid-cols-[260px_minmax(0,1fr)_320px]">
          <aside className="hidden border-r border-slate-200/70 bg-white px-4 py-5 lg:block">
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
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
                      "grid h-7 w-7 place-items-center rounded-lg",
                      item.active ? "bg-white text-blue-600" : item.danger ? "bg-rose-50 text-rose-500" : "bg-slate-100 text-slate-500",
                    ].join(" ")}
                  >
                    {item.active ? "◎" : item.danger ? "↩" : "◦"}
                  </span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          <section className="flex flex-col bg-[linear-gradient(180deg,#ffffff,#fbfcff)] px-4 py-5 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                Chat with AI
              </h1>
              <p className="mt-2 text-sm text-slate-500 sm:text-base">
                Describe your symptoms and get quick medical guidance.
              </p>
            </div>

            <div className="flex-1 rounded-[2rem] border border-slate-200/70 bg-white p-4 shadow-sm sm:p-6">
              <div className="flex h-full min-h-[520px] flex-col">
                <div className="flex-1 space-y-4 overflow-y-auto pr-1">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={[
                        "flex",
                        message.role === "user" ? "justify-end" : "justify-start",
                      ].join(" ")}
                    >
                      <div
                        className={[
                          "max-w-[85%] rounded-[1.5rem] px-4 py-3 shadow-sm sm:max-w-[70%]",
                          message.role === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-700",
                        ].join(" ")}
                      >
                        <p className="text-sm leading-7">{message.text}</p>
                        <p
                          className={[
                            "mt-2 text-[11px] font-medium",
                            message.role === "user" ? "text-blue-100" : "text-slate-400",
                          ].join(" ")}
                        >
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => sendMessage(prompt)}
                      className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                <div className="mt-5 flex flex-col gap-3 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-3 sm:flex-row sm:items-center">
                  <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") sendMessage();
                    }}
                    placeholder="Type your symptoms or question..."
                    className="w-full border-none bg-transparent px-3 py-2 text-sm outline-none placeholder:text-slate-400"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="grid h-11 w-11 place-items-center rounded-full bg-white text-slate-500 shadow-sm"
                      aria-label="Voice input"
                    >
                      🎙
                    </button>
                    <button
                      type="button"
                      onClick={() => sendMessage()}
                      className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside className="hidden overflow-y-auto border-l border-slate-200/70 bg-[#fbfcff] px-4 py-5 lg:block">
            <div className="rounded-[2rem] bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">How it works</h3>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                <p>1. Tell the assistant your symptoms.</p>
                <p>2. Get quick guidance and likely next steps.</p>
                <p>3. Book a specialist if needed.</p>
              </div>
            </div>

            <div className="mt-5 rounded-[2rem] bg-blue-50 p-5">
              <p className="text-sm font-bold text-blue-700">Safety note</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                This assistant provides preliminary information only. If symptoms are severe, sudden, or worsening, contact a doctor or emergency care immediately.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
