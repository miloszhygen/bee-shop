/*
    URL: ${process.env.NEXT_PUBLIC_BASE_URL}/api/checkout
*/

import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

import Stripe from "stripe";

export async function POST(request) {
  // Session stamp is used to identify the session on the thank you page
  // and for the transation in set in database IF user is not logged in
  const sessionStamp = nanoid();

  const data = await request.json();
  const { lineItems } = data;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  // Doc: https://stripe.com/docs/api/checkout/sessions/create
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [...lineItems],
    metadata: {
      user_id: "",
      sessionStamp,
    },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/thank-you?id=${sessionStamp}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
  });

  return NextResponse.json({ id: session.id });
}
