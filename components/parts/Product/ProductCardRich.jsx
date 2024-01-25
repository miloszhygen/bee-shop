/*
    <ProductCardRich
      product={product}
      handleAddToBasket={handleAddToBasket}
      count={count}
      decrementCount={decrementCount}
      incrementCount={incrementCount}
    />

*/

import Image from "next/image";

const ProductCardLink = ({
  product,
  handleAddToBasket,
  count,
  decrementCount,
  incrementCount,
}) => {
  const { images, name, price } = product;

  const image = images[0];

  return (
    <div>
      <h3>{name}</h3>
      <Image src={image} alt={name} width={400} height={300} priority />
      <p>{price?.unit_amount / 100} Kr</p>
      <div className="flex items-center space-x-2">
        <button
          className={`px-3 py-2 border border-gray-300 rounded ${
            count === 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
          onClick={decrementCount}
          disabled={count === 1}
        >
          -
        </button>
        <span>{count}</span>
        <button
          className={`px-3 py-2 border border-gray-300 rounded ${
            count === 10 ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
          onClick={incrementCount}
          disabled={count === 10}
        >
          +
        </button>
      </div>
      <button onClick={() => handleAddToBasket(product)}>Add to basket</button>
    </div>
  );
};

export default ProductCardLink;
