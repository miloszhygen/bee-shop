import { useContext } from "react";
import BasketContext from "@/context/basketContext";

export default function Basket() {
  const { basketProducts, setBasketProducts } = useContext(BasketContext);

  return (
    <div>
      <h3>BASKET</h3>
      <ul>
        {basketProducts.map((product) => (
          <li key={product?.name}>{product?.name} REMOVE</li>
        ))}
      </ul>
    </div>
  );
}
