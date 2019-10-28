import UnitField from '../UnitField'
import { mountQuasar } from '../../../../test/utils'
import * as units from '../../../types/units'

describe('UnitField', () => {
  const value = {
    amount: 1,
    unit: units.KG
  }
  const wrapper = mountQuasar(UnitField, {
    propsData: {
      value
    },
    shallow: true
  })

  beforeEach(() => {
    wrapper.setProps({
      value: { ...value },
      linked: undefined
    })
  })

  const qInput = wrapper.find({ name: 'QInput' })
  const unitSelect = wrapper.find({ name: 'UnitSelect' })

  test('has a q-input and a unitSelect field', () => {
    expect(qInput).toBeTruthy()
    expect(unitSelect).toBeTruthy()
  })

  describe('on entering a value (amount or unit)', () => {
    describe('when linked prop is unset', () => {
      test('emits "input" event with { amount: 2, unit: KG } payload on entering amount 2', () => {
        qInput.vm.$emit('input', 2)
        expect(wrapper.emitted().input[0][0]).toEqual({
          amount: 2,
          unit: units.KG
        })
      })
      test('emits "input" event with { amount: 1, unit: L } payload on entering unit L', () => {
        unitSelect.vm.$emit('input', {
          newUnit: units.L,
          oldUnit: units.KG,
          unitsAreCompatible: true
        })
        expect(wrapper.emitted().input[1][0]).toEqual({
          amount: 1,
          unit: units.L
        })
      })
    })
    describe('when linked prop is true', () => {
      test('updates amount if linked is true and newUnit is compatible', () => {
        wrapper.setProps({
          linked: true
        })
        unitSelect.vm.$emit('input', {
          newUnit: units.GR,
          oldUnit: units.KG,
          unitsAreCompatible: true
        })
        expect(wrapper.emitted().input[2][0]).toEqual({
          amount: 1000,
          unit: units.GR
        })
      })
    })
  })
})
