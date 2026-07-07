import type { Metadata } from "next";
import Nav from "@/components/solnest/Nav";
import Footer from "@/components/solnest/Footer";
import LegalPageShell from "@/components/solnest/LegalPageShell";

export const metadata: Metadata = {
  title: "Terms of Service - Solnest AI",
  description:
    "The terms that govern your use of solnestai.com, paid Build Sessions, and the Solnest AI membership community - including subscription billing through Stripe.",
  robots: { index: true, follow: true },
};

const sections = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <p>
        Solnest AI (&ldquo;Solnest AI&rdquo;, &ldquo;we&rdquo;,
        &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates the website{" "}
        <a href="https://solnestai.com">solnestai.com</a> and the
        Solnest AI membership community. We are based in British
        Columbia, Canada. Contact:{" "}
        <a href="mailto:hello@solnestai.com">hello@solnestai.com</a>.
      </p>
    ),
  },
  {
    id: "what-we-offer",
    title: "What we offer",
    body: (
      <ul>
        <li><strong>The website</strong> - free to read.</li>
        <li>
          <strong>Build Sessions</strong> - paid one-to-one working
          sessions booked through the site.
        </li>
        <li>
          <strong>The membership community</strong> - a $97 USD per
          month subscription that includes the live builds, the agent
          library, SOPs, prompts, and access to the Solnest AI community
          (hosted on Skool).
        </li>
        <li>
          <strong>Custom build engagements</strong> - longer paid
          project work scoped on a case-by-case basis with Ryan.
        </li>
      </ul>
    ),
  },
  {
    id: "eligibility",
    title: "Eligibility",
    body: (
      <p>
        You must be at least 18 years old and able to enter a binding
        contract in your jurisdiction to use the paid services.
      </p>
    ),
  },
  {
    id: "billing",
    title: "Billing & subscriptions",
    body: (
      <>
        <p>
          All payments are processed by{" "}
          <a href="https://stripe.com" target="_blank" rel="noopener noreferrer">
            Stripe
          </a>
          . When you start a membership:
        </p>
        <ul>
          <li>
            You are charged <strong>$97 USD</strong> on signup and on
            the same date each month after that, automatically, until
            you cancel.
          </li>
          <li>
            You can cancel at any time from inside your account or by
            emailing us. Cancellation takes effect at the end of your
            current paid period.
          </li>
          <li>
            Stripe stores and secures your payment details; we never
            see your full card number, CVC, or expiry.
          </li>
          <li>
            Prices are listed in US dollars. Your bank may apply
            currency conversion or international transaction fees that
            are outside our control.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "refunds",
    title: "Refunds",
    body: (
      <>
        <p>Refund terms depend on what you bought:</p>
        <ul>
          <li>
            <strong>Membership ($97/mo)</strong> - you can cancel at
            any time. Your access continues until the end of the
            current billing period and you are not billed again. The
            current period is non-refundable.
          </li>
          <li>
            <strong>Build Sessions</strong> - refundable in full if you
            cancel at least 48 hours before the scheduled session.
            Cancellations inside the 48-hour window or no-shows are not
            refundable, but we will try to reschedule once.
          </li>
          <li>
            <strong>Custom build engagements</strong> - come with a{" "}
            <strong>3-month money-back guarantee</strong>. If, within
            three months of the engagement starting, the work has not
            delivered useful value to your business, email us and we
            will refund what you paid for the engagement. The guarantee
            covers fees paid to Solnest AI; it does not cover
            third-party costs (software subscriptions, ad spend, etc.)
            you incurred during the engagement.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>
            Resell, redistribute, or republish the community content,
            agent files, SOPs, prompts, templates, or recordings outside
            the community.
          </li>
          <li>Share your account or membership access with anyone else.</li>
          <li>
            Use the community or any communication channel to harass,
            threaten, or abuse other members.
          </li>
          <li>
            Use the materials to build a directly competing community
            or product.
          </li>
        </ul>
        <p>
          We can suspend or end your access if you break these rules or
          the Skool community guidelines. In serious cases we will not
          refund the current period.
        </p>
      </>
    ),
  },
  {
    id: "ip",
    title: "Intellectual property",
    body: (
      <>
        <p>
          The website, the community resources, the SOPs, the prompts,
          the agent templates, and any recordings are owned by Solnest
          AI (or licensed to us) and are protected by copyright. While
          your membership is active, we grant you a personal,
          non-transferable, non-exclusive licence to use these
          materials for your own business and your internal team. That
          licence ends when your membership ends.
        </p>
        <p>
          Anything you post inside the community (questions, builds
          you share, comments) stays yours. By posting it, you grant
          other members and us a licence to view, quote, and discuss it
          inside the community.
        </p>
      </>
    ),
  },
  {
    id: "no-guarantees",
    title: "No guarantees",
    body: (
      <p>
        We share systems, tools, and ideas that have worked for us and
        other operators. We do not promise specific revenue,
        time-savings, or business outcomes. What you build with the
        material - and the result you get - depends on you, your
        business, and your effort.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <>
        <p>
          To the maximum extent permitted by law, Solnest AI and its
          contractors are not liable for indirect, incidental,
          consequential, or punitive damages arising from your use of
          the website, the community, the Build Sessions, or any
          system, agent, or template shared inside any of them. Our
          total liability to you for any claim relating to the service
          is capped at the amount you have paid us in the twelve months
          before the claim.
        </p>
        <p>
          Nothing in these terms limits liability that cannot be
          limited under applicable law (including, where relevant,
          consumer protection laws).
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law & disputes",
    body: (
      <p>
        These terms are governed by the laws of the Province of
        British Columbia and the federal laws of Canada applicable
        there. You and Solnest AI agree to submit to the exclusive
        jurisdiction of the courts of British Columbia for any
        dispute arising from these terms or the services, except
        where applicable consumer protection law gives you the right
        to bring a claim in your local courts.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: (
      <p>
        We may update these terms as the business changes. The
        &ldquo;last updated&rdquo; date at the top moves when we do.
        For material changes that affect existing members, we will give
        email notice before the new terms take effect. Continued use of
        the website or community after the effective date means you
        accept the new terms.
      </p>
    ),
  },
];

export default function TermsOfServicePage() {
  return (
    <main style={{ background: "#0D0D0B", minHeight: "100vh", color: "#F0EBE1" }}>
      <Nav />
      <LegalPageShell
        eyebrow="Legal"
        title="Terms of Service"
        lastUpdated="May 27, 2026"
        summary={
          <>
            By using solnestai.com, booking a Build Session, or joining
            the Solnest AI community, you agree to the terms on this
            page. Subscription billing is processed by{" "}
            <strong style={{ color: "#F0EBE1" }}>Stripe</strong>. We
            operate from British Columbia, Canada.
          </>
        }
        sections={sections}
      />
      <Footer />
    </main>
  );
}
