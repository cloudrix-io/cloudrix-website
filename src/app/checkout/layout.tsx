import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout - Cloudrix",
  description:
    "Complete your purchase securely. All payments processed through Stripe with 256-bit SSL encryption. 14-day money-back guarantee.",
  robots: { index: false, follow: false },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
