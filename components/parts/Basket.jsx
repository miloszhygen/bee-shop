import { useContext } from "react";
import BasketContext from "@/context/basketContext";

export default function Basket() {
  const { basketProducts, setBasketProducts } = useContext(BasketContext);

  const removeProduct = (prod) => {
    const confirm = window.confirm(
      `Are you sure you want to remove "${prod?.name}" from the basket?`
    );
    if (confirm) {
      setBasketProducts(
        basketProducts.filter((product) => product.id !== prod.id)
      );
    }
  };

  return (
    <div>
      <h3>🧺 BASKET</h3>
      <ul>
        {basketProducts.map((product) => (
          <li key={product?.id}>
            {product?.count} x {product?.name} (
            {product?.price?.unit_amount / 100} {"NOK"}) |{" "}
            {(product?.price?.unit_amount * product?.count) / 100} {"NOK"}
            <div onClick={() => removeProduct(product)}>remove</div>
          </li>
        ))}
      </ul>
      TOTAL:{" "}
      {basketProducts.reduce(
        (acc, curr) => acc + curr.price?.unit_amount * curr.count,
        0
      ) / 100}{" "}
      <div>
        <button>Go to payment</button>
      </div>
    </div>
  );
}
