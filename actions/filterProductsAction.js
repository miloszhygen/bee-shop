/*

  DOC: https://stripe.com/docs/search#search-query-language


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

export default async function filterProductsAction(filterQuery) {
  const { search, category } = filterQuery;
  const searchFilter = search ? search : null;
  const categoryFilter = category ? category : null;

  // DOC: How to query product data in stripe: https://stripe.com/docs/search#search-query-language
  let queryString = "";

  if (search) {
    queryString += `name~"${search}" OR description~"${search}"`;
  }
  if (category) {
    // Check if search is also present, if so add OR
    queryString += ` ${
      queryString !== "" ? " OR " : ""
    }  metadata[\'category\']:\'${category}\'`;
  }

  // TODO: take into account that only 10 products are returned, possible to set to 100, but add logic to handle more than 100 products
  const { data: productsResponse } = TEST
    ? // filter mock data
      {
        data: mockProductsList.data.filter(
          (product) =>
            product.name.includes(searchFilter) ||
            product.description.includes(searchFilter) ||
            product?.metadata?.category.includes(categoryFilter)
        ),
      }
    : // FETCH products from stripe
      await stripe.products.search({
        query: queryString,
      });

  const { data: stripePricesResponse } = TEST
    ? mockPricesList
    : await stripe.prices.list({
        active: true,
        created: { gte: 1706091581 },
      });

  const products = productsResponse.map((product) => {
    const price = stripePricesResponse.find(
      (price) => price?.id === product?.default_price
    );
    return {
      ...product,
      price,
    };
  });

  return products;
}
