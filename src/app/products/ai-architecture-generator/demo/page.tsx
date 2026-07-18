import { Metadata } from "next";
import { CloudArchitectDemo } from "./cloud-architect-demo";

export const metadata: Metadata = {
  title: "CloudArchitect AI Demo — Generate Cloud Architecture in Seconds",
  description:
    "Describe your infrastructure needs in plain English and get a production-ready cloud architecture recommendation with cost estimates, service selection, and scaling strategies.",
  openGraph: {
    title: "CloudArchitect AI Demo — Generate Cloud Architecture in Seconds",
    description:
      "Describe your infrastructure needs and get an architecture recommendation with cost estimates across AWS, Azure, and GCP.",
    url: "https://www.cloudrix.io/products/ai-architecture-generator/demo",
    type: "website",
    images: [
      {
        url: `/og?title=${encodeURIComponent("CloudArchitect AI Demo")}&subtitle=${encodeURIComponent("Generate cloud architecture in seconds")}&type=product`,
        width: 1200,
        height: 630,
        alt: "CloudArchitect AI Demo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CloudArchitect AI Demo",
    description:
      "Describe your infrastructure needs and get an architecture recommendation instantly.",
  },
  alternates: {
    canonical:
      "https://www.cloudrix.io/products/ai-architecture-generator/demo",
  },
};

export default function CloudArchitectDemoPage() {
  return <CloudArchitectDemo />;
}
