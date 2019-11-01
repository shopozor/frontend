/**
 * Producer requests his products
 */

import types from '../../types'

export const products = {
  // the first product shows all the data I might need
  // the following products are examples that could be used
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
      variantId1_1: { // should be ['variantId1'], but eslint does not agree
        variantId: 'variantId1_1',
        productId: 'productId1',
        ordersId: [
          'orderId1_1_1',
          'orderId1_1_2',
          'orderId1_1_3',
          'orderId1_1_4'
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
  },
  productId2: {
    productId: 'productId2',
    producerId: 'producerId',
    state: types.productState.VISIBLE,
    // ordersSummary can me generated through an "orders" request
    // it may not be useful
    ordersSummary: {
      unPaid: 2,
      paid: 12,
      delivered: 81
    },
    image: 'imageUrl or imageData',
    name: 'carottes',
    description: 'des carottes faites avec amour et passion dans de la vraie terre bien de chez nous !',
    conservationMode: types.conservationModes.BASEMENT,
    conservationDays: 100,
    categories: [types.categories.VEGETABLES],
    defaultPriceMode: types.priceModes.AUTO_PRICE,
    defaultGrossConsumerPrice: 3,
    defaultUnit: types.units.KG,
    variants: {
      variantId2_1: {
        variantId: 'variantId2_1',
        productId: 'productId2',
        ordersId: [
          'orderId2_1_1',
          'orderId2_1_2',
          'orderId2_1_3'
        ],
        state: types.variantState.VISIBLE,
        description: {
          measure: 500,
          measureUnit: types.units.GR
        },
        priceMode: types.priceModes.AUTO_PRICE,
        grossConsumerPrice: 1.50,
        stock: {
          mode: types.stockModes.AMOUNT,
          amount: 97,
          // ordersSummary can me generated through an "orders" request
          // it may not be useful
          ordersSummary: {
            unPaid: 1,
            paid: 2,
            delivered: 51
          }
        }
      },
      variantId2_2: {
        variantId: 'variantId2_2',
        productId: 'productId2',
        ordersId: [
          'orderId2_2_1',
          'orderId2_2_2',
          'orderId2_2_3'
        ],
        state: types.variantState.VISIBLE,
        description: {
          measure: 2,
          measureUnit: types.units.KG
        },
        priceMode: types.priceModes.AUTO_PRICE,
        grossConsumerPrice: 6,
        stock: {
          mode: types.stockModes.AMOUNT,
          amount: 40,
          // ordersSummary can me generated through an "orders" request
          // it may not be useful
          ordersSummary: {
            unPaid: 1,
            paid: 10,
            delivered: 30
          }
        }
      }
    }
  },
  productId3: {
    productId: 'productId3',
    producerId: 'producerId',
    state: types.productState.VISIBLE,
    // ordersSummary can me generated through an "orders" request
    // it may not be useful
    ordersSummary: {
      unPaid: 2,
      paid: 10,
      delivered: 153
    },
    image: 'imageUrl or imageData',
    name: 'savon',
    description: 'savon à l\'huile de colza et au fécule de pomme de terre',
    productVAT: 0.078,
    conservationMode: types.conservationModes.BASEMENT,
    conservationDays: 730,
    categories: [types.categories.HEALTH],
    variants: {
      variantId3_1: {
        variantId: 'variantI3_1',
        productId: 'productId3',
        ordersId: [
          'orderId3_1_1',
          'orderId3_1_2',
          'orderId3_1_3',
          'orderId3_1_4'
        ],
        state: types.variantState.VISIBLE,
        description: {
          name: 'savon à la lavande'
        },
        priceMode: types.priceModes.FREE,
        grossConsumerPrice: 5.50,
        stock: {
          mode: types.stockModes.AMOUNT,
          amount: 50,
          // ordersSummary can me generated through an "orders" request
          // it may not be useful
          ordersSummary: {
            unPaid: 1,
            paid: 2,
            delivered: 51
          }
        }
      },
      variantId3_2: {
        variantId: 'variantI3_2',
        productId: 'productId3',
        ordersId: [
          'orderId3_2_1',
          'orderId3_2_2'
        ],
        state: types.variantState.VISIBLE,
        description: {
          name: 'savon au cumin'
        },
        priceMode: types.priceModes.FREE,
        grossConsumerPrice: 6.40,
        stock: {
          mode: types.stockModes.AMOUNT,
          amount: 40,
          // ordersSummary can me generated through an "orders" request
          // it may not be useful
          ordersSummary: {
            unPaid: 1,
            paid: 8,
            delivered: 102
          }
        }
      }
    }
  }
}
