import VariantDescriptionFree from '../VariantDescriptionFree'
import { mountQuasar } from '../../../../../../../test/utils'

const variantId = 'testId'

const name = 'testName'

const store = {
  getters: {
    editedVariantName: () => () => name,
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
    updateEditedVariantName: jest.fn()
  }
}

const wrapper = mountQuasar(VariantDescriptionFree, {
  shallow: true,
  propsData: {
    variantId
  },
  store
})

const qInput = wrapper.find({ name: 'QInput' })

test('has a q-input with value editedVariantName', () => {
  expect(qInput.vm.value).toEqual(name)
})

test('dispatches updateEditedVariantName with new name when q-input emits input', () => {
  const newName = 'newName'
  qInput.vm.$emit('input', newName)
  expect(store.actions.updateEditedVariantName).toHaveBeenCalledWith(
    expect.anything(),
    {
      variantId,
      value: newName
    },
    undefined
  )
})
