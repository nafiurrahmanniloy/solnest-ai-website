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
      {/* Top gradient divider */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(192,82,43,0.35), rgba(201,168,76,0.18), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-14 pt-16 md:pt-20 pb-8 md:pb-10">
        {/* ── Top row: Logo + Nav + Socials ── */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-12 md:gap-16 items-start mb-16 md:mb-20">

          {/* Left - Logo + tagline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.215, 0.61, 0.355, 1.0] }}
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
                fontSize: "19px",
                lineHeight: 1.75,
                color: "rgba(212,204,184,0.55)",
                maxWidth: "360px",
              }}
            >
              Watch what happens when AI meets your business.
              <br />
              <span style={{ color: "rgba(212,204,184,0.35)", fontSize: "17px" }}>
                Built by Ryan - for operators who move fast.
              </span>
            </p>
          </motion.div>

          {/* Center - Navigation links */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.215, 0.61, 0.355, 1.0] }}
            className="flex flex-col gap-4"
          >
            <span style={{
              fontFamily: "var(--font-condensed)",
              fontWeight: 600,
              fontSize: "12px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#C0522B",
              marginBottom: "4px",
            }}>
              Links
            </span>
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  fontSize: "18px",
                  color: "rgba(212,204,184,0.60)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                  lineHeight: 1.5,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#F0EBE1";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(212,204,184,0.60)";
                }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#F0EBE1";
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(212,204,184,0.60)";
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
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.16, ease: [0.215, 0.61, 0.355, 1.0] }}
            className="flex flex-col gap-5"
          >
            <span style={{
              fontFamily: "var(--font-condensed)",
              fontWeight: 600,
              fontSize: "12px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#C0522B",
              marginBottom: "0px",
            }}>
              Follow
            </span>
            <SocialHandles />
          </motion.div>
        </div>

        {/* ── Bottom bar: separator + copyright ── */}
        <div
          style={{
            height: "1px",
            background: "linear-gradient(to right, rgba(192,82,43,0.15), rgba(212,204,184,0.08), transparent)",
            marginBottom: "20px",
          }}
        />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "15px",
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
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: "15px",
                  color: "rgba(212,204,184,0.55)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#F0EBE1";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(212,204,184,0.55)";
                }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#F0EBE1";
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(212,204,184,0.55)";
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="mailto:hello@solnestai.com"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "15px",
              color: "rgba(212,204,184,0.55)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#F0EBE1";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "rgba(212,204,184,0.55)";
            }}
            onFocus={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#F0EBE1";
            }}
            onBlur={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "rgba(212,204,184,0.55)";
            }}
          >
            hello@solnestai.com
          </a>
        </div>
      </div>
    </footer>
  );
}
