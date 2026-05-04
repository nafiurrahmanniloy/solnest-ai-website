"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Nav from "@/components/solnest/Nav";
import Footer from "@/components/solnest/Footer";

type Step = "project" | "budget" | "contact" | "result";
type Budget = "<$2k" | "$2-5k" | "$5-15k" | "$15k+";
type Timeline = "asap" | "1-3mo" | "3-6mo" | "exploring";
type Route = "discovery" | "build-session";

interface FormState {
  project: string;
  tried: string;
  budget: Budget | null;
  timeline: Timeline | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

function determineRoute(budget: Budget, timeline: Timeline): Route {
  if (budget === "$15k+") return "discovery";
  if (budget === "$5-15k" && timeline !== "exploring") return "discovery";
  return "build-session";
}

const BUDGETS: { value: Budget; label: string; sub: string }[] = [
  { value: "<$2k", label: "Under $2,000", sub: "Quick win or specific problem" },
  { value: "$2-5k", label: "$2,000 – $5,000", sub: "Small project" },
  { value: "$5-15k", label: "$5,000 – $15,000", sub: "Mid-size buildout" },
  { value: "$15k+", label: "$15,000+", sub: "Full system / done-for-you" },
];

const TIMELINES: { value: Timeline; label: string }[] = [
  { value: "asap", label: "ASAP — within 30 days" },
  { value: "1-3mo", label: "1–3 months" },
  { value: "3-6mo", label: "3–6 months" },
  { value: "exploring", label: "Just exploring" },
];

export default function ApplyPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("project");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [resultRoute, setResultRoute] = useState<Route | null>(null);
  const [form, setForm] = useState<FormState>({
    project: "",
    tried: "",
    budget: null,
    timeline: null,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const canProceedProject = form.project.trim().length >= 10;
  const canProceedBudget = form.budget !== null && form.timeline !== null;
  const canProceedContact =
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.email.includes("@");

  const handleSubmit = async () => {
    if (!form.budget || !form.timeline) return;
    setSubmitting(true);
    setErrorMsg(null);

    const route = determineRoute(form.budget, form.timeline);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, route }),
      });
      const data = await res.json();

      if (!data.success) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      setResultRoute(route);
      setStep("result");
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const goToCalendar = () => {
    const params = new URLSearchParams({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      project: form.project,
    });
    if (resultRoute === "discovery") {
      router.push(`/book?${params.toString()}`);
    } else {
      router.push(`/build-session?${params.toString()}`);
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
            Apply for a Call
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
            Tell Us About{" "}
            <span style={{ fontStyle: "italic", color: "#C0522B" }}>Your Project</span>
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
            We&apos;ll route you to the right kind of call based on what you&apos;re building.
            Takes 60 seconds.
          </p>
          <a
            href="/build-session"
            style={{
              display: "inline-block",
              marginTop: "20px",
              fontFamily: "var(--font-condensed)",
              fontWeight: 500,
              fontSize: "12px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(192,82,43,0.7)",
              textDecoration: "underline",
              textDecorationColor: "rgba(192,82,43,0.3)",
              textUnderlineOffset: "4px",
            }}
          >
            Already know you want a Build Session? Skip the form →
          </a>
        </motion.div>
      </section>

      <section style={{ maxWidth: "640px", margin: "0 auto", padding: "0 24px 80px" }}>
        {/* Progress dots */}
        {step !== "result" && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              marginBottom: "32px",
            }}
          >
            {(["project", "budget", "contact"] as Step[]).map((s) => {
              const isActive = step === s;
              return (
                <div
                  key={s}
                  style={{
                    width: isActive ? "24px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    background: isActive ? "#C0522B" : "rgba(192,82,43,0.2)",
                    transition: "all 0.3s ease",
                  }}
                />
              );
            })}
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* STEP 1: Project */}
          {step === "project" && (
            <motion.div
              key="project"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              style={panelStyle}
            >
              <Label>1. What are you looking to build?</Label>
              <textarea
                value={form.project}
                onChange={(e) => setForm({ ...form, project: e.target.value })}
                placeholder="e.g., AI agent that handles customer support across email + IG DMs..."
                rows={4}
                style={{ ...inputStyle, resize: "vertical", minHeight: "100px" }}
              />

              <Label style={{ marginTop: "24px" }}>
                2. What have you tried already? <Optional />
              </Label>
              <textarea
                value={form.tried}
                onChange={(e) => setForm({ ...form, tried: e.target.value })}
                placeholder="Tools you've tested, what worked, what didn't..."
                rows={3}
                style={{ ...inputStyle, resize: "vertical", minHeight: "80px" }}
              />

              <NextButton
                onClick={() => setStep("budget")}
                disabled={!canProceedProject}
              >
                Continue →
              </NextButton>
            </motion.div>
          )}

          {/* STEP 2: Budget + Timeline */}
          {step === "budget" && (
            <motion.div
              key="budget"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              style={panelStyle}
            >
              <Label>3. Rough budget range?</Label>
              <div style={{ display: "grid", gap: "8px", marginTop: "12px" }}>
                {BUDGETS.map((b) => (
                  <RadioCard
                    key={b.value}
                    label={b.label}
                    sub={b.sub}
                    selected={form.budget === b.value}
                    onClick={() => setForm({ ...form, budget: b.value })}
                  />
                ))}
              </div>

              <Label style={{ marginTop: "28px" }}>4. Timeline?</Label>
              <div style={{ display: "grid", gap: "8px", marginTop: "12px" }}>
                {TIMELINES.map((t) => (
                  <RadioCard
                    key={t.value}
                    label={t.label}
                    selected={form.timeline === t.value}
                    onClick={() => setForm({ ...form, timeline: t.value })}
                  />
                ))}
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "32px" }}>
                <BackButton onClick={() => setStep("project")}>← Back</BackButton>
                <NextButton
                  onClick={() => setStep("contact")}
                  disabled={!canProceedBudget}
                >
                  Continue →
                </NextButton>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Contact */}
          {step === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              style={panelStyle}
            >
              <Label>5. Your contact details</Label>
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

              <div style={{ display: "flex", gap: "12px", marginTop: "32px" }}>
                <BackButton onClick={() => setStep("budget")}>← Back</BackButton>
                <NextButton
                  onClick={handleSubmit}
                  disabled={!canProceedContact || submitting}
                >
                  {submitting ? "Routing..." : "See what's right →"}
                </NextButton>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Result */}
          {step === "result" && resultRoute && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={panelStyle}
            >
              <ResultCard route={resultRoute} onContinue={goToCalendar} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <Footer />
    </main>
  );
}

