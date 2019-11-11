<template>
  <q-page>
    <variant-description variantId="testId" />
    <variant-price variantId="testId" />
    <variant-amount variantId="testId" />
  </q-page>
</template>

<script>
import VariantPrice from '../components/Products/Edit/Variants/VariantPrice/VariantPrice'
import VariantDescription from '../components/Products/Edit/Variants/VariantDescription/VariantDescription'
import VariantAmount from '../components/Products/Edit/Variants/VariantAmount/VariantAmount'

export default {
  name: 'PageHome',
  components: { VariantPrice, VariantDescription, VariantAmount },
  methods: {
    log (event) { console.log(event) }
  }
}
</script>
