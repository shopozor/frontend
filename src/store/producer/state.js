import types from '../../types'

export default {
  myProducts: {},
  editedProduct: {
    productId: '',
    name: '',
    description: '',
    images: [],
    categories: [],
    conservationMode: '',
    conservationDays: 0,
    defaultVariantUI: '',
    defaultProducerGrossPrice: 0,
    defaultUnit: '',
    variants: {
      testId: {
        pricing: {
          mode: types.priceModes.FREE
        }
      }
    }
  }
}
