import { unitsDefinitions } from '../UnitsDefinitions'
import * as units from '../../../types/units'

describe('UnitsDefinitions', () => {
  test('Every unit has a definition including a physicalSize and a wheight', () => {
    const allUnits = Object.values(units)
    for (let i = 0; i < allUnits.length; i++) {
      const definition = unitsDefinitions[allUnits[i]]
      expect(definition.physicalSize).toBeTruthy()
      expect(definition.wheight).toBeTruthy()
    }
  })

  test('Every definition correspond to a unit', () => {
    const definitionKeys = Object.keys(unitsDefinitions)
    for (let i = 0; i < definitionKeys.length; i++) {
      expect(units[definitionKeys[i]]).toBeTruthy()
    }
  })
})
