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
  computed: {
    ...mapGetters(['editedVariantName']),
    name () {
      return this.editedVariantName({ variantId: this.variantId })
    }
  },
  methods: {
    ...mapActions(['updateEditedVariantName']),
    updateName (value) {
      this.updateEditedVariantName({
        variantId: this.variantId,
        value
      })
    }
  }
}
</script>
