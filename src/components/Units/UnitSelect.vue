<template>
  <q-select
    :label="label"
    :hint="hint"
    :value="labellizedUnit"
    @input="input"
    :options="options"
    :readonly="readonly"
    emit-value />
</template>

<script>
import { options, unitsAreCompatible } from './UnitsHelpers'
import Labellize from '../../mixins/Labellize'

export default {
  name: 'UnitSelect',
  data () {
    return {
      oldUnit: this.unit
    }
  },
  props: {
    unit: {
      type: String,
      required: true
    },
    compatibleUnits: {
      type: Boolean,
      default () {
        return false
      }
    },
    completeSet: {
      type: Boolean,
      default () {
        return false
      }
    },
    label: {
      type: String,
      default () {
        return ''
      }
    },
    readonly: {
      type: Boolean,
      default () {
        return false
      }
    },
    abbreviations: {
      type: Boolean,
      default () {
        return false
      }
    },
    withHint: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  computed: {
    i18nPath () {
      if (this.abbreviations) return 'units.abbreviations'
      else return 'units.names'
    },
    labellizedUnit () {
      return this.labellize({ value: this.unit, i18nPath: this.i18nPath })
    },
    options () {
      let opts = []
      if (this.compatibleUnits) {
        opts = options({ unit: this.unit, withCompleteSet: this.completeSet })
      } else {
        opts = options({ withCompleteSet: this.completeSet })
      }
      const labellized = this.labellizeArray({ values: opts, i18nPath: this.i18nPath })
      return labellized
    },
    hint () {
      if (this.withHint) return this.$t('products.unit')
      else return undefined
    }
  },
  methods: {
    input (unit) {
      const event = {
        newUnit: unit,
        oldUnit: this.oldUnit,
        unitsAreCompatible: unitsAreCompatible({ unit1: unit, unit2: this.oldUnit })
      }
      this.$emit('input', event)
      this.oldUnit = unit
    }
  },
  mixins: [Labellize]
}
</script>
