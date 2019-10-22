<template>
  <!-- <q-btn-toggle
    :value="UI"
    @input="updateVariantUI"
  :options="options" />-->
  <q-select
    float-label="Type de conditionnement"
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

export default {
  name: 'VariantUISelect',
  mixins: [VariantCriticalValuesMixin],
  computed: {
    ...mapGetters(['editedProduct']),
    UI () {
      return this.editedProduct.variants[this.variantId].variantUI
    },
    options () {
      const vm = this
      return Object.values(variantUI).map(UI => {
        return { label: vm.$t(`variantUI.${UI}`), value: UI }
      })
    }
  },
  methods: {
    ...mapActions(['updateEditedVariant']),
    updateVariantUI (value) {
      this.updateEditedVariant({
        variantId: this.variantId,
        newProps: { variantUI: value }
      })
    }
  }
}
</script>
