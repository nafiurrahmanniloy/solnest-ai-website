import type { Metadata } from "next";
import { WebinarPage } from "@/components/solnest/WebinarPage";

export const metadata: Metadata = {
  title: "Live Demo - From Zero to Automated | Solnest AI",
  description:
    "Watch Ryan Lefebvre build AI automations live for real businesses. Register for the free Solnest AI demo and see exactly how operators are saving 10+ hours a week.",
  openGraph: {
    title: "Live Demo - From Zero to Automated | Solnest AI",
    description:
      "Watch Ryan build AI automations live. Free registration.",
    type: "website",
  },
};

export default function Webinar() {
  return <WebinarPage />;
}
