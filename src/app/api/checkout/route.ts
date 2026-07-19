import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { stripe, isStripeConfigured } from "@/lib/stripe";
import { getProductBySlug } from "@/data/products";

const checkoutSchema = z.object({
  productSlug: z.string().min(1),
  tierName: z.string().min(1),
  billingPeriod: z.enum(["monthly", "annual"]),
  currency: z.enum(["usd", "eur"]),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { productSlug, tierName, billingPeriod, currency } = parsed.data;

    // Look up product and tier
    const product = getProductBySlug(productSlug);
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const tier = product.pricingTiers?.find(
      (t) => t.name.toLowerCase() === tierName.toLowerCase()
    );
    if (!tier) {
      return NextResponse.json(
        { error: "Pricing tier not found" },
        { status: 404 }
      );
    }

    // Free tier — no checkout needed
    if (tier.priceMonthly === 0 || tier.price === "$0") {
      return NextResponse.json({ url: tier.ctaLink });
    }

    // Enterprise / custom pricing — redirect to contact
    if (!tier.priceMonthly || tier.price === "Custom") {
      return NextResponse.json({
        url: `/contact?type=purchase&product=${productSlug}&tier=${tierName}`,
      });
    }

    // Stripe fallback: if not configured, redirect to contact
    if (!isStripeConfigured() || !stripe) {
      return NextResponse.json({
        url: `/contact?type=purchase&product=${productSlug}&tier=${tierName}`,
      });
    }

    // Calculate price in cents
    const priceMonthly = tier.priceMonthly;
    const priceAnnual = tier.priceYearly ?? Math.round(priceMonthly * 12 * 0.8);
    const unitAmount = billingPeriod === "annual"
      ? Math.round((priceAnnual / 12) * 100) // annual price per month in cents
      : priceMonthly * 100;

    const origin = request.headers.get("origin") || "https://www.cloudrix.io";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: undefined, // let Stripe collect it
      allow_promotion_codes: true,
      billing_address_collection: "required",
      automatic_tax: { enabled: true },
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: `${product.name} - ${tier.name}`,
              description: product.tagline,
              metadata: {
                product_slug: productSlug,
                tier_name: tierName,
              },
            },
            unit_amount: unitAmount,
            recurring: {
              interval: billingPeriod === "annual" ? "year" : "month",
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      subscription_data: {
        metadata: {
          product_slug: productSlug,
          tier_name: tierName,
          billing_period: billingPeriod,
        },
      },
      success_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/products/${productSlug}`,
      metadata: {
        product_slug: productSlug,
        tier_name: tierName,
        billing_period: billingPeriod,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session. Please try again." },
      { status: 500 }
    );
  }
}
