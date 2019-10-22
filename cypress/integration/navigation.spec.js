import {
  getTokenCookie,
  openSideDrawer,
  getPageLink,
  login
} from './Authentication/Helpers'
import types from '../../src/types'

describe('Navigation', () => {

  const email = 'test@example.com'
  const password = 'password'
  const loginAndOpenSidedrawer = credentials => {
    return cy.stubServer({ 'Login': `Authentication/Login/${credentials}` })
      .then(() => login(email, password))
      .visit('/')
      .then(openSideDrawer)
  }

  const calendarExists = () => {
    it('displays an access link to calendar', () => {
      getPageLink(types.links.CALENDAR)
        .should('exist')
        .click()
        .then(() => {
          cy.get('.calendat-tab-panels,.calendar-month,.calendar-multi-day-component,.calendar-agenda')
          .should('exist')
        })
    })
  }

  context('not connected', () => {

    before(() => {
      getTokenCookie()
        .should('not.exist')
        .visit('/')
        .then(openSideDrawer)
    })

    it('displays no access link to calendar', () => {
      getPageLink(types.links.CALENDAR)
        .should('not.exist')
    })
  })

  context('connected as Consumer', () => {

    before(() => {
      loginAndOpenSidedrawer('Consommateur')
    })

    calendarExists()

  })

  context('connected as Producer', () => {

    before(() => {
      loginAndOpenSidedrawer('Producteur')
    })

    calendarExists()
  })

  context('connected as Manager', () => {

    before(() => {
      loginAndOpenSidedrawer('Responsable')
    })

    calendarExists()
  })

  context('connected as Rex', () => {

    before(() => {
      loginAndOpenSidedrawer('Rex')
    })

    calendarExists()
  })

  context('connected as Softozor', () => {

    before(() => {
      loginAndOpenSidedrawer('Softozor')
    })

    calendarExists()
  })
})
