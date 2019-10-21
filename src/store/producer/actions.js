import { loadAndFilterProducts } from './productsLoader'

export const getMyProducts = ({ commit, getters }, { budzonnerySize, producerId }) => {
  loadAndFilterProducts({ budzonnerySize, filterAccess: 'producer.id', filterValue: producerId })
    .then(response => {
      console.log(response)
      commit('storeMyProducts', response)
    })
    .catch(error => { console.log(error) })
}

export const createProduct = ({ commit, getters }, { newProduct }) => {
  // request.createProduct({
  //   userId: getters.userId,
  //   token: getters.token,
  //   newProduct
  // })
  //   .then(response => { commit('storeMyProducts', response.myProducts) })
  //   .catch(error => { console.log(error) })
}

export const updateProduct = ({ commit, getters }, { productId, newProps }) => {
  commit('updateProduct', { productId, newProps })
  // request.updateProduct({
  //   userId: getters.userId,
  //   token: getters.token,
  //   productId,
  //   newProps
  // })
  //   .then(response => { commit('storeMyProducts', response.myProducts) })
  //   .catch(error => console.log(error))
}

export const setEditedProduct = ({ commit, getters }, { productId }) => {
  commit('setEditedProduct', { productId })
  // const localProduct = getters.productsInInventory[productId]
  // if (localProduct) commit('setEditedProduct', localProduct)
  // else {
  //   request.getMyProducts({
  //     userId: getters.userId,
  //     token: getters.token
  //   })
  //     .then(response => commit('setEditedProduct', response.myProducts[productId]))
  //     .catch(error => console.log(error))
  // }
}

export const updateEditedProduct = ({ commit, getters }, payload) => {
  commit('updateEditedProduct', payload)
}
