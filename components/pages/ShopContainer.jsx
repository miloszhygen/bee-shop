/*
   <ShopContainer fetchAllProductsAction={fetchAllProductsAction} />
*/

"use client";

import { useEffect, useState } from "react";

import FilterProduct from "../parts/FilterProduct";
import ProductsList from "@/components/parts/ProductsList";
import Basket from "@/components/parts/Basket";

export default function ShopContainer({ fetchAllProductsAction }) {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    const products = await fetchAllProductsAction();
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
