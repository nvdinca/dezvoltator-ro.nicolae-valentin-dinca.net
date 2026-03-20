import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, validateAdminKey } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";

function escapeCsv(value: string) {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replaceAll('"', '""')}"`;
  }
  return value;
}

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!validateAdminKey(adminSession)) {
    return NextResponse.json(
      { success: false, message: "Neautorizat." },
      { status: 401 },
    );
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() ?? "";
  const status = searchParams.get("status")?.trim() ?? "";
  const source = searchParams.get("source")?.trim() ?? "";

  try {
    const supabase = getSupabaseAdmin();
    let query = supabase
      .from("leads")
      .select("created_at,name,email,phone,source,status")
      .order("created_at", { ascending: false })
      .limit(1000);

    if (status) query = query.eq("status", status);
    if (source) query = query.eq("source", source);
    if (q) {
      query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%,phone.ilike.%${q}%`);
    }

    const { data, error } = await query;
    if (error) {
      return NextResponse.json(
        { success: false, message: "Nu am putut exporta lead-urile." },
        { status: 500 },
      );
    }

    const header = ["created_at", "name", "email", "phone", "source", "status"];
    const rows = (data ?? []).map((lead) =>
      [
        lead.created_at,
        lead.name,
        lead.email,
        lead.phone,
        lead.source,
        lead.status,
      ]
        .map((value) => escapeCsv(String(value ?? "")))
        .join(","),
    );
    const csv = [header.join(","), ...rows].join("\n");

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="leads-export.csv"',
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Eroare internă de server." },
      { status: 500 },
    );
  }
}
