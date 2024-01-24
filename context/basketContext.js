import { createContext } from "react";

const BasketContext = createContext({
  basketProducts: [],
  setBasketProducts: () => {},
});

export default BasketContext;
