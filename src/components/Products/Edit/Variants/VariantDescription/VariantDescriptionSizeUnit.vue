<template>
  <unit-field
    :value="measure"
    :setValue="updateMeasure"
    valueWidth="50%"
    :unit="measureUnit"
    :setUnit="updateMeasureUnit"
    unitWidth="50%"
    filter="all"
    :readonly="!isUpdatable"
  />
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import UnitField from '../../../../Units/UnitField'
import VariantCriticalValuesMixin from '../../../../../mixins/VariantCriticalValuesMixin'

export default {
  name: 'VariantDescriptionSizeUnit',
  mixins: [VariantCriticalValuesMixin],
  props: {
    variantId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['editedProduct']),
    measure () { return this.editedProduct.variants[this.variantId].description.measure },
    measureUnit () {
      return this.editedProduct.variants[this.variantId].description.measureUnit
    }
  },
  components: {UnitField},
  methods: {
    ...mapActions(['updateEditedVariant']),
    updateMeasure (value) {
      this.updateEditedVariant({
        variantId: this.variantId,
        path: 'description.measure',
        value
      })
    },
    updateMeasureUnit (event) {
      this.updateEditedVariant({
        variantId: this.variantId,
        path: 'description.measureUnit',
        value: event.value
      })
    }
  }
}
</script>
