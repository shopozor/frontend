<template>
  <unit-select
    :unit="sizeUnit"
    :setUnit="updateSizeUnit"
    width="100%"
    filter="all"
    withPriceReferenceQuantities
    :label="$t('products.bulk')"
    :readonly="!isUpdatable"
  />
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import UnitSelect from '../../../../Units/UnitSelect'
import VariantCriticalValuesMixin from '../VariantCriticalValuesMixin.js'

export default {
  name: 'VariantDescriptionBulk',
  mixins: [VariantCriticalValuesMixin],
  props: {
    variantId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['editedVariants']),
    sizeUnit () {
      const sizeUnit = this.editedVariants[this.variantId].sizeUnit
      if (sizeUnit) return sizeUnit
      else return ''
    }
  },
  components: {UnitSelect},
  methods: {
    ...mapActions(['updateEditedVariant']),
    update (propName, value) {
      this.updateEditedVariant({variantId: this.variantId, newProps: {[propName]: value}})
    },
    updateSizeUnit (newUnit) { this.update('sizeUnit', newUnit) }
  }
}
</script>
