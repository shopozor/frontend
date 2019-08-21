import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

import {
  login,
  navigateTo,
  getTokenCookie,
  checkIfLinkIsActive
} from '../../../../common/cypress/integration/Authentication/common/Helpers'
import '../../../../common/cypress/integration/Authentication/common/PersonaType'
import types from '../../../../common/types'

import { injectResponseFixtureIfFaked } from '../../../../common/cypress/integration/common/fakeServer'

Given("un {PersonaType} connecté", function (persona) {
  injectResponseFixtureIfFaked(`Authentication/LogConsumerIn/Responses/${persona}`)
  login(persona)
})

When('il se déconnecte', function () {
  const now = Date.now()
  cy.clock(now)
  navigateTo(types.links.LOGOUT)
})

Then('sa session se ferme', function () {
  // TODO: remplacer cy.wait(100) par cy.wait("alias")
  // il faudrait attendre d'être sur la page logout
  // mais je n'arrive pas à le faire fonctionner
  // 
  // cy.server()
  // cy.route('**/logout').as(logout)
  // cy.wait('@logout).then(() => {
  //   getTokenCookie().should('not.exist')
  // })
  //
  // les 100ms d'attentes sont déterminées empiriquement !
  // elles peuvent être insuffisantes selon la machine qui fait passer les tests
  
  cy.wait(100).then(() => {
    getTokenCookie().should('not.exist')
  })
})

Then("il est redirigé vers la page d'accueil", function () {
  cy.tick(5000)
  checkIfLinkIsActive(types.links.HOME)
})
