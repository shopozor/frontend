<template>
  <div>
    <div class="row justify-center items-center">
      <price-input
        :grossConsumerPrice="defaultGrossConsumerPrice"
        :softozorRatio="softozorRatio"
        :rexRatio="rexRatio"
        :managerRatio="managerRatio"
        consumer
        producer
        @input="updateDefaultGrossConsumerPrice"
        width="220px" />
      <div class="row no-wrap items-center items-baseline">
        <div class="q-ml-md q-mr-lg"> par </div>
        <unit-select
          :unit="defaultUnit"
          @input="updateDefaultUnit"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import PriceInput from '../../Price/PriceInput'
import UnitSelect from '../../Units/UnitSelect'
import { convert } from '../../Units/UnitsHelpers'
// import types from '../../../types'

export default {
  name: 'ProductDefaultPricePerUnitSelector',
  computed: {
    ...mapGetters([
      'editedProductDefaultGrossConsumerPrice',
      'editedProductDefaultUnit',
      'softozorRatio',
      'rexRatio',
      'managerRatio'
    ]),
    defaultGrossConsumerPrice () {
      const defaultValue = 0
      if (!this.editedProductDefaultGrossConsumerPrice) {
        this.updateEditedProductDefaultGrossConsumerPrice({ value: defaultValue})
        return defaultValue
      } else {
        return this.editedProductDefaultGrossConsumerPrice
      }
    },
    defaultUnit () {
      const defaultValue = undefined
      if (!this.editedProductDefaultUnit) {
        this.updateEditedProductDefaultUnit({ value: defaultValue })
        return defaultValue
      } else {
        return this.editedProductDefaultUnit
      }
    }
  },
  methods: {
    ...mapActions([
      'updateEditedProductDefaultGrossConsumerPrice',
      'updateEditedProductDefaultUnit'
    ]),
    updateDefaultGrossConsumerPrice (value) {
      this.updateEditedProductDefaultGrossConsumerPrice({ value })
    },
    updateDefaultUnit (event) {
      const oldValue = this.defaultGrossConsumerPrice
      const per = true
      const oldUnit = event.oldUnit
      const newUnit = event.newUnit
      const newValue = convert({
        oldValue,
        per,
        oldUnit,
        newUnit
      })
      this.updateEditedProductDefaultGrossConsumerPrice({ value: newValue })
      this.updateEditedProductDefaultUnit({ value: event.newUnit })
    }
  },
  components: {PriceInput, UnitSelect}
}
</script>
