export const storeMyProducts = (state, myProducts) => {
  state.myProducts = myProducts
}

export const updateProduct = (state, { productId, newProps }) => {
  state.myProducts[productId] = { ...state.myProducts[productId], ...newProps }
}

export const setEditedProduct = (state, product) => { state.editedProduct = { ...product, allowNonTrivialChanges: false } }

export const updateEditedProduct = (state, newProps) => {
  Object.entries(newProps).forEach(entry => {
    state.editedProduct[entry[0]] = entry[1]
  })
}
