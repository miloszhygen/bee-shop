"use client";

import { useEffect, useState } from "react";

import ProductsList from "@/components/parts/ProductsList";

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
      <ProductsList products={products} />
    </div>
  );
}
