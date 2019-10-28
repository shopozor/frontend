import * as units from '../../types/units'
import * as physicalSizes from '../../types/physicalSizes'

export const unitsDefinitions = {
  [units.KG]: {
    physicalSize: physicalSizes.MASS,
    wheight: 1000
  },
  [units.HG]: {
    physicalSize: physicalSizes.MASS,
    wheight: 100,
    misc: true
  },
  [units.DAG]: {
    physicalSize: physicalSizes.MASS,
    wheight: 10,
    misc: true
  },
  [units.GR]: {
    physicalSize: physicalSizes.MASS,
    wheight: 1
  },
  [units.ML]: {
    physicalSize: physicalSizes.VOLUME,
    wheight: 1
  },
  [units.CL]: {
    physicalSize: physicalSizes.VOLUME,
    wheight: 10
  },
  [units.DL]: {
    physicalSize: physicalSizes.VOLUME,
    wheight: 100
  },
  [units.L]: {
    physicalSize: physicalSizes.VOLUME,
    wheight: 1000
  },
  [units.PIECE]: {
    physicalSize: physicalSizes.NUMBER,
    wheight: 1
  }
}

export const physicalSizesRank = {
  [physicalSizes.MASS]: 0,
  [physicalSizes.VOLUME]: 1,
  [physicalSizes.NUMBER]: 2
}
