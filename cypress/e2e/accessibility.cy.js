describe("Accessibility tests across multiple pages", () => {
  const pagesToTest = ["/", "/product/prod_PQvPpUEDyLZgwn", "/accessibility"];

  pagesToTest.forEach((page) => {
    it(`Has no detectable a11y violations on ${page}`, () => {
      cy.visit(`http://localhost:3000${page}`);
      // Make sure Axe is available on the page
      cy.injectAxe();
      // Run accessibility checks
      cy.checkA11y();
    });
  });
});
