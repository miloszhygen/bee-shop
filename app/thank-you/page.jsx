"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useContext } from "react";

import BasketContext from "@/context/basketContext";

const ThankYouPage = () => {
  const { setShowBasketContext } = useContext(BasketContext);
  const searchParams = useSearchParams();

  // TODO: FETCH ORDER NUMBER from database
  const orderNumber = searchParams.get("orderNumber");

  // Hide basket
  useEffect(() => {
    setShowBasketContext(false);
  }, []);

  return (
    <div className="thank-you-page">
      IMAGE HAPPY BEE
      <h1>Great success!</h1>
      <h2>Thank you for your order!</h2>
      <p>
        Your order number is: <br /> {orderNumber}
      </p>
      <p>You will receive an email with your order confirmation and receipt</p>
    </div>
  );
};

export default ThankYouPage;
