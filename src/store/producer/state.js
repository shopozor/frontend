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
    allowNonTrivialChanges: false,
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
        priceMode: types.priceModes.FREE,
        grossConsumerPrice: 200,
        stock: {
          mode: types.stockModes.AMOUNT,
          max: 100,
          amount: 97,
          unit: types.units.KG,
          ordersSummary: {
            unPaid: 1,
            paid: 2,
            delivered: 51
          }
        }
      }
    }
  }
}
