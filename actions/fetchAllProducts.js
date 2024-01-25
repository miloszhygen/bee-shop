"use server";

import mockProductsList from "@/mockData/products";
import mockPricesList from "@/mockData/prices";

export async function fetchAllProducts() {
  const productsResponse = mockProductsList.data;

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
