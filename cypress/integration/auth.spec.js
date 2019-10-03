import {
  checkIfLinkIsActive,
  connectWithUserCredentialsViaGui,
  getTokenCookie,
  login,
  navigateTo
} from '../../common/cypress/Authentication/Helpers'
import TokenHandler from '../../common/cypress/Authentication/TokenHandler'
import types from '../../common/types'

describe('Consumer authentication', function(){

  context('Log consumer in', function() {
    
    const email = 'test@example.com'
    const password = 'password'

    beforeEach(() => getTokenCookie().should('not.exist'))

    // TODO: the same test needs to be run on the management-frontend side; maybe we could just 
    // TODO: put this test into the common repo and import it somehow
    it('redirects to home page if identified Consumer browses /login', function () {
      // Given
      cy.stubServer('Authentication/LogConsumerIn/Consommateur')
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
      cy.stubServer('Authentication/LogConsumerIn/Consommateur')

      // When
      cy.visit('/login')
      connectWithUserCredentialsViaGui(email, password)

      // Then
      cy.get('@graphql').then(() => {
        getTokenCookie().should('exist')
      })
    })
  })

  context('Log consumer out', function() {
    
    const email = 'test@example.com'
    const password = 'password'
  
    beforeEach(() => getTokenCookie().should('not.exist'))

    it('forgets about the token and redirects to /', function () {
      // Given
      cy.stubServer('Authentication/LogConsumerIn/Consommateur')
      login(email, password)

      // When
      navigateTo(types.links.LOGOUT)

      // Then
      const tokenHandler = new TokenHandler
      tokenHandler.getNullToken().then(() => {
        getTokenCookie().should('not.exist')
      })
      cy.location('pathname').should('eq', '/')
      checkIfLinkIsActive(types.links.HOME)
    })
  })

  context('Consumer registration', function() {
    
    const email = 'test@example.com'
    const password = 'password'

    function accessRegistrationInterface() {
      cy.visit(`/${types.links.SIGNUP}`)
    }
  
    function fillUserRegistrationGui(email, password) {
      cy.get('[id="email"]').find('input').clear().type(email)
      cy.get('[id="password"]').find('input').clear().type(password)
      cy.get('[id="confirmPassword"]').find('input').clear().type(password)
    }
    
    function acceptCookies() {
      cy.get('[id="acceptCookies"]').then(checkbox => checkbox.click())
    }
    
    function acceptTermsOfService() {
      cy.get('[id="acceptTermsOfService"]').then(checkbox => checkbox.click())
    }
    
    function getSubmitButton() {
      return cy.get('button[id="createAccount"]')
    }
    
    function submitRegistration() {
      getSubmitButton().then(btn => {
        btn.click()
      })
    }

    beforeEach(() => getTokenCookie().should('not.exist'))

    it('enables submit button when registration is filled up and cookies and terms of service are checked', function () {
      // Given
      cy.stubServer('Authentication/RegisterConsumer/SuccessfulConsumerCreation')
      
      // When
      accessRegistrationInterface()
      fillUserRegistrationGui(email, password)
      cy.get("div[id='password']").then(field => {
        expect(field).not.to.have.class('q-field--error')
      })
      acceptCookies()
      acceptTermsOfService()
      
      // Then
      getSubmitButton().then(btn => {
        expect(btn).to.have.attr('disabled')
      })
    })

    it('registers new Consumer with compliant password', function () {
      // Given
      cy.stubServer('Authentication/RegisterConsumer/SuccessfulConsumerCreation')
      
      // When
      accessRegistrationInterface()
      fillUserRegistrationGui(email, password)
      cy.get("div[id='password']").then(field => {
        expect(field).not.to.have.class('q-field--error')
      })
      acceptCookies()
      acceptTermsOfService()
      submitRegistration()

      // Then
      cy.get('[id="emailSentDialog"]').should('be.visible')
    })

    // TODO: this is new!
    it('asks to fix non-compliant password', function () {
      // Given

      // When

      // Then
    })

  })

  context('Consumer account activation', function () {

    function visitActivationLink() {
      cy.fixture('Authentication/ConfirmationLinks.json')
        .then(links => cy.visit(links.activation))
    }

    beforeEach(() => getTokenCookie().should('not.exist'))
        
    it('displays a success message when the activation link is visited soon enough', function () {
      // Given
      cy.stubServer('Authentication/RegisterConsumer/SuccessfulAccountConfirmation')

      // When
      visitActivationLink()

      // Then
      cy.get('[id="successfulActivation"]').should('exist')
      getTokenCookie().then(cookie => {
        expect(cookie).not.exist
      })
    })

    it('displays an error message when something is wrong with the link', function () {
      // Given
      cy.stubServer('Authentication/ExpiredLink')

      // When
      visitActivationLink()

      // Then
      cy.get('[id="errorActivationLinkExpired"]').should('exist')
    })
  })

})