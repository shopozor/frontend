<template>
  <q-card class="width-md height-md">
    <q-card-section>
      <q-select
        :hint="$t('products.conservationMethod')"
        separator
        :options="conservationOptions"
        :value="conservationMethod"
        @input="updateEditedProduct({ newProps: {conservationMethod: $event} })"
      />
    </q-card-section>
    <q-card-section>
      <q-input
        :hint="$t('products.conservationTime')"
        type="number"
        :value="conservationDays"
        @input="updateEditedProduct({ newProps: {conservationDays: $event} })"
        orientation="horizontal"
        :suffix="$tc('products.day', editedProduct.conservationDays)"
      />
    </q-card-section>
    <q-card-section>
      <q-select
        :hint="$t('products.categories')"
        multiple
        chips
        separator
        :options="categoriesOptions"
        :value="categories"
        @input="updateEditedProduct({ newProps: {categories: $event} })"
      />
    </q-card-section>
  </q-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import ProductVisibilityManager from '../ProductVisibilityManager'
import types from '../../../types'

export default {
  name: 'ProductEditType',
  computed: {
    ...mapGetters(['editedProduct']),
    conservationMethod () {
      return this.editedProduct.conservationMethod
    },
    conservationDays () {
      console.log(this.editedProduct.conservationDays)
      return this.editedProduct.conservationDays
    },
    categories () {
      return this.editedProduct.categories
    },
    categoriesOptions () {
      return Object.keys(types.categories).map(categories => {
        return {
          value: categories,
          label: this.$t(`categories.${categories}`)
        }
      })
    },
    conservationOptions () {
      return Object.keys(types.conservation).map(conservation => {
        return {
          value: conservation,
          label: this.$t(`conservation.${conservation}`)
        }
      })
    }
  },
  methods: {
    ...mapActions(['updateEditedProduct'])
  }
}
</script>
