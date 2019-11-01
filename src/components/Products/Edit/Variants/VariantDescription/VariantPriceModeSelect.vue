<template>
  <q-select
    :hint="hint"
    :value="priceMode"
    @input="updatePriceMode"
    :options="options"
    :readonly="!isUpdatable"
    emit-value
  />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as priceModes from '../../../../../types/priceModes'
import VariantCriticalValuesMixin from '../../../../../mixins/VariantCriticalValuesMixin'
import labellize from '../../../../../mixins/Labellize'

export default {
  name: 'VariantPriceModeSelect',
  props: {
    withHint: Boolean
  },
  computed: {
    ...mapGetters(['editedVariantPriceMode']),
    priceMode () {
      const value = this.editedVariantPriceMode({ variantId: this.variantId })
      const i18nPath = 'priceModes'
      return this.labellize({ value, i18nPath })
    },
    options () {
      return this.labellizeArray({ values: Object.values(priceModes), i18nPath: 'priceModes' })
    },
    hint () {
      return this.withHint ? this.$t('products.variant.priceMode') : undefined
    }
  },
  methods: {
    ...mapActions(['updateEditedVariantPriceMode']),
    updatePriceMode (value) {
      this.updateEditedVariantPriceMode({
        variantId: this.variantId,
        value
      })
    }
  },
  mixins: [VariantCriticalValuesMixin, labellize]
}
</script>
