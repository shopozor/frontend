// import * as request from '../simulateServer/orders/requestOrders'

export const orderVariants = ({ commit, getters }, { variantsAmounts }) => {
  // request.orderVariants({
  //   userId: getters.userId,
  //   token: getters.token,
  //   variantsAmounts
  // })
  //   .then(response => {
  //     console.log(response.message)
  //     commit('storeMyOrdersToReceive', response.myOrdersToReceive)
  //   })
  //   .catch(error => console.log(error))
}

export const getMyOrdersToReceive = ({ commit, getters }) => {
  // request.getMyOrdersToReceive({
  //   userId: getters.userId,
  //   token: getters.token
  // })
  //   .then(response => {
  //     console.log(response.message)
  //     commit('storeMyOrdersToReceive', response.myOrdersToReceive)
  //   })
  //   .catch(error => console.log(error))
}

export const getMyOrdersToDeliver = ({ commit, getters }) => {
  // request.getMyOrdersToDeliver({
  //   userId: getters.userId,
  //   token: getters.token
  // })
  //   .then(response => {
  //     console.log(response.message)
  //     commit('storeMyOrdersToDeliver', response.myOrdersToDeliver)
  //   })
  //   .catch(error => console.log(error))
}
