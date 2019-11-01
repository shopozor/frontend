import types from '../../types'
import NO_IMAGE from '../../assets/images/no_image.png'

export const myProducts = state => state.myProducts

export const productsInInventory = state => {
  const myProducts = state.myProducts
  return Object.keys(myProducts).reduce((inventory, productId) => {
    const product = myProducts[productId]
    if (product.state !== types.productState.DELETED) inventory[productId] = product
    return inventory
  }, {})
}

export const productsInTrash = state => {
  const myProducts = state.myProducts
  return Object.keys(myProducts).reduce((trash, productId) => {
    const product = myProducts[productId]
    if (product.state === types.productState.DELETED) trash[productId] = product
    return trash
  }, {})
}
export const productsTrashIsEmpty = state => {
  return Object.keys(state.myProducts).every(productId => {
    return state.myProducts[productId].state !== types.productState.DELETED
  })
}

export const editedProduct = state => state.editedProduct
export const editedProductImage = state => {
  const image = state.editedProduct.image
  if (image) return image
  else return NO_IMAGE
}
// export const editedProductTitle = state => state.editedProduct.title
// export const editedProductDescription = state => state.editedProduct.description
// export const editedProductCategories = state => state.editedProduct.categories
// export const editedProductConservationMethod = state => state.editedProduct.conservationMathod
// export const editedProductConservationDays = state => state.editedProduct.conservationDays
// export const editedProductDefaultVariantUI = state => state.editedProduct.defaultVariantUI
export const editedProductDefaultGrossConsumerPrice = state => state.editedProduct.defaultGrossConsumerPrice
export const editedProductDefaultUnit = state => state.editedProduct.defaultUnit

export const editedVariant = state => ({ variantId }) => state.editedProduct.variants[variantId]
export const editedVariantName = state => ({ variantId }) => editedVariant(state)({ variantId }).description.name
export const editedVariantDescriptionAmount = state => ({ variantId }) => editedVariant(state)({ variantId }).description.amount
export const editedVariantDescriptionUnit = state => ({ variantId }) => editedVariant(state)({ variantId }).description.unit
export const editedVariantPriceMode = state => ({ variantId }) => editedVariant(state)({ variantId }).priceMode
export const editedVariantGrossConsumerPrice = state => ({ variantId }) => editedVariant(state)({ variantId }).grossConsumerPrice
