describe('Sign Consumer up', function(){

  context('Consumer registration', function() {
    
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
    
    function isFieldValid(fieldId, validity) {
      cy.get(`div[id="${fieldId}"]`).then(field => {
        if(validity) expect(field).not.to.have.class('q-field--error')
        else expect(field).to.have.class('q-field--error')
      })
    }

    it('enables submit button when registration is filled up and cookies and terms of service are checked', function () {
      // Given
      cy.stubServer('Authentication/RegisterConsumer/Responses/SuccessfulConsumerCreation')
      
      // When
      accessRegistrationInterface()
      cy.fixture('Authentication/Credentials/NewConsumer')
        .then(user => {
          fillUserRegistrationGui(user.email, user.password)
          isFieldValid('password', true)
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
      cy.stubServer('Authentication/RegisterConsumer/Responses/SuccessfulConsumerCreation')
      
      // When
      accessRegistrationInterface()
      cy.fixture('Authentication/Credentials/NewConsumer')
        .then(user => {
          fillUserRegistrationGui(user.email, user.password)
          isFieldValid('password', true)
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

    it('displays a success message when the activation link is visited soon enough', function () {
      // Given
      cy.stubServer('Authentication/RegisterConsumer/Responses/SuccessfulAccountConfirmation', isGraphqlFaked)

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
      cy.stubServer('Authentication/RegisterConsumer/Responses/ExpiredAccountConfirmationLink', isGraphqlFaked)

      // When
      visitActivationLink()

      // Then
      cy.get('[id="errorActivationLinkExpired"]').should('exist')
    })

  })

})