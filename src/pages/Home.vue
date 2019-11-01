<template>
  <q-page class="">
    <variant-description-auto variantId="testId"
    @input="log" />
    <div>
      {{ this.$store.getters.editedVariant({ variantId: 'testId' }) }}
    </div>
    <div>
      {{ this.$store.getters.editedProduct }}
    </div>
  </q-page>
</template>

<script>
import VariantDescriptionAuto from '../components/Products/Edit/Variants/VariantDescription/VariantDescriptionAuto'
export default {
  name: 'PageHome',
  data () {
    return {
    }
  },
  components: { VariantDescriptionAuto },
  methods: {
    log (event) { console.log(event) }
  }
}
</script>
