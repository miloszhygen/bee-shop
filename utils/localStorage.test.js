import {
  addToBasketInLocal,
  updateProductInBasketInLocal,
  getBasketFromLocal,
} from "./localStorage";

describe("localStorage functions", () => {
  let getItemSpy, setItemSpy;

  beforeEach(() => {
    // Setup spies
    getItemSpy = jest.spyOn(Storage.prototype, "getItem");
    setItemSpy = jest.spyOn(Storage.prototype, "setItem");
  });

  afterEach(() => {
    // Cleanup spies
    getItemSpy.mockRestore();
    setItemSpy.mockRestore();
  });

  it("adds products to basket in local storage", () => {
    const product = { id: 1, name: "Product 1" };
    addToBasketInLocal(product);
    expect(setItemSpy).toHaveBeenCalledWith(
      "basket",
      JSON.stringify([product])
    );
  });

  it("updates products in basket in local storage", () => {
    const updatedProducts = [{ id: 1, name: "Updated Product 1" }];
    updateProductInBasketInLocal(updatedProducts);
    expect(setItemSpy).toHaveBeenCalledWith(
      "basket",
      JSON.stringify(updatedProducts)
    );
  });

  it("gets basket from local storage", () => {
    const products = [{ id: 1, name: "Product 1" }];
    getItemSpy.mockReturnValue(JSON.stringify(products));
    expect(getBasketFromLocal()).toEqual(products);
  });
});
