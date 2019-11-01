<template>
  <unit-field
    :value="value"
    @input="update"
    linked
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
  computed: {
    ...mapGetters(['editedVariantDescriptionAmount', 'editedVariantDescriptionUnit']),
    value () {
      return {
        amount: this.editedVariantDescriptionAmount({ variantId: this.variantId }),
        unit: this.editedVariantDescriptionUnit({ variantId: this.variantId })
      }
    }
  },
  components: {UnitField},
  methods: {
    ...mapActions(['updateEditedVariantDescriptionAmount', 'updateEditedVariantDescriptionUnit']),
    update (event) {
      this.updateEditedVariantDescriptionAmount({
        variantId: this.variantId,
        value: event.amount
      })
      this.updateEditedVariantDescriptionUnit({
        variantId: this.variantId,
        value: event.unit
      })
    }
  }
}
</script>
