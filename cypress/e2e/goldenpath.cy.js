describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#js_acceptCookies").click();
    cy.get("#js_addToBasket_prod_PQvPpUEDyLZgwn").click();
    cy.get("#js_basket").click();
    cy.get("#js_goToPayment").click();
    cy.wait(3000);
    cy.get("#js_success").should("have.text", "Great success!");
    cy.get("#js_orderNumber").should(
      "have.text",
      "Order number: test_stamp_id"
    );
    cy.get("#js_total").should("have.text", "Total: 1337 NOK");
  });
});
