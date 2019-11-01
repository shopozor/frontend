<template>
  <q-card inline class="width-md q-ma-sm">
    <q-card-section>
      <variant-description-free v-if="priceMode === priceModes.FREE" :variantId="variantId"/>
      <variant-description-size-unit
        v-else-if="priceMode === priceModes.AUTO_UNIT"
        :variantId="variantId"
      />
      <variant-description-auto v-else-if="priceMode === priceModes.AUTO_PRICE" :variantId="variantId"/>
      <variant-description-bulk v-else-if="priceMode === priceModes.BULK" :variantId="variantId"/>
      <variant-price-mode-select :variantId="variantId" />
    </q-card-section>
  </q-card>
</template>

<script>
import { mapGetters } from 'vuex'
import types from '../../../../../types'
import VariantDescriptionFree from './VariantDescriptionFree'
import VariantDescriptionSizeUnit from './VariantDescriptionSizeUnit'
import VariantDescriptionAuto from './VariantDescriptionAuto'
import VariantDescriptionBulk from './VariantDescriptionBulk'
import VariantPriceModeSelect from './VariantPriceModeSelect'

export default {
  name: 'VariantDescription',
  data () {
    return {
      priceModes: types.priceModes
    }
  },
  props: {
    variantId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['editedVariantPriceMode']),
    priceMode () {
      return this.editedVariantPriceMode({ variantId: this.variantId })
    }
  },
  components: {
    VariantDescriptionFree,
    VariantDescriptionSizeUnit,
    VariantDescriptionAuto,
    VariantDescriptionBulk,
    VariantPriceModeSelect
  }
}
</script>
