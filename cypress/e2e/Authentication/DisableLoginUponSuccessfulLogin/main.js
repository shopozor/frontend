import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

import { injectResponseFixtureIfFaked } from '../../../../common/cypress/integration/common/fakeServer'
import { login } from '../../../../common/cypress/integration/Authentication/common/Helpers'
import '../../../../common/cypress/integration/Authentication/PersonaType'


Given("un {PersonaType} identifié", function (persona) {
  injectResponseFixtureIfFaked(`Authentication/LogConsumerIn/Responses/${persona}`)
  login(persona)
});

When("il navigue vers l'interface d'identification", function () {
  cy.visit('/login')
});

Then("il est redirigé vers la page d'accueil", function () {
  cy.url().should('not.include', '/login')
});