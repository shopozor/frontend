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
    Promise.all(promises).then(() => resolve(productsArray))
  })
}

function adapt (product) {
  const state = types.productState.VISIBLE
  const ordersSummary = {
    amount: 0
  }
  const conservation = {
    mode: types.conservation.BASEMENT,
    days: 30
  }
  const categories = [
    types.categories.VEGETABLES
  ]
  const variants = arrayWithIdsToObjectOfIds(product.variants)
  const newProduct = {
    ...product,
    state,
    ordersSummary,
    variants,
    conservation,
    categories
  }
  return newProduct
}

function arrayWithIdsToObjectOfIds (arrayWithId) {
  return arrayWithId.reduce((object, item) => {
    object[item.id] = item
    return object
  }, {})
}
