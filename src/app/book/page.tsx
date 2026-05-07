"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Nav from "@/components/solnest/Nav";
import Footer from "@/components/solnest/Footer";

type Step = "date" | "time" | "details" | "confirmed";

interface Slots {
  [date: string]: string[];
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatTime(isoStr: string) {
  const d = new Date(isoStr);
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/Los_Angeles",
  });
}

function getNextWeeks(): string[] {
  const dates: string[] = [];
  const now = new Date();
  const start = new Date(now);
  start.setDate(start.getDate() + 1);

  for (let i = 0; i < 21; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const day = d.getDay();
    if (day >= 1 && day <= 5) {
      dates.push(d.toISOString().split("T")[0]);
    }
  }
  return dates;
}

function BookPageContent() {
  const searchParams = useSearchParams();
  // Build Session is the only active flow (Discovery archived 2026-05-08).
  // Default to true; legacy callers using `?type=discovery` are also routed here.
  const isBuildSession = searchParams.get("type") !== "discovery";
  const stripeSessionId = searchParams.get("session_id") || "";

  const [step, setStep] = useState<Step>("date");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [slots, setSlots] = useState<Slots>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstName: searchParams.get("firstName") || "",
    lastName: searchParams.get("lastName") || "",
    email: searchParams.get("email") || "",
    phone: searchParams.get("phone") || "",
    notes: searchParams.get("project") || "",
  });

  const dates = getNextWeeks();
  const startDate = dates[0];
  const endDate = dates[dates.length - 1];

  const fetchSlots = useCallback(async () => {
    setLoading(true);
    try {
      const calendarParam = isBuildSession ? "&calendar=build" : "";
      const res = await fetch(
        `/api/booking/slots?startDate=${startDate}&endDate=${endDate}${calendarParam}`
      );
      const data = await res.json();
      setSlots(data.slots || {});
    } catch {
      console.error("Failed to fetch slots");
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate, isBuildSession]);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  const handleSubmit = async () => {
    if (!selectedSlot) return;
    setSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/booking/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          selectedSlot,
          calendar: isBuildSession ? "build" : undefined,
          durationMinutes: isBuildSession ? 60 : 30,
          stripeSessionId: stripeSessionId || undefined,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStep("confirmed");
      } else {
        const ghlMessage =
          data?.details?.message ||
          (Array.isArray(data?.details?.message) && data.details.message.join(", ")) ||
          data?.details?.error ||
          data?.error ||
          "Something went wrong. Please try again.";
        console.error("Booking failed:", data);
        setErrorMsg(String(ghlMessage));
      }
    } catch (err) {
      console.error("Booking error:", err);
      setErrorMsg("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const selectedDateSlots = selectedDate ? slots[selectedDate] || [] : [];

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    fontFamily: "var(--font-body)",
    fontSize: "15px",
    color: "#F0EBE1",
    background: "rgba(240,235,225,0.04)",
    border: "1px solid rgba(192,82,43,0.2)",
    borderRadius: "8px",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

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
            background: "radial-gradient(ellipse, rgba(192,82,43,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
          style={{ position: "relative", zIndex: 1 }}
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
            Strategy Call with Ryan
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(32px, 5vw, 56px)",
              lineHeight: 1.15,
              color: "#F0EBE1",
              maxWidth: "700px",
              margin: "0 auto 20px",
              padding: "0 24px",
            }}
          >
            Let&apos;s Talk About{" "}
            <span style={{ fontStyle: "italic", color: "#C0522B" }}>Your Business</span>
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
            30 minutes with Ryan. No fluff, no pitch deck — just a real conversation
            about where AI fits in your operation.
          </p>
        </motion.div>
      </section>

      {/* Booking flow */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
        style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px 80px" }}
      >
        {/* Step indicators */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "32px",
            marginBottom: "40px",
          }}
        >
          {(["date", "time", "details"] as Step[]).map((s, i) => {
            const labels = ["Pick a Day", "Choose a Time", "Your Details"];
            const isActive = step === s;
            const isPast =
              (s === "date" && (step === "time" || step === "details" || step === "confirmed")) ||
              (s === "time" && (step === "details" || step === "confirmed")) ||
              (s === "details" && step === "confirmed");

            return (
              <button
                key={s}
                onClick={() => {
                  if (isPast) setStep(s);
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: isPast ? "pointer" : "default",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  opacity: isActive ? 1 : isPast ? 0.7 : 0.3,
                  transition: "opacity 0.2s ease",
                }}
              >
                <span
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontFamily: "var(--font-condensed)",
                    fontWeight: 600,
                    background: isActive
                      ? "#C0522B"
                      : isPast
                      ? "rgba(192,82,43,0.3)"
                      : "rgba(240,235,225,0.08)",
                    color: isActive || isPast ? "#F0EBE1" : "rgba(212,204,184,0.4)",
                  }}
                >
                  {isPast ? "✓" : i + 1}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-condensed)",
                    fontWeight: 500,
                    fontSize: "12px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: isActive ? "#F0EBE1" : "rgba(212,204,184,0.4)",
                    display: "none",
                  }}
                  className="sm-show"
                >
                  {labels[i]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Card container */}
        <div
          style={{
            borderRadius: "16px",
            border: "1px solid rgba(192,82,43,0.15)",
            background: "rgba(18,18,16,0.6)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(192,82,43,0.08) inset",
            padding: "40px",
            minHeight: "360px",
          }}
        >
          <AnimatePresence mode="wait">
            {/* STEP 1: Date selection */}
            {step === "date" && (
              <motion.div
                key="date"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontSize: "24px",
                    marginBottom: "8px",
                  }}
                >
                  Pick a day
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                    color: "rgba(212,204,184,0.5)",
                    marginBottom: "28px",
                  }}
                >
                  Available weekdays for the next 3 weeks (Pacific Time)
                </p>

                {loading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "60px 0",
                    }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      style={{
                        width: "24px",
                        height: "24px",
                        border: "2px solid rgba(192,82,43,0.2)",
                        borderTopColor: "#C0522B",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
                      gap: "10px",
                    }}
                  >
                    {dates.map((date) => {
                      const hasSlots = slots[date] && slots[date].length > 0;
                      const isSelected = selectedDate === date;

                      return (
                        <button
                          key={date}
                          disabled={!hasSlots}
                          onClick={() => {
                            setSelectedDate(date);
                            setSelectedSlot(null);
                            setStep("time");
                          }}
                          style={{
                            padding: "14px 12px",
                            borderRadius: "10px",
                            border: isSelected
                              ? "1px solid #C0522B"
                              : "1px solid rgba(192,82,43,0.12)",
                            background: isSelected
                              ? "rgba(192,82,43,0.12)"
                              : hasSlots
                              ? "rgba(240,235,225,0.03)"
                              : "rgba(240,235,225,0.01)",
                            cursor: hasSlots ? "pointer" : "not-allowed",
                            opacity: hasSlots ? 1 : 0.3,
                            transition: "all 0.2s ease",
                            textAlign: "center",
                          }}
                        >
                          <div
                            style={{
                              fontFamily: "var(--font-condensed)",
                              fontWeight: 600,
                              fontSize: "13px",
                              letterSpacing: "0.06em",
                              color: isSelected ? "#C0522B" : "#F0EBE1",
                            }}
                          >
                            {formatDate(date)}
                          </div>
                          {hasSlots && (
                            <div
                              style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "11px",
                                color: "rgba(192,82,43,0.6)",
                                marginTop: "4px",
                              }}
                            >
                              {slots[date].length} slots
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}

            {/* STEP 2: Time selection */}
            {step === "time" && selectedDate && (
              <motion.div
                key="time"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={() => setStep("date")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(212,204,184,0.5)",
                    fontFamily: "var(--font-condensed)",
                    fontSize: "12px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  ← Back to dates
                </button>

                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontSize: "24px",
                    marginBottom: "4px",
                  }}
                >
                  {formatDate(selectedDate)}
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                    color: "rgba(212,204,184,0.5)",
                    marginBottom: "28px",
                  }}
                >
                  Choose a 30-minute slot (Pacific Time)
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                    gap: "8px",
                  }}
                >
                  {selectedDateSlots.map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        onClick={() => {
                          setSelectedSlot(slot);
                          setStep("details");
                        }}
                        style={{
                          padding: "12px 8px",
                          borderRadius: "8px",
                          border: isSelected
                            ? "1px solid #C0522B"
                            : "1px solid rgba(192,82,43,0.15)",
                          background: isSelected
                            ? "rgba(192,82,43,0.12)"
                            : "rgba(240,235,225,0.03)",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          fontFamily: "var(--font-condensed)",
                          fontWeight: 500,
                          fontSize: "14px",
                          letterSpacing: "0.04em",
                          color: isSelected ? "#C0522B" : "#F0EBE1",
                          textAlign: "center",
                        }}
                      >
                        {formatTime(slot)}
                      </button>
                    );
                  })}
                </div>

                {selectedDateSlots.length === 0 && (
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "14px",
                      color: "rgba(212,204,184,0.4)",
                      textAlign: "center",
                      padding: "40px 0",
                    }}
                  >
                    No available slots for this day. Try another date.
                  </p>
                )}
              </motion.div>
            )}

            {/* STEP 3: Contact details */}
            {step === "details" && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={() => setStep("time")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(212,204,184,0.5)",
                    fontFamily: "var(--font-condensed)",
                    fontSize: "12px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  ← Back to times
                </button>

                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontSize: "24px",
                    marginBottom: "4px",
                  }}
                >
                  Almost there
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                    color: "rgba(212,204,184,0.5)",
                    marginBottom: "28px",
                  }}
                >
                  {selectedDate && formatDate(selectedDate)} at{" "}
                  {selectedSlot && formatTime(selectedSlot)} PT — 30 min on Google Meet
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div>
                      <label
                        style={{
                          fontFamily: "var(--font-condensed)",
                          fontSize: "11px",
                          fontWeight: 600,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "rgba(212,204,184,0.5)",
                          marginBottom: "6px",
                          display: "block",
                        }}
                      >
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        style={inputStyle}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "rgba(192,82,43,0.5)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "rgba(192,82,43,0.2)";
                        }}
                        required
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          fontFamily: "var(--font-condensed)",
                          fontSize: "11px",
                          fontWeight: 600,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "rgba(212,204,184,0.5)",
                          marginBottom: "6px",
                          display: "block",
                        }}
                      >
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        style={inputStyle}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "rgba(192,82,43,0.5)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "rgba(192,82,43,0.2)";
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div>
                      <label
                        style={{
                          fontFamily: "var(--font-condensed)",
                          fontSize: "11px",
                          fontWeight: 600,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "rgba(212,204,184,0.5)",
                          marginBottom: "6px",
                          display: "block",
                        }}
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        style={inputStyle}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "rgba(192,82,43,0.5)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "rgba(192,82,43,0.2)";
                        }}
                        required
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          fontFamily: "var(--font-condensed)",
                          fontSize: "11px",
                          fontWeight: 600,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "rgba(212,204,184,0.5)",
                          marginBottom: "6px",
                          display: "block",
                        }}
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        style={inputStyle}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "rgba(192,82,43,0.5)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "rgba(192,82,43,0.2)";
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      style={{
                        fontFamily: "var(--font-condensed)",
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "rgba(212,204,184,0.5)",
                        marginBottom: "6px",
                        display: "block",
                      }}
                    >
                      What&apos;s your biggest operational bottleneck?
                    </label>
                    <textarea
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      rows={3}
                      style={{
                        ...inputStyle,
                        resize: "vertical",
                        minHeight: "80px",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "rgba(192,82,43,0.5)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "rgba(192,82,43,0.2)";
                      }}
                      placeholder="Tell Ryan what you're working on so he can prepare..."
                    />
                  </div>

                  {errorMsg && (
                    <div
                      style={{
                        padding: "12px 16px",
                        borderRadius: "8px",
                        background: "rgba(220,70,70,0.08)",
                        border: "1px solid rgba(220,70,70,0.3)",
                        fontFamily: "var(--font-body)",
                        fontSize: "13px",
                        color: "#F0C8C0",
                        lineHeight: 1.5,
                      }}
                    >
                      {errorMsg}
                    </div>
                  )}

                  <button
                    onClick={handleSubmit}
                    disabled={!form.firstName || !form.lastName || !form.email || submitting}
                    style={{
                      marginTop: "8px",
                      padding: "16px 32px",
                      borderRadius: "9999px",
                      border: "none",
                      background: form.firstName && form.lastName && form.email
                        ? "#C0522B"
                        : "rgba(192,82,43,0.3)",
                      color: "#F0EBE1",
                      fontFamily: "var(--font-condensed)",
                      fontWeight: 600,
                      fontSize: "14px",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      cursor: form.firstName && form.lastName && form.email ? "pointer" : "not-allowed",
                      transition: "all 0.3s ease",
                      boxShadow: "0 0 30px rgba(192,82,43,0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      width: "100%",
                    }}
                  >
                    {submitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        style={{
                          width: "18px",
                          height: "18px",
                          border: "2px solid rgba(240,235,225,0.3)",
                          borderTopColor: "#F0EBE1",
                          borderRadius: "50%",
                        }}
                      />
                    ) : (
                      <>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        Confirm Booking
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Confirmation */}
            {step === "confirmed" && (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{ textAlign: "center", padding: "40px 0" }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: "rgba(192,82,43,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px",
                  }}
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C0522B"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.div>

                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontSize: "28px",
                    marginBottom: "12px",
                  }}
                >
                  You&apos;re booked
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "15px",
                    color: "rgba(212,204,184,0.6)",
                    maxWidth: "400px",
                    margin: "0 auto 32px",
                    lineHeight: 1.7,
                  }}
                >
                  {selectedDate && formatDate(selectedDate)} at{" "}
                  {selectedSlot && formatTime(selectedSlot)} PT — check your email for the
                  Google Meet link and calendar invite.
                </p>

                <div
                  style={{
                    padding: "20px 28px",
                    borderRadius: "12px",
                    background: "rgba(192,82,43,0.06)",
                    border: "1px solid rgba(192,82,43,0.15)",
                    display: "inline-block",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-condensed)",
                      fontWeight: 600,
                      fontSize: "11px",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "rgba(212,204,184,0.4)",
                      marginBottom: "8px",
                    }}
                  >
                    Strategy Call with Ryan
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "18px",
                      color: "#F0EBE1",
                    }}
                  >
                    {selectedDate && formatDate(selectedDate)} at{" "}
                    {selectedSlot && formatTime(selectedSlot)} PT
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "13px",
                      color: "rgba(212,204,184,0.4)",
                      marginTop: "4px",
                    }}
                  >
                    30 min — Google Meet
                  </div>
                </div>

                <div style={{ marginTop: "32px" }}>
                  <a
                    href="/"
                    style={{
                      fontFamily: "var(--font-condensed)",
                      fontWeight: 600,
                      fontSize: "13px",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#C0522B",
                      textDecoration: "none",
                    }}
                  >
                    ← Back to Solnest AI
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Trust indicators */}
        {step !== "confirmed" && (
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
              { num: "30", label: "Minute Call" },
              { num: "$0", label: "Cost to You" },
              { num: "100%", label: "Honest Advice" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
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
        )}
      </motion.section>

      <Footer />
    </main>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<main style={{ background: "#0D0D0B", minHeight: "100vh" }} />}>
      <BookPageContent />
    </Suspense>
  );
}
