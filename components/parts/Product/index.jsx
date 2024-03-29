/*

  import Product from "@/components/parts/Product";

  <Product
    product={product}
    rich
  />

  product => product data
  rich => boolean to display rich product card
    dont pass rich if you want to display a link to the product page

  the ProductCardRich is used on the product page
  the ProductCardLink is used on the shop page

*/

import { useContext, useState, useEffect } from "react";

import BasketContext from "@/context/basketContext";

import {
  addToBasketInLocal,
  updateProductInBasketInLocal,
} from "@/utils/localStorage";

import ProductCardLink from "@/components/parts/Product/ProductCardLink";
import ProductCardRich from "@/components/parts/Product/ProductCardRich";

const Product = ({ product, rich }) => {
  const {
    basketProductsContext,
    setBasketProductsContext,
    setShowBasketContext,
  } = useContext(BasketContext);

  const basketProduct = basketProductsContext.find(
    (prod) => prod.id === product?.id
  );

  // Product values
  const { count: productCount } = basketProduct ?? product;

  // State
  const [count, setCount] = useState(productCount ?? 1);

  // Close basket if open and user has clicked a product from the list of products in basket
  useEffect(() => {
    setShowBasketContext(false);
  }, []);

  // Listen for changes in basketProductsContext
  useEffect(() => {
    if (basketProduct) {
      setCount(basketProduct.count);
    }
  }, [basketProduct]);

  const incrementCount = () => {
    if (count < 10) {
      setCount(count + 1);
    }
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAddToBasket = (prod) => {
    // If the product is not in the basket, add it
    if (!basketProductsContext.some((product) => product.id === prod.id)) {
      const updatedProducts = { ...prod, count };
      setBasketProductsContext([...basketProductsContext, updatedProducts]);
      addToBasketInLocal(updatedProducts);
      return;
    }
    // If the product is in the basket, update the count
    const productCountUpdated = basketProductsContext.map((product) => {
      if (product.id === prod.id) {
        return { ...product, count };
      }
      return product;
    });
    setBasketProductsContext(productCountUpdated);
    updateProductInBasketInLocal(productCountUpdated);
  };

  return (
    <>
      {rich ? (
        <ProductCardRich
          product={product}
          handleAddToBasket={handleAddToBasket}
          count={count}
          decrementCount={decrementCount}
          incrementCount={incrementCount}
        />
      ) : (
        <ProductCardLink
          product={product}
          handleAddToBasket={handleAddToBasket}
          count={count}
          decrementCount={decrementCount}
          incrementCount={incrementCount}
        />
      )}
    </>
  );
};
export default Product;
