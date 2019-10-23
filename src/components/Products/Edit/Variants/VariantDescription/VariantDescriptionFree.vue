<template>
    <q-input
    :hint="$t('products.variantDescription')"
    :value="name"
    @input="updateName"
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
    name () { return this.editedProduct.variants[this.variantId].description.name }
  },
  methods: {
    ...mapActions(['updateEditedVariant']),
    updateName (value) {
      this.updateEditedVariant({
        variantId: this.variantId,
        path: 'description.name',
        value
      })
    }
  }
}
</script>
