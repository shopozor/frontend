import { loadAndFilterProducts } from './productsLoader'

export const getMyProducts = ({ commit, getters }, { budzonnerySize, producerId }) => {
  loadAndFilterProducts({ budzonnerySize, filterAccess: 'producer.id', filterValue: producerId })
    .then(response => {
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

export const updateEditedProduct = ({ commit }, { path, value }) => {
  commit('updateEditedProduct', { path, value })
}

export const updateEditedProductDefaultGrossConsumerPrice = ({ commit }, { value }) => {
  updateEditedProduct({ commit }, { path: 'defaultGrossConsumerPrice', value })
}

export const updateEditedProductDefaultUnit = ({ commit }, { value }) => {
  updateEditedProduct({ commit }, { path: 'defaultUnit', value })
}

export const updateEditedVariant = ({ commit }, { variantId, path, value }) => {
  commit('updateEditedVariant', { variantId, path, value })
}

export const updateEditedVariantPriceMode = ({ commit }, { variantId, value }) => {
  updateEditedVariant({ commit }, { variantId, path: 'priceMode', value })
}

export const updateEditedVariantName = ({ commit }, { variantId, value }) => {
  updateEditedVariant({ commit }, { variantId, path: 'description.name', value })
}

export const updateEditedVariantDescriptionAmount = ({ commit }, { variantId, value }) => {
  updateEditedVariant({ commit }, { variantId, path: 'description.amount', value })
}

export const updateEditedVariantDescriptionUnit = ({ commit }, { variantId, value }) => {
  updateEditedVariant({ commit }, { variantId, path: 'description.unit', value })
}

export const updateEditedVariantGrossConsumerPrice = ({ commit }, { variantId, value }) => {
  updateEditedVariant({ commit }, { variantId, path: 'grossConsumerPrice', value })
}

export const updateEditedVariantStockAmount = ({ commit }, { variantId, value }) => {
  updateEditedVariant({ commit }, { variantId, path: 'stock.amount', value })
}
