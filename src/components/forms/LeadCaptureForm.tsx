"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/analytics/track";

type LeadCaptureFormProps = {
  source: string;
  buttonLabel?: string;
  compact?: boolean;
};

type FormState = "idle" | "sending" | "success" | "error";

export function LeadCaptureForm({
  source,
  buttonLabel = "Trimite solicitarea",
  compact = false,
}: LeadCaptureFormProps) {
  const router = useRouter();
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState<string>("");
  const [started, setStarted] = useState(false);

  async function onSubmit(formData: FormData) {
    setState("sending");
    setMessage("");

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      source,
    };

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        setState("error");
        setMessage(data?.message ?? "Datele sunt invalide.");
        return;
      }

      setState("success");
      setMessage("Mulțumim! Te contactăm în cel mai scurt timp.");
      trackEvent("lead_submitted", { source });
      router.push("/multumim");
    } catch {
      setState("error");
      setMessage("A apărut o eroare. Încearcă din nou.");
    }
  }

  const inputClass =
    "w-full rounded-md border border-black/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-black/30";

  return (
    <form action={onSubmit} className={compact ? "space-y-3" : undefined}>
      <label className="mb-2 block text-sm font-medium text-black/80" htmlFor={`${source}-name`}>
        Nume complet
      </label>
      <input
        id={`${source}-name`}
        name="name"
        type="text"
        className={`${inputClass} mb-4`}
        placeholder="Ex: Popescu Andrei"
        onFocus={() => {
          if (!started) {
            setStarted(true);
            trackEvent("lead_form_start", { source });
          }
        }}
        required
      />

      <label className="mb-2 block text-sm font-medium text-black/80" htmlFor={`${source}-email`}>
        Email
      </label>
      <input
        id={`${source}-email`}
        name="email"
        type="email"
        className={`${inputClass} mb-4`}
        placeholder="Ex: andrei@email.com"
        required
      />

      <label className="mb-2 block text-sm font-medium text-black/80" htmlFor={`${source}-phone`}>
        Telefon
      </label>
      <input
        id={`${source}-phone`}
        name="phone"
        type="tel"
        className={`${inputClass} mb-5`}
        placeholder="Ex: 07xx xxx xxx"
        required
      />

      <button
        type="submit"
        className="w-full rounded-md bg-black px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-60"
        disabled={state === "sending"}
      >
        {state === "sending" ? "Se trimite..." : buttonLabel}
      </button>

      {message ? (
        <p
          className={`mt-3 text-sm ${state === "success" ? "text-emerald-700" : "text-rose-700"}`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
