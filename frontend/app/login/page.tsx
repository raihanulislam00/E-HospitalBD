"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";

type LoginFormState = {
  phoneNo: string;
  password: string;
};

type LoginApiResponse = {
  message: string;
  token: string;
  dashboardUrl: string;
  patient: {
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
};

const initialLoginState: LoginFormState = {
  phoneNo: "",
  password: "",
};

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState<LoginFormState>(initialLoginState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [patient, setPatient] = useState<LoginApiResponse["patient"] | null>(null);

  const updateField = (field: keyof LoginFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);
    setPatient(null);

    try {
      const response = await fetch(`${backendUrl}/patient/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as LoginApiResponse | { message?: string };

      if (!response.ok) {
        throw new Error(payload?.message ?? "Unable to sign in");
      }

      const typedPayload = payload as LoginApiResponse;
      localStorage.setItem("ehospitalbd-token", typedPayload.token);
      localStorage.setItem("ehospitalbd-patient", JSON.stringify(typedPayload.patient));
      setSuccessMessage(typedPayload.message ?? "Login successful");
      setPatient(typedPayload.patient);
      setForm(initialLoginState);
      router.push("/dashboard");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to sign in");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(219,234,254,0.95),_transparent_30%),linear-gradient(180deg,#f8fbff_0%,#eef4ff_100%)] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-6 overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-[0_30px_120px_rgba(37,99,235,0.12)] backdrop-blur-xl lg:grid-cols-[0.95fr_1.05fr]">
        <aside className="relative isolate overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,rgba(239,246,255,0.96),rgba(224,242,254,0.9))] px-6 py-8 sm:px-10 lg:px-12 lg:py-12">
          <div className="absolute -left-24 top-8 h-56 w-56 rounded-full bg-blue-300/30 blur-3xl" />
          <div className="absolute bottom-10 right-0 h-44 w-44 rounded-full bg-sky-300/30 blur-3xl" />

          <div className="relative flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-200">
              ✚
            </div>
            <div>
              <p className="text-xl font-black tracking-tight text-slate-950">E-HospitalBD</p>
              <p className="text-sm text-slate-500">Secure patient login</p>
            </div>
          </div>

          <div className="relative mt-14 max-w-md">
            <span className="inline-flex rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
              Access your patient dashboard
            </span>
            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
              Login to continue your care journey.
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-slate-600 sm:text-lg">
              Sign in with your phone number and password to retrieve your token from the backend and keep your patient session ready for the next step.
            </p>
          </div>

          <div className="relative mt-12 rounded-[1.75rem] border border-white/80 bg-white/75 p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">Backend-connected auth</p>
                <p className="mt-1 text-sm text-slate-500">Uses the /patient/login route</p>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-xl text-blue-700">
                ◉
              </div>
            </div>

            <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
              {[
                "Sends phone number and password",
                "Stores token in localStorage",
                "Keeps the patient profile in sync",
                "Ready for dashboard navigation",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </aside>

        <section className="px-6 py-8 sm:px-10 lg:px-12 lg:py-12">
          <div className="max-w-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Login to Account</h2>
                <p className="mt-2 text-slate-500">Enter your phone number and password to access your account.</p>
              </div>
              <Link href="/" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-700">
                Back home
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <Field label="Phone Number" htmlFor="phoneNo">
                <input
                  id="phoneNo"
                  type="tel"
                  value={form.phoneNo}
                  onChange={(event) => updateField("phoneNo", event.target.value)}
                  placeholder="+8801712345678"
                  className="input"
                  required
                />
              </Field>

              <Field label="Password" htmlFor="password">
                <input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={(event) => updateField("password", event.target.value)}
                  placeholder="Enter your password"
                  className="input"
                  required
                />
              </Field>

              <div className="flex items-center justify-between gap-4 text-sm">
                <label className="flex items-center gap-2 text-slate-600">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600" />
                  Remember me
                </label>
                <a href="/register" className="font-semibold text-blue-700 hover:text-blue-800">
                  Create account
                </a>
              </div>

              {error ? (
                <div className="rounded-[1.5rem] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {error}
                </div>
              ) : null}

              {successMessage ? (
                <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {successMessage}
                  {patient ? (
                    <div className="mt-2 text-emerald-700/90">
                      Signed in as {patient.name} • Token saved locally
                    </div>
                  ) : null}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:from-blue-700 hover:to-cyan-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Signing In..." : "Login"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Don&apos;t have an account? <a href="/register" className="font-semibold text-blue-700 hover:text-blue-800">Register here</a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block space-y-2 text-sm font-semibold text-slate-700">
      <span>{label}</span>
      {children}
    </label>
  );
}
