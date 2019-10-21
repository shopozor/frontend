import { setValueOfObject } from '../../Helpers'

export const storeMyProducts = (state, myProducts) => {
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
