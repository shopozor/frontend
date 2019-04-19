// import * as request from '../simulateServer/users/requestUsers'
// import { apolloClient } from '../../boot/apollo'
import * as cookie from '../../../common/src/store/cookie'
import types from '../../../common/src/types'

// import LogIn from './graphql/login.graphql'

import Consommateur from '../../../cypress/fixtures/Authentication/Credentials/Consommateur.json'
import InactiveCustomer from '../../../cypress/fixtures/Authentication/Credentials/InactiveCustomer.json'
import NewCustomer from '../../../cypress/fixtures/Authentication/Credentials/NewCustomer.json'
import Producteur from '../../../cypress/fixtures/Authentication/Credentials/Producteur.json'
import Responsable from '../../../cypress/fixtures/Authentication/Credentials/Responsable.json'
import Rex from '../../../cypress/fixtures/Authentication/Credentials/Rex.json'
import Softozor from '../../../cypress/fixtures/Authentication/Credentials/Softozor.json'

import ConsommateurR from '../../../cypress/fixtures/Authentication/LogCustomerIn/Responses/Consommateur.json'
import ProducteurR from '../../../cypress/fixtures/Authentication/LogCustomerIn/Responses/Producteur.json'
import ResponsableR from '../../../cypress/fixtures/Authentication/LogCustomerIn/Responses/Responsable.json'
import RexR from '../../../cypress/fixtures/Authentication/LogCustomerIn/Responses/Rex.json'
import SoftozorR from '../../../cypress/fixtures/Authentication/LogCustomerIn/Responses/Softozor.json'
import WrongCredentialsR from '../../../cypress/fixtures/Authentication/LogCustomerIn/Responses/WrongCredentials.json'

const credentials = [ Consommateur, InactiveCustomer, NewCustomer, Producteur, Responsable, Rex, Softozor ]

function saveUser ({ email, userId, token }) {
  cookie.set({ cookieId: types.cookies.EMAIL, cookieValue: email, cookieDuration: 30 })
  cookie.set({ cookieId: types.cookies.USER_ID, cookieValue: userId, cookieDuration: 30 })
  cookie.set({ cookieId: types.cookies.TOKEN, cookieValue: token, cookieDuration: 30 })
}

function saveToken ({ token }) {
  cookie.del({ cookieId: types.cookies.EMAIL })
  cookie.del({ cookieId: types.cookies.USER_ID })
  cookie.set({ cookieId: types.cookies.TOKEN, cookieValue: token, cookieDuration: 30 })
}

function removeToken () {
  cookie.del({ cookieId: types.cookies.EMAIL })
  cookie.del({ cookieId: types.cookies.USER_ID })
  cookie.del({ cookieId: types.cookies.TOKEN })
}

function adaptPermissions (received) {
  const permissions = received.map(permissionPack => permissionPack.code)
  if (permissions.every(permission => permission !== types.permissions.NOT_CONNECTED)) {
    return [types.permissions.CUSTOMER]
  } else return [types.permissions.NOT_CONNECTED]
}

export function signup ({ commit }, { email, password }) {
  // request
  //   .signup({ email, password })
  //   .then(response => {
  //     this.$router.push({ path: '/ConfirmationEmailSent' })
  //   })
  //   .catch(error => commit('error', error))
}

// export function login ({ commit }, { email, password, stayLoggedIn }) {
//   return new Promise((resolve, reject) => {
//     apolloClient
//       .mutate({
//         mutation: LogIn,
//         variables: {
//           email,
//           password
//         }
//       })
//       .then(response => {
//         const content = response.data.login
//         const errors = content.errors
//         if (errors.length > 0) {
//           commit('error', errors)
//           reject(errors)
//         } else {
//           const token = content.token
//           const userId = content.user.id
//           commit('storePermissions', {
//             email,
//             token,
//             userId,
//             permissions: adaptPermissions(content.user.permissions)
//           })
//           stayLoggedIn ? saveUser({ email, userId, token }) : saveToken({ token })
//           resolve(response)
//         }
//       })
//       .catch(error => {
//         commit('error', error)
//         reject(error)
//       })
//   })
// }

export function login ({ commit }, { email, password, stayLoggedIn }) {
  return new Promise((resolve, reject) => {
    const credential = credentials.find(cred => cred.email === email)

    var response = WrongCredentialsR
    if (credential && password === credential.password) {
      switch (email) {
        case Consommateur.email: response = ConsommateurR; break
        case Producteur.email: response = ProducteurR; break
        case Responsable.email: response = ResponsableR; break
        case Rex.email: response = RexR; break
        case Softozor.email: response = SoftozorR; break
        default: break
      }
    }

    const content = response.data.login
    const errors = content.errors
    if (errors.length > 0) {
      commit('error', errors)
      reject(errors)
    } else {
      const token = content.token
      const userId = content.user.id
      commit('storePermissions', {
        email,
        token,
        userId,
        permissions: adaptPermissions(content.user.permissions)
      })
      stayLoggedIn ? saveUser({ email, userId, token }) : saveToken({ token })
      resolve(response)
    }
  })
}

export function getPermissions ({ commit }) {
  // request
  //   .getAuthorizations({
  //     userId: cookie.get({ cookieId: 'userId' }),
  //     token: cookie.get({ cookieId: 'token' })
  //   })
  //   .then(response => {
  //     commit('storePermissions', {
  //       email: response.email,
  //       token: response.token,
  //       userId: response.userId,
  //       permissions: response.permissions
  //     })
  //   })
  //   .catch(error => {
  //     commit('error', error)
  //   })
  const token = cookie.get({ cookieId: types.cookies.TOKEN })
  const userId = cookie.get({ cookieId: types.cookies.USER_ID })
  const email = cookie.get({ cookieId: types.cookies.EMAIL })
  if (token && userId && email) {
    commit('storePermissions', {
      email,
      userId,
      token,
      permissions: []
    })
  } else {
    commit('logout')
    removeToken()
  }
}

export function logout ({ commit }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      commit('logout')
      removeToken()
      resolve()
    }, 500)
  })
}
