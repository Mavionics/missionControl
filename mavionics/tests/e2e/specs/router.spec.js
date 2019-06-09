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
      .get(".about").should("be.visible")
      .url().should("include", "about");
  });

  it("Not possible to go to controlroom when not logged in", () => {
    cy.visit("/controlroom")
      .get(".navbar").should("be.visible")
      .get('[name="ControlRoom"] > .nav-link').should("be.not.visible")
      .get('[name="Home"] > .nav-link').should("be.visible");
  });

  it("Possible to go to controlroom when logged in", () => {
    cy.login()
      .get('[name="ControlRoom"] > .nav-link').should("be.visible")
      .get('[name="Home"] > .nav-link').should("be.visible")
      .get('li[name = "User"]').should("be.visible").click()
      .get('.dropdown-item[name="Logout"]').should("be.visible").click();
  });
});
