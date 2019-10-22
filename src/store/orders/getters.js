export const myOrdersToReceive = state => state.myOrdersToReceive
export const myOrdersToDeliver = state => state.myOrdersToDeliver
export const pendingOrdersOfProduct = state => ({ productId }) => {
  return {
    paid: {
      amount: 0,
      consumerPrice: 0
    }
  }
}

export const ordersPropsOfFilterPropValue = state => ({arrayOfPropsKeys, filterKey, filterValue}) => {
  return Object.entries(state.myOrdersToDeliver).reduce((filteredOrders, entry) => {
    if (entry[1][filterKey] === filterValue) {
      filteredOrders[entry[0]] = arrayOfPropsKeys.reduce((orderProps, key) => {
        orderProps[key] = entry[1][key]
        return orderProps
      }, {})
    }
    return filteredOrders
  }, {})
}

export const pendingOrdersSummary = state => {
  return {
    paid: {
      amount: 0
    },
    notPaid: {
      amount: 0
    }
  }
}
