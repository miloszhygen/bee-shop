"use client";

// Modules
import { useState } from "react";
// Context
import BasketContext from "@/context/basketContext";
// Components
import NavBar from "@/components/parts/NavBar";
import Basket from "@/components/parts/Basket";
import CookieMessage from "@/components/parts/CookieMessage";
import Footer from "@/components/parts/Footer";

const PageLayout = ({ children }) => {
  const [basketProductsContext, setBasketProductsContext] = useState([]);
  const [showBasketContext, setShowBasketContext] = useState(false);

  return (
    <BasketContext.Provider
      value={{
        basketProductsContext,
        setBasketProductsContext,
        showBasketContext,
        setShowBasketContext,
      }}
    >
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow">
          <NavBar />
          {showBasketContext && <Basket />}
          <main className="pt-10 container p-0 max-w-screen-xl">
            {children}
          </main>
        </div>
        <CookieMessage />
        <Footer />
      </div>
    </BasketContext.Provider>
  );
};

export default PageLayout;
