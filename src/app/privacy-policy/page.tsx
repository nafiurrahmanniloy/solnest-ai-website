import type { Metadata } from "next";
import Nav from "@/components/solnest/Nav";
import Footer from "@/components/solnest/Footer";
import LegalPageShell from "@/components/solnest/LegalPageShell";

export const metadata: Metadata = {
  title: "Privacy Policy - Solnest AI",
  description:
    "How Solnest AI collects, uses, and protects personal information of website visitors, Build Session clients, and community members - including information processed by Stripe for subscription billing.",
  robots: { index: true, follow: true },
};

const sections = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          Solnest AI (&ldquo;Solnest AI&rdquo;, &ldquo;we&rdquo;,
          &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates the website{" "}
          <a href="https://solnestai.com">solnestai.com</a>, sells paid
          Build Sessions, and runs the Solnest AI membership community.
          We are based in British Columbia, Canada.
        </p>
        <p>
          Questions about this policy or how your data is handled:{" "}
          <a href="mailto:hello@solnestai.com">hello@solnestai.com</a>.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    body: (
      <>
        <p>
          We collect only what we need to deliver the service you asked
          for. Specifically:
        </p>
        <ul>
          <li>
            <strong>Contact details</strong> you give us through forms on
            the site - your name, email address, and phone number (phone
            is optional). For Build Sessions you also provide a short
            description of what you want help with.
          </li>
          <li>
            <strong>Payment information</strong>, collected and stored
            by{" "}
            <a
              href="https://stripe.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Stripe
            </a>
            , our payment processor. We do not see or store your full
            card number, CVC, or expiry. Stripe shares back only the
            metadata we need to recognise your subscription: name on
            card, billing email, last four digits, card country, and
            subscription status.
          </li>
          <li>
            <strong>Community activity</strong> - if you join the
            membership, the community platform (
            <a
              href="https://www.skool.com/legal/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Skool
            </a>
            ) stores your profile, posts, comments, and direct messages
            under its own privacy policy.
          </li>
          <li>
            <strong>Basic technical data</strong> automatically logged
            when you visit the site - IP address, browser type, pages
            viewed. We use this only to keep the site running and to
            understand which pages are useful.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use your information",
    body: (
      <ul>
        <li>
          To deliver what you asked for - a Build Session, a Build
          Brief, a community membership, a downloadable resource.
        </li>
        <li>To process subscription payments and renewals through Stripe.</li>
        <li>To send transactional emails - receipts, calendar links, account changes.</li>
        <li>
          To occasionally send product news or updates about Solnest AI.
          You can unsubscribe from these at any time using the link at
          the bottom of any marketing email, in line with Canada&rsquo;s
          Anti-Spam Legislation (CASL).
        </li>
        <li>To respond to questions you send us.</li>
      </ul>
    ),
  },
  {
    id: "legal-basis",
    title: "Legal basis for processing",
    body: (
      <>
        <p>
          Under PIPEDA and BC PIPA, we rely on your{" "}
          <strong>consent</strong>, given when you submit a form or sign
          up for the membership. For visitors in the EU/UK, our GDPR
          legal bases are:
        </p>
        <ul>
          <li>
            <strong>Performance of a contract</strong> - to deliver the
            membership, Build Session, or other service you purchased.
          </li>
          <li>
            <strong>Consent</strong> - for optional marketing emails.
          </li>
          <li>
            <strong>Legitimate interest</strong> - to keep the site
            secure and to understand basic site usage.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Who we share data with",
    body: (
      <>
        <p>
          We do not sell your personal information. We share it only
          with the service providers we need to run the business:
        </p>
        <ul>
          <li><strong>Stripe</strong> - subscription billing and one-off payments.</li>
          <li><strong>Skool</strong> - the platform that hosts the membership community.</li>
          <li>
            <strong>Email and scheduling tools</strong> - to send
            receipts, calendar links, and product updates tied to your
            account.
          </li>
          <li>
            <strong>Hosting and analytics infrastructure</strong> - to
            keep the site online and measure basic page performance.
          </li>
        </ul>
        <p>
          We may also disclose information if required by law, by a
          court order, or to protect our legal rights.
        </p>
      </>
    ),
  },
  {
    id: "international-transfers",
    title: "International transfers",
    body: (
      <p>
        Most of the providers above (Stripe, Skool, our hosting) are
        based in the United States. By using the site or joining the
        community, you consent to your information being transferred to
        and stored in the United States or other countries where these
        providers operate. We rely on the contractual safeguards and
        certifications these providers maintain (including, where
        applicable, EU Standard Contractual Clauses).
      </p>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: (
      <p>
        We keep your information for as long as your account or
        membership is active, and for a reasonable period after that to
        meet tax, accounting, and dispute-resolution requirements.
        Stripe retains billing records on its own schedule for the same
        reasons.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>You can ask us to:</p>
        <ul>
          <li>Show you what personal information we hold about you.</li>
          <li>Correct anything that&rsquo;s wrong.</li>
          <li>
            Delete your information (subject to records we have to keep
            for tax or legal reasons).
          </li>
          <li>Withdraw consent for marketing emails at any time.</li>
        </ul>
        <p>
          <strong>If you are in the EU or UK</strong>, the GDPR also
          gives you the right to restrict or object to certain
          processing, the right to data portability, and the right to
          lodge a complaint with your local data protection authority.
        </p>
        <p>
          <strong>If you are in Canada</strong>, you can complain to the
          Office of the Privacy Commissioner of Canada (
          <a href="https://www.priv.gc.ca" target="_blank" rel="noopener noreferrer">
            priv.gc.ca
          </a>
          ) or, for residents of British Columbia, to the Office of the
          Information and Privacy Commissioner for BC (
          <a href="https://www.oipc.bc.ca" target="_blank" rel="noopener noreferrer">
            oipc.bc.ca
          </a>
          ) if you believe we have mishandled your information.
        </p>
        <p>
          To make any request, email{" "}
          <a href="mailto:hello@solnestai.com">hello@solnestai.com</a>.
          We&rsquo;ll respond within 30 days.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    body: (
      <p>
        The site uses a small number of essential cookies needed to
        load pages and remember session state. If we add analytics or
        marketing cookies in the future, we will update this page and,
        where required, ask for your consent first.
      </p>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <p>
        The site and the community are intended for adults running
        businesses. We do not knowingly collect personal information
        from anyone under 16. If you believe a child has given us
        information, email us and we will delete it.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We may update this policy as the business changes. The
        &ldquo;last updated&rdquo; date at the top of the page moves
        when we do. For material changes, we will give existing members
        notice by email.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main style={{ background: "#0D0D0B", minHeight: "100vh", color: "#F0EBE1" }}>
      <Nav />
      <LegalPageShell
        eyebrow="Legal"
        title="Privacy Policy"
        lastUpdated="May 27, 2026"
        summary={
          <>
            Solnest AI is based in British Columbia, Canada. This page
            explains what we collect when you visit the site, book a
            Build Session, or join the membership community - and how
            that information is handled by us and by{" "}
            <strong style={{ color: "#F0EBE1" }}>
              Stripe, our subscription billing processor
            </strong>
            .
          </>
        }
        sections={sections}
      />
      <Footer />
    </main>
  );
}
