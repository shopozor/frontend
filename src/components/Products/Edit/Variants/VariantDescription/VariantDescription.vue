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
      <variant-u-i-select :variantId="variantId" style="width: 100%"/>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import types from '../../../../../types'
import VariantDescriptionFree from './VariantDescriptionFree'
import VariantDescriptionSizeUnit from './VariantDescriptionSizeUnit'
import VariantDescriptionAuto from './VariantDescriptionAuto'
import VariantDescriptionBulk from './VariantDescriptionBulk'
import VariantUISelect from './VariantUISelect'

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
      return this.editedProduct.variants[this.variantId].variantUI
    },
    description () {
      return this.editedProduct.variants[this.variantId].description
    },
    size () {
      return this.editedProduct.variants[this.variantId].size
    },
    sizeUnit () {
      return this.editedProduct.variants[this.variantId].sizeUnit
    },
    consumerPrice () {
      return this.editedProduct.variants[this.variantId].consumerPrice
    },
    consumerPriceUnit () {
      return this.editedProduct.variants[this.variantId].consumerPriceUnit
    }
  },
  methods: {
    ...mapActions(['updateEditedVariant']),
    update (propName, value) {
      this.updateEditedVariant({
        variantId: this.variantId,
        newProps: { [propName]: value }
      })
    },
    updateDescription (value) {
      this.update('description', value)
    },
    updateSize (value) {
      this.update('size', value)
    },
    updateSizeUnit (newUnit) {
      this.update('sizeUnit', newUnit)
    },
    updateConsumerPrice (value) {
      this.update('consumerPrice', value)
    },
    updateConsumerPriceUnit (value) {
      this.update('consumerPriceUnit', value)
    }
  },
  components: {
    VariantDescriptionFree,
    VariantDescriptionSizeUnit,
    VariantDescriptionAuto,
    VariantDescriptionBulk,
    VariantUISelect
  }
}
</script>
