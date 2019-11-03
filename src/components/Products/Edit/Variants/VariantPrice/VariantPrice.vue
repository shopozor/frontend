<template>
  <q-card>
    <q-card-section>
      <Price-input
        :grossConsumerPrice="grossConsumerPrice"
        :softozorRatio="softozorRatio"
        :rexRatio="rexRatio"
        :managerRatio="managerRatio"
        :readonly="autoMode"
        @input="updateGrossConsumerPrice"
        consumer
        producer />
    </q-card-section>
  </q-card>
</template>

<script>
import types from '../../../../../types'
import PriceInput from '../../../../Price/PriceInput'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'VariantPrice',
  props: {
    variantId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'editedProductDefaultGrossConsumerPrice',
      'editedProductDefaultUnit',
      'editedVariantDescriptionAmount',
      'editedVariantDescriptionUnit',
      'editedVariantGrossConsumerPrice',
      'editedVariantPriceMode',
      'softozorRatio',
      'rexRatio',
      'managerRatio'
    ]),
    autoMode () {
      const priceMode = this.editedVariantPriceMode({ variantId: this.variantId })
      return priceMode === types.priceModes.AUTO_PRICE
    },
    grossConsumerPrice () {
      const price = this.editedVariantGrossConsumerPrice({ variantId: this.variantId })
      return price
    }
  },
  methods: {
    ...mapActions(['updateEditedVariantGrossConsumerPrice']),
    updateGrossConsumerPrice (value) {
      if (!this.autoMode) {
        this.updateEditedVariantGrossConsumerPrice({
          variantId: this.variantId,
          value
        })
      }
    }
  },
  components: { PriceInput }
}
</script>
