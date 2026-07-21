import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Refund policy for Cloudrix by Cloudrix.",
};

export default function RefundsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Refund Policy</h1>
        <p className="text-sm text-gray-500 mb-12">Last updated: July 2026</p>

        <div className="prose prose-gray max-w-none">
          <h2>14-Day Money-Back Guarantee</h2>
          <p>We offer a <strong>full refund within 14 days</strong> of your first payment on any paid plan. No questions asked.</p>

          <h2>How to Request a Refund</h2>
          <ol>
            <li>Email <a href="mailto:contact@cloudrix.io">contact@cloudrix.io</a> with your account email and reason (optional)</li>
            <li>We process refunds within <strong>5-10 business days</strong></li>
            <li>The refund goes back to your original payment method via Stripe</li>
          </ol>

          <h2>After 14 Days</h2>
          <p>After the 14-day window, we do not offer refunds for the current billing period. You can cancel your subscription at any time and it will remain active until the end of your current billing cycle.</p>

          <h2>Annual Plans</h2>
          <p>Annual subscriptions are eligible for a prorated refund within the first 30 days. After 30 days, you can cancel but no refund is provided for the remaining period.</p>

          <h2>Free Tier</h2>
          <p>The free tier requires no payment and therefore no refund applies.</p>

          <h2>Exceptions</h2>
          <p>Refunds are not available for: accounts terminated due to Terms of Service violations, or usage-based overages already consumed.</p>

          <h2>Contact</h2>
          <p>Questions about refunds? Email <a href="mailto:contact@cloudrix.io">contact@cloudrix.io</a>.</p>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex gap-6 text-sm text-gray-500">
          <Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gray-900">Terms of Service</Link>
          <Link href="/" className="hover:text-gray-900">Back to Cloudrix</Link>
        </div>
      </div>
    </div>
  );
}
