<template>
  <div class="row justify-center">
    <product-edit-picture class="q-ma-sm" />
    <product-edit-name class="q-ma-sm" />
    <product-edit-type class="q-ma-sm" />
    <product-edit-variants class="q-ma-sm q-my-md" />
    <q-page-sticky position="bottom-right">
      <q-btn class="q-ma-md" size="md" icon="cancel" :label="$t('actions.cancel')" color="negative" @click="cancel" />
      <q-btn class="q-ma-md" size="md" icon="save" :label="$t('actions.save')" color="positive" @click="save" />
    </q-page-sticky>
    <q-page-sticky position="bottom-left">
      <product-toggle-non-trivial-changes class="q-ma-md" />
    </q-page-sticky>
    {{ editedProduct }}
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import ProductEditPicture from './ProductEditPicture'
import ProductEditName from './ProductEditName'
import ProductEditType from './ProductEditType'
import ProductEditVariants from './ProductEditVariants'
import ProductToggleNonTrivialChanges from './ProductToggleNonTrivialChanges'

export default {
  name: 'ProductsEditView',
  props: {
    jumpTo: {
      type: Function,
      required: true
    }
  },
  components: {
    ProductEditPicture,
    ProductEditName,
    ProductEditType,
    ProductEditVariants,
    ProductToggleNonTrivialChanges
  },
  computed: {
    ...mapGetters(['editedProduct'])
  },
  methods: {
    ...mapActions(['updateEditedProduct', 'updateProduct', 'clearEdition']),
    back () {
      this.jumpTo('inventory')
      this.clearEdition()
    },
    save () {
      this.updateProduct({
        productId: this.editedProduct.productId,
        newProps: this.editedProduct
      })
        .then(() => this.back())
    },
    cancel () { this.back() }
  }
}
</script>
