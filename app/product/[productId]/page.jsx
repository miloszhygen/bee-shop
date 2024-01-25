import PageLayout from "@/components/layout/PageLayout.jsx";
import ProductContainer from "@/components/pages/ProductContainer.jsx";

import fetchProductById from "@/actions/fetchProductById.js";

export default function ProductPage({ params }) {
  return (
    <PageLayout>
      <ProductContainer
        productId={params.productId}
        fetchProductById={fetchProductById}
      />
    </PageLayout>
  );
}
