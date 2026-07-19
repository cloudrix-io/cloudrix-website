import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import type Stripe from "stripe";

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured" },
      { status: 503 }
    );
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`Webhook signature verification failed: ${message}`);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        console.log("[Stripe] Checkout completed:", {
          sessionId: session.id,
          customerEmail: session.customer_email || session.customer_details?.email,
          productSlug: session.metadata?.product_slug,
          tierName: session.metadata?.tier_name,
          billingPeriod: session.metadata?.billing_period,
          amountTotal: session.amount_total,
          currency: session.currency,
        });

        // Send confirmation email via Resend (best-effort)
        await sendPurchaseConfirmation(session).catch((err) =>
          console.error("[Stripe] Failed to send confirmation email:", err)
        );

        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log("[Stripe] Subscription updated:", {
          subscriptionId: subscription.id,
          status: subscription.status,
          productSlug: subscription.metadata?.product_slug,
        });
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log("[Stripe] Subscription cancelled:", {
          subscriptionId: subscription.id,
          productSlug: subscription.metadata?.product_slug,
        });
        break;
      }

      default:
        console.log(`[Stripe] Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error(`[Stripe] Error processing ${event.type}:`, error);
    // Return 200 to acknowledge receipt even if processing fails,
    // to prevent Stripe from retrying indefinitely
    return NextResponse.json({ received: true, error: "Processing failed" });
  }

  return NextResponse.json({ received: true });
}

async function sendPurchaseConfirmation(session: Stripe.Checkout.Session) {
  const email = session.customer_email || session.customer_details?.email;
  if (!email) return;

  const productSlug = session.metadata?.product_slug || "Unknown product";
  const tierName = session.metadata?.tier_name || "Unknown tier";

  try {
    const { Resend } = await import("resend");
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return;

    const resend = new Resend(apiKey);
    const adminEmail = process.env.ADMIN_EMAIL || "contact@cloudrix.io";

    // Notify admin
    await resend.emails.send({
      from: "Cloudrix <noreply@cloudrix.io>",
      to: adminEmail,
      subject: `New Purchase: ${productSlug} - ${tierName}`,
      html: `
        <h2>New Subscription Purchase</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Customer Email</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Product</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${productSlug}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Tier</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${tierName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Amount</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${((session.amount_total || 0) / 100).toFixed(2)} ${session.currency?.toUpperCase()}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Session ID</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${session.id}</td>
          </tr>
        </table>
        <hr />
        <p style="color: #666; font-size: 12px;">Stripe Webhook - checkout.session.completed</p>
      `,
    });

    // Send customer confirmation
    await resend.emails.send({
      from: "Cloudrix <contact@cloudrix.io>",
      to: email,
      subject: "Your Cloudrix subscription is active!",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e293b;">Welcome to Cloudrix!</h2>
          <p style="color: #475569; line-height: 1.6;">
            Your <strong>${tierName}</strong> subscription is now active. Here is a summary of your purchase:
          </p>
          <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <p style="margin: 5px 0; color: #334155;"><strong>Product:</strong> ${productSlug}</p>
            <p style="margin: 5px 0; color: #334155;"><strong>Plan:</strong> ${tierName}</p>
            <p style="margin: 5px 0; color: #334155;"><strong>Amount:</strong> ${((session.amount_total || 0) / 100).toFixed(2)} ${session.currency?.toUpperCase()}</p>
          </div>
          <p style="color: #475569; line-height: 1.6;">
            If you have any questions, reply to this email or visit our
            <a href="https://www.cloudrix.io/contact" style="color: #2563eb;">contact page</a>.
          </p>
          <p style="color: #475569; margin-top: 30px;">
            Best regards,<br />
            <strong>The Cloudrix Team</strong>
          </p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
          <p style="color: #94a3b8; font-size: 12px;">
            Cloudrix - Software Engineering for EU Companies<br />
            <a href="https://www.cloudrix.io" style="color: #94a3b8;">cloudrix.io</a>
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error("[Stripe] Email send error:", error);
  }
}
