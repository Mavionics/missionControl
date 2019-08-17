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

Cypress.Commands.add("login",
  (email = "test@test.com", password = "testtest") => {
    return cy.visit("/autologin/email/" + email + "/password/" + password);
  }
);

Cypress.Commands.add(
  "login_visit",
  (email = "test@test.com", password = "testtest") => {
    // cy.visit("/autologin/email/" + email + "/password/" + password);
    return cy.visit("/")
      .get(".mdl-textfield__input").click()

      .get("input.firebaseui-id-email").type(email).should("have.value", email).type("{enter}")

      .get("input.firebaseui-id-password").type(password).type("{enter}")

      .url().should("include", "controlroom").wait(2000);
  }
);

Cypress.Commands.add("logout_visit", () => {
  return cy.visit("/")
    .get('nav.navbar').then(($body) => {
      if ($body.find('li[name="User"]').length > 0) {
        cy.get('li[name="User"]').click().then(($body) => {
          if ($body.find('.dropdown-item[name="Logout"]').length > 0) {
            cy.get('.dropdown-item[name="Logout"]').click()
          }
        });
      }
    });
});

Cypress.Commands.add("logout", () => {
  return cy.visit("/logout");
});