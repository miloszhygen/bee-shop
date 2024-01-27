import fetchAllProductsAction from "@/actions/fetchAllProductsAction";
import filterProductsAction from "@/actions/filterProductsAction";

import ShopContainer from "@/components/pages/ShopContainer";

export default function Home() {
  return (
    <>
      <ShopContainer
        fetchAllProductsAction={fetchAllProductsAction}
        filterProductsAction={filterProductsAction}
      />
    </>
  );
}
