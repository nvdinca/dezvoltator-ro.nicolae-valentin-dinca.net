import type { Apartment } from "@/lib/data/apartments";
import { apartments as fallbackApartments } from "@/lib/data/apartments";
import { getSupabaseAdmin } from "@/lib/supabase/server";

type ApartmentRow = {
  slug: string;
  title: string;
  rooms: number;
  floor: number;
  price_eur: number;
  area_useful: number;
  area_built: number;
  availability: Apartment["availability"];
  short_description: string;
  images: string[] | null;
  plan_2d: string;
  plan_3d: string;
};

function mapRowToApartment(row: ApartmentRow): Apartment {
  return {
    slug: row.slug,
    title: row.title,
    rooms: row.rooms,
    floor: row.floor,
    priceEur: row.price_eur,
    areaUseful: Number(row.area_useful),
    areaBuilt: Number(row.area_built),
    availability: row.availability,
    shortDescription: row.short_description,
    images: row.images ?? [],
    plan2d: row.plan_2d,
    plan3d: row.plan_3d,
  };
}

export async function getApartmentsFromDb(): Promise<Apartment[]> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("apartments")
      .select(
        "slug,title,rooms,floor,price_eur,area_useful,area_built,availability,short_description,images,plan_2d,plan_3d",
      )
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return fallbackApartments;
    }

    return (data as ApartmentRow[]).map(mapRowToApartment);
  } catch {
    return fallbackApartments;
  }
}

export async function getApartmentBySlugFromDb(slug: string): Promise<Apartment | undefined> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("apartments")
      .select(
        "slug,title,rooms,floor,price_eur,area_useful,area_built,availability,short_description,images,plan_2d,plan_3d",
      )
      .eq("slug", slug)
      .maybeSingle();

    if (error || !data) {
      return fallbackApartments.find((apartment) => apartment.slug === slug);
    }

    return mapRowToApartment(data as ApartmentRow);
  } catch {
    return fallbackApartments.find((apartment) => apartment.slug === slug);
  }
}
