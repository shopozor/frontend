<template>
  <!-- <q-btn-toggle
    :value="UI"
    @input="updateVariantUI"
  :options="options" />-->
  <q-select
    :hint="$t('products.variantType')"
    :value="UI"
    @input="updateVariantUI"
    :options="options"
    :readonly="!isUpdatable"
  />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as variantUI from '../../../../../types/variantUI'
import VariantCriticalValuesMixin from '../../../../../mixins/VariantCriticalValuesMixin'
import labellize from '../../../../../mixins/Labellize'

export default {
  name: 'VariantUISelect',
  mixins: [VariantCriticalValuesMixin, labellize],
  computed: {
    ...mapGetters(['editedProduct']),
    UI () {
      const value = this.editedProduct.variants[this.variantId].pricing.mode
      const i18nPath = 'variantUI'
      return this.labellize({ value, i18nPath })
    },
    options () {
      return this.labellizeArray({ values: Object.values(variantUI), i18nPath: 'variantUI' })
    }
  },
  methods: {
    ...mapActions(['updateEditedVariant']),
    updateVariantUI (event) {
      this.updateEditedVariant({
        variantId: this.variantId,
        path: 'pricing.mode',
        value: event.value
      })
    }
  }
}
</script>
