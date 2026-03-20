import Link from "next/link";
import { redirect } from "next/navigation";
import {
  AdminLeadsTable,
  type LeadRow,
} from "@/components/admin/AdminLeadsTable";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{
  q?: string;
  status?: string;
  source?: string;
}>;

export default async function AdminLeadsPage(props: { searchParams: SearchParams }) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }
  const searchParams = await props.searchParams;
  const q = searchParams.q?.trim() ?? "";
  const status = searchParams.status?.trim() ?? "";
  const source = searchParams.source?.trim() ?? "";

  let leads: LeadRow[] | null = null;
  let errorMessage = "";
  const sourceOptions: string[] = [];

  try {
    const supabase = getSupabaseAdmin();
    let query = supabase
      .from("leads")
      .select("id, created_at, name, email, phone, source, status")
      .order("created_at", { ascending: false })
      .limit(200);

    if (status) {
      query = query.eq("status", status);
    }
    if (source) {
      query = query.eq("source", source);
    }
    if (q) {
      query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%,phone.ilike.%${q}%`);
    }

    const { data, error } = await query;
    const { data: sourcesData } = await supabase
      .from("leads")
      .select("source")
      .order("source", { ascending: true });

    for (const row of sourcesData ?? []) {
      if (row.source && !sourceOptions.includes(row.source)) {
        sourceOptions.push(row.source);
      }
    }

    if (error) {
      errorMessage = "Nu am putut încărca lead-urile.";
    } else {
      leads = data;
    }
  } catch (error) {
    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = "Configurarea Supabase lipsește.";
    }
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">CRM Leads</h1>
        <div className="flex items-center gap-4">
          <Link
            href="/admin/leads"
            className="rounded-md bg-black px-3 py-1.5 text-xs font-semibold text-white"
          >
            CRM Leads
          </Link>
          <Link
            href="/admin/apartamente"
            className="rounded-md border border-black/15 px-3 py-1.5 text-xs font-semibold text-black/75 hover:bg-zinc-50"
          >
            CMS Apartamente
          </Link>
          <AdminLogoutButton />
          <Link href="/" className="text-sm text-black/70 hover:text-black">
            Înapoi la site
          </Link>
        </div>
      </div>

      <form className="mt-5 grid gap-3 rounded-xl border border-black/10 bg-white p-4 md:grid-cols-4">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Caută nume / email / telefon"
          className="rounded-md border border-black/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-black/30 md:col-span-2"
        />
        <select
          name="status"
          defaultValue={status}
          className="rounded-md border border-black/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-black/30"
        >
          <option value="">Toate statusurile</option>
          <option value="new">new</option>
          <option value="contacted">contacted</option>
          <option value="closed">closed</option>
        </select>
        <select
          name="source"
          defaultValue={source}
          className="rounded-md border border-black/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-black/30"
        >
          <option value="">Toate sursele</option>
          {sourceOptions.map((sourceItem) => (
            <option key={sourceItem} value={sourceItem}>
              {sourceItem}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-3 md:col-span-4">
          <button
            type="submit"
            className="rounded-md bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            Filtrează
          </button>
          <Link
            href={`/api/admin/leads/export?q=${encodeURIComponent(q)}&status=${encodeURIComponent(status)}&source=${encodeURIComponent(source)}`}
            className="rounded-md border border-black/15 px-4 py-2.5 text-sm font-semibold text-black/80 transition hover:bg-zinc-50"
          >
            Export CSV
          </Link>
          <Link href="/admin/leads" className="text-sm text-black/65 hover:text-black">
            Resetează filtre
          </Link>
        </div>
      </form>

      {errorMessage ? (
        <p className="mt-5 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {errorMessage}
        </p>
      ) : null}

      <div className="mt-6">
        <AdminLeadsTable initialLeads={leads ?? []} />
      </div>
    </main>
  );
}
