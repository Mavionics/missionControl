describe('Navigate', () => {
  it('Default to home', () => {
    cy.visit('/')
    cy.get('.navbar').should('be.visible')
  }),
  it('Navbar on home', () => {
    cy.visit('/home')
    cy.get('.navbar').should('be.visible')
    cy.get('.home').should('be.visible')
  }),
  
  it('Navbar on about', () => {
    cy.visit('/about')
    cy.get('.navbar').should('be.visible')
    cy.get('.about').should('be.visible')
  }),
  
  it('Not possible to go to controlroom when not logged in', () => {
    cy.visit('/controlroom')
    cy.get('.navbar').should('be.visible')
    cy.get('.controlRoom').should('be.not.visible')
    cy.get('.home').should('be.visible')
  }),

  it('Possible to go to controlroom when logged in', () => {
    cy.login()
    cy.visit('/controlroom')
    cy.get('.navbar').should('be.visible')
    cy.get('.controlRoom').should('be.visible')
    cy.get('.home').should('be.visible')
    cy.get('.logout').should('be.visible')
  })
})