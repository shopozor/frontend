import { responseStub } from './stubHelpers'

const isGraphQL = (path, method) => path.includes('/graphql/') && method === 'POST'

Cypress.Commands.add('stubGraphqlServer', (operations = {}) => {
  cy.on('window:before:load', (win) => {
    const originalFunction = win.fetch

    function serverStub (path, body) {
      const { operationName } = JSON.parse(body)
      if (Object.keys(operations).indexOf(operationName) !== false) {
        const response = operations[operationName]
        const stub = responseStub(response)
        return Promise.resolve(stub)
      }
      return Promise.reject(new Error(`Not found: ${path}`))
    }

    function fetch (path, { method, body }) {
      return isGraphQL(path, method) ? serverStub(path, body) : originalFunction.apply(this, arguments)
    }

    cy.stub(win, 'fetch').callsFake(fetch).as('graphql')
  })
})

Cypress.Commands.add('stubServer', fixtures => {
  for (const [key, value] of Object.entries(fixtures)) {
    cy.fixture(value)
      .then(json => { fixtures[key] = json })
  }
  cy.stubGraphqlServer(fixtures)
})