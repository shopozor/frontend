import VariantPrice from '../VariantPrice'
import { mountQuasar } from '../../../../../../../test/utils'
import types from '../../../../../../types'

describe('VariantPrice', () => {
  const variantId = 'testId'
  const store = {
    getters: {
      editedProductDefaultGrossConsumerPrice: () => 100,
      editedProductDefaultUnit: () => types.units.KG,
      editedVariantDescriptionAmount: () => () => 100,
      editedVariantDescriptionUnit: () => () => types.units.GR,
      editedVariantGrossConsumerPrice: () => () => 10,
      editedVariantPriceMode: () => () => types.priceModes.FREE,
      softozorRatio: () => 0.05,
      rexRatio: () => 0.05,
      managerRatio: () => 0.05
    },
    actions: {
      updateEditedVariantGrossConsumerPrice: jest.fn()
    }
  }

  const wrapper = mountQuasar(VariantPrice, {
    shallow: true,
    store,
    propsData: {
      variantId
    }
  })

  const priceInput = wrapper.find({ name: 'PriceInput' })

  test('has a price input component', () => {
    expect(priceInput).toBeTruthy()
  })

  describe('if priceMode is not AUTO_PRICE', () => {
    test('dispatches updateEditedVariantGrossConsumerPrice when priceInput emits input', () => {
      priceInput.vm.$emit('input', 1000)
      expect(store.actions.updateEditedVariantGrossConsumerPrice).toHaveBeenCalledWith(
        expect.anything(),
        {
          variantId,
          value: 1000
        },
        undefined
      )
    })
  })

  describe('if priceMode is AUTO_PRICE', () => {
    let wrapperAuto
    beforeAll(() => {
      wrapperAuto = mountQuasar(VariantPrice, {
        shallow: true,
        propsData: {
          variantId
        },
        store: {
          getters: {
            ...store.getters,
            editedVariantPriceMode: () => () => types.priceModes.AUTO_PRICE
          },
          actions: { ...store.actions }
        }
      })
    })
    test('price input has "readonly" attribute', () => {
      const priceInputAuto = wrapperAuto.find({ name: 'PriceInput' })
      expect(priceInputAuto.attributes().readonly).toBe('true')
    })
  })
})
