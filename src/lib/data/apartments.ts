export type ApartmentStatus = "disponibil" | "rezervat" | "vandut";

export type Apartment = {
  slug: string;
  title: string;
  rooms: number;
  floor: number;
  priceEur: number;
  areaUseful: number;
  areaBuilt: number;
  availability: ApartmentStatus;
  shortDescription: string;
  images: string[];
  plan2d: string;
  plan3d: string;
};

export const apartments: Apartment[] = [
  {
    slug: "apartament-a12",
    title: "Apartament A12",
    rooms: 2,
    floor: 3,
    priceEur: 128000,
    areaUseful: 58,
    areaBuilt: 72,
    availability: "disponibil",
    shortDescription:
      "Compartimentare eficienta, living luminos si terasa spatioasa orientata spre sud.",
    images: [
      "/images/hero/hero-01.webp",
      "/images/hero/hero-03.webp",
      "/images/plans/plan-2-camere.webp",
    ],
    plan2d: "/images/plans/plan-2-camere.webp",
    plan3d: "/images/hero/hero-03.webp",
  },
  {
    slug: "apartament-b07",
    title: "Apartament B07",
    rooms: 3,
    floor: 2,
    priceEur: 169000,
    areaUseful: 79,
    areaBuilt: 96,
    availability: "rezervat",
    shortDescription:
      "Zona de zi ampla, doua bai si finisaje premium pentru confort zilnic.",
    images: [
      "/images/hero/hero-02.webp",
      "/images/hero/hero-04.webp",
      "/images/plans/plan-3-camere.webp",
    ],
    plan2d: "/images/plans/plan-3-camere.webp",
    plan3d: "/images/hero/hero-04.webp",
  },
  {
    slug: "apartament-c15",
    title: "Apartament C15",
    rooms: 3,
    floor: 5,
    priceEur: 182000,
    areaUseful: 84,
    areaBuilt: 101,
    availability: "disponibil",
    shortDescription:
      "Pozitionare la etaj superior, priveliste deschisa si zona de dining separata.",
    images: [
      "/images/hero/hero-03.webp",
      "/images/hero/hero-01.webp",
      "/images/plans/plan-3-camere.webp",
    ],
    plan2d: "/images/plans/plan-3-camere.webp",
    plan3d: "/images/hero/hero-01.webp",
  },
];

export function getApartmentBySlug(slug: string) {
  return apartments.find((apartment) => apartment.slug === slug);
}
