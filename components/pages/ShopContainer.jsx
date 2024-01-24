"use client";

import { useEffect, useState } from "react";

import ProductsList from "@/components/parts/ProductsList";
import Basket from "@/components/parts/Basket";

export default function ShopContainer({ fetchAllProducts }) {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    const products = await fetchAllProducts();
    setProducts(products);
  }

  // FETCH ALL PRODUCTS
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <Basket />
      <ProductsList products={products} />
    </div>
  );
}
