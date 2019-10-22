<template>
    <q-input
    :hint="$t('products.variantDescription')"
    :value="description"
    @input="updateDescription"
    :readonly="!isUpdatable" />
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import VariantCriticalValuesMixin from '../../../../../mixins/VariantCriticalValuesMixin'

export default {
  name: 'VariantDescriptionFree',
  mixins: [VariantCriticalValuesMixin],
  props: {
    variantId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['editedProduct']),
    description () { return this.editedProduct.variants[this.variantId].description },
    consumerPrice () { return this.editedProduct.variants[this.variantId].consumerPrice }
  },
  methods: {
    ...mapActions(['updateEditedVariant']),
    update (propName, value) {
      this.updateEditedVariant({variantId: this.variantId, newProps: {[propName]: value}})
    },
    updateDescription (value) { this.update('description', value) },
    updateConsumerPrice (value) { this.update('consumerPrice', value) }
  }
}
</script>
