import { useContext, useEffect, useState } from "react";
import BasketContext from "@/context/basketContext";

import {
  getBasketFromLocal,
  updateProductInBasketInLocal,
} from "@/utils/localStorage";

import PaymentForm from "./PaymentForm";

export default function Basket() {
  const { basketProductsContext, setBasketProductsContext } =
    useContext(BasketContext);

  const [products, setProducts] = useState(basketProductsContext);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  // Initial render, check if basketProductsContext is empty
  // If empty, get basket from local storage
  // If not empty, set products from context in state
  useEffect(() => {
    if (!basketProductsContext || basketProductsContext?.length === 0) {
      const basketFromLocal = getBasketFromLocal();
      setBasketProductsContext(basketFromLocal);
      setProducts(basketFromLocal);
    }
  }, []);

  // If changes in basketProductsContext, update products in state
  useEffect(() => {
    setProducts(basketProductsContext);
  }, [basketProductsContext]);

  const removeProduct = (prod) => {
    const confirm = window.confirm(
      `Are you sure you want to remove "${prod?.name}" from the basket?`
    );
    if (confirm) {
      const updatedProducts = basketProductsContext.filter(
        (product) => product.id !== prod.id
      );

      setBasketProductsContext(updatedProducts);
      updateProductInBasketInLocal(updatedProducts);
    }
  };

  const togglePaymentForm = () => {
    setShowPaymentForm(!showPaymentForm);
  };
  return (
    <div>
      <h3>🧺 BASKET</h3>
      <ul>
        {products.map((product) => (
          <li key={product?.id}>
            {product?.count} x {product?.name} (
            {product?.price?.unit_amount / 100} {"NOK"}) |{" "}
            {(product?.price?.unit_amount * product?.count) / 100} {"NOK"}
            <div onClick={() => removeProduct(product)}>remove</div>
          </li>
        ))}
      </ul>
      TOTAL:{" "}
      {products.reduce(
        (acc, curr) => acc + curr.price?.unit_amount * curr.count,
        0
      ) / 100}{" "}
      <div>
        <button
          className={` ${
            products.length === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={products.length === 0}
          onClick={togglePaymentForm}
        >
          Go to payment
        </button>
      </div>
      {showPaymentForm && <PaymentForm />}
    </div>
  );
}
