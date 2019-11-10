<template>
  <div>
    <single-price-input
      v-if="consumer"
      :label="$t('products.consumerPays')"
      :value="inputConsumerPrice"
      @focus="focus('consumer')"
      @blur="unFocus('consumer')"
      @input="inputConsumerPriceChanged"
      :readonly="readonly"
    />
    <single-price-input
      v-if="producer"
      :label="$t('products.iGet')"
      :value="inputProducerPrice"
      @focus="focus('producer')"
      @blur="unFocus('producer')"
      @input="inputProducerPriceChanged"
      :readonly="readonly"
    />
    <single-price-input
      v-if="shop"
      :label="$t('products.shopGets')"
      :value="inputShopPrice"
      @focus="focus('shop')"
      @blur="unFocus('shop')"
      @input="inputShopPriceChanged"
      :readonly="readonly"
    />
    <single-price-input
      v-if="softozor"
      :label="$t('products.softozorGets')"
      :value="inputSoftozorPrice"
      @focus="focus('softozor')"
      @blur="unFocus('softozor')"
      @input="inputSoftozorPriceChanged"
      :readonly="readonly"
    />
    <single-price-input
      v-if="rex"
      :label="$t('products.rexGets')"
      :value="inputRexPrice"
      @focus="focus('rex')"
      @blur="unFocus('rex')"
      @input="inputRexPriceChanged"
      :readonly="readonly"
    />
    <single-price-input
      v-if="manager"
      :label="$t('products.managerGets')"
      :value="inputManagerPrice"
      @focus="focus('manager')"
      @blur="unFocus('manager')"
      @input="inputManagerPriceChanged"
      :readonly="readonly"
    />
  </div>
</template>

<script>
import SinglePriceInput from './SinglePriceInput'

export default {
  name: 'PriceInput',
  data () {
    return {
      inputConsumerPrice: 0,
      inputProducerPrice: 0,
      inputShopPrice: 0,
      inputSoftozorPrice: 0,
      inputRexPrice: 0,
      inputManagerPrice: 0,
      focusAt: undefined
    }
  },
  props: {
    grossConsumerPrice: {
      type: Number,
      required: true
    },
    softozorRatio: {
      type: Number,
      required: true
    },
    rexRatio: {
      type: Number,
      required: true
    },
    managerRatio: {
      type: Number,
      required: true
    },
    smallestConsumerAmount: {
      type: Number,
      default: () => 1
    },
    consumer: Boolean,
    producer: Boolean,
    shop: Boolean,
    softozor: Boolean,
    rex: Boolean,
    manager: Boolean,
    readonly: Boolean
  },
  computed: {
    shopRatio () {
      return this.softozorRatio + this.rexRatio + this.managerRatio
    }
  },
  methods: {
    setPrices ({ grossConsumerPrice, grossProducerPrice, grossShopPrice, grossSoftozorPrice, grossRexPrice, grossManagerPrice}) {
      this.inputConsumerPrice = grossConsumerPrice
      this.inputProducerPrice = grossProducerPrice !== undefined ? grossProducerPrice : Math.round(grossConsumerPrice * (1 - this.shopRatio))
      this.inputShopPrice = grossShopPrice !== undefined ? grossShopPrice : Math.round(grossConsumerPrice * this.shopRatio)
      this.inputSoftozorPrice = grossSoftozorPrice !== undefined ? grossSoftozorPrice : Math.round(grossConsumerPrice * this.softozorRatio)
      this.inputRexPrice = grossRexPrice !== undefined ? grossRexPrice : Math.round(grossConsumerPrice * this.rexRatio)
      this.inputManagerPrice = grossManagerPrice !== undefined ? grossManagerPrice : Math.round(grossConsumerPrice * this.managerRatio)
    },
    round (value) {
      return Math.round(value / this.smallestConsumerAmount) * this.smallestConsumerAmount
    },
    inputConsumerPriceChanged (value) {
      if (this.focusAt === 'consumer') {
        this.setPrices({ grossConsumerPrice: value })
        this.$emit('input', value)
      }
    },
    inputProducerPriceChanged (value) {
      if (this.focusAt === 'producer') {
        const grossConsumerPrice = this.round(value / (1 - this.shopRatio))
        this.setPrices({ grossConsumerPrice, grossProducerPrice: value })
        this.$emit('input', grossConsumerPrice)
      }
    },
    inputShopPriceChanged (value) {
      if (this.focusAt === 'shop') {
        const grossConsumerPrice = this.round(value / this.shopRatio)
        this.setPrices({ grossConsumerPrice, grossShopPrice: value })
        this.$emit('input', grossConsumerPrice)
      }
    },
    inputSoftozorPriceChanged (value) {
      if (this.focusAt === 'softozor') {
        const grossConsumerPrice = this.round(value / this.softozorRatio)
        this.setPrices({ grossConsumerPrice, grossSoftozorPrice: value })
        this.$emit('input', grossConsumerPrice)
      }
    },
    inputRexPriceChanged (value) {
      if (this.focusAt === 'rex') {
        const grossConsumerPrice = this.round(value / this.rexRatio)
        this.setPrices({ grossConsumerPrice, grossRexPrice: value })
        this.$emit('input', grossConsumerPrice)
      }
    },
    inputManagerPriceChanged (value) {
      if (this.focusAt === 'manager') {
        const grossConsumerPrice = this.round(value / this.managerRatio)
        this.setPrices({ grossConsumerPrice, grossManagerPrice: value })
        this.$emit('input', grossConsumerPrice)
      }
    },
    focus (fieldName) {
      this.focusAt = fieldName
    },
    unFocus (fieldName) {
      if (this.focusAt === fieldName) this.focusAt = undefined
      this.setPrices({ grossConsumerPrice: this.round(this.inputConsumerPrice) })
      this.$emit('input', this.inputConsumerPrice)
    }
  },
  components: {
    SinglePriceInput
  },
  watch: {
    grossConsumerPrice (value) {
      if (this.readonly) {
        this.setPrices({ grossConsumerPrice: value })
      }
    }
  },
  mounted () {
    this.setPrices({ grossConsumerPrice: this.grossConsumerPrice })
  }
}
</script>
