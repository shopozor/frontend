import Signup from '../Signup'
import vuelidate from '../../boot/vuelidate'
import { mountQuasar } from '../../../test/jest/utils'

describe('Signup', () => {
  const wrapper = mountQuasar(Signup, { boot: [vuelidate] })

  test('checks that the filled-in mail adress matches standard form', () => {
    // const mailField = wrapper.find('#email')
    const mailInput = wrapper.find('input[type="email"]')
    wrapper.find('#email').trigger('focusin')
    mailInput.setValue('coincoin')
    mailInput.trigger('input')
    wrapper.find('#email').trigger('blur')
    wrapper.vm.$v.email.$touch()
    wrapper.find('input[type="password"]').trigger('focusin')
    const allEmails = wrapper.findAll('#email')
    for (var i = 0; i < allEmails.length; i++) {
      console.log(allEmails.at(i).classes())
    }

    // à utiliser plus tard
    const inputs = {
      'correct.form@mail.com': true,
      'missing.arobas.mail.com': false,
      'missing.top-level@mail': false
    }
    Object.keys(inputs).forEach(key => {
      console.log(key)
    })
  })
})
