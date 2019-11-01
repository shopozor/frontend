import types from '../../types'

export const products = {
  productId1: { // should be ['productId1'], but eslint does not agree
    productId: 'productId1',
    producerId: 'producerId',
    state: types.productState.VISIBLE,
    // ordersSummary can me generated through an "orders" request
    // it may not be useful
    ordersSummary: {
      unPaid: 4,
      paid: 3,
      delivered: 106
    },
    image: 'imageUrl or imageData',
    name: 'productName',
    description: 'productDescriptionText',
    productVAT: 0.025, // undefined if producer default VAT applies
    conservationMode: types.conservationModes.BASEMENT,
    conservationDays: 30,
    categories: [types.categories.VEGETABLES, types.categories.FRUITS],
    defaultPriceMode: types.priceModes.FREE, // can be undefined
    defaultGrossConsumerPrice: 10, // can be undefined
    defaultUnit: types.units.KG, // can be undefined
    variants: {
      variantId1: { // should be ['variantId1'], but eslint does not agree
        variantId: 'variantId1',
        productId: 'productId1',
        ordersId: [
          'orderId1',
          'orderId2',
          'orderId3',
          'orderId4'
        ],
        state: types.variantState.VISIBLE,
        description: {
          name: 'VariantName', // can be undefined if priceMode is not FREE
          measure: 100, // can be undefined if priceMode is FREE or BULK
          measureUnit: types.units.GR // can be undefined if priceMode is FREE
        },
        priceMode: types.priceModes.FREE,
        grossConsumerPrice: 20.95,
        stock: {
          // types.stockModes.AMOUNT: removes 1 from stock if 1 is bought
          // types.stockModes.MAX_PER_DAY: acts as AMOUNT, but resets stock every day
          mode: types.stockModes.AMOUNT,
          max: 100, // can be undefined if mode is AMOUNT
          amount: 97,
          unit: types.units.KG, // can be undefined if priceMode is not BULK
          // ordersSummary can me generated through an "orders" request
          // it may not be useful
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
