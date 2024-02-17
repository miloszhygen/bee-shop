describe("Accessibility tests across multiple pages", () => {
  const pagesToTest = [
    "/",
    "/product/prod_PQvPpUEDyLZgwn",
    "/accessibility",
    // Add more paths as needed
  ];

  pagesToTest.forEach((page) => {
    it(`Has no detectable a11y violations on ${page}`, () => {
      cy.visit(`http://localhost:3000${page}`);
      cy.injectAxe(); // Make sure Axe is available on the page
      cy.checkA11y(); // Run accessibility checks
    });
  });
});
