import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminApartmentsManager } from "@/components/admin/AdminApartmentsManager";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export default async function AdminApartmentsPage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">CMS Apartamente</h1>
        <div className="flex items-center gap-4">
          <Link
            href="/admin/leads"
            className="rounded-md border border-black/15 px-3 py-1.5 text-xs font-semibold text-black/75 hover:bg-zinc-50"
          >
            CRM Leads
          </Link>
          <Link
            href="/admin/apartamente"
            className="rounded-md bg-black px-3 py-1.5 text-xs font-semibold text-white"
          >
            CMS Apartamente
          </Link>
          <AdminLogoutButton />
          <Link href="/" className="text-sm text-black/70 hover:text-black">
            Înapoi la site
          </Link>
        </div>
      </div>

      <AdminApartmentsManager />
    </main>
  );
}
