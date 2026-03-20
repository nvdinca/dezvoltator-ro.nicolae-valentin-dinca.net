import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, validateAdminKey } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { apartmentSchema } from "@/lib/validations/apartment";

async function isAuthorized() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return validateAdminKey(adminSession);
}

export async function GET() {
  if (!(await isAuthorized())) {
    return NextResponse.json(
      { success: false, message: "Neautorizat." },
      { status: 401 },
    );
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("apartments")
      .select(
        "id, created_at, slug, title, rooms, floor, price_eur, area_useful, area_built, availability, short_description, images, plan_2d, plan_3d",
      )
      .order("created_at", { ascending: false })
      .limit(500);

    if (error) {
      return NextResponse.json(
        { success: false, message: "Nu am putut încărca apartamentele." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, items: data ?? [] });
  } catch {
    return NextResponse.json(
      { success: false, message: "Eroare internă de server." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json(
      { success: false, message: "Neautorizat." },
      { status: 401 },
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
    const { error } = await supabase.from("apartments").insert({
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
    });

    if (error) {
      return NextResponse.json(
        { success: false, message: "Nu am putut crea apartamentul." },
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
