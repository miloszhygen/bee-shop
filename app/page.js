import { fetchAllProducts } from "@/actions/fetchAllProducts";

import ShopContainer from "@/components/pages/shopContainer";

export default function Home() {
  return (
    <>
      <ShopContainer fetchAllProducts={fetchAllProducts} />
    </>
  );
}
