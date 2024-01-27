import { fetchAllProductsAction } from "@/actions/fetchAllProductsAction";

import ShopContainer from "@/components/pages/ShopContainer";

export default function Home() {
  return (
    <>
      <ShopContainer fetchAllProductsAction={fetchAllProductsAction} />
    </>
  );
}
