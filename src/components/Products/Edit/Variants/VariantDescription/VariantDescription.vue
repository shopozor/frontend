<template>
  <q-card inline class="width-md q-ma-sm">
    <q-card-section>
      <variant-description-free v-if="variantUI === variantUIs.FREE" :variantId="variantId"/>
      <variant-description-size-unit
        v-else-if="variantUI === variantUIs.AUTO_UNIT"
        :variantId="variantId"
      />
      <variant-description-auto v-else-if="variantUI === variantUIs.AUTO_PRICE" :variantId="variantId"/>
      <variant-description-bulk v-else-if="variantUI === variantUIs.BULK" :variantId="variantId"/>
      <variant-price-mode-select :variantId="variantId" style="width: 100%"/>
      {{ editedProduct.variants[variantId].description.name }}
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
      variantUIs: types.variantUI
    }
  },
  props: {
    variantId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['editedProduct']),
    variantUI () {
      return this.editedProduct.variants[this.variantId].pricing.mode
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
