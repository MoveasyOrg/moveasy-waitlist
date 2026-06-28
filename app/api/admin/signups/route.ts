import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, verifySession } from "@/lib/admin-auth";
import { loadAdminSnapshot } from "@/lib/admin-db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // Defence in depth — middleware already gates /admin/* in the browser,
  // but the API route is called directly so we re-check the cookie here.
  const ok = await verifySession(req.cookies.get(ADMIN_COOKIE)?.value);
  if (!ok) {
    return NextResponse.json({ ok: false, error: "Unauthorised." }, { status: 401 });
  }

  try {
    const snapshot = await loadAdminSnapshot();
    if (!snapshot) {
      return NextResponse.json(
        { ok: false, error: "SUPABASE_DB_URL is not set." },
        { status: 503 },
      );
    }
    return NextResponse.json({ ok: true, snapshot });
  } catch (err) {
    console.error("[admin/signups] load error", err);
    return NextResponse.json(
      { ok: false, error: "Failed to load waitlist data." },
      { status: 500 },
    );
  }
}
