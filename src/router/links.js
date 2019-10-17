import types from '../types'

export const links = [
  types.links.SIGNUP,
  types.links.LOGIN,
  types.links.LOGOUT,
  types.links.PROFILE,
  types.links.HOME,
  types.links.MAP,
  types.links.SHOP,
  types.links.ACTIVATE,
  types.links.FORGOT_PASSWORD,
  types.links.RESET_PASSWORD
]

export const orderedLinks = {
  userManagement: [
    types.links.SIGNUP,
    types.links.LOGIN,
    types.links.PROFILE,
    types.links.LOGOUT
  ],
  navigation: [
    types.links.HOME,
    types.links.SHOP,
    types.links.MAP
  ]
}

export const accessRules = {
  [types.permissions.NOT_CONNECTED]: {
    [types.links.LOGIN]: true,
    [types.links.SIGNUP]: true,
    [types.links.LOGOUT]: false,
    [types.links.PROFILE]: false,
    [types.links.HOME]: true,
    [types.links.SHOP]: true,
    [types.links.MAP]: true,
    [types.links.ACTIVATE]: true,
    [types.links.FORGOT_PASSWORD]: true,
    [types.links.RESET_PASSWORD]: true
  },
  [types.permissions.CONSUMER]: {
    [types.links.LOGIN]: false,
    [types.links.SIGNUP]: false,
    [types.links.LOGOUT]: true,
    [types.links.PROFILE]: true,
    [types.links.HOME]: true,
    [types.links.SHOP]: true,
    [types.links.MAP]: true,
    [types.links.ACTIVATE]: false,
    [types.links.FORGOT_PASSWORD]: false,
    [types.links.RESET_PASSWORD]: false
  }
}
