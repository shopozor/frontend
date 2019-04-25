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

// https://eddyerburgh.me/mock-vuex-in-vue-unit-tests
export const mountQuasar = (component, options = {}) => {
  const localVue = createLocalVue()
  const app = {}

  localVue.use(Vuex)
  localVue.use(VueRouter)
  localVue.use(Quasar)
  const store = new Vuex.Store({})
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
