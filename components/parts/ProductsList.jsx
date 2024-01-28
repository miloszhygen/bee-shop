import Product from "@/components/parts/Product";

export default function ProductsList({ products }) {
  return (
    <>
      {products.map((product) => (
        <Product product={product} key={product?.id} />
      ))}
    </>
  );
}
