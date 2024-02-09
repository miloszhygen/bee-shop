/*

  Fetches all products from the stripe API.
  Fetches all prices from the stripe API.
  Merges the products and prices into one object.

  returns array:

    [{
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
    }]

*/

"use server";

import mockProductsList from "@/mockData/products";
import mockPricesList from "@/mockData/prices";
import Stripe from "stripe";

import { TEST } from "@/config";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function fetchAllProductsAction() {
  /*

    Fetch all products from stripe, if TEST is true, use mockProductsList.

    created.gte: This will return all products that were created on or after the specified date (inclusive). This means if a product was created exactly at the specified date and time, it will be included in the results.
  */
  const stripeProductsResponse = TEST
    ? mockProductsList
    : await stripe.products.list({
        active: true,
        created: { gte: 1706091581 },
      });

  // Fetch all prices from stripe
  const stripePricesResponse = TEST
    ? mockPricesList
    : await stripe.prices.list({
        active: true,
        created: { gte: 1706091581 },
      });

  if (!stripeProductsResponse || !stripePricesResponse) {
    // TODO: If one fetch fails send error message back "could not fetch products, try to refresh the page."
    console.log("could not fetch products, try to refresh the page.");
  }

  const { data: productsResponse } = stripeProductsResponse;
  const { data: pricesResponse } = stripePricesResponse;

  const products = productsResponse.map((product) => {
    const price = pricesResponse.find(
      (price) => price?.id === product?.default_price
    );
    return {
      ...product,
      price,
    };
  });

  return products;
}
