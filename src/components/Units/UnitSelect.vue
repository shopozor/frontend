<template>
  <q-select
    :label="label"
    :hint="$t('products.unit')"
    :value="labellizedValue"
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
      oldUnit: this.value
    }
  },
  props: {
    value: {
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
    }
  },
  computed: {
    i18nPath () {
      if (this.abbreviations) return 'units.abbreviations'
      else return 'units.names'
    },
    labellizedValue () {
      return this.labellize({ value: this.value, i18nPath: this.i18nPath })
    },
    options () {
      let opts = []
      if (this.compatibleUnits) {
        opts = options({ unit: this.value, withCompleteSet: this.completeSet })
      } else {
        opts = options({ withCompleteSet: this.completeSet })
      }
      const labellized = this.labellizeArray({ values: opts, i18nPath: this.i18nPath })
      return labellized
    }
  },
  methods: {
    input (value) {
      const event = {
        newUnit: value,
        oldUnit: this.oldUnit,
        unitsAreCompatible: unitsAreCompatible({ unit1: value, unit2: this.oldUnit })
      }
      this.$emit('input', event)
      this.oldUnit = value
    }
  },
  mixins: [Labellize]
}
</script>
