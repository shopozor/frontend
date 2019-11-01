<template>
  <div>
    Je vends en vrac par:
    <unit-select
      :unit="unit"
      @input="update"
      :readonly="!isUpdatable"
    />
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import UnitSelect from '../../../../Units/UnitSelect'
import VariantCriticalValuesMixin from '../../../../../mixins/VariantCriticalValuesMixin'

export default {
  name: 'VariantDescriptionBulk',
  mixins: [VariantCriticalValuesMixin],
  computed: {
    ...mapGetters(['editedVariantDescriptionUnit']),
    unit () {
      return this.editedVariantDescriptionUnit({ variantId: this.variantId })
    }
  },
  components: {UnitSelect},
  methods: {
    ...mapActions(['updateEditedVariantDescriptionUnit']),
    update (event) {
      this.updateEditedVariantDescriptionUnit({
        variantId: this.variantId,
        value: event.newUnit
      })
    }
  }
}
</script>
