// https://docs.cypress.io/api/introduction/api.html

describe("Login", () => {
  it("Sign-in should be visible if logged out", () => {
    cy.visit("/").get("#firebaseui-auth-container").should("be.visible");
  })

  it("Sign-in should not be visible if logged in", () => {
    cy.login().visit("/")
      .get("#firebaseui-auth-container").should("not.be.visible")
      .logout();
  })

  it("Login should redirect to controlroom", () => {
    cy.login()
      .url().should("include", "controlroom")
      .get("div.controlRoom").should("be.visible")
      .logout();
  })

  it("Logout", () => {
    cy.login()
      .get('a[name="Logout"]').click()
      .url().should("include", "logout");
  });
});
