import { NextRequest, NextResponse } from "next/server";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_PRICE_BUILD_SESSION = process.env.STRIPE_PRICE_BUILD_SESSION;
const STRIPE_PRICE_BUILD_SESSION_SKOOL = process.env.STRIPE_PRICE_BUILD_SESSION_SKOOL;

export async function POST(request: NextRequest) {
  if (!STRIPE_SECRET_KEY || !STRIPE_PRICE_BUILD_SESSION) {
    return NextResponse.json(
      {
        error:
          "Payment system not configured yet. Please email hello@solnestai.com to book directly.",
      },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, skoolMember } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const priceId =
      skoolMember && STRIPE_PRICE_BUILD_SESSION_SKOOL
        ? STRIPE_PRICE_BUILD_SESSION_SKOOL
        : STRIPE_PRICE_BUILD_SESSION;

    const origin = request.headers.get("origin") || "https://solnestai.com";

    const successParams = new URLSearchParams({
      type: "build",
      session_id: "{CHECKOUT_SESSION_ID}",
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || "",
      phone: phone || "",
    });

    const formData = new URLSearchParams();
    formData.append("mode", "payment");
    formData.append("line_items[0][price]", priceId);
    formData.append("line_items[0][quantity]", "1");
    formData.append("customer_email", email);
    formData.append(
      "success_url",
      `${origin}/book?${successParams.toString()}`
    );
    formData.append("cancel_url", `${origin}/build-session`);
    formData.append("metadata[firstName]", firstName || "");
    formData.append("metadata[lastName]", lastName || "");
    formData.append("metadata[phone]", phone || "");
    formData.append("metadata[skoolMember]", skoolMember ? "true" : "false");

    const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const data = await stripeRes.json();

    if (!stripeRes.ok) {
      console.error("[build-session] Stripe error", stripeRes.status, data);
      return NextResponse.json(
        { error: data.error?.message || "Could not create checkout" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: data.url });
  } catch (error) {
    console.error("[build-session] checkout error:", error);
    return NextResponse.json(
      { error: "Failed to start checkout" },
      { status: 500 }
    );
  }
}
