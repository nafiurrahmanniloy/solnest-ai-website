"use client";

import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Nav from "@/components/solnest/Nav";
import Footer from "@/components/solnest/Footer";

function BuildSessionContent() {
  const params = useSearchParams();
  const prefillFirstName = params.get("firstName") || "";
  const prefillLastName = params.get("lastName") || "";
  const prefillEmail = params.get("email") || "";
  const prefillPhone = params.get("phone") || "";

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handlePay = async () => {
    setSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/build-session/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: prefillFirstName,
          lastName: prefillLastName,
          email: prefillEmail,
          phone: prefillPhone,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setErrorMsg(data.error || "Could not start checkout. Please try again.");
        setSubmitting(false);
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setSubmitting(false);
    }
  };

  const price = "$229";

  return (
    <main style={{ background: "#0D0D0B", minHeight: "100vh", color: "#F0EBE1" }}>
      <Nav />

      <section
        style={{
          padding: "120px 24px 60px",
          textAlign: "center",
          maxWidth: "720px",
          margin: "0 auto",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <div
            style={{
              fontFamily: "var(--font-condensed)",
              fontWeight: 600,
              fontSize: "11px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#C0522B",
              marginBottom: "16px",
            }}
          >
            Build Session
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(32px, 5vw, 56px)",
              lineHeight: 1.15,
              color: "#F0EBE1",
              marginBottom: "20px",
            }}
          >
            60 Minutes.{" "}
            <span style={{ fontStyle: "italic", color: "#C0522B" }}>One Problem Solved.</span>
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
            }}
          >
            Bring one specific problem. Leave with it solved - or with a clear plan to
            solve it. No theory, no slide decks. Just Ryan, in your business, for an
            hour.
          </p>
        </motion.div>
      </section>

      <section style={{ maxWidth: "560px", margin: "0 auto", padding: "0 24px 40px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            background: "rgba(240,235,225,0.02)",
            border: "1px solid rgba(192,82,43,0.15)",
            borderRadius: "14px",
            padding: "32px",
          }}
        >
          {/* Price */}
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "64px",
                color: "#C0522B",
                lineHeight: 1,
                marginBottom: "8px",
              }}
            >
              {price}
            </div>
            <div
              style={{
                fontFamily: "var(--font-condensed)",
                fontSize: "12px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(212,204,184,0.5)",
              }}
            >
              60-minute Build Session · One-time
            </div>
          </div>

          {/* What you get */}
          <div style={{ marginBottom: "28px" }}>
            <div
              style={{
                fontFamily: "var(--font-condensed)",
                fontWeight: 600,
                fontSize: "12px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#C0522B",
                marginBottom: "14px",
              }}
            >
              What&apos;s included
            </div>
            {[
              "60 min 1:1 with Ryan on Google Meet",
              "One specific problem - solved or roadmapped",
              "Implementation guidance, not theory",
              "Recording + summary sent after the call",
              "Credit applies if you upgrade to a DFY build",
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  marginBottom: "10px",
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  color: "rgba(240,235,225,0.85)",
                }}
              >
                <span style={{ color: "#C0522B", marginTop: "1px" }}>✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Skool member note */}
          <div
            style={{
              padding: "12px 14px",
              background: "rgba(201,168,76,0.06)",
              border: "1px solid rgba(201,168,76,0.2)",
              borderRadius: "8px",
              color: "rgba(240,235,225,0.75)",
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              lineHeight: 1.5,
              marginBottom: "20px",
            }}
          >
            <strong style={{ color: "#C9A84C" }}>Solnest AI community members</strong> get a free 15-min Build Brief before committing to this. Not a member yet?{" "}
            <a
              href="https://www.skool.com/solnest-ai/about"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#C9A84C",
                textDecoration: "underline",
                textUnderlineOffset: "2px",
              }}
            >
              Join here
            </a>
            .
          </div>

          {errorMsg && (
            <div
              style={{
                marginBottom: "16px",
                padding: "12px 14px",
                background: "rgba(192,82,43,0.1)",
                border: "1px solid rgba(192,82,43,0.3)",
                borderRadius: "8px",
                color: "#C0522B",
                fontFamily: "var(--font-body)",
                fontSize: "14px",
              }}
            >
              {errorMsg}
            </div>
          )}

          {/* Pay button */}
          <button
            onClick={handlePay}
            disabled={submitting}
            style={{
              width: "100%",
              padding: "16px 20px",
              background: "#C0522B",
              border: "none",
              borderRadius: "10px",
              color: "#F0EBE1",
              fontFamily: "var(--font-condensed)",
              fontWeight: 600,
              fontSize: "14px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: submitting ? "wait" : "pointer",
              opacity: submitting ? 0.6 : 1,
              transition: "all 0.2s ease",
            }}
          >
            {submitting ? "Redirecting to checkout..." : `Pay ${price} & Pick a Time →`}
          </button>

          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              color: "rgba(212,204,184,0.4)",
              textAlign: "center",
              marginTop: "12px",
            }}
          >
            Secure checkout. After payment you&apos;ll pick your time.
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}

export default function BuildSessionPage() {
  return (
    <Suspense fallback={<main style={{ background: "#0D0D0B", minHeight: "100vh" }} />}>
      <BuildSessionContent />
    </Suspense>
  );
}
