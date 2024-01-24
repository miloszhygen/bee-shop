"use client";

import NavBar from "../parts/NavBar";
import CookieMessage from "../parts/CookieMessage";
import Footer from "../parts/Footer";

export const PageLayout = ({ children }) => {
  return (
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
  );
};
