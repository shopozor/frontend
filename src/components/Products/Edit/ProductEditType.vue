<template>
  <q-card class="width-md height-md">
    <q-card-section>
      <q-select
        :hint="$t('products.conservationMode')"
        separator
        :options="conservationOptions"
        :value="conservationMode"
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
import labellize from '../../../mixins/Labellize'
import types from '../../../types'

export default {
  name: 'ProductEditType',
  computed: {
    ...mapGetters(['editedProduct']),
    conservationMode () {
      const value = this.editedProduct.conservation.mode
      const i18nPath = 'conservation'
      return this.labellize({ value, i18nPath })
    },
    conservationOptions () {
      return this.labellizeArray({
        values: Object.keys(types.conservation),
        i18nPath: 'conservation'
      })
    },
    conservationDays () {
      return this.editedProduct.conservation.days
    },
    categories () {
      return this.labellizeArray({
        values: this.editedProduct.categories,
        i18nPath: 'categories'
      })
    },
    categoriesOptions () {
      return this.labellizeArray({
        values: Object.keys(types.categories),
        i18nPath: 'categories'
      })
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
    }
  },
  mixins: [labellize]
}
</script>
