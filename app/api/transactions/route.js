/*

    Sets the transaction data in the database

    URL: ${process.env.NEXT_PUBLIC_BASE_URL}/api/transactions

    Data from Stripe:

    {
      id: "evt_1OewEcI4AFOXjzTC99vcpfVU",
      object: "event",
      api_version: "2023-10-16",
      created: 1706778422,
      data: {
        object: {
          id: "cs_test_a1vWoKNOTDPNvIuAMqcyne9lVmm271bPnbLAJ5JVITwpZ7iXt8xMCl7miq",
          object: "checkout.session",
          after_expiration: null,
          allow_promotion_codes: null,
          amount_subtotal: 120000,
          amount_total: 120000,
          automatic_tax: { enabled: false, liability: null, status: null },
          billing_address_collection: null,
          cancel_url: "http://localhost:3000/cancel",
          client_reference_id: null,
          client_secret: null,
          consent: null,
          consent_collection: null,
          created: 1706778392,
          currency: "nok",
          currency_conversion: null,
          custom_fields: [],
          custom_text: {
            after_submit: null,
            shipping_address: null,
            submit: null,
            terms_of_service_acceptance: null,
          },
          customer: null,
          customer_creation: "if_required",
          customer_details: {
            address: {
              city: null,
              country: "NO",
              line1: null,
              line2: null,
              postal_code: null,
              state: null,
            },
            email: "maoil@mailcom@gmail.com",
            name: "Name Namsen",
            phone: null,
            tax_exempt: "none",
            tax_ids: [],
          },
          customer_email: null,
          expires_at: 1706864792,
          invoice: null,
          invoice_creation: {
            enabled: false,
            invoice_data: {
              account_tax_ids: null,
              custom_fields: null,
              description: null,
              footer: null,
              issuer: null,
              metadata: {},
              rendering_options: null,
            },
          },
          livemode: false,
          locale: null,
          metadata: { user_id: "123", sessionStamp: "ok5IfX_0kGF6uBfaQdRQP" },
          mode: "payment",
          payment_intent: "pi_3OewEaI4AFOXjzTC018gLSPj",
          payment_link: null,
          payment_method_collection: "if_required",
          payment_method_configuration_details: {
            id: "pmc_1OKS5lI4AFOXjzTC6yK4i3Q4",
            parent: null,
          },
          payment_method_options: {},
          payment_method_types: ["card", "klarna", "link"],
          payment_status: "paid",
          phone_number_collection: { enabled: false },
          recovered_from: null,
          setup_intent: null,
          shipping_address_collection: null,
          shipping_cost: null,
          shipping_details: null,
          shipping_options: [],
          status: "complete",
          submit_type: null,
          subscription: null,
          success_url: "http://localhost:3000/thank-you?id=ok5IfX_0kGF6uBfaQdRQP",
          total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
          ui_mode: "hosted",
          url: null,
        },
      },
      livemode: false,
      pending_webhooks: 3,
      request: { id: null, idempotency_key: null },
      type: "checkout.session.completed",
    };

*/

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/connectToDatabase";

export async function POST(request) {
  try {
    const data = await request.json();

    const { metadata, payment_intent, amount_subtotal, currency } = data || {};

    const { userId, sessionStamp } = metadata || {};

    // Connect to the database
    const { client } = await connectToDatabase();
    const db = client.db(`${process.env.MONGODB_CLIENT_DB}`);
    const collection = db.collection(
      `${process.env.MONGODB_CLIENT_COLLECTION_TRANSACTIONS}`
    );

    const dbData = {
      userId,
      sessionStamp,
      payment_intent,
      amount_subtotal,
      currency,
    };

    /*
        TODO: list of needed variables in the database

        x sessionStamp
        x total
        x userId

        - name of product
        - product id
        - price id
        - qty
        - price pr unit

    */

    await collection.insertOne(dbData);

    return NextResponse.json({ status: 200 });
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
