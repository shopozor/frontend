import UnitSelect from '../UnitSelect'
import { mountQuasar } from '../../../../test/utils'
import * as units from '../../../types/units'

describe('UnitSelect', () => {
  const wrapper = mountQuasar(UnitSelect, {
    shallow: true,
    propsData: {
      unit: units.KG
    }
  })
  beforeEach(() => {
    wrapper.setProps({
      unit: units.KG,
      compatibleUnits: undefined,
      completeSet: undefined,
      abbreviations: undefined
    })
  })

  describe('emits the event input: { newUnit, oldUnit, unitsAreCompatible } when selecting new unit', () => {
    const qSelect = wrapper.find({ name: 'QSelect' })
    test('when KG is set, selecting GR, receiving { newUnit: KG, oldUnit: GR, unitsAreCompatible: true }', () => {
      qSelect.vm.$emit('input', units.GR)
      expect(wrapper.emitted().input[0][0]).toEqual({
        newUnit: units.GR,
        oldUnit: units.KG,
        unitsAreCompatible: true
      })
    })
    test('when GR is set, selecting L, receiving { newUnit: GR, oldUnit: L, unitsAreCompatible: false }', () => {
      qSelect.vm.$emit('input', units.L)
      expect(wrapper.emitted().input[1][0]).toEqual({
        newUnit: units.L,
        oldUnit: units.GR,
        unitsAreCompatible: false
      })
    })
  })

  describe('provides a list of options', () => {
    describe('with a current unit of KG:', () => {
      test('contains GR, L, but not HG if compatibleUnits and completeSet are unset', () => {
        const options = wrapper.vm.options.map(option => option.value)
        expect(options).toContain(units.GR)
        expect(options).toContain(units.L)
        expect(options).not.toContain(units.HG)
      })

      test('contains GR, but not L neither HG if compatibleUnits is true and completeSet is unset', () => {
        wrapper.setProps({
          compatibleUnits: true
        })
        const options = wrapper.vm.options.map(option => option.value)
        expect(options).toContain(units.GR)
        expect(options).not.toContain(units.L)
        expect(options).not.toContain(units.HG)
      })

      test('contains GR, L and HG if compatibleUnits is unset and completeSet is true', () => {
        wrapper.setProps({
          completeSet: true
        })
        const options = wrapper.vm.options.map(option => option.value)
        expect(options).toContain(units.GR)
        expect(options).toContain(units.L)
        expect(options).toContain(units.HG)
      })

      test('contains GR and HG, but not L if compatibleUnits completeSet are true', () => {
        wrapper.setProps({
          compatibleUnits: true,
          completeSet: true
        })
        const options = wrapper.vm.options.map(option => option.value)
        expect(options).toContain(units.GR)
        expect(options).not.toContain(units.L)
        expect(options).toContain(units.HG)
      })
    })
  })

  describe('displays the units name or abbreviation according to abbreviations prop', () => {
    test('uses i18n path "units.names.<<unit>>" for value and options if abbreviations is unset', () => {
      expect(wrapper.vm.labellizedUnit.label).toMatch('units.names.')
      wrapper.vm.options.forEach(option => {
        expect(option.label).toMatch('units.names.')
      })
    })

    test('uses i18n path "units.abbreviations.<<unit>>" for value and options if abbreviations is true', () => {
      wrapper.setProps({
        abbreviations: true
      })
      expect(wrapper.vm.labellizedUnit.label).toMatch('units.abbreviations.')
      wrapper.vm.options.forEach(option => {
        expect(option.label).toMatch('units.abbreviations.')
      })
    })
  })
})
