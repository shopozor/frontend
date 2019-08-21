import Signup from '../Signup'
import vuelidate from '../../boot/vuelidate'
import { mountQuasar } from '../../../common/unit-tests/utils'
import consumerCreation from '../../../cypress/fixtures/Authentication/RegisterConsumer/Responses/SuccessfulConsumerCreation.json'

describe('Signup', () => {
  const wrapper = mountQuasar(Signup, {
    boot: [vuelidate],
    store: {
      actions: {
        signup: [
          { resolve: consumerCreation }
        ]
      }
    }
  })
  const email = wrapper.find('#email')
  const password = wrapper.find('#password')
  const confirmPassword = wrapper.find('#confirmPassword')
  const acceptCookies = wrapper.find('#acceptCookies')
  const acceptTermsOfService = wrapper.find('#acceptTermsOfService')
  const createAccount = wrapper.find('#createAccount')

  it('contains an e-mail field', () => {
    expect(email).toBeTruthy()
  })

  it('contains a password field', () => {
    expect(password).toBeTruthy()
  })

  it('contains a confirm password field', () => {
    expect(confirmPassword).toBeTruthy()
  })

  it('contains an accept cookies checkbox', () => {
    expect(acceptCookies).toBeTruthy()
  })

  it('contains an accept terms of service checkbox', () => {
    expect(acceptTermsOfService).toBeTruthy()
  })

  it('contains a create account button', () => {
    expect(createAccount).toBeTruthy()
  })

  it('provides a description of the cookies policy', () => {
    const text = acceptCookies.vm.$slots.default[0].text
    expect(text).toContain('signup.cookiesPolicy.explain')
  })

  it('provides a description of the terms of service', () => {
    const text = acceptTermsOfService.vm.$slots.default[0].text
    expect(text).toContain('signup.termsOfService.explain')
  })

  function setValidity (value) {
    email.vm.$emit('validity-check', value)
    password.vm.$emit('validity-check', value)
    confirmPassword.vm.$emit('validity-check', value)
    wrapper.vm.acceptCookies = value
    wrapper.vm.acceptTermsOfService = value
  }

  describe('activates the create account button only if all fields are valid and all mandatory checkboxes are checked', () => {
    test('all valid', done => {
      setValidity(true)
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.disableCreateAccount).toBeFalsy()
        done()
      })
    })

    test('invalid email', done => {
      setValidity(true)
      email.vm.$emit('validity-check', false)
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.disableCreateAccount).toBeTruthy()
        done()
      })
    })

    test('acceptCookies unchecked', done => {
      setValidity(true)
      wrapper.vm.acceptCookies = false
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.disableCreateAccount).toBeTruthy()
        done()
      })
    })
  })

  it('dispatches the signup action when the create account button is clicked while enabled', done => {
    setValidity(true)
    wrapper.vm.$nextTick(() => {
      createAccount.trigger('click')
      expect(wrapper.vm.creatingAccount).toBeTruthy()
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.emailSent).toBeTruthy()
        expect(wrapper.vm.creatingAccount).toBeFalsy()
        done()
      })
    })
  })
})
