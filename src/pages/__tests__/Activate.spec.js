import Activate from '../Activate'
import { mountQuasar } from '../../../test/jest/utils'
import expiredToken from '../../../cypress/fixtures/Authentication/RegisterConsumer/Responses/ExpiredAccountConfirmationLink'

describe('Activation page', () => {
  it('sets state to "successfulActivation" when activation is successful', done => {
    const store = {
      actions: {
        activate: [
          {
            args: {
              encodedId: 'validId',
              oneTimeToken: 'validToken'
            },
            resolve: {}
          }
        ]
      }
    }
    const mocks = {
      $route: {
        params: {
          id: 'validId',
          token: 'validToken'
        }
      }
    }
    const wrapper = mountQuasar(Activate, { store, mocks })
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$data.state).toBe('successfulActivation')
      done()
    })
  })

  it(`sets state to ${expiredToken.data.consumerActivate.errors[0].message} if activation link has expired`, done => {
    const store = {
      actions: {
        activate: [
          {
            args: {
              encodedId: 'validId',
              oneTimeToken: 'expiredToken'
            },
            reject: expiredToken.data.consumerActivate.errors
          }
        ]
      }
    }
    const mocks = {
      $route: {
        params: {
          id: 'validId',
          token: 'expiredToken'
        }
      }
    }
    const wrapper = mountQuasar(Activate, { store, mocks })
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$data.state).toBe(expiredToken.data.consumerActivate.errors[0].message)
      done()
    })
  })

  const store = {
    actions: {
      activate: [
        {
          resolve: {}
        }
      ]
    }
  }
  const wrapper = mountQuasar(Activate, { store })
  it('displays a spinner while waiting for activation', () => {
    wrapper.setData({ state: 'pending' })
    expect(wrapper.contains('.q-spinner')).toBe(true)
  })

  it('displays a success message when activation is completed', () => {
    wrapper.setData({ state: 'successfulActivation' })
    expect(wrapper.contains('#successfulActivation')).toBe(true)
  })

  it('displays an error message when activation link has expired', () => {
    wrapper.setData({ state: expiredToken.data.consumerActivate.errors[0].message })
    expect(wrapper.contains(`#${expiredToken.data.consumerActivate.errors[0].message}`)).toBe(true)
  })

  it('displays an unknown error message when any other error happens', () => {
    wrapper.setData({ state: 'unknownError' })
    expect(wrapper.contains('#unknownError')).toBe(true)
  })
})
