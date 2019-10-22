<template>
  <q-card inline class="width-md q-ma-sm">
    <variant-price-auto
      v-if="autoPrice"
      :variantId="variantId"
      consumer
      producer />
    <variant-price-free
      v-else
      :variantId="variantId"
      consumer
      producer />
  </q-card>
</template>

<script>
import types from '../../../../../types'
import VariantPriceAuto from './VariantPriceAuto'
import VariantPriceFree from './VariantPriceFree'
import { mapGetters } from 'vuex'

export default {
  name: 'VariantPrice',
  props: {
    variantId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['editedVariants']),
    autoPrice () {
      const variantUI = this.editedVariants[this.variantId].variantUI
      return variantUI === types.variantUI.AUTO_PRICE
    }
  },
  components: { VariantPriceAuto, VariantPriceFree }
}
</script>
