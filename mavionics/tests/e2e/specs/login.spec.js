// https://docs.cypress.io/api/introduction/api.html

describe("Login", () => {
  beforeEach(() => {
    cy.logout()
  })

  it("Sign-in should be visible if logged out", () => {
    cy.visit("/").get("#firebaseui-auth-container").should("be.visible");
  })

  it("Sign-in should not be visible if logged in", () => {
    cy.login()
      .url().should("include", "controlroom")
      .get("div.controlRoom").should("be.visible")
      .visit("/")
      .get("#firebaseui-auth-container").should("not.be.visible");
  })

  it("Login should redirect to controlroom", () => {
    cy.login()
      .url().should("include", "controlroom")
      .get("div.controlRoom").should("be.visible");
  })

  it("Logout", () => {
    cy.login().logout()
      .url().should("include", "logout");
  });
});
