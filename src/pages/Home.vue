<template>
  <q-page class="">
    <variant-description variantId="testId" />
    <div>
      {{ this.$store.getters.editedVariant({ variantId: 'testId' }) }}
    </div>
    <div>
      {{ this.$store.getters.editedProduct }}
    </div>
  </q-page>
</template>

<script>
import VariantDescription from '../components/Products/Edit/Variants/VariantDescription/VariantDescription'
export default {
  name: 'PageHome',
  data () {
    return {
    }
  },
  components: { VariantDescription },
  methods: {
    log (event) { console.log(event) }
  }
}
</script>
