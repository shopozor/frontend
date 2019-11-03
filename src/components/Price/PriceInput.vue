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
    inputConsumerPriceChanged (value) {
      if (this.focusAt === 'consumer') {
        this.inputConsumerPrice = value
        this.inputProducerPrice = Math.round(value * (1 - this.shopRatio))
        this.inputShopPrice = Math.round(value * this.shopRatio)
        this.inputSoftozorPrice = Math.round(value * this.softozorRatio)
        this.inputRexPrice = Math.round(value * this.rexRatio)
        this.inputManagerPrice = Math.round(value * this.managerRatio)
        this.$emit('input', this.inputConsumerPrice)
      }
    },
    inputProducerPriceChanged (value) {
      if (this.focusAt === 'producer') {
        const grossConsumerPrice = Math.round(value / (1 - this.shopRatio))
        this.inputConsumerPrice = grossConsumerPrice
        this.inputProducerPrice = value
        this.inputShopPrice = Math.round(grossConsumerPrice * this.shopRatio)
        this.inputSoftozorPrice = Math.round(grossConsumerPrice * this.softozorRatio)
        this.inputRexPrice = Math.round(grossConsumerPrice * this.rexRatio)
        this.inputManagerPrice = Math.round(grossConsumerPrice * this.managerRatio)
        this.$emit('input', this.inputConsumerPrice)
      }
    },
    inputShopPriceChanged (value) {
      if (this.focusAt === 'shop') {
        const grossConsumerPrice = Math.round(value / this.shopRatio)
        this.inputConsumerPrice = grossConsumerPrice
        this.inputProducerPrice = Math.round(grossConsumerPrice * (1 - this.shopRatio))
        this.inputShopPrice = value
        this.inputSoftozorPrice = Math.round(grossConsumerPrice * this.softozorRatio)
        this.inputRexPrice = Math.round(grossConsumerPrice * this.rexRatio)
        this.inputManagerPrice = Math.round(grossConsumerPrice * this.managerRatio)
        this.$emit('input', this.inputConsumerPrice)
      }
    },
    inputSoftozorPriceChanged (value) {
      if (this.focusAt === 'softozor') {
        const grossConsumerPrice = Math.round(value / this.softozorRatio)
        this.inputConsumerPrice = grossConsumerPrice
        this.inputProducerPrice = Math.round(grossConsumerPrice * (1 - this.shopRatio))
        this.inputShopPrice = Math.round(grossConsumerPrice * this.shopRatio)
        this.inputSoftozorPrice = value
        this.inputRexPrice = Math.round(grossConsumerPrice * this.rexRatio)
        this.inputManagerPrice = Math.round(grossConsumerPrice * this.managerRatio)
        this.$emit('input', this.inputConsumerPrice)
      }
    },
    inputRexPriceChanged (value) {
      if (this.focusAt === 'rex') {
        const grossConsumerPrice = Math.round(value / this.rexRatio)
        this.inputConsumerPrice = grossConsumerPrice
        this.inputProducerPrice = Math.round(grossConsumerPrice * (1 - this.shopRatio))
        this.inputShopPrice = Math.round(grossConsumerPrice * this.shopRatio)
        this.inputSoftozorPrice = Math.round(grossConsumerPrice * this.softozorRatio)
        this.inputRexPrice = value
        this.inputManagerPrice = Math.round(grossConsumerPrice * this.managerRatio)
        this.$emit('input', this.inputConsumerPrice)
      }
    },
    inputManagerPriceChanged (value) {
      if (this.focusAt === 'manager') {
        const grossConsumerPrice = Math.round(value / this.managerRatio)
        this.inputConsumerPrice = grossConsumerPrice
        this.inputProducerPrice = Math.round(grossConsumerPrice * (1 - this.shopRatio))
        this.inputShopPrice = Math.round(grossConsumerPrice * this.shopRatio)
        this.inputSoftozorPrice = Math.round(grossConsumerPrice * this.softozorRatio)
        this.inputRexPrice = Math.round(grossConsumerPrice * this.rexRatio)
        this.inputManagerPrice = value
        this.$emit('input', this.inputConsumerPrice)
      }
    },
    focus (fieldName) {
      this.focusAt = fieldName
    },
    unFocus (fieldName) {
      if (this.focusAt === fieldName) this.focusAt = undefined
      this.inputProducerPrice = Math.round(this.inputConsumerPrice * (1 - this.shopRatio))
      this.inputShopPrice = Math.round(this.inputConsumerPrice * this.shopRatio)
      this.$emit('input', this.inputConsumerPrice)
    }
  },
  components: {
    SinglePriceInput
  },
  mounted () {
    this.inputConsumerPrice = this.grossConsumerPrice
    this.inputProducerPrice = Math.round(this.grossConsumerPrice * (1 - this.shopRatio))
    this.inputShopPrice = Math.round(this.grossConsumerPrice * this.shopRatio)
    this.inputSoftozorPrice = Math.round(this.grossConsumerPrice * this.softozorRatio)
    this.inputRexPrice = Math.round(this.grossConsumerPrice * this.rexRatio)
    this.inputManagerPrice = Math.round(this.grossConsumerPrice * this.managerRatio)
  }
}
</script>
