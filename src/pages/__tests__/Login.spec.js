import login from '../Login.vue'
import { mountQuasar } from '../../../test/utils'

describe('login page', () => {
  const validCredentials = {
    email: 'valid@mail.com',
    password: 'ValidP455word!'
  }

  const invalidCredentials = {
    email: 'invalid@mail.com',
    password: 'inValidP455word!'
  }

  const store = {
    actions: {
      login: [
        {
          args: validCredentials,
          resolve: {}
        },
        {
          args: invalidCredentials,
          reject: [{
            message: 'WRONG_CREDENTIALS'
          }]
        }
      ]
    }
  }

  const emptyWrapper = mountQuasar(login, { shallow: true })

  it('has an email input field', () => {
    expect(emptyWrapper.find('#email').exists()).toBeTruthy()
  })

  it('has a password input field', () => {
    expect(emptyWrapper.find('#password').exists()).toBeTruthy()
  })

  it('has a toggleStayLoggedIn input field', () => {
    expect(emptyWrapper.find('#toggleStayLoggedIn').exists()).toBeTruthy()
  })

  it('has a loginButton input field', () => {
    expect(emptyWrapper.find('#loginButton').exists()).toBeTruthy()
  })

  it('has a forgotPassword input field', () => {
    expect(emptyWrapper.find('#forgotPassword').exists()).toBeTruthy()
  })

  it('routes to home page if login is successful', done => {
    const wrapper = mountQuasar(login, { store })
    jest.spyOn(wrapper.vm.$router, 'push')
    wrapper.vm.email = validCredentials.email
    wrapper.vm.password = validCredentials.password
    wrapper.find('#loginButton').trigger('click')
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/')
      done()
    })
  })

  it('displays an error message if login fails', done => {
    const wrapper = mountQuasar(login, { store })
    wrapper.vm.email = invalidCredentials.email
    wrapper.vm.password = invalidCredentials.password
    wrapper.find('#loginButton').trigger('click')
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.incorrectIdentifiers').exists()).toBeTruthy()
      done()
    })
  })
})
