import { Metadata } from "next";
import { MigrateIQDemo } from "./migrate-iq-demo";

export const metadata: Metadata = {
  title: "MigrateIQ Demo — Cloud Migration Planning Tool",
  description:
    "Plan your cloud migration with an interactive tool. Get a phased timeline, risk assessment, cost estimates, and recommended migration strategy in minutes.",
  openGraph: {
    title: "MigrateIQ Demo — Cloud Migration Planning Tool",
    description:
      "Plan your cloud migration with a phased timeline, risk assessment, and cost estimates.",
    url: "https://www.cloudrix.io/products/cloud-migration-planner/demo",
    type: "website",
    images: [
      {
        url: `/og?title=${encodeURIComponent("MigrateIQ Demo")}&subtitle=${encodeURIComponent("Cloud migration planning tool")}&type=product`,
        width: 1200,
        height: 630,
        alt: "MigrateIQ Demo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MigrateIQ Demo",
    description:
      "Plan your cloud migration with a phased timeline and cost estimates.",
  },
  alternates: {
    canonical:
      "https://www.cloudrix.io/products/cloud-migration-planner/demo",
  },
};

export default function MigrateIQDemoPage() {
  return <MigrateIQDemo />;
}
