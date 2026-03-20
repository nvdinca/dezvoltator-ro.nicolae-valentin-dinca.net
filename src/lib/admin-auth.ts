import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "admin_leads_session";

function getAdminKey() {
  return process.env.ADMIN_LEADS_KEY;
}

export async function isAdminAuthenticated() {
  const adminKey = getAdminKey();
  if (!adminKey) return false;

  const cookieStore = await cookies();
  const sessionValue = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return sessionValue === adminKey;
}

export function getAdminCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 8,
  };
}

export function validateAdminKey(input?: string) {
  const adminKey = getAdminKey();
  return Boolean(adminKey && input && input === adminKey);
}
