describe("Login", () => {
  it("Login Command", () => {
    cy.login();
  })

  it("Logout Command", () => {
    cy.logout();
  })

})