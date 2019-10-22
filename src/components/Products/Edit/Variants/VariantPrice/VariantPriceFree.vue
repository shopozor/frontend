<template>
  <price-input
    :consumerPrice="consumerPrice"
    :setConsumerPrice="setConsumerPrice"
    :producerRatio="0.85"
    :consumer="consumer"
    :producer="producer"
    :shop="shop"
    :readonly="!isUpdatable" />
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import PriceInput from '../../../../Price/PriceInput'
import VariantCriticalValuesMixin from '../../../../../mixins/VariantCriticalValuesMixin'

export default {
  name: 'VariantPriceFree',
  mixins: [VariantCriticalValuesMixin],
  props: {
    variantId: {
      type: String,
      required: true
    },
    consumer: {
      type: Boolean,
      default () {
        return false
      }
    },
    producer: {
      type: Boolean,
      default () {
        return false
      }
    },
    shop: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  computed: {
    ...mapGetters(['editedVariants']),
    consumerPrice () { return this.editedVariants[this.variantId].consumerPrice }
  },
  methods: {
    ...mapActions(['updateEditedVariant']),
    setConsumerPrice (value) {
      this.updateEditedVariant({
        variantId: this.variantId,
        newProps: { consumerPrice: value }
      })
    }
  },
  components: {PriceInput}
}
</script>
