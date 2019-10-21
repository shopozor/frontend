<template>
  <q-card-section>
    <q-input
      v-if="consumer"
      :style="`width: ${width}`"
      :hint="$t('products.consumerPays')"
      :value="readonly ? computedConsumerPrice : tempConsumerPrice"
      @blur="updateConsumerPrice"
      @input="tempConsumerPriceChanged"
      suffix="CHF"
      :readonly="readonly"
    />
    <q-input
      v-if="producer"
      :style="`width: ${width}`"
      :hint="$t('products.iGet')"
      :value="readonly ? computedProducerPrice : tempProducerPrice"
      @blur="updateConsumerPrice"
      @input="tempProducerPriceChanged"
      suffix="CHF"
      :readonly="readonly"
    />
    <q-input
      v-if="shop"
      :style="`width: ${width}`"
      :hint="$t('products.shopGets')"
      :value="readonly ? computedShopPrice : tempShopPrice"
      @blur="updateConsumerPrice"
      @input="tempShopPriceChanged"
      suffix="CHF"
      :readonly="readonly"
    />
  </q-card-section>
</template>

<script>
export default {
  name: 'PriceInput',
  data () {
    return {
      tempConsumerPrice: 0,
      tempProducerPrice: 0,
      tempShopPrice: 0
    }
  },
  props: {
    consumerPrice: {
      type: Number,
      required: true
    },
    setConsumerPrice: {
      type: Function,
      required: true
    },
    producerRatio: {
      type: Number,
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
    },
    readonly: {
      type: Boolean,
      default () {
        return false
      }
    },
    width: {
      type: String,
      default () {
        return '100%'
      }
    }
  },
  computed: {
    computedConsumerPrice () { return (this.consumerPrice / 100).toFixed(2) },
    computedProducerPrice () { return (this.consumerPrice * this.producerRatio / 100).toFixed(2) },
    computedShopPrice () { return (this.consumerPrice * (1 - this.producerRatio) / 100).toFixed(2) }
  },
  methods: {
    tempConsumerPriceChanged (value) {
      const num = value * 1
      this.tempConsumerPrice = num
      this.tempProducerPrice = (num * this.producerRatio).toFixed(2)
      this.tempShopPrice = (num * (1 - this.producerRatio)).toFixed(2)
    },
    tempProducerPriceChanged (value) {
      const num = value * 1
      this.tempConsumerPrice = (num / this.producerRatio).toFixed(2)
      this.tempProducerPrice = num
      this.tempShopPrice = (num / this.producerRatio * (1 - this.producerRatio)).toFixed(2)
    },
    tempShopPriceChanged (value) {
      const num = value * 1
      this.tempConsumerPrice = (num / (1 - this.producerRatio)).toFixed(2)
      this.tempProducerPrice = (num / (1 - this.producerRatio) * this.producerRatio).toFixed(2)
      this.tempShopPrice = num
    },
    updateConsumerPrice () {
      this.setConsumerPrice(Number.parseInt(this.tempConsumerPrice * 100))
      this.tempConsumerPrice = Number.parseFloat(this.tempConsumerPrice).toFixed(2)
      this.tempProducerPrice = Number.parseFloat(this.tempProducerPrice).toFixed(2)
      this.tempShopPrice = Number.parseFloat(this.tempShopPrice).toFixed(2)
    }
  },
  mounted () {
    this.tempConsumerPrice = (this.consumerPrice / 100).toFixed(2)
    this.tempProducerPrice = (this.consumerPrice * this.producerRatio / 100).toFixed(2)
    this.tempShopPrice = (this.consumerPrice * (1 - this.producerRatio) / 100).toFixed(2)
  }
}
</script>
