"use server";

import mockProduct from "@/mockData/product";
import mockPricesList from "@/mockData/prices";

export default async function fetchProductById(productId) {
  // Fetch data based on the productId
  // const stripeData = fetch(`https://api.stripe.com/v1/products/${productId}`, {
  //   method: "GET",
  //   headers: {
  //     Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("data", data);
  //   });

  const productResponse = mockProduct;

  const price = mockPricesList.data.find(
    (price) => price?.id === productResponse?.default_price
  );

  const productData = {
    ...productResponse,
    price,
  };

  // console.log(productData);

  return productData;
}
