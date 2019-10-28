<template>
  <div class="row no-wrap justify-center items-baseline q-gutter-md">
    <q-input
      input-class="text-right"
      style="maxWidth: 80px"
      :value="value.amount"
      type="number"
      :hint="hint"
      :readonly="readonly"
      @input="inputValue" />
    <unit-select
      :unit="value.unit"
      :completeSet="completeSet"
      :compatibleUnits="compatibleUnits"
      :withHint="withHint"
      :abbreviations="true"
      :readonly="readonly"
      @input="inputUnit" />
  </div>
</template>

<script>
import { convert } from './UnitsHelpers'
import UnitSelect from './UnitSelect'

export default {
  name: 'UnitField',
  props: {
    value: {
      type: Object,
      required: true
    },
    linked: {
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
    },
    withHint: {
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
    compatibleUnits: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  computed: {
    hint () {
      if (this.withHint) return this.$t('products.measure')
      else return undefined
    }
  },
  methods: {
    inputValue (valueEvent) {
      const amount = Number.parseFloat(valueEvent)
      const unit = this.value.unit
      this.$emit('input', { amount, unit })
    },
    inputUnit (unitEvent) {
      const oldValue = this.value.amount
      const oldUnit = unitEvent.oldUnit
      const newUnit = unitEvent.newUnit
      let amount = this.value.amount
      const unitsAreCompatible = unitEvent.unitsAreCompatible
      if (unitsAreCompatible && this.linked) {
        amount = convert({ oldValue, oldUnit, newUnit })
      }
      this.$emit('input', { amount, unit: newUnit })
    }
  },
  components: {UnitSelect}
}
</script>
