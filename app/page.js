import { fetchAllProducts } from "@/actions/fetchAllProducts";

import PageLayout from "@/components/layout/PageLayout";
import ShopContainer from "@/components/pages/shopContainer";

export default function Home() {
  return (
    <PageLayout>
      <ShopContainer fetchAllProducts={fetchAllProducts} />
    </PageLayout>
  );
}
