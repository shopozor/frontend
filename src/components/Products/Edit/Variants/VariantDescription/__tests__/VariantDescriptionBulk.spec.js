import VariantDescriptionBulk from '../VariantDescriptionBulk'
import { mountQuasar } from '../../../../../../../test/utils'
import types from '../../../../../../types'

const variantId = 'testId'

const oldUnit = types.units.KG

const store = {
  getters: {
    editedVariantDescriptionUnit: () => () => oldUnit,
    editedVariantOrdersSummary: () => () => {
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
  expect(unitSelect.vm.unit).toEqual(oldUnit)
})

test('dispatches updateEditedVariantDescriptionUnit with new unit when unitSelect emits input', () => {
  const newUnit = types.units.GR
  unitSelect.vm.$emit('input', { newUnit, oldUnit })
  expect(store.actions.updateEditedVariantDescriptionUnit).toHaveBeenCalledWith(
    expect.anything(),
    {
      variantId,
      value: newUnit
    },
    undefined
  )
})
