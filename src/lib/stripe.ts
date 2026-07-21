import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("STRIPE_SECRET_KEY is not set. Payment features will be disabled.");
}

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2026-06-24.dahlia" })
  : null;

export function isStripeConfigured(): boolean {
  return !!process.env.STRIPE_SECRET_KEY;
}

export const PLANS = {
  free: { name: "Free", price: 0, priceId: null },
  pro: { name: "Pro", price: 9900, priceId: process.env.STRIPE_PRO_PRICE_ID || "" },
  enterprise: { name: "Enterprise", price: 29900, priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID || "" },
} as const;
