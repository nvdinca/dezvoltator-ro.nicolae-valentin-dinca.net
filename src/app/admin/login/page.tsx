"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [key, setKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });
      const data = await response.json();
      if (!response.ok) {
        setErrorMessage(data?.message ?? "Autentificare eșuată.");
        setLoading(false);
        return;
      }
      router.push("/admin/leads");
      router.refresh();
    } catch {
      setErrorMessage("Eroare de rețea.");
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Admin Login</h1>
      <p className="mt-2 text-sm text-black/65">
        Introdu cheia de administrare pentru CRM.
      </p>

      <form onSubmit={onSubmit} className="mt-6 rounded-xl border border-black/10 bg-white p-6">
        <label className="mb-2 block text-sm font-medium text-black/80" htmlFor="admin-key">
          Cheie admin
        </label>
        <input
          id="admin-key"
          type="password"
          value={key}
          onChange={(event) => setKey(event.target.value)}
          className="w-full rounded-md border border-black/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-black/30"
          placeholder="Introdu cheia"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full rounded-md bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-60"
        >
          {loading ? "Se verifică..." : "Autentificare"}
        </button>
        {errorMessage ? (
          <p className="mt-3 text-sm text-rose-700">{errorMessage}</p>
        ) : null}
      </form>
    </main>
  );
}
