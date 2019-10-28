import {
  convert,
  options,
  unitsAreCompatible,
  mainUnit,
  defaultUnit
} from '../UnitsHelpers'
import * as units from '../../../types/units'
import * as physicalSizes from '../../../types/physicalSizes'
import { unitsDefinitions } from '../UnitsDefinitions'

describe('UnitHelpers', () => {
  describe('convert converts an oldValue given in oldUnit into a newValue given in newunit', () => {
    test('1kg corresponds to 1000gr', () => {
      const newValue = convert({ oldValue: 1, oldUnit: units.KG, newUnit: units.GR })
      expect(newValue).toBe(1000)
    })

    test('throws an error if oldUnit and newUnit are not compatible', () => {
      expect(() => {
        convert({ oldValue: 1, oldUnit: units.KG, newUnit: units.L })
      }).toThrow()
    })
  })

  describe('options returns an array of units', () => {
    test('no misc unit if withCompleteSet is unset', () => {
      const noMiscOptions = options({})
      noMiscOptions.forEach(unit => {
        expect(unitsDefinitions[unit].misc).toBeFalsy()
      })
    })

    test('with misc units if whithCompleteSet is true', () => {
      const withMiscOptions = options({ withCompleteSet: true })
      const allMiscUnits = Object.values(units).filter(unit => unitsDefinitions[unit].misc)
      allMiscUnits.forEach(miscUnit => {
        const exists = withMiscOptions.some(unit => unit === miscUnit)
        expect(exists).toBeTruthy()
      })
    })

    test('only compatible units if a unit is specified', () => {
      const compatibleOptions = options({ unit: units.KG })
      compatibleOptions.forEach(candidateUnit => {
        const physcalSizeOfCandidate = unitsDefinitions[candidateUnit].physicalSize
        expect(physcalSizeOfCandidate).toBe(physicalSizes.MASS)
      })
    })
  })

  describe('units are compatible returns true if the two units have the same physicalSize', () => {
    test('kg and gr are compatible', () => {
      expect(unitsAreCompatible({ unit1: units.KG, unit2: units.GR })).toBe(true)
    })
    test('kg and l ar not compatible', () => {
      expect(unitsAreCompatible({ unit1: units.KG, unit2: units.L })).toBe(false)
    })
  })

  describe('mainUnit returns the default unit for the related physicalSIze', () => {
    test('return unit is compatible', () => {
      Object.values(units).forEach(unit => {
        const candidateUnit = mainUnit({ unit })
        const physcalSizeOfCandidate = unitsDefinitions[candidateUnit].physicalSize
        const physcalSizeOfUnit = unitsDefinitions[unit].physicalSize
        expect(physcalSizeOfCandidate).toBe(physcalSizeOfUnit)
      })
    })
  })

  describe('defaultUnit returns the default unit of the physicalSize', () => {
    test('return unit has the given physicalSize', () => {
      Object.values(physicalSizes).forEach(physicalSize => {
        const candidateUnit = defaultUnit({ physicalSize })
        const physcalSizeOfCandidate = unitsDefinitions[candidateUnit].physicalSize
        expect(physcalSizeOfCandidate).toBe(physicalSize)
      })
    })
  })
})
