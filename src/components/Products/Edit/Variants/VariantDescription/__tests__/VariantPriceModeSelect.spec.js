import VariantPriceModeSelect from '../VariantPriceModeSelect'
import { mountQuasar } from '../../../../../../../test/utils'
import types from '../../../../../../types'

describe('VariantPriceModeSelect', () => {
  const variantId = 'testId'
  const variantUnit = types.units.L
  const defaultUnit = types.units.KG
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
      },
      editedVariantDescriptionUnit: () => () => variantUnit,
      editedProductDefaultUnit: () => defaultUnit
    },
    actions: {
      updateEditedVariantPriceMode: jest.fn(),
      updateEditedVariantDescriptionUnit: jest.fn()
    }
  }
  const wrapper = mountQuasar(VariantPriceModeSelect, {
    shallow: true,
    propsData: {
      variantId
    },
    store
  })

  const qSelect = wrapper.find({ name: 'QSelect' })

  test('provides all priceModes options', () => {
    const options = wrapper.vm.options
    const optionsValues = options.map(option => option.value)
    const priceModes = Object.values(types.priceModes)
    expect(optionsValues).toEqual(priceModes)
  })

  test('dispatches updateEditedVariantPriceMode with the new priceMode when q-select emits input', () => {
    const priceModeNotAutoPrice = types.priceModes.BULK
    qSelect.vm.$emit('input', priceModeNotAutoPrice)
    expect(store.actions.updateEditedVariantPriceMode).toHaveBeenCalledWith(
      expect.anything(),
      {
        variantId,
        value: priceModeNotAutoPrice
      },
      undefined
    )
  })

  test('displays the editedVariantPriceMode from the store', () => {
    const value = wrapper.vm.priceMode.value
    expect(value).toBe(types.priceModes.FREE)
  })

  describe('when user selects AUTO_PRICE as default unit and variant unit are not compatible', () => {
    beforeAll(() => {
      qSelect.vm.$emit('input', types.priceModes.AUTO_PRICE)
    })
    test('replaces variant unit with default unit', () => {
      expect(store.actions.updateEditedVariantDescriptionUnit).toBeCalledWith(
        expect.anything(),
        {
          variantId,
          value: defaultUnit
        },
        undefined
      )
    })
    test('alerts user about change', () => {
      expect(wrapper.vm.alertUnitChange).toBeTruthy()
    })
  })
})
