import ProductContainer from "@/components/pages/ProductContainer.jsx";

import fetchProductByIdAction from "@/actions/fetchProductByIdAction.js";

export default function ProductPage({ params }) {
  return (
    <>
      <ProductContainer
        productId={params.productId}
        fetchProductByIdAction={fetchProductByIdAction}
      />
    </>
  );
}
