"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";
const sessionStorageKey = "ehospitalbd-chat-session";

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  text: string;
  time: string;
};

type ChatApiResponse = {
  sessionId: string;
  reply: string;
  history: Array<{ role: "assistant" | "user"; content: string }>;
  disclaimer: string;
};

const sidebarItems = [
  { label: "Dashboard", href: "/dashboard", icon: "⌂" },
  { label: "Chat with AI", href: "/dashboard/chat", active: true, icon: "💬" },
  { label: "Appointments", href: "#", icon: "📅" },
  { label: "Doctors", href: "#", icon: "🩺" },
  { label: "Medical Records", href: "#", icon: "📁" },
  { label: "Prescriptions", href: "#", icon: "💊" },
  { label: "Health Profile", href: "#", icon: "🫀" },
  { label: "Reports", href: "#", icon: "📈" },
  { label: "Settings", href: "#", icon: "⚙" },
  { label: "Help & Support", href: "#", icon: "❓" },
  { label: "Emergency Help", href: "#", icon: "📞", danger: true },
];

const initialMessages: ChatMessage[] = [];

export default function ChatWithAIPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [patient] = useState<{ name: string; role: string }>(() => {
    if (typeof window === "undefined") return { name: "Rahman Ahmed", role: "Patient" };

    const storedPatient = localStorage.getItem("ehospitalbd-patient");
    if (!storedPatient) return { name: "Rahman Ahmed", role: "Patient" };

    try {
      const parsed = JSON.parse(storedPatient) as { name?: string };
      return { name: parsed.name ?? "Rahman Ahmed", role: "Patient" };
    } catch {
      return { name: "Rahman Ahmed", role: "Patient" };
    }
  });
  const [sessionId, setSessionId] = useState(() => {
    if (typeof window === "undefined") return "default";

    const storedSessionId = localStorage.getItem(sessionStorageKey);
    if (storedSessionId) return storedSessionId;

    const generatedSessionId =
      globalThis.crypto?.randomUUID?.() ?? `chat-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(sessionStorageKey, generatedSessionId);
    return generatedSessionId;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    localStorage.setItem(sessionStorageKey, sessionId);
  }, [sessionId]);

  const clearChat = async () => {
    setMessages(initialMessages);
    setInput("");
    setError(null);

    try {
      await fetch(`${backendUrl}/patient/chat/clear`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      });
    } catch {
      // Keep the UI reset even if the backend clear request fails.
    }
  };

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content) return;

    setIsSending(true);
    setError(null);

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      text: content,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");

    try {
      const response = await fetch(`${backendUrl}/patient/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          message: content,
          history: messages.map((message) => ({
            role: message.role,
            content: message.text,
          })),
        }),
      });

      const payload = (await response.json()) as ChatApiResponse | { message?: string };

      if (!response.ok) {
        throw new Error(payload?.message ?? "Unable to get AI response");
      }

      const aiPayload = payload as ChatApiResponse;
      setSessionId(aiPayload.sessionId);

      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: aiPayload.reply,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to get AI response");
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: "Sorry — I couldn&apos;t reach the AI service right now. Please try again in a moment.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f7ff] px-3 py-3 text-slate-900 sm:px-4 sm:py-4">
      <div className="mx-auto min-h-[calc(100vh-1.5rem)] max-w-[1700px] overflow-hidden rounded-[28px] border border-slate-200/70 bg-white shadow-[0_24px_90px_rgba(15,23,42,0.08)]">
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

          <div className="flex items-center gap-3 sm:gap-6">
            <div className="hidden rounded-2xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-semibold text-blue-700 md:flex md:items-center md:gap-2">
              <span>🛡</span>
              Medical Disclaimer
            </div>

            <button
              type="button"
              className="relative grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm"
              aria-label="Notifications"
            >
              🔔
              <span className="absolute right-1 top-0 grid h-5 w-5 place-items-center rounded-full bg-rose-500 text-[11px] font-bold text-white">
                3
              </span>
            </button>

            <button type="button" className="flex items-center gap-3 rounded-full px-2 py-1 text-left">
              <div className="h-12 w-12 overflow-hidden rounded-full bg-gradient-to-br from-amber-200 to-orange-300">
                <div className="grid h-full w-full place-items-center text-lg">👤</div>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-slate-900">{patient.name}</p>
                <p className="text-xs text-slate-500">{patient.role}</p>
              </div>
              <span className="ml-2 text-slate-400">⌄</span>
            </button>
          </div>
        </header>

        <div className="grid min-h-[calc(100vh-5.5rem)] lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="hidden border-r border-slate-200/70 bg-white px-4 py-5 lg:block">
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.label === "Emergency Help" ? "#" : item.href}
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
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-2xl shadow-sm">
                🛡
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-900">
                Your health data is secure and protected with us.
              </p>
              <Link href="#" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                Learn more →
              </Link>
            </div>
          </aside>

          <section className="flex flex-col border-r border-slate-200/70 bg-[linear-gradient(180deg,#ffffff,#fbfcff)] px-4 py-5 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                  Chat with AI Assistant
                </h1>
                <p className="mt-2 flex items-center gap-2 text-sm text-slate-500 sm:text-base">
                  <span className="h-3 w-3 rounded-full bg-emerald-500" />
                  Online
                </p>
              </div>

              <button
                type="button"
                onClick={() => void clearChat()}
                className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm md:inline-flex"
              >
                <span>🗑</span>
                Clear Chat
              </button>
            </div>

            <div className="rounded-[2rem] border border-slate-200/70 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-start gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-blue-50 text-3xl shadow-sm">
                  🤖
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-950">MediCare AI Assistant</h2>
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-[11px] font-bold text-blue-700">
                      BOT
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">
                    I can help you understand your symptoms and find the right care.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {messages.map((message) => (
                  <div key={message.id} className={message.role === "user" ? "ml-auto max-w-2xl" : "max-w-2xl"}>
                    <div
                      className={[
                        "rounded-[1.75rem] px-5 py-4 shadow-sm",
                        message.role === "user"
                          ? "bg-blue-600 text-white shadow-blue-200"
                          : "bg-[#eef4ff] text-slate-700",
                      ].join(" ")}
                    >
                      <p className="whitespace-pre-line text-sm leading-7">{message.text}</p>
                    </div>
                    <div
                      className={[
                        "mt-1 flex items-center gap-2 text-xs text-slate-400",
                        message.role === "user" ? "justify-end" : "justify-start",
                      ].join(" ")}
                    >
                      <span>{message.time}</span>
                      {message.role === "user" ? <span>✓</span> : null}
                    </div>
                  </div>
                ))}

                <div className="flex items-center gap-2">
                  <span className="flex gap-1 rounded-full bg-slate-100 px-3 py-2 text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-slate-300" />
                    <span className="h-2 w-2 rounded-full bg-slate-300" />
                    <span className="h-2 w-2 rounded-full bg-slate-300" />
                  </span>
                </div>

                <div className="mt-2 flex flex-col gap-3 rounded-[2rem] border border-slate-200 bg-white p-3 shadow-sm sm:flex-row sm:items-center">
                    <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        void sendMessage();
                      }
                    }}
                    placeholder="Type your symptoms here..."
                    className="w-full border-none bg-transparent px-3 py-3 text-sm outline-none placeholder:text-slate-400"
                  />
                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <button
                      type="button"
                      className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm"
                      aria-label="Voice input"
                    >
                      🎙
                    </button>
                    <button
                      type="button"
                      onClick={() => void sendMessage()}
                      disabled={isSending}
                      className="grid h-11 w-11 place-items-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSending ? "…" : "➜"}
                    </button>
                  </div>
                </div>

                {error ? (
                  <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {error}
                  </div>
                ) : null}

                <div className="flex items-start gap-3 rounded-[1.5rem] border border-slate-100 bg-[#fbfcff] p-4 text-sm text-slate-500">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white shadow-sm">🛡</span>
                  <p className="leading-7">
                    MediCare AI provides preliminary information and is not a substitute for professional medical advice, diagnosis or treatment. In case of emergency, please seek immediate medical attention.
                  </p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
