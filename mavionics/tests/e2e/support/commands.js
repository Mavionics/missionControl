// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add(
  "login",
  (email = "test@test.com", password = "testtest") => {
    cy.visit("/")
      .get(".mdl-textfield__input").click()

      .get("input.firebaseui-id-email").type(email).should("have.value", email).type("{enter}")

      .get("input.firebaseui-id-password").type(password).type("{enter}")

      .url().should("include", "controlroom");
  }
),
  // cy.visit("/autologin/email/" + email + "/password/" + password);

  Cypress.Commands.add("logout", () => {
    return cy.visit("/", { timeout: 10000 })
      .get('body').then(($body) => {
        cy.get('a[name="Logout"]').click();
      });
  });
