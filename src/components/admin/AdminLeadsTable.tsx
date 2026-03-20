"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { LeadStatus } from "@/lib/validations/lead";

export type LeadRow = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: LeadStatus;
};

const statusOptions: LeadStatus[] = ["new", "contacted", "closed"];

export function AdminLeadsTable({ initialLeads }: { initialLeads: LeadRow[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  async function updateStatus(id: string, status: LeadStatus) {
    setLoadingId(id);
    setErrorMessage("");

    try {
      const response = await fetch(`/api/admin/leads/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      if (!response.ok) {
        setErrorMessage(data?.message ?? "Nu am putut actualiza statusul.");
        setLoadingId(null);
        return;
      }
      router.refresh();
    } catch {
      setErrorMessage("A apărut o eroare de rețea.");
      setLoadingId(null);
    }
  }

  return (
    <>
      {errorMessage ? (
        <p className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {errorMessage}
        </p>
      ) : null}

      <div className="overflow-x-auto rounded-xl border border-black/10 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-black/10 bg-zinc-50">
            <tr>
              <th className="px-4 py-3 font-semibold">Data</th>
              <th className="px-4 py-3 font-semibold">Nume</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Telefon</th>
              <th className="px-4 py-3 font-semibold">Sursă</th>
              <th className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {initialLeads.map((lead) => (
              <tr key={lead.id} className="border-b border-black/5 align-top">
                <td className="px-4 py-3 text-black/65">
                  {new Date(lead.created_at).toLocaleString("ro-RO")}
                </td>
                <td className="px-4 py-3 font-medium">{lead.name}</td>
                <td className="px-4 py-3">{lead.email}</td>
                <td className="px-4 py-3">{lead.phone}</td>
                <td className="px-4 py-3">{lead.source}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    {statusOptions.map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => updateStatus(lead.id, status)}
                        disabled={loadingId === lead.id}
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase transition ${
                          lead.status === status
                            ? "bg-black text-white"
                            : "bg-zinc-100 text-black/70 hover:bg-zinc-200"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
            {initialLeads.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-black/60" colSpan={6}>
                  Nu există lead-uri încă.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </>
  );
}
