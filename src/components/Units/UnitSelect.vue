<template>
  <q-select
    :style="`width: ${width}`"
    :label="label"
    :hint="$t('products.unit')"
    :value="unit"
    @input="setUnit"
    :options="options"
    :readonly="readonly" />
</template>

<script>
import * as helpers from './UnitsHelpers'

export default {
  name: 'UnitSelect',
  props: {
    unit: {
      type: String,
      required: true
    },
    setUnit: {
      type: Function,
      required: true
    },
    filter: {
      type: String,
      default () {
        return 'compatible'
      }
    },
    width: {
      type: String,
      default () {
        return '100%'
      }
    },
    label: {
      type: String,
      default () {
        return ''
      }
    },
    withPriceReferenceQuantities: {
      type: Boolean,
      default () {
        return false
      }
    },
    readonly: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  computed: {
    options () {
      return helpers.options({
        filter: this.filter,
        unit: this.unit,
        withPriceReferenceQuantities: this.withPriceReferenceQuantities
      })
    }
  }
}
</script>
