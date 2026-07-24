"use client";

import { motion } from "framer-motion";
import Script from "next/script";
import Nav from "@/components/solnest/Nav";
import Footer from "@/components/solnest/Footer";

const EASE: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

/**
 * Invite / complimentary Build Session scheduler (client UI).
 *
 * Rendered by the gated server page only when the correct ?key is supplied.
 * Embeds the GoHighLevel complimentary calendar widget - identical to the paid
 * /book calendar (same Ryan, same availability, unique Zoom link, auto-confirm)
 * but with NO payment. The widget URL is passed in from the server (env var), so
 * it is never hardcoded in this public repo. A booking here shares Ryan's
 * availability with the paid calendar, so there is no double-booking.
 */
export default function InviteBooking({ bookingUrl }: { bookingUrl: string }) {
  return (
    <main style={{ background: "#0D0D0B", minHeight: "100vh", color: "#F0EBE1" }}>
      <Nav />

      {/* Hero */}
      <section
        style={{
          paddingTop: "160px",
          paddingBottom: "32px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "800px",
            height: "600px",
            maxWidth: "100%",
            background: "radial-gradient(ellipse, rgba(192,82,43,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ position: "relative", zIndex: 1 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "14px",
              marginBottom: "16px",
            }}
          >
            <div aria-hidden="true" style={{ width: "34px", height: "1px", background: "#C0522B", flexShrink: 0 }} />
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
              By Invitation
            </span>
            <div aria-hidden="true" style={{ width: "34px", height: "1px", background: "#C0522B", flexShrink: 0 }} />
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(36px, 5vw, 64px)",
              lineHeight: 1.1,
              color: "#F0EBE1",
              maxWidth: "700px",
              margin: "0 auto 20px",
              padding: "0 24px",
            }}
          >
            Pick your time.{" "}
            <span style={{ fontStyle: "italic", color: "#C0522B" }}>This one is on us.</span>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "16px",
              lineHeight: 1.7,
              color: "rgba(212,204,184,0.6)",
              maxWidth: "520px",
              margin: "0 auto",
              padding: "0 24px",
            }}
          >
            60 minutes, one on one with Ryan - our treat. Choose a time that works,
            and we will send your Zoom details. No payment needed.
          </p>
        </motion.div>
      </section>

      {/* Booking widget — centered, framed */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
        style={{ padding: "8px 20px 72px" }}
      >
        <div style={{ maxWidth: "920px", margin: "0 auto" }}>
          <div
            style={{
              position: "relative",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid rgba(192,82,43,0.18)",
              background: "#0F0F0D",
              boxShadow: "0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(192,82,43,0.05)",
            }}
          >
            {/* top accent line */}
            <div
              aria-hidden="true"
              style={{
                height: "2px",
                background: "linear-gradient(to right, transparent, rgba(192,82,43,0.6), rgba(201,168,76,0.4), transparent)",
              }}
            />

            {bookingUrl ? (
              <>
                <iframe
                  src={bookingUrl}
                  title="Book your complimentary session with Ryan"
                  loading="lazy"
                  scrolling="no"
                  id="ghl-invite-widget"
                  style={{
                    width: "100%",
                    // Generous initial height + scrolling:no so the calendar never
                    // shows an inner scrollbar. GHL's form_embed.js then resizes the
                    // iframe to the widget's exact content height, so the box grows
                    // to fit and never scrolls internally.
                    height: "1100px",
                    border: "none",
                    display: "block",
                    background: "#fff",
                    overflow: "hidden",
                  }}
                />
                <Script
                  src="https://link.msgsndr.com/js/form_embed.js"
                  strategy="afterInteractive"
                />
              </>
            ) : (
              // Graceful state until the GHL calendar URL is provided.
              <div
                style={{
                  minHeight: "420px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: "56px 28px",
                  gap: "18px",
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    border: "1px solid rgba(192,82,43,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#C0522B",
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 300,
                    fontSize: "16px",
                    lineHeight: 1.7,
                    color: "rgba(212,204,184,0.7)",
                    maxWidth: "440px",
                  }}
                >
                  The booking calendar is being connected. Email{" "}
                  <a
                    href="mailto:hello@solnestai.com?subject=Complimentary%20Session"
                    style={{ color: "#C0522B", textDecoration: "underline", textUnderlineOffset: "2px" }}
                  >
                    hello@solnestai.com
                  </a>{" "}
                  and we will get you booked right away.
                </p>
              </div>
            )}
          </div>

          {/* Trust stats */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "48px",
              marginTop: "40px",
              flexWrap: "wrap",
            }}
          >
            {[
              { num: "60", label: "Minute Session" },
              { num: "1:1", label: "With Ryan" },
              { num: "Free", label: "Our Treat" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(0.24 + i * 0.08, 0.4), duration: 0.7, ease: EASE }}
                style={{ textAlign: "center" }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 300,
                    fontSize: "28px",
                    color: "#C0522B",
                    lineHeight: 1,
                  }}
                >
                  {item.num}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-condensed)",
                    fontWeight: 500,
                    fontSize: "10px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(212,204,184,0.4)",
                    marginTop: "6px",
                  }}
                >
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <Footer />
    </main>
  );
}
