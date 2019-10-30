<template>
  <q-page>
    <variant-price-mode-select variantId="testId" withHint />
    {{ this.$store.getters.editedProduct.variants.testId }}
  </q-page>
</template>

<script>
import VariantPriceModeSelect from '../components/Products/Edit/Variants/VariantDescription/VariantPriceModeSelect'
export default {
  name: 'PageHome',
  data () {
    return {
    }
  },
  components: { VariantPriceModeSelect },
  methods: {
    log (event) { console.log(event) }
  }
}
</script>
