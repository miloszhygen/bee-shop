/*
   <ShopContainer fetchAllProductsAction={fetchAllProductsAction} />
*/

"use client";

import { useEffect, useState } from "react";

import FilterProducts from "../parts/FilterProducts";
import ProductsList from "@/components/parts/ProductsList";
import Basket from "@/components/parts/Basket";

export default function ShopContainer({
  fetchAllProductsAction,
  filterProductsAction,
}) {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    const products = await fetchAllProductsAction();
    setProducts(products);
  }

  // FETCH ALL PRODUCTS
  useEffect(() => {
    getProducts();
  }, []);

  const onFilterHandler = async (filterQuery) => {
    // Fetch all products if filterQuery is empty or set to null
    if (!filterQuery) {
      getProducts();
      return;
    }
    // Fetch products based on the filters
    const filteredProductsResponse = await filterProductsAction(filterQuery);
    setProducts(filteredProductsResponse);
  };

  return (
    <>
      <FilterProducts onFilterHandler={onFilterHandler} />
      <div className="flex justify-between">
        <ProductsList products={products} />
        <Basket />
      </div>
    </>
  );
}
