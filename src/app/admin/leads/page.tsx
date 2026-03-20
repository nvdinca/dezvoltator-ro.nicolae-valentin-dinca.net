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

export default async function AdminLeadsPage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }

  let leads: LeadRow[] | null = null;
  let errorMessage = "";

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("leads")
      .select("id, created_at, name, email, phone, source, status")
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) {
      errorMessage = "Nu am putut încărca lead-urile.";
    } else {
      leads = data;
    }
  } catch {
    errorMessage = "Configurarea Supabase lipsește.";
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">CRM Leads</h1>
        <div className="flex items-center gap-4">
          <AdminLogoutButton />
          <Link href="/" className="text-sm text-black/70 hover:text-black">
            Înapoi la site
          </Link>
        </div>
      </div>

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
