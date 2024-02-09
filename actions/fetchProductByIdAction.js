/*

  Fetches data for a single product from the stripe
  Fetches all prices from the stripe API.
  Merges the product and prices into one object.


  returns object:

   {
    id: 'prod_PQvPprUEDyLZgwe',
    active: true,
    created: 1706091581,
    default_price: 'price_1OeDV7I4AFOXjzTChrCuNyDq',
    description: 'Harvested from wildflowers in the Alpine meadows test2. bee',
    images: [ '/images/honey.jpg' ],
    metadata: { category: 'bee' },
    name: 'Alpine Blossom Bee 2',
    updated: 1706091582,
    ...
    price: {
      id: 'price_1OeDV7I4AFOXjzTChrCuNyDq',
      object: 'price',
      active: true,
      currency: 'nok',
      product: 'prod_PQvPpUEDyLZgwn',
      unit_amount: 12000,
      unit_amount_decimal: '12000'
      ...
    }
  }

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
