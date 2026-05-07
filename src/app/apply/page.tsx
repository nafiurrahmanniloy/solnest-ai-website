"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Nav from "@/components/solnest/Nav";
import Footer from "@/components/solnest/Footer";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  reason: string;
}

export default function ApplyPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    reason: "",
  });

  const canSubmit =
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.email.includes("@") &&
    form.reason.trim().length >= 10;

  const handleSubmit = async () => {
    setSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!data.success) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      // Send straight to /build-session with prefilled details
      const params = new URLSearchParams({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
      });
      router.push(`/build-session?${params.toString()}`);
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setSubmitting(false);
    }
  };

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
            Book a Build Session
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
            60 Minutes With Ryan,{" "}
            <span style={{ fontStyle: "italic", color: "#C0522B" }}>$229.</span>
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
            Tell us what you want help with. After payment you&apos;ll pick a
            time on Ryan&apos;s calendar.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              color: "rgba(201,168,76,0.7)",
              maxWidth: "480px",
              margin: "12px auto 0",
            }}
          >
            Solnest AI community members get a free 15-min Build Brief before
            committing to this. Not a member yet?{" "}
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
          </p>
        </motion.div>
      </section>

      <section style={{ maxWidth: "560px", margin: "0 auto", padding: "0 24px 80px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            background: "rgba(240,235,225,0.02)",
            border: "1px solid rgba(192,82,43,0.12)",
            borderRadius: "14px",
            padding: "28px",
          }}
        >
          <Label>Your details</Label>
          <div style={{ display: "grid", gap: "12px", marginTop: "12px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <input
                type="text"
                placeholder="First name"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="Last name"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                style={inputStyle}
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={inputStyle}
            />
            <input
              type="tel"
              placeholder="Phone (optional)"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              style={inputStyle}
            />
          </div>

          <Label style={{ marginTop: "24px" }}>What do you want help with?</Label>
          <textarea
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
            placeholder="A few sentences on the problem, the system, or the build you have in mind..."
            rows={5}
            style={{ ...inputStyle, marginTop: "10px", resize: "vertical", minHeight: "120px" }}
          />

          {errorMsg && (
            <div
              style={{
                marginTop: "16px",
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

          <button
            onClick={handleSubmit}
            disabled={!canSubmit || submitting}
            style={{
              width: "100%",
              marginTop: "24px",
              padding: "16px 20px",
              background: !canSubmit || submitting ? "rgba(192,82,43,0.3)" : "#C0522B",
              border: "none",
              borderRadius: "10px",
              color: "#F0EBE1",
              fontFamily: "var(--font-condensed)",
              fontWeight: 600,
              fontSize: "14px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: !canSubmit || submitting ? "not-allowed" : "pointer",
              opacity: !canSubmit || submitting ? 0.6 : 1,
              transition: "all 0.2s ease",
            }}
          >
            {submitting ? "Continuing..." : "Continue to Payment →"}
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
            $229 · 60 min · Secure payment via Stripe
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}

// ---- Sub-components ----

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  background: "rgba(13,13,11,0.6)",
  border: "1px solid rgba(192,82,43,0.2)",
  borderRadius: "8px",
  color: "#F0EBE1",
  fontFamily: "var(--font-body)",
  fontSize: "15px",
  outline: "none",
  transition: "border-color 0.2s ease",
};

function Label({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        fontFamily: "var(--font-condensed)",
        fontWeight: 600,
        fontSize: "13px",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "#C0522B",
        marginBottom: "10px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
