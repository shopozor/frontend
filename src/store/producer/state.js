import types from '../../types'

export default {
  myProducts: {},
  editedProduct: {
    productId: '',
    ordersSummary: {
      unPaid: 0,
      paid: 0,
      delivered: 0
    },
    image: undefined,
    name: '',
    description: '',
    productVAT: undefined,
    conservationMode: '',
    conservationDays: 0,
    categories: [],
    defaultPriceMode: '',
    defaultGrossConsumerPrice: undefined,
    defaultUnit: undefined,
    variants: {
      testId: {
        description: {
          name: 'testName',
          amount: 12,
          unit: types.units.KG
        },
        pricing: {
          mode: types.priceModes.FREE,
          grossConsumerPrice: 20
        }
      }
    }
  }
}
