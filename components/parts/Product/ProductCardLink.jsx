/*
    <ProductCardLink
      product={product}
      handleAddToBasket={handleAddToBasket}
      count={count}
      decrementCount={decrementCount}
      incrementCount={incrementCount}
    />

*/

import Link from "next/link";
import Image from "next/image";

const ProductCardLink = ({
  product,
  handleAddToBasket,
  count,
  decrementCount,
  incrementCount,
}) => {
  const { images, name, price, id } = product;
  const image = images[0];

  return (
    <>
      <div key={id} className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <Image
            src={image}
            alt={name}
            width={400}
            height={300}
            priority
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div tabIndex="0" className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-700">
              <Link href={`/product/${id}`}>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-5/6 "
                />
                {name}
              </Link>
            </h3>
          </div>
          <p className="text-sm font-medium text-gray-900">
            {price?.unit_amount / 100} Kr
          </p>
        </div>
        <div className="flex justify-between text-black mt-4">
          <div className="flex items-center space-x-2 mr-2">
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
                count === 10
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }`}
              onClick={incrementCount}
              disabled={count === 10}
            >
              +
            </button>
          </div>
          <button
            onClick={() => handleAddToBasket(product)}
            type="submit"
            className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-2 py-1 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add to basket
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCardLink;
