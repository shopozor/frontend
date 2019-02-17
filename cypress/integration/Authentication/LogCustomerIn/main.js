import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

import {
  connectWithUserCredentialsViaGui,
  getTokenDuration,
  getTokenCookie
} from '../../../../common/cypress/integration/Authentication/common/Helpers'
import '../../../../common/cypress/integration/Authentication/common/SessionDurationType'
import '../../../../common/cypress/integration/Authentication/common/PersonaType'
import { injectResponseFixtureIfFaked } from '../../../../common/cypress/integration/common/fakeServer'


Given('un client non identifié', function () {
  getTokenCookie().should('not.exist')
});

When('un client s\'identifie avec un e-mail et un mot de passe invalides', function () {
  injectResponseFixtureIfFaked('Authentication/LogStaffIn/Responses/WrongCredentials')
  cy.visit('/login')
  cy.fixture('Authentication/Credentials/InvalidEmailAndPassword')
    .then(user => connectWithUserCredentialsViaGui(user.email, user.password))
});

When('un client s\'identifie avec un e-mail valide et un mot de passe invalide', function () {
  injectResponseFixtureIfFaked('Authentication/LogStaffIn/Responses/WrongCredentials')
  cy.visit('/login')
  cy.fixture(`Authentication/Credentials/${persona}`)
    .then(user => connectWithUserCredentialsViaGui(user.email, user.password + 'a'))
});

When('un {PersonaType} s\'identifie avec un e-mail et un mot de passe valides', function (persona) {
  injectResponseFixtureIfFaked(`Authentication/LogStaffIn/Responses/${persona}`)
  cy.visit('/login')
  cy.fixture(`Authentication/Credentials/${persona}`)
    .then(user => connectWithUserCredentialsViaGui(user.email, user.password))
});

Then('il obtient un message d\'erreur stipulant que ses identifiants sont incorrects', function () {
  cy.get('@graphql').then(() => {
    cy.get('.incorrectIdentifiers')
      .should('be.visible')
  })
});

Then('sa session s\'ouvre pour {SessionDurationType}', function (expectedDuration) {
  cy.get('@graphql').then(() => {
    cy.wait(1000)
    getTokenCookie().then(cookie => {
      const tokenDuration = getTokenDuration(cookie.value)
      expect(tokenDuration.asSeconds()).to.equal(expectedDuration.asSeconds())
    })
  })
});