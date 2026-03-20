import { z } from "zod";

export const apartmentSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(3, "Slug-ul trebuie să aibă minimum 3 caractere.")
    .max(80),
  title: z.string().trim().min(3).max(120),
  rooms: z.coerce.number().int().min(1).max(10),
  floor: z.coerce.number().int().min(0).max(200),
  priceEur: z.coerce.number().int().min(0),
  areaUseful: z.coerce.number().positive(),
  areaBuilt: z.coerce.number().positive(),
  availability: z.enum(["disponibil", "rezervat", "vandut"]),
  shortDescription: z.string().trim().min(8).max(300),
  images: z.array(z.string().trim().min(1)).min(1),
  plan2d: z.string().trim().min(1),
  plan3d: z.string().trim().min(1),
});

export type ApartmentInput = z.infer<typeof apartmentSchema>;
