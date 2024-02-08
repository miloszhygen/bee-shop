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
  const { images, name, price, description } = product;

  const image = images?.[0];

  return (
    <>
      <div className="bg-white">
        <div className="pt-6">
          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <Image
                src={image}
                alt={name}
                width={400}
                height={300}
                priority
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product info */}
          <div>
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {name}
                </h1>
              </div>

              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  {price?.unit_amount / 100} NOK
                </p>

                <div className="flex items-center space-x-2  text-black mt-8">
                  <button
                    className={`px-3 py-2 border border-gray-300 rounded ${
                      count === 1
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer"
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
                  type="button"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => handleAddToBasket(product)}
                >
                  Add to basket
                </button>
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                <div>
                  <h3 className="sr-only">Description</h3>
                  <div className="space-y-6">
                    <p className="text-base text-gray-900">{description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCardLink;
