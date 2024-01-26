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
    <form onSubmit={handleSubmit} className="flex text-black">
      <label>
        Name on Card:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Card Number:
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
        />
      </label>
      <label>
        Expiry Date (MM/YY):
        <input
          type="text"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
        />
      </label>
      <label>
        CVC:
        <input
          type="text"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
          required
        />
      </label>
      <button disabled={loading} type="submit">
        {!loading ? "Confirm order" : "Sending order..."}
      </button>
    </form>
  );
};

export default PaymentForm;
