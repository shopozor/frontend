<template>
  <q-card class="width-md height-md">
    <q-card-section>
      <q-select
        :hint="$t('products.conservationMode')"
        separator
        :options="conservationOptions"
        :value="$t(`conservation.${conservationMode}`)"
        @input="updateMode"
      />
    </q-card-section>
    <q-card-section>
      <q-input
        :hint="$t('products.conservationTime')"
        type="number"
        :value="conservationDays"
        @input="updateDays"
        orientation="horizontal"
        :suffix="$tc('products.day', conservationDays)"
      />
    </q-card-section>
    <q-card-section>
      <q-select
        :hint="$t('products.categories')"
        multiple
        use-chips
        separator
        :options="categoriesOptions"
        :value="categories"
        @input="updateCategories"
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
    conservationMode () {
      return this.editedProduct.conservation.mode
    },
    conservationDays () {
      return this.editedProduct.conservation.days
    },
    categories () {
      return this.labellize(this.editedProduct.categories, 'categories')
    },
    categoriesOptions () {
      return this.labellize(Object.keys(types.categories), 'categories')
    },
    conservationOptions () {
      return this.labellize(Object.keys(types.conservation), 'conservation')
    }
  },
  methods: {
    ...mapActions(['updateEditedProduct']),
    updateMode (event) {
      this.updateEditedProduct({ path: 'conservation.mode', value: event.value })
    },
    updateDays (event) {
      this.updateEditedProduct({ path: 'conservation.days', value: event })
    },
    updateCategories (event) {
      const value = event.map(category => category.value)
      this.updateEditedProduct({ path: 'categories', value })
    },
    labellize (arrayOfValues, i18nPath) {
      return arrayOfValues.map(value => {
        return {
          value: value,
          label: this.$t(`${i18nPath}.${value}`)
        }
      })
    }
  }
}
</script>
