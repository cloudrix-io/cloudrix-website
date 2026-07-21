import { NextRequest, NextResponse } from "next/server";
import { stripe, PLANS } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json({ url: "/contact" }, { status: 200 });
    }
    const { plan, email } = await request.json();
    const planConfig = PLANS[plan as keyof typeof PLANS];
    if (!planConfig || !("priceId" in planConfig) || !planConfig.priceId) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: planConfig.priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/pricing?canceled=true`,
      customer_email: email || undefined,
      allow_promotion_codes: true,
    });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
