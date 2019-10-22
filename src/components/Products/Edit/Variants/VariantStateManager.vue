<template>
  <q-btn
    class="absolute-bottom-right"
    icon="close"
    color="negative"
    :disable="!isUpdatable"
    @click="del"
  />
</template>

<script>
import { mapActions } from 'vuex'
import VariantCriticalValuesMixin from '../../../../mixins/VariantCriticalValuesMixin'
import types from '../../../../types'

export default {
  name: 'VariantStateManager',
  mixins: [VariantCriticalValuesMixin],
  props: {
    variantId: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions(['updateEditedVariant']),
    del () {
      this.updateEditedVariant({
        variantId: this.variantId,
        newProps: { state: types.variantState.DELETED }
      })
    }
  }
}
</script>
