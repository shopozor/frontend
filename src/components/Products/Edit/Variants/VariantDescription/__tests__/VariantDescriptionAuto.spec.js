import VariantDescriptionAuto from '../VariantDescriptionAuto'
import { mountQuasar } from '../../../../../../../test/utils'
import types from '../../../../../../types'

const variantId = 'testId'

const amount = 1
const unit = types.units.GR
const defaultGrossConsumerPrice = 1000
const defaultUnit = types.units.KG

const store = {
  getters: {
    editedVariantDescriptionAmount: () => () => amount,
    editedVariantDescriptionUnit: () => () => unit,
    editedProductDefaultGrossConsumerPrice: () => defaultGrossConsumerPrice,
    editedProductDefaultUnit: () => defaultUnit,
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
    updateEditedVariantDescriptionAmount: jest.fn(),
    updateEditedVariantDescriptionUnit: jest.fn(),
    updateEditedVariantGrossConsumerPrice: jest.fn()
  }
}

const wrapper = mountQuasar(VariantDescriptionAuto, {
  shallow: true,
  propsData: {
    variantId
  },
  store
})

const unitField = wrapper.find({ name: 'UnitField' })

test('has a unitField with value { amount: editedVariantDescriptionAmount, unit: editedVariantDescriptionUnit }', () => {
  expect(unitField.vm.value).toEqual({ amount, unit })
})

describe('when mounted', () => {
  describe('if the defaultGrossConsumerPrice and the defaultUnit are set', () => {
    test('dispatches updateEditedVariantGrossConsumerPrice with the calculated grossConsumerPrice', () => {
      expect(store.actions.updateEditedVariantGrossConsumerPrice).toHaveBeenCalledWith(
        expect.anything(),
        {
          variantId,
          value: 1
        },
        undefined
      )
    })
  })
  describe('if the defaultGrossConsumerPrice or the defaultUnit are undefined', () => {
    test('opens the setDefault dialog', () => {
      const storeWithUndefinedDefault = {
        getters: {
          ...store.getters,
          editedProductDefaultGrossConsumerPrice: () => {},
          editedProductDefaultUnit: () => {}
        },
        actions: {
          ...store.actions
        }
      }

      const wrapperWithUndefinedDefault = mountQuasar(VariantDescriptionAuto, {
        shallow: true,
        propsData: {
          variantId
        },
        store: storeWithUndefinedDefault
      })

      expect(wrapperWithUndefinedDefault.vm.defineDefaultValues).toBeTruthy()
    })
  })
})

describe('when unitField emits input', () => {
  const newField = {
    amount: 2,
    unit: types.units.KG
  }
  beforeAll(() => {
    store.actions.updateEditedVariantGrossConsumerPrice.mockClear()
    unitField.vm.$emit('input', newField)
  })

  test('dispatches unpdateEditedVariantDescriptionAmount with new amount', () => {
    expect(store.actions.updateEditedVariantDescriptionAmount).toHaveBeenCalledWith(
      expect.anything(),
      {
        variantId,
        value: newField.amount
      },
      undefined
    )
  })

  test('dispatches unpdateEditedVariantDescriptionUnit with new unit', () => {
    expect(store.actions.updateEditedVariantDescriptionUnit).toHaveBeenCalledWith(
      expect.anything(),
      {
        variantId,
        value: newField.unit
      },
      undefined
    )
  })

  test('dispatches updateEditedVariantGrossConsumerPrice with the calculated grossConsumerPrice', () => {
    expect(store.actions.updateEditedVariantGrossConsumerPrice).toHaveBeenCalledWith(
      expect.anything(),
      {
        variantId,
        value: 2000
      },
      undefined
    )
  })
})
