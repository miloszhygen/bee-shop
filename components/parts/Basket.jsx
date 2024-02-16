import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { Fragment, useContext, useEffect, useState } from "react";
import BasketContext from "@/context/basketContext";

import { TEST } from "@/config";

import {
  getBasketFromLocal,
  updateProductInBasketInLocal,
} from "@/utils/localStorage";

// STRIPE
let loadStripe = {};

// Load stripe dynamically
if (!TEST) {
  import("@stripe/stripe-js").then((Stripe) => {
    loadStripe = Stripe.loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    );
  });
}

export default function Basket() {
  const router = useRouter();

  // Context values
  const {
    basketProductsContext,
    setBasketProductsContext,
    showBasketContext,
    setShowBasketContext,
  } = useContext(BasketContext);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [products, setProducts] = useState(basketProductsContext);

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

  const togglePaymentForm = async () => {
    setLoading(true);

    if (TEST) {
      router.push("/thank-you?id=test_stamp_id");
      return;
    }
    // products mapped to lineItems -> price and quantity
    const lineItems = products.map((product) => ({
      price: product?.default_price,
      quantity: product?.count,
    }));

    // If no lineItems show error message
    if (lineItems.length === 0) {
      alert("No products in basket");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/checkout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lineItems,
        }),
      }
    );

    const session = await res.json();
    // Redirect to Stripe Checkout
    const stripe = await loadStripe;
    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (error) {
      // Handle any errors
      console.log({ error });
      // TODO: create an error message component
      setErrorMessage(error);
    }
    setLoading(false);
  };

  const setOpen = () => {
    setShowBasketContext(false);
  };

  const setClose = () => {
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

                        <div className="mt-6 text-red-500">
                          <small>
                            When doing a test payment, use the following:
                            <br />
                            Card number: 4242 4242 4242 4242
                            <br />
                            For testing purposes write whatever you want in to
                            the payment fields &quot;Exp date&quot; and CVC
                          </small>
                          {/* TODO: {errorMessage} */}
                          <button
                            id="js_goToPayment"
                            className={`mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-70 ${
                              products.length === 0
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            disabled={products.length === 0 || loading}
                            onClick={togglePaymentForm}
                          >
                            Go to payment
                          </button>
                          <p className="mt-2 text-center text-sm text-gray-600">
                            By clicking the button you will be redirected to{" "}
                            <a
                              href="https://stripe.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              Stripe
                            </a>{" "}
                            to complete the payment.
                          </p>
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
