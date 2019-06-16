import forgotPassword from '../ForgotPassword.vue'
import { mountQuasar } from '../../../common/unit-tests/utils'

describe('Reset password page', () => {
  const wrapper = mountQuasar(forgotPassword, { shallow: true })

  it('has a forgotPassword component', () => {
    expect(wrapper.find({ name: 'ForgotPassword' }).exists()).toBeTruthy()
  })
})
