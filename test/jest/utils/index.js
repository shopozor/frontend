// this is mapped in jest.config.js to resolve @vue/test-utils
import { createLocalVue, mount, shallowMount } from 'test-utils'

import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Quasar, { Cookies } from 'quasar'

const mockSsrContext = () => {
  return {
    req: {
      headers: {}
    },
    res: {
      setHeader: () => undefined
    }
  }
}

function createStore (options) {
  let storeOptions = {}
  if (options.store) {
    if (options.store.actions) {
      storeOptions = {
        ...storeOptions,
        actions: Object.entries(options.store.actions).reduce((actions, action) => {
          actions = {
            ...actions,
            [action[0]]: () => {
              const response = action[1]
              return new Promise((resolve, reject) => {
                if (response.resolve) {
                  console.log('resolving', response.resolve)
                  resolve(response.resolve)
                } else if (response.reject) {
                  console.log('rejecting', response.reject)
                  reject(response.reject)
                } else console.error('[CreateStore]: the response must be an object of form {resolve: {...}} or {reject: {...}}')
              })
            }}
          return actions
        }, {})
      }
    }
  }
  return new Vuex.Store(storeOptions)
}

// https://eddyerburgh.me/mock-vuex-in-vue-unit-tests
export const mountQuasar = (component, options = {}) => {
  const localVue = createLocalVue()
  const app = {}

  localVue.use(Vuex)
  localVue.use(VueRouter)
  localVue.use(Quasar)
  const store = createStore(options)
  const router = new VueRouter()

  // mock vue-i18n
  const $t = () => {}
  const $tc = () => {}
  const $n = () => {}
  const $d = () => {}
  let mocks = { $t, $tc, $n, $d }

  if (options) {
    const ssrContext = options.ssr ? mockSsrContext() : null

    if (options.cookies) {
      const cookieStorage = ssrContext ? Cookies.parseSSR(ssrContext) : Cookies
      const cookies = options.cookies
      Object.keys(cookies).forEach(key => {
        cookieStorage.set(key, cookies[key])
      })
    }

    if (options.plugins) {
      options.plugins.forEach(plugin => {
        plugin({ app, store, router, Vue: localVue, ssrContext })
      })
    }

    if (options.mocks) {
      mocks = {...mocks, ...options.mocks}
    }
  }

  const mountOptions = {
    localVue: localVue,
    store,
    router,
    mocks,

    // Injections for Components with a QPage root Element
    provide: {
      pageContainer: true,
      layout: {
        header: {},
        right: {},
        footer: {},
        left: {}
      }
    }
  }

  if (options.shallow) {
    return shallowMount(component, mountOptions)
  } else {
    return mount(component, mountOptions)
  }
}
