"use client";

// Modules
import { useState } from "react";
// Context
import BasketContext from "@/context/basketContext";
// Components
import NavBar from "@/components/parts/NavBar";
import CookieMessage from "@/components/parts/CookieMessage";
import Footer from "@/components/parts/Footer";

const PageLayout = ({ children }) => {
  const [basketProducts, setBasketProducts] = useState([]);

  return (
    <BasketContext.Provider value={{ basketProducts, setBasketProducts }}>
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow p-2 ">
          <NavBar />
          <main className="pt-10 container p-2 max-w-screen-xl bg-slate-800">
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
