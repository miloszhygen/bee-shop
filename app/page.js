import { fetchAllProducts } from "@/actions/fetchAllProducts";

import ShopContainer from "@/components/pages/ShopContainer";

export default function Home() {
  return (
    <>
      <ShopContainer fetchAllProducts={fetchAllProducts} />
    </>
  );
}
