import { z } from "zod";

const roPhoneRegex = /^(?:\+4|004)?07\d{8}$/;

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Numele trebuie să aibă minimum 3 caractere.")
    .max(80, "Numele este prea lung."),
  email: z
    .string()
    .trim()
    .email("Email invalid.")
    .max(120, "Email prea lung."),
  phone: z
    .string()
    .trim()
    .regex(roPhoneRegex, "Număr de telefon invalid (format RO)."),
  source: z.string().trim().min(2).max(80).optional(),
});

export const leadStatusSchema = z.enum(["new", "contacted", "closed"]);

export type LeadInput = z.infer<typeof leadSchema>;
export type LeadStatus = z.infer<typeof leadStatusSchema>;
