import VariantPriceModeSelect from '../VariantPriceModeSelect'
import { mountQuasar } from '../../../../../../../test/utils'

describe('VariantPriceModeSelect', () => {
  const wrapper = mountQuasar(VariantPriceModeSelect, {
    shallow: true
  })

  test('has a q-select component', () => {
    const qSelect = wrapper.find({ name: 'QSelect' })
    expect(qSelect).toBeTruthy()
  })
})
