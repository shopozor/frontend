<template>
  <q-page>
    <variant-description variantId="testId" />
    <variant-price variantId="testId" />
    {{ $store.getters.editedProduct }}
  </q-page>
</template>

<script>
import VariantPrice from '../components/Products/Edit/Variants/VariantPrice/VariantPrice'
import VariantDescription from '../components/Products/Edit/Variants/VariantDescription/VariantDescription'

export default {
  name: 'PageHome',
  components: { VariantPrice, VariantDescription },
  methods: {
    log (event) { console.log(event) }
  }
}
</script>
