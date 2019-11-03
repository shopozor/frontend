import VariantDescriptionBulk from '../VariantDescriptionBulk'
import { mountQuasar } from '../../../../../../../test/utils'
import types from '../../../../../../types'

const variantId = 'testId'

const unit = types.units.KG

const store = {
  getters: {
    editedVariantDescriptionUnit: () => () => unit,
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
    updateEditedVariantDescriptionUnit: jest.fn()
  }
}

const wrapper = mountQuasar(VariantDescriptionBulk, {
  shallow: true,
  propsData: {
    variantId
  },
  store
})

const unitSelect = wrapper.find({ name: 'UnitSelect' })

test('has a unit-select with unit editedVariantDescriptionUnit', () => {
  expect(unitSelect.vm.unit).toEqual(unit)
})

test('triggers updateEditedVariantDescriptionUnit when unit-field emits input', () => {
  unitSelect.vm.$emit('input', types.units.GR)
  expect(store.actions.updateEditedVariantDescriptionUnit).toHaveBeenCalled()
})
