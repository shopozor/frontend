import VariantDescriptionSizeUnit from '../VariantDescriptionSizeUnit'
import { mountQuasar } from '../../../../../../../test/utils'
import types from '../../../../../../types'

const variantId = 'testId'

const value = {
  amount: 1,
  unit: types.units.KG
}

const store = {
  getters: {
    editedVariantDescriptionAmount: () => () => value.amount,
    editedVariantDescriptionUnit: () => () => value.unit,
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
    updateEditedVariantDescriptionUnit: jest.fn()
  }
}

const wrapper = mountQuasar(VariantDescriptionSizeUnit, {
  shallow: true,
  propsData: {
    variantId
  },
  store
})

const unitField = wrapper.find({ name: 'UnitField' })

test('has a unit-field with value { amount: editedVariantDescriptionAmount, unit: editedVariantDescriptionUnit }', () => {
  expect(unitField.vm.value).toEqual(value)
})

test('triggers updateEditedVariantDescriptionAmount and updateEditedVariantDescriptionUnit when unit-field emits input', () => {
  const newValue = {
    amount: 2,
    unit: types.units.GR
  }
  unitField.vm.$emit('input', newValue)
  expect(store.actions.updateEditedVariantDescriptionAmount).toHaveBeenCalled()
  expect(store.actions.updateEditedVariantDescriptionUnit).toHaveBeenCalled()
})
