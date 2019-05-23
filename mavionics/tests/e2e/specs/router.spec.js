/// <reference types="cypress" />

describe("Navigate", () => {
  it("Default to home", () => {
    cy.visit("/")
      .get(".navbar").should("be.visible");
  });

  it("Navbar on home", () => {
    cy.visit("/home")
      .get(".navbar").should("be.visible")
      .get(".home").should("be.visible");
  });

  it("Navbar on about", () => {
    cy.visit("/about")
      .get(".navbar").should("be.visible")
      .get(".about").should("be.visible");
  });

  it("Not possible to go to controlroom when not logged in", () => {
    // cy.logout();
    cy.visit("/controlroom")
      .get(".navbar").should("be.visible")
      .get('a[name="ControlRoom"]').should("be.not.visible")
      .get('a[name="Home"]').should("be.visible");
  });

  it("Possible to go to controlroom when logged in", () => {
    cy.login()
      .get('a[name="ControlRoom"]').should("be.visible")
      .get('a[name="Home"]').should("be.visible")
      .get('a[name="Logout"]').should("be.visible").logout();
  });
});
