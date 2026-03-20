import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, validateAdminKey } from "@/lib/admin-auth";
import { apartments } from "@/lib/data/apartments";
import { getSupabaseAdmin } from "@/lib/supabase/server";

async function isAuthorized(request: Request) {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (validateAdminKey(adminSession)) return true;

  const headerKey = request.headers.get("x-admin-key") ?? undefined;
  return validateAdminKey(headerKey);
}

export async function POST(request: Request) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json(
      { success: false, message: "Neautorizat." },
      { status: 401 },
    );
  }

  try {
    const supabase = getSupabaseAdmin();
    const payload = apartments.map((apartment) => ({
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
    }));

    const { error } = await supabase
      .from("apartments")
      .upsert(payload, { onConflict: "slug" });

    if (error) {
      return NextResponse.json(
        { success: false, message: "Nu am putut popula apartamentele demo." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Apartamentele demo au fost adăugate/actualizate.",
      count: payload.length,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Eroare internă de server." },
      { status: 500 },
    );
  }
}