// ---- Sub-components ----

const panelStyle: React.CSSProperties = {
  background: "rgba(240,235,225,0.02)",
  border: "1px solid rgba(192,82,43,0.12)",
  borderRadius: "14px",
  padding: "28px",
};

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

function Optional() {
  return (
    <span
      style={{
        textTransform: "none",
        letterSpacing: "0",
        color: "rgba(212,204,184,0.4)",
        fontWeight: 400,
        fontSize: "11px",
        marginLeft: "6px",
      }}
    >
      (optional)
    </span>
  );
}

function NextButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        flex: 1,
        marginTop: "24px",
        padding: "14px 20px",
        background: disabled ? "rgba(192,82,43,0.3)" : "#C0522B",
        border: "none",
        borderRadius: "10px",
        color: "#F0EBE1",
        fontFamily: "var(--font-condensed)",
        fontWeight: 600,
        fontSize: "14px",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "all 0.2s ease",
      }}
    >
      {children}
    </button>
  );
}

function BackButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "14px 20px",
        background: "transparent",
        border: "1px solid rgba(192,82,43,0.3)",
        borderRadius: "10px",
        color: "rgba(212,204,184,0.7)",
        fontFamily: "var(--font-condensed)",
        fontWeight: 600,
        fontSize: "14px",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

function RadioCard({
  label,
  sub,
  selected,
  onClick,
}: {
  label: string;
  sub?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        textAlign: "left",
        padding: "14px 16px",
        background: selected ? "rgba(192,82,43,0.12)" : "rgba(240,235,225,0.02)",
        border: selected ? "1px solid #C0522B" : "1px solid rgba(192,82,43,0.15)",
        borderRadius: "10px",
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 500,
          fontSize: "15px",
          color: selected ? "#F0EBE1" : "rgba(240,235,225,0.85)",
        }}
      >
        {label}
      </div>
      {sub && (
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            color: "rgba(212,204,184,0.5)",
            marginTop: "2px",
          }}
        >
          {sub}
        </div>
      )}
    </button>
  );
}

function ResultCard({
  route,
  onContinue,
}: {
  route: Route;
  onContinue: () => void;
}) {
  if (route === "discovery") {
    return (
      <div style={{ textAlign: "center" }}>
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
          Your Match
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "36px",
            lineHeight: 1.2,
            marginBottom: "16px",
          }}
        >
          Free Discovery Call —{" "}
          <span style={{ fontStyle: "italic", color: "#C0522B" }}>30 min with Ryan</span>
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "15px",
            color: "rgba(212,204,184,0.7)",
            lineHeight: 1.7,
            marginBottom: "28px",
            maxWidth: "440px",
            margin: "0 auto 28px",
          }}
        >
          Based on your project, you&apos;re a fit for a free discovery call. Ryan will
          map where AI fits in your operation — no pitch, no fluff.
        </p>
        <button
          onClick={onContinue}
          style={{
            padding: "14px 32px",
            background: "#C0522B",
            border: "none",
            borderRadius: "10px",
            color: "#F0EBE1",
            fontFamily: "var(--font-condensed)",
            fontWeight: 600,
            fontSize: "14px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Pick a Time →
        </button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
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
        Your Match
      </div>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 300,
          fontSize: "36px",
          lineHeight: 1.2,
          marginBottom: "16px",
        }}
      >
        Build Session —{" "}
        <span style={{ fontStyle: "italic", color: "#C0522B" }}>60 min, $350</span>
      </h2>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "15px",
          color: "rgba(212,204,184,0.7)",
          lineHeight: 1.7,
          marginBottom: "12px",
          maxWidth: "480px",
          margin: "0 auto 12px",
        }}
      >
        Based on your project scope, a paid Build Session is the right fit. Ryan
        will solve your specific problem with you directly — implementation, not
        theory.
      </p>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "13px",
          color: "rgba(201,168,76,0.85)",
          marginBottom: "28px",
        }}
      >
        Skool members: $250 (use member code at checkout)
      </p>
      <button
        onClick={onContinue}
        style={{
          padding: "14px 32px",
          background: "#C0522B",
          border: "none",
          borderRadius: "10px",
          color: "#F0EBE1",
          fontFamily: "var(--font-condensed)",
          fontWeight: 600,
          fontSize: "14px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          cursor: "pointer",
        }}
      >
        Book a Build Session →
      </button>
    </div>
  );
}
