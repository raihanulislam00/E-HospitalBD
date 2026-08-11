"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ;

type FormState = {
  name: string;
  email: string;
  phoneNo: string;
  district: string;
  division: string;
  dateOfBirth: string;
  password: string;
};

type ApiResponse = {
  message: string;
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

const initialFormState: FormState = {
  name: "",
  email: "",
  phoneNo: "",
  district: "",
  division: "",
  dateOfBirth: "",
  password: "",
};

export default function RegisterPage() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [createdPatient, setCreatedPatient] = useState<ApiResponse["patient"] | null>(null);

  const fullNameHint = useMemo(() => {
    const parts = [form.name, form.district].filter(Boolean);
    return parts.length ? parts.join(" • ") : "Patient registration";
  }, [form.name, form.district]);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);
    setCreatedPatient(null);

    try {
      const response = await fetch(`${backendUrl}/patient/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phoneNo: form.phoneNo,
          location: {
            district: form.district,
            division: form.division,
          },
          dateOfBirth: form.dateOfBirth,
          password: form.password,
        }),
      });

      const payload = (await response.json()) as ApiResponse | { message?: string };

      if (!response.ok) {
        throw new Error(payload?.message ?? "Unable to create account");
      }

      const typedPayload = payload as ApiResponse;
      setSuccessMessage(typedPayload.message);
      setCreatedPatient(typedPayload.patient);
      setForm(initialFormState);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to create account");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(219,234,254,0.9),_transparent_32%),linear-gradient(180deg,#f8fbff_0%,#edf4ff_100%)] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-6 overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 shadow-[0_30px_120px_rgba(37,99,235,0.12)] backdrop-blur-xl lg:grid-cols-[0.95fr_1.05fr]">
        <aside className="relative isolate overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,rgba(239,246,255,0.95),rgba(224,242,254,0.92))] px-6 py-8 sm:px-10 lg:px-12 lg:py-12">
          <div className="absolute -left-24 top-8 h-56 w-56 rounded-full bg-blue-300/30 blur-3xl" />
          <div className="absolute bottom-10 right-0 h-44 w-44 rounded-full bg-sky-300/30 blur-3xl" />

          <div className="relative flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-200">
              ✚
            </div>
            <div>
              <p className="text-xl font-black tracking-tight text-slate-950">E-HospitalBD</p>
              <p className="text-sm text-slate-500">Smart patient onboarding</p>
            </div>
          </div>

          <div className="relative mt-14 max-w-md">
            <span className="inline-flex rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
              Create your patient account
            </span>
            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
              Register for faster care and a cleaner hospital flow.
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-slate-600 sm:text-lg">
              Use the same registration payload as the backend API. The form creates a patient record, hashes the password server-side, and returns a safe response without exposing credentials.
            </p>
          </div>

          <div className="relative mt-12 rounded-[1.75rem] border border-white/80 bg-white/75 p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">Secure patient onboarding</p>
                <p className="mt-1 text-sm text-slate-500">Protected by backend validation</p>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-xl text-blue-700">
                ◉
              </div>
            </div>

            <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
              {[
                "Validates email, phone, and birth date",
                "Stores only hashed passwords",
                "Returns a sanitized patient object",
                "Built for localhost backend integration",
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
                <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Create Account</h2>
                <p className="mt-2 text-slate-500">Fill in the details below to register a patient profile.</p>
              </div>
              <Link href="/" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-700">
                Back home
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name" htmlFor="name">
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    placeholder="Enter your full name"
                    className="input"
                    required
                  />
                </Field>

                <Field label="Email Address" htmlFor="email">
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    placeholder="Enter your email address"
                    className="input"
                    required
                  />
                </Field>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
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

                <Field label="Date of Birth" htmlFor="dateOfBirth">
                  <input
                    id="dateOfBirth"
                    type="date"
                    value={form.dateOfBirth}
                    onChange={(event) => updateField("dateOfBirth", event.target.value)}
                    className="input"
                    required
                  />
                </Field>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="District" htmlFor="district">
                  <input
                    id="district"
                    type="text"
                    value={form.district}
                    onChange={(event) => updateField("district", event.target.value)}
                    placeholder="Dhaka"
                    className="input"
                    required
                  />
                </Field>

                <Field label="Division" htmlFor="division">
                  <input
                    id="division"
                    type="text"
                    value={form.division}
                    onChange={(event) => updateField("division", event.target.value)}
                    placeholder="Dhaka"
                    className="input"
                    required
                  />
                </Field>
              </div>

              <Field label="Password" htmlFor="password">
                <input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={(event) => updateField("password", event.target.value)}
                  placeholder="Create a password"
                  className="input"
                  required
                />
              </Field>

              <div className="rounded-[1.5rem] border border-blue-100 bg-blue-50/80 px-4 py-3 text-sm text-blue-800">
                Backend preview: {fullNameHint}
              </div>

              {error ? (
                <div className="rounded-[1.5rem] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {error}
                </div>
              ) : null}

              {successMessage ? (
                <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {successMessage}
                  {createdPatient ? (
                    <div className="mt-2 text-emerald-700/90">
                      Patient ID: {createdPatient.id} • Created at {createdPatient.createdAt}
                    </div>
                  ) : null}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:from-blue-700 hover:to-cyan-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account? <Link href="/login" className="font-semibold text-blue-700 hover:text-blue-800">Go to login</Link>
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
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block space-y-2 text-sm font-semibold text-slate-700">
      <span>{label}</span>
      {children}
    </label>
  );
}
