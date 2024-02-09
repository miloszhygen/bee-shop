"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useContext, useState } from "react";

import BasketContext from "@/context/basketContext";

import Loading from "@/components/parts/Loading";

import { updateProductInBasketInLocal } from "@/utils/localStorage";

const TransactionData = ({ data }) => {
  const { sessionStamp, amount_subtotal, currency } = data || {};

  if (!data) {
    return null;
  }
  return (
    <div className="my-10">
      <p id="js_orderNumber">
        Order number: <b>{sessionStamp}</b>
      </p>
      <p id="js_total">
        Total:{" "}
        <b>
          {amount_subtotal / 100} {currency.toUpperCase()}
        </b>
      </p>
    </div>
  );
};

const ThankYouPage = () => {
  const { setShowBasketContext, setBasketProductsContext } =
    useContext(BasketContext);

  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  const orderNumber = searchParams.get("id");

  async function getOrderDetails() {
    // fetch data from transactions/stampId
    const transactionDataResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/transactions/${orderNumber}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const transactionData = await transactionDataResponse.json();

    // TODO: handle failed payment
    setOrderDetails(transactionData);
    setLoading(false);
  }

  // Hide basket and get order details
  useEffect(() => {
    if (orderNumber && !orderDetails) {
      getOrderDetails();
    }

    updateProductInBasketInLocal([]);
    setBasketProductsContext([]);
    setShowBasketContext(false);
  }, []);

  if (loading) {
    return (
      <>
        Please wait...
        <Loading />
      </>
    );
  }
  return (
    <div className="thank-you-page">
      IMAGE HAPPY BEE
      <h1 id="js_success" className="text-4xl">
        Great success!
      </h1>
      <h2 className="text-2xl">Thank you for your order!</h2>
      <div className="">
        {orderDetails && <TransactionData data={orderDetails?.data} />}
      </div>
      <p>You will receive an email with your order confirmation and receipt</p>
    </div>
  );
};

export default ThankYouPage;
