import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, validateAdminKey } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { leadStatusSchema } from "@/lib/validations/lead";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!validateAdminKey(adminSession)) {
    return NextResponse.json(
      { success: false, message: "Neautorizat." },
      { status: 401 },
    );
  }

  const { id } = await context.params;
  if (!id) {
    return NextResponse.json(
      { success: false, message: "Lead invalid." },
      { status: 400 },
    );
  }

  try {
    const body = (await request.json()) as { status?: string };
    const parsedStatus = leadStatusSchema.safeParse(body.status);

    if (!parsedStatus.success) {
      return NextResponse.json(
        { success: false, message: "Status invalid." },
        { status: 400 },
      );
    }

    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from("leads")
      .update({ status: parsedStatus.data })
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { success: false, message: "Nu am putut actualiza statusul." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, message: "Eroare internă de server." },
      { status: 500 },
    );
  }
}
