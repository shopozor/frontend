<template>
  <div>
    <div class="row justify-center items-center">
      <price-input
        :consumerPrice="0"
        :setConsumerPrice="setDefaultConsumerPrice"
        :producerRatio="0.85"
        consumer
        producer
        width="220px" />
      <div class="row no-wrap items-center">
        <div class="q-ml-md q-mr-lg"> par </div>
        <unit-select
          :unit="defaultUnit"
          :setUnit="setDefaultUnit"
          filter="all"
          withPriceReferenceQuantities
          width="100px" />
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import PriceInput from '../../Price/PriceInput'
import UnitSelect from '../../Units/UnitSelect'
import types from '../../../types'

export default {
  name: 'ProductDefaultPricePerUnitSelector',
  computed: {
    ...mapGetters(['editedProduct']),
    defaultConsumerPrice () {
      /**
       *  TODO: cet accès est buggué
       * setDefaultConsumerPrice est lancé à chaque event tant que consumerPrice n'est pas défini
       */
      if (!this.editedProduct.pricing.defaultGrossPrice) this.setDefaultConsumerPrice(0)
      return this.editedProduct.pricing.defaultGrossPrice
    },
    defaultUnit () {
      if (!this.editedProduct.pricing.defaultUnit) this.setDefaultUnit(types.units.mass.KG)
      return this.editedProduct.pricing.defaultUnit
    }
  },
  methods: {
    ...mapActions(['updateEditedProduct']),
    setDefaultConsumerPrice (value) {
      this.updateEditedProduct({ path: 'pricing.defaultGrossPrice', value })
    },
    setDefaultUnit (event) {
      this.updateEditedProduct({ path: 'pricing.defaultUnit', value: event.value })
    }
  },
  components: {PriceInput, UnitSelect}
}
</script>
