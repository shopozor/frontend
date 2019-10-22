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
    <product-edit-variant
      class="q-ma-sm"
      v-for="(variant) in editedProduct.variants"
      :key="variant.id"
      :variantId="variant.id"
    />
    <new-variant class="q-ma-sm" />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import ProductEditVariant from './Variants/ProductEditVariant'
import ProductDefaultPricePerUnitSelector from './ProductDefaultPricePerUnitSelector'
import NewVariant from './Variants/NewVariant'

export default {
  name: 'ProductEditVariants',
  computed: {
    ...mapGetters(['editedProduct'])
  },
  components: { ProductEditVariant, ProductDefaultPricePerUnitSelector, NewVariant }
}
</script>
