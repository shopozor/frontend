import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import products from './products'
import orders from './orders'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

const Store = new Vuex.Store({
  modules: {
    user,
    products,
    orders
  }
})

export default Store
