<template>
  <price-input
    :consumerPrice="consumerPrice"
    :setConsumerPrice="() => {}"
    :producerRatio="0.85"
    :consumer="consumer"
    :producer="producer"
    :shop="shop"
    :readonly="true" />
</template>

<script>
import {mapGetters} from 'vuex'
import PriceInput from '../../../../Price/PriceInput'

export default {
  name: 'FormatPriceAuto',
  props: {
    formatId: {
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
    ...mapGetters(['editedFormats']),
    consumerPrice () { return this.editedFormats[this.formatId].consumerPrice }
  },
  components: {PriceInput}
}
</script>
