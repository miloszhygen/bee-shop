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
      "price": 12000
    }

*/

import { useContext } from "react";
import Image from "next/image";

import BasketContext from "@/context/basketContext";

const Product = ({ product }) => {
  const { basketProducts, setBasketProducts } = useContext(BasketContext);
  const { images, name, price } = product;

  const handleAddToBasket = (name) => {
    setBasketProducts([...basketProducts, { name }]);
  };
  // Take the first image from the array
  const image = images[0];
  return (
    <div>
      <Image src={image} alt={name} width={400} height={300} priority />
      <h3>{name}</h3>
      <p>{price / 100} Kr</p>
      <button onClick={() => handleAddToBasket(name)}>ADD</button>
    </div>
  );
};

export default function ProductsList({ products }) {
  return (
    <div>
      {products.map((product) => (
        <Product product={product} key={product?.id} />
      ))}
    </div>
  );
}
