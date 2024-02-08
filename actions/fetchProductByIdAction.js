/*

  Fetches data for a single product from the stripe
  Fetches all prices from the stripe API.
  Merges the product and prices into one object.

*/

"use server";

import mockProduct from "@/mockData/product";
import mockPricesList from "@/mockData/prices";
import Stripe from "stripe";

import { TEST } from "@/config";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function fetchProductByIdAction(productId) {
  const stripeProductResponse = TEST
    ? mockProduct
    : await await stripe.products.retrieve(productId);

  const stripePricesResponse = TEST
    ? mockPricesList
    : await stripe.prices.list({
        active: true,
        created: { gte: 1706091581 },
      });

  const { data: pricesResponse } = stripePricesResponse;

  const price = pricesResponse.find(
    (price) => price?.id === stripeProductResponse?.default_price
  );

  const productData = {
    ...stripeProductResponse,
    price,
  };

  return productData;
}
