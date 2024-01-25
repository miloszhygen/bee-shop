import { useContext } from "react";
import BasketContext from "@/context/basketContext";

export default function Basket() {
  const { basketProducts, setBasketProducts } = useContext(BasketContext);

  const removeProduct = (name) => {
    setBasketProducts(
      basketProducts.filter((product) => product.name !== name)
    );
  };

  return (
    <div>
      <h3>BASKET</h3>
      <ul>
        {basketProducts.map((product) => (
          <li key={product?.id}>
            {product?.count} x {product?.name} ({product?.price / 100} {"NOK"})
            | {(product?.price * product?.count) / 100} {"NOK"}
            <div onClick={() => removeProduct(product.name)}>remove</div>
          </li>
        ))}
      </ul>
      TOTAL:{" "}
      {basketProducts.reduce((acc, curr) => acc + curr.price * curr.count, 0) /
        100}{" "}
      <div>
        <button>Go to payment</button>
      </div>
    </div>
  );
}
