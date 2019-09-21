import {
  login,
  navigateTo,
  getTokenCookie,
  checkIfLinkIsActive
} from '../../common/cypress/integration/Authentication/Helpers'
import TokenHandler from '../../common/cypress/integration/Authentication/TokenHandler'

describe('Log Consumer out', function(){
  context('Logout functionality', function() {
    
    it('closes the session with the server', function () {
      // Given
      injectResponseFixtureIfFaked(`Authentication/LogConsumerIn/Responses/${persona}`)
      login(persona)

      // When
      const now = Date.now()
      cy.clock(now)
      navigateTo(types.links.LOGOUT)

      // Then
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
      // TODO: this waiting is bullshit
      cy.wait(100).then(() => {
        getTokenCookie().should('not.exist')
      })
    })

    it('redirects to the home page', function () {
      // Given
      injectResponseFixtureIfFaked(`Authentication/LogConsumerIn/Responses/${persona}`)
      login(persona)

      // When
      const now = Date.now()
      cy.clock(now)
      navigateTo(types.links.LOGOUT)

      // Then
      // TODO: this ticking is bullshit
      cy.tick(5000)
      checkIfLinkIsActive(types.links.HOME)
    })

  })
})