import types from '../../types'

export function loadAndFilterProducts ({ budzonnerySize, filterAccess, filterValue }) {
  return new Promise(resolve => {
    productsLoader({budzonnerySize})
      .then(allProducts => {
        const filteredProducts = allProducts.filter(product => {
          return access(filterAccess, product) === filterValue
        })
        resolve(formatProductsData(filteredProducts))
      })
  })
}

export function loadAllProducts ({ budzonnerySize }) {
  return new Promise(resolve => {
    const allProducts = formatProductsData(productsLoader({ budzonnerySize }))
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

function formatProductsData (productsArray) {
  return productsArray.reduce((productsList, product) => {
    productsList[product.id] = product
    return productsList
  }, {})
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
            adapt(productData)
            productsArray.push(productData)
          })
          .catch(() => { })
      )
    }
    Promise.all(promises).then(() => resolve(productsArray))
  })
}

function adapt (product) {
  product.state = types.productState.VISIBLE
}

function access (path, obj) {
  return path.split('.').reduce((prev, curr) => {
    return prev ? prev[curr] : null
  }, obj || self)
}
