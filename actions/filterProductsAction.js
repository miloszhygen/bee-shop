"use server";

import mockProductsList from "@/mockData/products";
import mockPricesList from "@/mockData/prices";

export default async function filterProductsAction(filterQuery) {
  const { search, category } = filterQuery;
  const searchFilter = search ? search : null;
  const categoryFilter = category ? category : null;

  // TODO: add real fetch

  const productsResponse = mockProductsList.data.filter(
    (product) =>
      product.name.includes(searchFilter) ||
      product.description.includes(searchFilter) ||
      product.type.includes(categoryFilter)
  );

  const products = productsResponse.map((product) => {
    const price = mockPricesList.data.find(
      (price) => price?.id === product?.default_price
    );
    return {
      ...product,
      price,
    };
  });

  return products;
}
