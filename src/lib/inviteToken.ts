import crypto from "crypto";

/**
 * Signed, self-expiring invite tokens for the private /invite booking page.
 *
 * A token is `base64url(payload).base64url(HMAC-SHA256(payload))`, where the
 * payload carries an expiry. Verification is stateless (no database): the
 * signature proves we issued it and the expiry kills it after a few days, so
 * there is no permanent, reusable "free link". Server-only - the secret never
 * reaches the browser.
 */

const SECRET = process.env.INVITE_SIGNING_SECRET || "";

export type InviteReason =
  | "missing"
  | "malformed"
  | "badsig"
  | "expired"
  | "nosecret";

export type InviteCheck = { ok: boolean; reason?: InviteReason };

/** Mint a signed invite token that expires after `days` (clamped 1..60). */
export function signInvite(days: number): string {
  const ttlDays = Math.max(1, Math.min(60, Math.floor(days || 7)));
  const payload = JSON.stringify({
    exp: Date.now() + ttlDays * 24 * 60 * 60 * 1000,
    n: crypto.randomBytes(6).toString("hex"),
  });
  const body = Buffer.from(payload).toString("base64url");
  const sig = crypto.createHmac("sha256", SECRET).update(body).digest("base64url");
  return `${body}.${sig}`;
}

/** Verify an invite token's signature and expiry. */
export function verifyInvite(token: string | undefined | null): InviteCheck {
  if (!SECRET) return { ok: false, reason: "nosecret" };
  if (!token) return { ok: false, reason: "missing" };

  const parts = token.split(".");
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    return { ok: false, reason: "malformed" };
  }
  const [body, sig] = parts;

  const expected = crypto.createHmac("sha256", SECRET).update(body).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return { ok: false, reason: "badsig" };
  }

  let payload: { exp?: number };
  try {
    payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  } catch {
    return { ok: false, reason: "malformed" };
  }
  if (!payload.exp || Date.now() > payload.exp) {
    return { ok: false, reason: "expired" };
  }
  return { ok: true };
}
