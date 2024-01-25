/*
    PRODUCT data structure

    {
      "id": "prod_PQvPpUEDyLZgwe",
      "object": "product",
      "active": true,
      "attributes": [],
      "created": 1706091581,
      "default_price": "price_1Oc3YXI4AFOXjzTClsRL4cRn",
      "description": "Harvested from wildflowers in the Alpine meadows.",
      "features": [],
      "images": [
        "https://files.stripe.com/links/MDB8YWNjdF8xT0dwc1RJNEFGT1hqelRDfGZsX3Rlc3RfQnZIcHEzNVV3bDlta210RDBLOTFiRXli00JA35wqUI"
      ],
      "livemode": false,
      "metadata": {},
      "name": "Alpine Blossom Honey 2",
      "package_dimensions": null,
      "shippable": null,
      "statement_descriptor": null,
      "tax_code": "txcd_20030000",
      "type": "service",
      "unit_label": null,
      "updated": 1706091582,
      "url": null,
      "price": {
        unit_amount: 12000,
        ...
      }
    }

*/
import Link from "next/link";

import { useContext, useState } from "react";
import Image from "next/image";

import BasketContext from "@/context/basketContext";

const Product = ({ product }) => {
  // Product values
  const { images, name, price, id } = product;
  // Take the first image from the array
  const image = images[0];

  // State
  const [count, setCount] = useState(1);
  // Context
  const { basketProducts, setBasketProducts } = useContext(BasketContext);

  const incrementCount = () => {
    if (count < 10) {
      setCount(count + 1);
    }
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAddToBasket = (prod) => {
    // If the product is not in the basket, add it
    if (!basketProducts.some((product) => product.id === prod.id)) {
      setBasketProducts([...basketProducts, { ...prod, count }]);
      return;
    }
    // If the product is in the basket, update the count
    const productCountUpdated = basketProducts.map((product) => {
      if (product.id === prod.id) {
        return { ...product, count };
      }
      return product;
    });
    setBasketProducts(productCountUpdated);
  };

  return (
    <div>
      <Link href={`/product/${id}`}>
        <Image src={image} alt={name} width={400} height={300} priority />
        <h3>{name}</h3>
        <p>{price?.unit_amount / 100} Kr</p>
      </Link>
      <div className="flex items-center space-x-2">
        <button
          className={`px-3 py-2 border border-gray-300 rounded ${
            count === 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
          onClick={decrementCount}
          disabled={count === 1}
        >
          -
        </button>
        <span>{count}</span>
        <button
          className={`px-3 py-2 border border-gray-300 rounded ${
            count === 10 ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
          onClick={incrementCount}
          disabled={count === 10}
        >
          +
        </button>
      </div>
      <button onClick={() => handleAddToBasket(product)}>Add to basket</button>
    </div>
  );
};
export default Product;
