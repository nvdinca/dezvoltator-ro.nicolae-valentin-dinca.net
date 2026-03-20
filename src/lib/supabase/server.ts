import { createClient } from "@supabase/supabase-js";

type EnvName =
  | "SUPABASE_URL"
  | "NEXT_PUBLIC_SUPABASE_URL"
  | "SUPABASE_SERVICE_ROLE_KEY"
  | "SUPABASE_SECRET_KEY";

export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;

  const missing: EnvName[] = [];
  if (!url) missing.push("SUPABASE_URL");
  if (!serviceRole) missing.push("SUPABASE_SERVICE_ROLE_KEY");

  if (missing.length > 0) {
    throw new Error(
      `Lipsesc variabile de mediu Supabase: ${missing.join(", ")}.`,
    );
  }

  const supabaseUrl = url as string;
  const supabaseKey = serviceRole as string;

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
