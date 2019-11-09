import types from '../../types'
import { getValueFromObject } from '../../Helpers'

export function loadAndFilterProducts ({ budzonnerySize, filterAccess, filterValue }) {
  return new Promise(resolve => {
    productsLoader({budzonnerySize})
      .then(allProducts => {
        const filteredProducts = allProducts.filter(product => {
          return getValueFromObject({ object: product, path: filterAccess }) === filterValue
        })
        resolve(arrayWithIdsToObjectOfIds(filteredProducts))
      })
  })
}

export function loadAllProducts ({ budzonnerySize }) {
  return new Promise(resolve => {
    const allProducts = arrayWithIdsToObjectOfIds(productsLoader({ budzonnerySize }))
    resolve(allProducts)
  })
}

export function summarizeProducers ({ budzonnerySize }) {
  return new Promise(resolve => {
    productsLoader({ budzonnerySize })
      .then(allProducts => {
        const allProducers = allProducts.reduce((producersOptions, product) => {
          const value = product.producer.id
          const label = `${product.producer.firstName} ${product.producer.lastName}`
          const isNewProducer = producersOptions.every(option => option.value !== value)
          if (isNewProducer) {
            producersOptions.push({ value, label })
          }
          return producersOptions
        }, [])
        resolve(allProducers)
      })
  })
}

function productsLoader ({ budzonnerySize }) {
  return new Promise(resolve => {
    const productsArray = []
    const maxIndex = 50
    const promises = []
    for (let i = 0; i <= maxIndex; i++) {
      promises.push(
        import(`../../../graphql/responses/${budzonnerySize}/Consumer/Products/Product-${i}.json`)
          .then(product => {
            const productData = product.data.product
            const newProductData = adapt(productData)
            productsArray.push(newProductData)
          })
          .catch(() => { })
      )
    }
    Promise.all(promises).then(() => {
      resolve(productsArray)
    })
  })
}

function adapt (product) {
  /**
   * related flag: product.isAvailable
   */
  const state = types.productState.VISIBLE

  /**
   * can be accessed through orderId and orders request
   */
  const ordersSummary = {
    amount: 0
  }

  /**
   * conservation.until needs to be replaced
   * conservation.mode needs to be in a defined list (types.conservation)
   */
  const conservation = {
    mode: types.conservationModes.BASEMENT,
    days: 30
  }

  /**
   * To access categories:
   * graphql/calls/shopCategories.grphql
   */
  const categories = [
    types.categories.VEGETABLES
  ]

  const pricing = {
    ...product.pricing,
    productVAT: 0.025,
    defaultGrossPrice: 0,
    defaultUnit: types.units.KG
  }

  const adaptedVariants = product.variants.map(variant => {
    return {
      ...variant,

      /**
       * related flag: product.variant[index].isAvailable
       */
      state: types.variantState.VISIBLE,

      /**
       * can be accessed through orderId and orders request
       */
      pendingOrdersSummary: {
        paid: {
          amount: 0
        },
        notPaid: {
          amount: 0
        }
      },

      /**
       * flags for variant UI
       * > variant.pricing.mode
       * > variant.pricing.priceUnit
       * > variant.description = {
       *    name:...
       *    measure: ...
       *    measureUnit: ...
       *  }
       */

      /**
       * reference price: grossPrice
       * doc: https://github.com/shopozor/backend/issues/95
       */
      pricing: {
        grossPrice: variant.pricing.price.gross.amount,
        mode: types.priceModes.FREE,
        /**
         * unité de mesure du prix
         * j'ai 1 [tonne] de sel, je le vends 0.50CHF/[kg]
         */
        priceUnit: types.units.KG
      },
      // description of variant
      description: {
        name: variant.name,
        // volume / weight / size of variant
        measure: 0,
        measureUnit: types.units.KG
      }
    }
  })
  const formattedVariants = arrayWithIdsToObjectOfIds(adaptedVariants)
  const newProduct = {
    ...product,
    state,
    ordersSummary,
    conservation,
    categories,
    pricing,
    variants: formattedVariants
  }
  return newProduct
}

function arrayWithIdsToObjectOfIds (arrayWithId) {
  return arrayWithId.reduce((object, item) => {
    object[item.id] = item
    return object
  }, {})
}
