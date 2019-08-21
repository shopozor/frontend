import resetPassword from '../ResetPassword.vue'
import { mountQuasar } from '../../../common/unit-tests/utils'

describe('Reset password page', () => {
  const wrapper = mountQuasar(resetPassword, { shallow: true })

  it('has a resetPassword component', () => {
    expect(wrapper.find({ name: 'ResetPassword' }).exists()).toBeTruthy()
  })
})
