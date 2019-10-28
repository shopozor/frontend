import { unitsDefinitions } from './UnitsDefinitions'
import * as units from '../../types/units'
import * as physicalSizes from '../../types/physicalSizes'

export function convert ({ oldValue, oldUnit, newUnit }) {
  if (unitsAreCompatible({ unit1: oldUnit, unit2: newUnit })) {
    return unsafeConvert({ oldValue, oldUnit, newUnit })
  } else {
    throw new Error(`Conversion error. Units ${oldUnit} and ${newUnit} are not compatible.`)
  }
}

function unsafeConvert ({ oldValue, oldUnit, newUnit }) {
  return oldValue * unitsDefinitions[oldUnit].wheight / unitsDefinitions[newUnit].wheight
}

export function options ({ unit, withCompleteSet }) {
  if (unit) return compatibleOptions({ unit, withCompleteSet })
  else return allOptions({ withCompleteSet })
}

function compatibleOptions ({ unit, withCompleteSet }) {
  return allOptions({ withCompleteSet }).filter(candidateUnit => {
    return unitsAreCompatible({ unit1: unit, unit2: candidateUnit })
  })
}

function allOptions ({ withCompleteSet }) {
  const allUnits = Object.values(units)
  return allUnits.filter(candidateUnit => {
    return withCompleteSet || !unitsDefinitions[candidateUnit].misc
  })
}

export function unitsAreCompatible ({ unit1, unit2 }) {
  return unitsDefinitions[unit1].physicalSize === unitsDefinitions[unit2].physicalSize
}

export function mainUnit ({ unit }) {
  return defaultUnit({ physicalSize: unitsDefinitions[unit].physicalSize })
}

export function defaultUnit ({ physicalSize }) {
  switch (physicalSize) {
    case physicalSizes.MASS: return units.KG
    case physicalSizes.VOLUME: return units.L
    case physicalSizes.NUMBER: return units.PIECE
    default: return units.PIECE
  }
}

export function unitsOfClass ({ physicalSize }) {
  return Object.entries(unitsDefinitions).reduce((unitsOfClass, definition) => {
    if (definition[1].physicalSize === physicalSize) unitsOfClass.push(definition[0])
    return unitsOfClass
  }, [])
}

export function getPhysicalSize ({ unit }) {
  return unitsDefinitions[unit].physicalSize
}
