import Nav from "@/components/solnest/Nav";
import Footer from "@/components/solnest/Footer";
import type { InviteReason } from "@/lib/inviteToken";

/**
 * Shown when /invite is opened WITH a token that is invalid or expired. Minimal
 * guest-facing notice (no button, no calendar) so an old link doesn't leak the
 * free booking or confuse the guest with the admin passphrase screen.
 */
export default function InviteExpired({ reason }: { reason?: InviteReason }) {
  const expired = reason === "expired";
  return (
    <main
      style={{
        background: "#0D0D0B",
        minHeight: "100vh",
        color: "#F0EBE1",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Nav />
      <section
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "160px 24px 96px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "700px",
            height: "500px",
            maxWidth: "100%",
            background: "radial-gradient(ellipse, rgba(192,82,43,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "520px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "14px",
              marginBottom: "16px",
            }}
          >
            <div aria-hidden="true" style={{ width: "34px", height: "1px", background: "#C0522B" }} />
            <span
              style={{
                fontFamily: "var(--font-condensed)",
                fontWeight: 600,
                fontSize: "13px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#C0522B",
              }}
            >
              Invite Link
            </span>
            <div aria-hidden="true" style={{ width: "34px", height: "1px", background: "#C0522B" }} />
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(32px, 4.5vw, 52px)",
              lineHeight: 1.12,
              color: "#F0EBE1",
              marginBottom: "18px",
            }}
          >
            This invite{" "}
            <span style={{ fontStyle: "italic", color: "#C0522B" }}>
              {expired ? "has expired." : "isn't valid."}
            </span>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "16px",
              lineHeight: 1.7,
              color: "rgba(212,204,184,0.6)",
              maxWidth: "440px",
              margin: "0 auto",
            }}
          >
            Ask Ryan for a fresh invite link. If you think this is a mistake, email{" "}
            <a
              href="mailto:hello@solnestai.com?subject=Invite%20Link"
              style={{ color: "#C0522B", textDecoration: "underline", textUnderlineOffset: "2px" }}
            >
              hello@solnestai.com
            </a>
            .
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
