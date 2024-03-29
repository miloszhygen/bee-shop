/*

    <ProductContainer
      productId={params.productId}
      fetchProductByIdAction={fetchProductByIdAction}
    />

    fetchProductByIdAction => function that fetches product data from the API

*/

"use client";

import { useEffect, useState } from "react";

import Product from "@/components/parts/Product";

export default function ProductContainer({
  productId,
  fetchProductByIdAction,
}) {
  const [product, setProduct] = useState(null);

  async function getProductDataById() {
    const productData = await fetchProductByIdAction(productId);
    console.log(productData);
    setProduct(productData);
  }

  // FETCH PRODUCT BY ID
  useEffect(() => {
    getProductDataById();
  }, []);

  if (!product) {
    return <h1>Fetching product...</h1>;
  }
  return (
    <div>
      <Product product={product} rich />
    </div>
  );
}
