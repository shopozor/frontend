import logout from '../Logout.vue'
import { mountQuasar } from '../../../common/unit-tests/utils'

describe('lougout page', () => {
  it('displays a spinner while getter "isAuthorized" is true', () => {
    const store = {
      getters: {
        isAuthorized: true
      },
      actions: {
        logout: []
      }
    }

    const wrapper = mountQuasar(logout, { store, shallow: true })
    const spinner = wrapper.find({ name: 'QSpinner' })
    expect(spinner.exists()).toBeTruthy()
    const success = wrapper.find('#successfulLogout')
    expect(success.exists()).toBeFalsy()
  })

  it('displays a successful logout message when getter "isAuthorized" is false', () => {
    const store = {
      getters: {
        isAuthorized: false
      },
      actions: {
        logout: []
      }
    }

    const wrapper = mountQuasar(logout, { store, shallow: true })
    const spinner = wrapper.find({ name: 'QSpinner' })
    expect(spinner.exists()).toBeFalsy()
    const success = wrapper.find('#successfulLogout')
    expect(success.exists()).toBeTruthy()
  })

  it('displays a goHome button when getter "isAuthorized" is false', () => {
    const store = {
      getters: {
        isAuthorized: false
      },
      actions: {
        logout: []
      }
    }

    const wrapper = mountQuasar(logout, { store, shallow: true })
    /**
     * BUG: wrapper.find({ name: 'QSpinner' }) works,
     * but wrapper.find({ name: 'QBtn' }) does not
     * I don't understand why
     */
    const btn = wrapper.find('#goHome')

    jest.spyOn(wrapper.vm.$router, 'push')

    btn.trigger('click')
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/')
  })
})
