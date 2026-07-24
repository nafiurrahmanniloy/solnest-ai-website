"use client";

import { useState } from "react";
import Nav from "@/components/solnest/Nav";
import Footer from "@/components/solnest/Footer";

/**
 * Dee's private "generate invite" tool, served at bare /invite (no token).
 * Enter the passphrase once, choose how many days the link stays live, and click
 * Generate to get a unique guest link to copy and send. The passphrase is
 * verified server-side by /api/invite/mint, so it never lives in the browser.
 */
export default function InviteGenerator() {
  const [passphrase, setPassphrase] = useState("");
  const [days, setDays] = useState(7);
  const [link, setLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setLink(null);
    setCopied(false);
    try {
      const res = await fetch("/api/invite/mint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passphrase, days }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not generate a link.");
      } else {
        setLink(`${window.location.origin}/invite?t=${data.token}`);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked; user can select manually */
    }
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-condensed)",
    fontWeight: 600,
    fontSize: "12px",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#C0522B",
    marginBottom: "8px",
    display: "block",
  };
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "13px 14px",
    background: "rgba(240,235,225,0.03)",
    border: "1px solid rgba(192,82,43,0.25)",
    borderRadius: "8px",
    color: "#F0EBE1",
    fontFamily: "var(--font-body)",
    fontSize: "15px",
    outline: "none",
  };

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
          padding: "150px 20px 90px",
        }}
      >
        <div style={{ width: "100%", maxWidth: "520px" }}>
          <div
            style={{
              fontFamily: "var(--font-condensed)",
              fontWeight: 600,
              fontSize: "13px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#C0522B",
              textAlign: "center",
              marginBottom: "12px",
            }}
          >
            Internal Tool
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(30px, 4vw, 44px)",
              lineHeight: 1.14,
              color: "#F0EBE1",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            Generate a{" "}
            <span style={{ fontStyle: "italic", color: "#C0522B" }}>free invite link.</span>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "15px",
              lineHeight: 1.6,
              color: "rgba(212,204,184,0.55)",
              textAlign: "center",
              maxWidth: "420px",
              margin: "0 auto 34px",
            }}
          >
            Creates a unique complimentary-booking link that expires on its own.
            Send it to one guest.
          </p>

          <div
            style={{
              background: "rgba(240,235,225,0.02)",
              border: "1px solid rgba(192,82,43,0.15)",
              borderRadius: "12px",
              padding: "26px",
            }}
          >
            <div style={{ marginBottom: "18px" }}>
              <label style={labelStyle} htmlFor="passphrase">Passphrase</label>
              <input
                id="passphrase"
                type="password"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                placeholder="Admin passphrase"
                autoComplete="off"
                style={inputStyle}
              />
            </div>
            <div style={{ marginBottom: "22px" }}>
              <label style={labelStyle} htmlFor="days">Link valid for (days)</label>
              <input
                id="days"
                type="number"
                min={1}
                max={60}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                style={inputStyle}
              />
            </div>

            <button
              onClick={generate}
              disabled={loading || !passphrase}
              style={{
                width: "100%",
                padding: "15px 20px",
                background: "#C0522B",
                border: "none",
                borderRadius: "9999px",
                color: "#F0EBE1",
                fontFamily: "var(--font-condensed)",
                fontWeight: 600,
                fontSize: "14px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: loading || !passphrase ? "not-allowed" : "pointer",
                opacity: loading || !passphrase ? 0.55 : 1,
                boxShadow: "0 0 30px rgba(192,82,43,0.22)",
              }}
            >
              {loading ? "Generating..." : "Generate Invite Link"}
            </button>

            {error && (
              <div
                role="alert"
                style={{
                  marginTop: "16px",
                  padding: "11px 13px",
                  background: "rgba(192,82,43,0.1)",
                  border: "1px solid rgba(192,82,43,0.5)",
                  borderRadius: "8px",
                  color: "#E0794F",
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                }}
              >
                {error}
              </div>
            )}

            {link && (
              <div style={{ marginTop: "22px" }}>
                <label style={labelStyle}>Guest link (expires in {days} day{days === 1 ? "" : "s"})</label>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <input
                    readOnly
                    value={link}
                    onFocus={(e) => e.currentTarget.select()}
                    style={{ ...inputStyle, flex: "1 1 240px", fontSize: "13px" }}
                  />
                  <button
                    onClick={copy}
                    style={{
                      padding: "0 18px",
                      background: copied ? "#3f6f43" : "rgba(201,168,76,0.15)",
                      border: "1px solid rgba(201,168,76,0.4)",
                      borderRadius: "8px",
                      color: copied ? "#F0EBE1" : "#C9A84C",
                      fontFamily: "var(--font-condensed)",
                      fontWeight: 600,
                      fontSize: "13px",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
