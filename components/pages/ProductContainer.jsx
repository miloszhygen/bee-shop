/*
  Product data structure

  {
    id: 'prod_PQvPpUEDyLZgwn',
    object: 'product',
    active: true,
    attributes: [],
    created: 1706091581,
    default_price: 'price_1Oc3YXI4AFOXjzTClsRL4cRn',
    description: 'Harvested from wildflowers in the Alpine meadows.',
    features: [],
    images: [
      'https://files.stripe.com/links/MDB8YWNjdF8xT0dwc1RJNEFGT1hqelRDfGZsX3Rlc3RfQnZIcHEzNVV3bDlta210RDBLOTFiRXli00JA35wqUI'
    ],
    livemode: false,
    metadata: {},
    name: 'Alpine Blossom Honey',
    package_dimensions: null,
    shippable: null,
    statement_descriptor: null,
    tax_code: 'txcd_20030000',
    type: 'service',
    unit_label: null,
    updated: 1706091582,
    url: null,
    price: {
      unit_amount: 12000,
      ...
    }
  }

*/

"use client";

import { useEffect, useState } from "react";

import Product from "@/components/parts/Product";

export default function ProductContainer({ productId, fetchProductById }) {
  const [product, setProduct] = useState(null);

  async function getProductData() {
    const productData = await fetchProductById(productId);
    setProduct(productData);
  }

  // FETCH PRODUCT BY ID
  useEffect(() => {
    getProductData();
  }, []);

  if (!product) {
    return <div>Fetching product...</div>;
  }
  return (
    <div>
      <Product product={product} />
    </div>
  );
}
