import ProductContainer from "@/components/pages/ProductContainer.jsx";

import fetchProductById from "@/actions/fetchProductById.js";

export default function ProductPage({ params }) {
  return (
    <>
      <ProductContainer
        productId={params.productId}
        fetchProductById={fetchProductById}
      />
    </>
  );
}
