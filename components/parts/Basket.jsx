import Link from "next/link";
import Image from "next/image";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { Fragment, useContext, useEffect, useState } from "react";
import BasketContext from "@/context/basketContext";

import {
  getBasketFromLocal,
  updateProductInBasketInLocal,
} from "@/utils/localStorage";

import PaymentForm from "./PaymentForm";

export default function Basket() {
  const {
    basketProductsContext,
    setBasketProductsContext,
    showBasketContext,
    setShowBasketContext,
  } = useContext(BasketContext);

  const [products, setProducts] = useState(basketProductsContext);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  // Initial render, check if basketProductsContext is empty
  // If empty, get basket from local storage
  // If not empty, set products from context in state
  useEffect(() => {
    if (!basketProductsContext || basketProductsContext?.length === 0) {
      const basketFromLocal = getBasketFromLocal();
      setBasketProductsContext(basketFromLocal);
      setProducts(basketFromLocal);
    }
  }, []);

  // If changes in basketProductsContext, update products in state
  useEffect(() => {
    setProducts(basketProductsContext);
  }, [basketProductsContext]);

  const removeProduct = (prod) => {
    const confirm = window.confirm(
      `Are you sure you want to remove "${prod?.name}" from the basket?`
    );
    if (confirm) {
      const updatedProducts = basketProductsContext.filter(
        (product) => product.id !== prod.id
      );

      setBasketProductsContext(updatedProducts);
      updateProductInBasketInLocal(updatedProducts);
    }
  };

  const togglePaymentForm = () => {
    setShowPaymentForm(!showPaymentForm);
  };

  const setOpen = () => {
    setShowBasketContext(false);
  };

  const setClose = () => {
    setShowPaymentForm(false);

    setShowBasketContext(true);
  };
  return (
    <>
      <Transition.Root show={showBasketContext} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Your basket
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={setOpen}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {products.map((product) => (
                                <li key={product.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <Image
                                      src={product.images[0]}
                                      alt={product.name}
                                      width={200}
                                      height={200}
                                      priority
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <Link href={`/product/${product.id}`}>
                                            {product.name}
                                          </Link>
                                        </h3>

                                        <p className="ml-4">
                                          {product?.price?.unit_amount / 100}{" "}
                                          NOK
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500">
                                        Qty {product?.count}
                                      </p>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          onClick={() => removeProduct(product)}
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>
                            {" "}
                            {products.reduce(
                              (acc, curr) =>
                                acc + curr.price?.unit_amount * curr.count,
                              0
                            ) / 100}
                            .00 NOK
                          </p>
                        </div>

                        {!showPaymentForm && (
                          <div className="mt-6">
                            <button
                              className={`flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-70 ${
                                products.length === 0
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                              disabled={products.length === 0}
                              onClick={togglePaymentForm}
                            >
                              Go to payment
                            </button>
                          </div>
                        )}
                        <div className="mt-6  text-gray-500">
                          {showPaymentForm && (
                            <>
                              <div className="pb-4">
                                <small>
                                  For testing purposes write whatever you want
                                  in to the payment fields
                                </small>
                              </div>
                              <PaymentForm />
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
