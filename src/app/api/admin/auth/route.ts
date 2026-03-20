import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  getAdminCookieOptions,
  validateAdminKey,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { key?: string };
    if (!validateAdminKey(body.key)) {
      return NextResponse.json(
        { success: false, message: "Cheie admin invalidă." },
        { status: 401 },
      );
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set(ADMIN_COOKIE_NAME, body.key!, getAdminCookieOptions());
    return response;
  } catch {
    return NextResponse.json(
      { success: false, message: "Cerere invalidă." },
      { status: 400 },
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(ADMIN_COOKIE_NAME);
  return response;
}
