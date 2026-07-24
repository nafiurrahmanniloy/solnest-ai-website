import type { Metadata } from "next";
import InviteBooking from "./InviteBooking";
import InviteGenerator from "./InviteGenerator";
import InviteExpired from "./InviteExpired";
import { verifyInvite } from "@/lib/inviteToken";

export const metadata: Metadata = {
  title: "Build Session with Ryan | Solnest AI",
  description: "A complimentary one on one session with Ryan.",
  robots: { index: false, follow: false },
};

// Read the token from the query at request time; never statically cache.
export const dynamic = "force-dynamic";

/**
 * Single private endpoint for the complimentary Build Session, three states:
 *
 *  - /invite?t=<valid token>  -> the free calendar (guest books; auto-confirm,
 *    so Ryan never touches GHL). Tokens are signed + self-expiring, minted per
 *    guest, so there is no shared key and nothing works forever.
 *  - /invite?t=<bad/expired>  -> a short "invite expired" notice (no calendar).
 *  - /invite  (no token)      -> the passphrase-gated generator for Dee/Ryan.
 *    A random visitor just hits the passphrase field and gets no further.
 *
 * All checks run server-side and fail closed; the signing secret and passphrase
 * live only in env vars, never in the browser or this public repo.
 */
export default function InvitePage({
  searchParams,
}: {
  searchParams: { t?: string };
}) {
  const token = searchParams?.t;
  const bookingUrl = process.env.INVITE_EMBED_URL;

  if (token) {
    const check = verifyInvite(token);
    if (check.ok && bookingUrl) return <InviteBooking bookingUrl={bookingUrl} />;
    return <InviteExpired reason={check.reason} />;
  }

  return <InviteGenerator />;
}
