<template>
  <transition leave-active-class="animated bounceOutLeft">
    <q-card class="row justify-center relative-position" key="cards" v-if="show">
      <variant-description :variantId="variantId" />
      <variant-price :variantId="variantId" />
      <variant-amount :variantId="variantId" />
      <variant-state-manager :variantId="variantId" />
    </q-card>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import VariantDescription from './VariantDescription/VariantDescription'
import VariantPrice from './VariantPrice/VariantPrice'
import VariantAmount from './VariantAmount/VariantAmount'
import VariantStateManager from './VariantStateManager'
import VariantCriticalValuesMixin from '../../../../mixins/VariantCriticalValuesMixin'
import types from '../../../../types'

export default {
  name: 'ProductEditVariant',
  mixins: [VariantCriticalValuesMixin],
  data () {
    return {
      state: types.variantState
    }
  },
  computed: {
    ...mapGetters(['editedProduct']),
    show () {
      const state = this.editedProduct.variants[this.variantId].state
      return state === this.state.VISIBLE || state === this.state.INVISIBLE
    }
  },
  components: {
    VariantDescription,
    VariantAmount,
    VariantPrice,
    VariantStateManager
  }
}
</script>
