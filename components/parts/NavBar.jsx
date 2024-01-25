"use client";

import Link from "next/link";

const NavBar = () => {
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
          <div className="flex items-center mr-2">Login</div>
          <div className="flex items-center">Basket</div>
        </div>
      </nav>
    </header>
  );
};
export default NavBar;
