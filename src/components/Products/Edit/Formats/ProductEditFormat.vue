<template>
  <transition leave-active-class="animated bounceOutLeft">
    <q-card class="row justify-center relative-position" key="cards" v-if="show">
      <format-description :formatId="variantId" />
      <format-price :formatId="variantId" />
      <format-amount :formatId="variantId" />
      <format-state-manager :formatId="variantId" />
    </q-card>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import FormatDescription from './FormatDescription/FormatDescription'
import FormatPrice from './FormatPrice/FormatPrice'
import FormatAmount from './FormatAmount'
import FormatStateManager from './FormatStateManager'
import FormatCriticalValuesMixin from './FormatCriticalValuesMixin'
import types from '../../../../types'

export default {
  name: 'ProductEditFormat',
  mixins: [FormatCriticalValuesMixin],
  data () {
    return {
      state: types.formatState
    }
  },
  computed: {
    ...mapGetters(['editedVariants']),
    show () {
      const state = this.editedVariants[this.variantId].state
      return state === this.state.VISIBLE || state === this.state.INVISIBLE
    }
  },
  components: {
    FormatDescription,
    FormatAmount,
    FormatPrice,
    FormatStateManager
  }
}
</script>
