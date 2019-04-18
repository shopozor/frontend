import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

const Store = new Vuex.Store({
  modules: {
    user
  }
})

export default Store
