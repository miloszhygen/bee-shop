"use client";

import { useContext, useEffect } from "react";
import Link from "next/link";
import BasketContext from "@/context/basketContext";

import { getBasketFromLocal } from "@/utils/localStorage";

const NavBar = () => {
  const {
    basketProductsContext,
    setShowBasketContext,
    showBasketContext,
    setBasketProductsContext,
  } = useContext(BasketContext);

  useEffect(() => {
    if (!basketProductsContext || basketProductsContext?.length === 0) {
      const basketFromLocal = getBasketFromLocal();
      setBasketProductsContext(basketFromLocal);
    }
  }, []);

  const showBasket = () => {
    setShowBasketContext(!showBasketContext);
  };

  return (
    <header>
      <nav className="flex justify-between px-2 h-10">
        <div className="flex mt-1">
          <Link href="/">
            LOGO
            <span className="sr-only">Bee Delight</span>
          </Link>
        </div>
        <div className="flex justify-between px-2 h-10">
          {/* <div className="flex items-center mr-2">Login</div> */}
          <div className="flex items-center">
            <button onClick={showBasket}>
              Basket ({basketProductsContext.length})
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default NavBar;
