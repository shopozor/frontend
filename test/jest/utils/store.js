import Vuex from 'vuex'
import sinon from 'sinon'

function createState (state) {
  return state
}

function createGetters (getters) {
  return getters
}

function createMutations (mutations) {
  return mutations
}

function createActions (actions) {
  return Object.entries(actions).reduce((builtActions, actionStates) => {
    var stub = sinon.stub()
    const name = actionStates[0]
    const states = actionStates[1]
    for (var i = 0; i < states.length; i++) {
      if (states[i].args) {
        if (states[i].resolve) {
          stub.withArgs(sinon.match(Object), sinon.match(states[i].args)).resolves(states[i].resolve)
        } else if (states[i].reject) {
          stub.withArgs(sinon.match(Object), sinon.match(states[i].args)).rejects(states[i].reject)
        } else console.error('Action format error')
      } else {
        if (states[i].resolve) {
          stub.resolves(states[i].resolve)
        } else if (states[i].reject) {
          stub.rejects(states[i].reject)
        } else console.error('Action format error')
      }
    }
    builtActions = { ...builtActions, [name]: stub }
    return builtActions
  }, {})
}

export function createStore (options) {
  let storeOptions = {}
  if (options.store) {
    if (options.store.state) {
      storeOptions = { ...storeOptions, state: createState(options.store.state) }
    }
    if (options.store.getters) {
      storeOptions = { ...storeOptions, getters: createGetters(options.store.getters) }
    }
    if (options.store.mutations) {
      storeOptions = { ...storeOptions, mutations: createMutations(options.store.mutations) }
    }
    if (options.store.actions) {
      storeOptions = { ...storeOptions, actions: createActions(options.store.actions) }
    }
  }
  return new Vuex.Store(storeOptions)
}
