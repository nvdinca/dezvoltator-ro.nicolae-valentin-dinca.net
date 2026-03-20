import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { leadSchema } from "@/lib/validations/lead";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Date invalide.",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const supabase = getSupabaseAdmin();
    const payload = parsed.data;

    const { error } = await supabase.from("leads").insert({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      source: payload.source ?? "website",
      status: "new",
    });

    if (error) {
      return NextResponse.json(
        { success: false, message: "Nu am putut salva lead-ul." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, message: "Eroare internă de server." },
      { status: 500 },
    );
  }
}
