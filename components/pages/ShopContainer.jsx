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
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <FilterProducts onFilterHandler={onFilterHandler} />
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            <ProductsList products={products} />
          </div>
        </div>
      </div>
    </>
  );
}
