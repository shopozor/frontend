import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import producer from './producer'
import orders from './orders'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

const Store = new Vuex.Store({
  modules: {
    user,
    producer,
    orders
  }
})

export default Store
