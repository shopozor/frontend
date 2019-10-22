import { setValueOfObject } from '../../Helpers'

export const storeMyProducts = (state, myProducts) => {
  sessionStorage.setItem('myProducts', JSON.stringify(myProducts))
  state.myProducts = myProducts
}

export const updateProduct = (state, { productId, newProps }) => {
  state.myProducts[productId] = { ...state.myProducts[productId], ...newProps }
}

export const setEditedProduct = (state, { productId }) => {
  state.editedProduct = { ...state.myProducts[productId], allowNonTrivialChanges: false }
}

export const updateEditedProduct = (state, { path, value }) => {
  setValueOfObject({
    object: state.editedProduct,
    path,
    value
  })
}

export const updateEditedVariant = (state, { variantId, path, value }) => {
  const pathInProduct = `variants.${variantId}.${path}`
  updateEditedProduct(state, { path: pathInProduct, value })
}
