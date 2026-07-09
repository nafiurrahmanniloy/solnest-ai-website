"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SocialHandles } from "@/components/solnest/SocialHandles";

const footerLinks = [
  { label: "Services", href: "/services", external: false },
  { label: "Case Studies", href: "/work", external: false },
  { label: "About", href: "/about", external: false },
  { label: "Community", href: "https://skool.com/solnest-ai", external: true },
  { label: "Contact", href: "mailto:hello@solnestai.com", external: false },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: "#0D0D0B" }}>
      {/* Top seam */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(192,82,43,0.3) 30%, rgba(201,168,76,0.2) 60%, transparent)",
        }}
        aria-hidden="true"
      />

      <div
        className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-14 pb-8 md:pb-10"
        style={{ paddingTop: "var(--strip-pad, clamp(40px, 5vw, 80px))" }}
      >
        {/* ── Top row: Logo + Nav + Socials ── */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-12 md:gap-16 items-start mb-16 md:mb-20">

          {/* Left - Logo + tagline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
            transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1.0] }}
          >
            <Image
              src="/solnest-logo.png"
              alt="Solnest AI"
              width={169}
              height={52}
              style={{
                height: "52px",
                width: "auto",
                marginBottom: "20px",
                filter: "drop-shadow(0 0 14px rgba(192,82,43,0.3))",
              }}
            />
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                fontSize: "var(--fs-body-lg, clamp(16px, 1.1vw, 19px))",
                lineHeight: 1.6,
                color: "rgba(212,204,184,0.55)",
                maxWidth: "360px",
                textWrap: "pretty",
              }}
            >
              Watch what happens when AI meets your business.
              <br />
              <span style={{ color: "rgba(212,204,184,0.55)", fontSize: "var(--fs-body, clamp(14px, 0.95vw, 16px))" }}>
                Built by Ryan - for operators who move fast.
              </span>
            </p>
          </motion.div>

          {/* Center - Navigation links */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.215, 0.61, 0.355, 1.0] }}
            className="flex flex-col gap-4"
          >
            <span className="flex items-center" style={{ gap: "14px", marginBottom: "4px" }}>
              <span aria-hidden="true" style={{ width: "34px", height: "1px", backgroundColor: "#C0522B", flexShrink: 0 }} />
              <span style={{
                fontFamily: "var(--font-condensed)",
                fontWeight: 600,
                fontSize: "12px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(212,204,184,0.65)",
              }}>
                Links
              </span>
            </span>
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="link-underline focus-ring self-start"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  fontSize: "var(--fs-body, clamp(14px, 0.95vw, 16px))",
                  color: "rgba(212,204,184,0.60)",
                  textDecoration: "none",
                  lineHeight: 1.5,
                  padding: "4px 0",
                }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>

          {/* Right - Socials */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.215, 0.61, 0.355, 1.0] }}
            className="flex flex-col gap-5"
          >
            <span className="flex items-center" style={{ gap: "14px" }}>
              <span aria-hidden="true" style={{ width: "34px", height: "1px", backgroundColor: "#C0522B", flexShrink: 0 }} />
              <span style={{
                fontFamily: "var(--font-condensed)",
                fontWeight: 600,
                fontSize: "12px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(212,204,184,0.65)",
              }}>
                Follow
              </span>
            </span>
            <SocialHandles />
          </motion.div>
        </div>

        {/* ── Bottom bar: separator + copyright ── */}
        <div
          aria-hidden="true"
          style={{
            height: "1px",
            background: "rgba(240,235,225,0.10)",
            marginBottom: "20px",
          }}
        />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "var(--fs-caption, 13px)",
            color: "rgba(212,204,184,0.55)",
          }}>
            © {new Date().getFullYear()} Solnest AI. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {[
              { label: "Privacy Policy", href: "/privacy-policy" },
              { label: "Terms of Service", href: "/terms-of-service" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="link-underline focus-ring"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: "var(--fs-caption, 13px)",
                  color: "rgba(212,204,184,0.55)",
                  textDecoration: "none",
                  padding: "4px 0",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="mailto:hello@solnestai.com"
            className="link-underline focus-ring"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "var(--fs-caption, 13px)",
              color: "rgba(212,204,184,0.55)",
              textDecoration: "none",
              padding: "4px 0",
            }}
          >
            hello@solnestai.com
          </a>
        </div>
      </div>
    </footer>
  );
}
