import VariantPriceModeSelect from '../VariantPriceModeSelect'
import { mountQuasar } from '../../../../../../../test/utils'
import types from '../../../../../../types'

describe('VariantPriceModeSelect', () => {
  const variantId = 'testId'
  const store = {
    getters: {
      editedVariantPriceMode: () => () => types.priceModes.FREE,
      pendingOrdersOfVariantSummary: () => () => {
        return {
          paid: {
            amount: 0
          },
          notPaid: {
            amount: 0
          }
        }
      }
    },
    actions: {
      updateEditedVariantPriceMode: jest.fn()
    }
  }
  const wrapper = mountQuasar(VariantPriceModeSelect, {
    shallow: true,
    propsData: {
      variantId
    },
    store
  })

  test('provides all priceModes options', () => {
    const options = wrapper.vm.options
    const optionsValues = options.map(option => option.value)
    const priceModes = Object.values(types.priceModes)
    expect(optionsValues).toEqual(priceModes)
  })

  test('dispatches updateEditedVariantPriceMode with the new priceMode when q-select emits input', () => {
    const qSelect = wrapper.find({ name: 'QSelect' })
    const priceMode = types.priceModes.BULK
    qSelect.vm.$emit('input', priceMode)
    expect(store.actions.updateEditedVariantPriceMode).toHaveBeenCalledWith(
      expect.anything(),
      {
        variantId,
        value: priceMode
      },
      undefined
    )
  })

  test('displays the editedVariantPriceMode from the store', () => {
    const value = wrapper.vm.priceMode.value
    expect(value).toBe(types.priceModes.FREE)
  })
})
