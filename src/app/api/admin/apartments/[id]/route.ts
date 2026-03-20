import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, validateAdminKey } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { apartmentSchema } from "@/lib/validations/apartment";

type RouteContext = {
  params: Promise<{ id: string }>;
};

async function isAuthorized() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return validateAdminKey(adminSession);
}

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await isAuthorized())) {
    return NextResponse.json(
      { success: false, message: "Neautorizat." },
      { status: 401 },
    );
  }

  const { id } = await context.params;
  if (!id) {
    return NextResponse.json(
      { success: false, message: "ID invalid." },
      { status: 400 },
    );
  }

  try {
    const body = await request.json();
    const parsed = apartmentSchema.safeParse({
      ...body,
      images: Array.isArray(body?.images)
        ? body.images
        : String(body?.images ?? "")
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean),
    });

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Date invalide pentru apartament." },
        { status: 400 },
      );
    }

    const apartment = parsed.data;
    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from("apartments")
      .update({
        slug: apartment.slug,
        title: apartment.title,
        rooms: apartment.rooms,
        floor: apartment.floor,
        price_eur: apartment.priceEur,
        area_useful: apartment.areaUseful,
        area_built: apartment.areaBuilt,
        availability: apartment.availability,
        short_description: apartment.shortDescription,
        images: apartment.images,
        plan_2d: apartment.plan2d,
        plan_3d: apartment.plan3d,
      })
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { success: false, message: "Nu am putut actualiza apartamentul." },
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

export async function DELETE(_: Request, context: RouteContext) {
  if (!(await isAuthorized())) {
    return NextResponse.json(
      { success: false, message: "Neautorizat." },
      { status: 401 },
    );
  }

  const { id } = await context.params;
  if (!id) {
    return NextResponse.json(
      { success: false, message: "ID invalid." },
      { status: 400 },
    );
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("apartments").delete().eq("id", id);

    if (error) {
      return NextResponse.json(
        { success: false, message: "Nu am putut șterge apartamentul." },
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
