import SinglePriceInput from '../SinglePriceInput'
import { mountQuasar } from '../../../../test/utils'

describe('PriceInput', () => {
  const wrapper = mountQuasar(SinglePriceInput, {
    shallow: true,
    propsData: {
      value: 150
    }
  })

  const qInput = wrapper.find({ name: 'QInput' })

  test('has a q-input component', () => {
    expect(qInput.exists()).toBeTruthy()
  })

  describe('events', () => {
    test('emits "focus" event when q-input gets focus', () => {
      qInput.vm.$emit('focus')
      expect(wrapper.emitted().focus).toBeTruthy()
    })

    test('emits "input" event with value Number in centimes when q-input emits "input" with value String in francs', () => {
      qInput.vm.$emit('input', '2.5')
      expect(wrapper.emitted().input[0][0]).toBe(250)
    })

    test('emits "blur" event when q-input loses focus', () => {
      qInput.vm.$emit('blur')
      expect(wrapper.emitted().blur).toBeTruthy()
    })
  })

  describe('displayed value', () => {
    describe('when having focus', () => {
      beforeAll(() => {
        wrapper.vm.hasFocus = true
      })
      test('displays value Number in francs', () => {
        expect(wrapper.vm.displayVal).toBe(1.5)
      })
    })
    describe('when not having focus', () => {
      beforeAll(() => {
        wrapper.vm.hasFocus = false
      })
      test('displays value String in francs with 2 decimals', () => {
        expect(wrapper.vm.displayVal).toBe('1.50')
      })
    })
  })
})
