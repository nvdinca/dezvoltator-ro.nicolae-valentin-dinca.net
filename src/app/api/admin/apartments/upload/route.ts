import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, validateAdminKey } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 8 * 1024 * 1024;
const BUCKET_NAME = process.env.SUPABASE_APARTMENTS_BUCKET ?? "apartments";

async function isAuthorized() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return validateAdminKey(adminSession);
}

function getStoragePathFromPublicUrl(url: string) {
  const marker = `/storage/v1/object/public/${BUCKET_NAME}/`;
  const index = url.indexOf(marker);
  if (index < 0) return null;
  return url.slice(index + marker.length);
}

export async function POST(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json(
      { success: false, message: "Neautorizat." },
      { status: 401 },
    );
  }

  try {
    const formData = await request.formData();
    const files = formData.getAll("images").filter((value) => value instanceof File) as File[];

    if (files.length === 0) {
      return NextResponse.json(
        { success: false, message: "Nu ai selectat imagini pentru upload." },
        { status: 400 },
      );
    }

    const supabase = getSupabaseAdmin();
    const uploadedUrls: string[] = [];

    for (const file of files) {
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        return NextResponse.json(
          { success: false, message: `Tip fișier neacceptat: ${file.type}` },
          { status: 400 },
        );
      }
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { success: false, message: `Fișier prea mare: ${file.name}` },
          { status: 400 },
        );
      }

      const extension = file.name.split(".").pop()?.toLowerCase() || "webp";
      const path = `apartments/${new Date().getFullYear()}/${randomUUID()}.${extension}`;
      const arrayBuffer = await file.arrayBuffer();

      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(path, arrayBuffer, {
          contentType: file.type,
          upsert: false,
        });

      if (error) {
        return NextResponse.json(
          { success: false, message: "Nu am putut încărca imaginile." },
          { status: 500 },
        );
      }

      const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);
      uploadedUrls.push(data.publicUrl);
    }

    return NextResponse.json({ success: true, urls: uploadedUrls });
  } catch {
    return NextResponse.json(
      { success: false, message: "Eroare internă de server." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json(
      { success: false, message: "Neautorizat." },
      { status: 401 },
    );
  }

  try {
    const body = (await request.json()) as { url?: string };
    const url = body.url?.trim();
    if (!url) {
      return NextResponse.json(
        { success: false, message: "URL invalid." },
        { status: 400 },
      );
    }

    const storagePath = getStoragePathFromPublicUrl(url);
    if (!storagePath) {
      return NextResponse.json(
        { success: false, message: "URL-ul nu aparține bucket-ului configurat." },
        { status: 400 },
      );
    }

    const supabase = getSupabaseAdmin();
    const { error } = await supabase.storage.from(BUCKET_NAME).remove([storagePath]);
    if (error) {
      return NextResponse.json(
        { success: false, message: "Nu am putut șterge imaginea din storage." },
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
