/*

    Used by stripe to handle webhooks

    Setup is done in stripe dashboard

    URL: ${process.env.NEXT_PUBLIC_BASE_URL}/api/payment-webhook

*/

import { NextResponse } from "next/server";
import { headers } from "next/headers";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
  try {
    const body = await request.text();
    const signature = headers().get("stripe-signature");

    let event;

    try {
      if (!signature || !webhookSecret) return;
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.log(`❌ Error message: ${err.message}`);
      return NextResponse.json(
        {
          message: `Webhook Error: ${err.message}`,
          ok: false,
        },
        { status: 400 }
      );
    }

    // Transaction complete
    if (event.type === "checkout.session.completed") {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...event?.data?.object,
        }),
      });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "something went wrong",
        ok: false,
      },
      { status: 500 }
    );
  }
}

