import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import BasketContext from "@/context/basketContext";

import { updateProductInBasketInLocal } from "@/utils/localStorage";

const PaymentForm = () => {
  const router = useRouter();

  const { setBasketProductsContext } = useContext(BasketContext);

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");

  const inputStyles =
    "block rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2";

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const paymentDetails = {
      name,
      cardNumber,
      expiryDate,
      cvc,
    };

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentDetails),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // payment successful
      const data = await response.json();

      // Redirect based on the response
      if (data.ok) {
        updateProductInBasketInLocal([]);
        setBasketProductsContext([]);
        router.push(`/thank-you?orderNumber=${data.orderNumber}`);
      }
    } catch (error) {
      // TODO: Show error message to user
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
      <label className="block">
        Name on Card:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`${inputStyles} w-full`}
          required
        />
      </label>
      <label className="block">
        Card Number:
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className={`${inputStyles} w-full`}
          required
        />
      </label>
      <label className="block">
        Expiry Date (MM/YY):
        <input
          type="text"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          className={`${inputStyles} w-full`}
          required
        />
      </label>
      <label className="block">
        CVC:
        <input
          type="text"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
          className={`${inputStyles} `}
          required
        />
      </label>
      <button
        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-70"
        disabled={loading}
        type="submit"
      >
        {!loading ? "Confirm order" : "Sending order..."}
      </button>
    </form>
  );
};

export default PaymentForm;
