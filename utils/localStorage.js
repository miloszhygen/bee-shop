export const addToBasketInLocal = (product) => {
  let basket = JSON.parse(localStorage.getItem("basket")) || [];
  basket.push(product);
  localStorage.setItem("basket", JSON.stringify(basket));
};

export const updateProductInBasketInLocal = (updatedProducts) => {
  localStorage.setItem("basket", JSON.stringify(updatedProducts));
};

export const getBasketFromLocal = () => {
  return JSON.parse(localStorage.getItem("basket")) || [];
};
