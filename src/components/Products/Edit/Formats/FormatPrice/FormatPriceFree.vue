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
import FormatCriticalValuesMixin from '../FormatCriticalValuesMixin.js'

export default {
  name: 'FormatPriceFree',
  mixins: [FormatCriticalValuesMixin],
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
  methods: {
    ...mapActions(['updateEditedFormat']),
    setConsumerPrice (value) {
      this.updateEditedFormat({
        formatId: this.formatId,
        newProps: { consumerPrice: value }
      })
    }
  },
  components: {PriceInput}
}
</script>
