import {
  connectWithUserCredentialsViaGui,
  getTokenDuration,
  getTokenCookie,
  login
} from '../../common/cypress/Authentication/Helpers'

describe('Log Consumer in', function(){
  context('Login functionality', function() {
    
    const email = 'test@example.com'
    const password = 'password'

    beforeEach(() => getTokenCookie().should('not.exist'))

    // TODO: the same test needs to be run on the management-frontend side; maybe we could just 
    // TODO: put this test into the common repo and import it somehow
    it('redirects to home page if identified Consumer browses /login', function () {
      // Given
      cy.stubServer(`Authentication/LogConsumerIn/Consommateur`)
      login(email, password)

      // When
      cy.visit('/login')

      // Then
      cy.url().should('not.include', '/login')
    })

    it('pops up an error message if a Consumer logs in with invalid e-mail and password', function() {
      // Given
      cy.stubServer('Authentication/LogConsumerIn/WrongCredentials')

      // When
      cy.visit('/login')
      connectWithUserCredentialsViaGui(email, password)

      // Then
      cy.get('@graphql').then(() => {
        cy.get('.incorrectIdentifiers')
          .should('be.visible')
      })
    })

    it('pops up an error message if a registered Consumer logs in with an invalid password', function() {
      // Given
      cy.stubServer('Authentication/LogConsumerIn/WrongCredentials')

      // When
      cy.visit('/login')
      connectWithUserCredentialsViaGui(email, password)

      // Then
      cy.get('@graphql').then(() => {
        cy.get('.incorrectIdentifiers')
          .should('be.visible')
      })
    })

    it('opens a session if the Consumer provides the correct credentials', function() {
      // Given
      cy.stubServer(`Authentication/LogConsumerIn/Consommateur`)

      // When
      cy.visit('/login')
      connectWithUserCredentialsViaGui(email, password)

      // Then
      cy.get('@graphql').then(() => {
        getTokenCookie().should('exist')
      })
    })
  })
})