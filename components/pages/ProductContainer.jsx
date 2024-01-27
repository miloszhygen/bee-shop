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
import Basket from "@/components/parts/Basket";

export default function ProductContainer({
  productId,
  fetchProductByIdAction,
}) {
  const [product, setProduct] = useState(null);

  async function getProductDataById() {
    const productData = await fetchProductByIdAction(productId);
    setProduct(productData);
  }

  // FETCH PRODUCT BY ID
  useEffect(() => {
    getProductDataById();
  }, []);

  if (!product) {
    return <div>Fetching product...</div>;
  }
  return (
    <div>
      <Basket />
      <Product product={product} rich />
    </div>
  );
}
