import Product from "@/components/parts/Product";

export default function ProductsList({ products }) {
  return (
    <div>
      {products.map((product) => (
        <Product product={product} key={product?.id} />
      ))}
    </div>
  );
}
