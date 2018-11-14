// https://docs.cypress.io/api/introduction/api.html

describe('Login', () => {
  it('Sign-in should be visible', () => {
    cy.visit('/')
    cy.get('#firebaseui-auth-container').should('be.visible')
  }),
  it('Login should redirect to controlroom', () => {
    const email = "test@test.com"
    cy.visit('/')
    cy.get('.mdl-textfield__input').click()


    cy.get('input.firebaseui-id-email').type(email)
    .should('have.value', email)
    .type('{enter}')

    cy.get('input.firebaseui-id-password').type('testtest')
    .type('{enter}')

    cy.url().should('include', 'controlroom')
  }),
  it.skip('Log in', ()=> {
    cy.visit('/')
    // cy.login()
  })
})