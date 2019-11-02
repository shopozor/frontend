<template>
  <q-page class="">
    <price-input
      :grossConsumerPrice="grossConsumerPrice"
      :setConsumerPrice="setConsumerPrice"
      :softozorRatio="0.05"
      :rexRatio="0.05"
      :managerRatio="0.05"
      consumer
      producer
      shop
      softozor
      rex
      manager
    />
  </q-page>
</template>

<script>
import PriceInput from '../components/Price/PriceInput'
export default {
  name: 'PageHome',
  data () {
    return {
      grossConsumerPrice: 0
    }
  },
  components: { PriceInput },
  methods: {
    log (event) { console.log(event) },
    setConsumerPrice (e) {
      this.grossConsumerPrice = e
    }
  }
}
</script>
