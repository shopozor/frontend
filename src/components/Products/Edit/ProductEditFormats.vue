<template>
  <div>
    <q-expansion-item icon="settings" label="Conditionnements du produit et stock">
      <q-card>
        <q-card-section>
          Prix à l'unité
        </q-card-section>
        <q-card-section>
          <product-default-price-per-unit-selector />
        </q-card-section>
      </q-card>
      <div>interface par défaut</div>
    </q-expansion-item>
    <product-edit-format
      class="q-ma-sm"
      v-for="variant in editedVariants"
      :key="variant.id"
      :variantId="variant.id"
    />
    <new-format class="q-ma-sm" />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import ProductEditFormat from './Formats/ProductEditFormat'
import ProductDefaultPricePerUnitSelector from './ProductDefaultPricePerUnitSelector'
import NewFormat from './Formats/NewFormat'

export default {
  name: 'ProductEditFormats',
  computed: {
    ...mapGetters(['editedVariants'])
  },
  components: {ProductEditFormat, ProductDefaultPricePerUnitSelector, NewFormat}
}
</script>
