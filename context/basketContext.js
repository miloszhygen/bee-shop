import { createContext } from "react";

const BasketContext = createContext({
  showBasketContext: false,
  setShowBasketContext: () => {},
  basketProductsContext: [],
  setBasketProductsContext: () => {},
});

export default BasketContext;
