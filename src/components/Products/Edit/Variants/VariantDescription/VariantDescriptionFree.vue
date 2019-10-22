<template>
  <q-field>
    <q-input
      :float-label="$t('products.variantDescription')"
      :value="description"
      @input="updateDescription"
      :readonly="!isUpdatable" />
  </q-field>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import VariantCriticalValuesMixin from '../VariantCriticalValuesMixin.js'

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
    ...mapGetters(['editedVariants']),
    description () { return this.editedVariants[this.variantId].description },
    consumerPrice () { return this.editedVariants[this.variantId].consumerPrice }
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
