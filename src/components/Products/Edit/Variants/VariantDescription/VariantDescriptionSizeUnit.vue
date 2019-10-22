<template>
  <unit-field
    :value="editedVariants[variantId].size"
    :setValue="updateSize"
    valueWidth="50%"
    :unit="editedVariants[variantId].sizeUnit"
    :setUnit="updateSizeUnit"
    unitWidth="50%"
    filter="all"
    :readonly="!isUpdatable"
  />
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import UnitField from '../../../../Units/UnitField'
import VariantCriticalValuesMixin from '../VariantCriticalValuesMixin.js'

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
    ...mapGetters(['editedVariants']),
    size () { return this.editedVariants[this.variantId].size },
    sizeUnit () { return this.editedVariants[this.variantId].sizeUnit }
  },
  components: {UnitField},
  methods: {
    ...mapActions(['updateEditedVariant']),
    update (propName, value) {
      this.updateEditedVariant({variantId: this.variantId, newProps: {[propName]: value}})
    },
    updateSize (value) { this.update('size', value) },
    updateSizeUnit (newUnit) { this.update('sizeUnit', newUnit) }
  }
}
</script>
