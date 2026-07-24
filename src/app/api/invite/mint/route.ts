import { NextResponse } from "next/server";
import { signInvite } from "@/lib/inviteToken";

/**
 * Mints a signed, expiring invite token. Called by the passphrase generator on /invite.
 * Requires the admin passphrase (INVITE_ADMIN_KEY) in the request body, checked
 * server-side, so the passphrase never ships to the browser. Returns only the
 * token; the caller builds the full link against its own origin.
 */
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const adminKey = process.env.INVITE_ADMIN_KEY;
  const signingSecret = process.env.INVITE_SIGNING_SECRET;

  if (!adminKey || !signingSecret) {
    return NextResponse.json(
      { error: "Invite links are not configured yet." },
      { status: 503 },
    );
  }

  let payload: { passphrase?: string; days?: number };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!payload.passphrase || payload.passphrase !== adminKey) {
    return NextResponse.json({ error: "Wrong passphrase." }, { status: 401 });
  }

  const days = Math.max(1, Math.min(60, Math.floor(Number(payload.days) || 7)));
  const token = signInvite(days);

  return NextResponse.json({ token, days });
}
