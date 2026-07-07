import { NextRequest, NextResponse } from "next/server";

/**
 * Build Session payment - routed through GoHighLevel, NOT direct Stripe.
 *
 * Solnest holds no Stripe API key. Ryan creates ONE hosted payment page in
 * GoHighLevel (a Payment Link or an Order Form on a funnel/store, connected to
 * GHL's own Stripe integration) for the $229 Build Session, and pastes its
 * public URL into GHL_BUILD_SESSION_PAYMENT_URL. Payment is collected on GHL's
 * page via GHL's Stripe; afterwards GHL redirects the customer to
 *   {origin}/book?type=build
 * (set that as the order form's "post-purchase redirect" inside GHL), where the
 * existing calendar flow books the paid Build Session slot.
 *
 * This route simply hands the client that GHL URL (with contact details passed
 * as prefill query params when the GHL page supports them), so the existing
 * front-end (`window.location.href = data.url`) works unchanged.
 */
const GHL_BUILD_SESSION_PAYMENT_URL = process.env.GHL_BUILD_SESSION_PAYMENT_URL;

export async function POST(request: NextRequest) {
  if (!GHL_BUILD_SESSION_PAYMENT_URL) {
    return NextResponse.json(
      {
        error:
          "Payment link not configured yet. Please email hello@solnestai.com to book directly.",
      },
      { status: 503 }
    );
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { firstName, lastName, email, phone } = body as {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
    };

    // Append contact details as prefill params. GHL order forms / payment links
    // pick up common keys (first_name, last_name, email, phone). Harmless if the
    // specific GHL page ignores them.
    let url: URL;
    try {
      url = new URL(GHL_BUILD_SESSION_PAYMENT_URL);
    } catch {
      console.error("[build-session] GHL_BUILD_SESSION_PAYMENT_URL is not a valid URL");
      return NextResponse.json(
        { error: "Payment link misconfigured. Please email hello@solnestai.com." },
        { status: 500 }
      );
    }

    if (firstName) url.searchParams.set("first_name", firstName);
    if (lastName) url.searchParams.set("last_name", lastName);
    if (email) url.searchParams.set("email", email);
    if (phone) url.searchParams.set("phone", phone);

    return NextResponse.json({ url: url.toString() });
  } catch (error) {
    console.error("[build-session] checkout error:", error);
    return NextResponse.json(
      { error: "Failed to start checkout" },
      { status: 500 }
    );
  }
}
