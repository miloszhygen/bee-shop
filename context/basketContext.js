import { createContext } from "react";

const BasketContext = createContext({
  basketProductsContext: [],
  setBasketProductsContext: () => {},
});

export default BasketContext;
