<template>
  <q-card class="width-md height-md">
    <q-card-section>
      <q-input
        :label="$t('products.name')"
        :placeholder="initialName"
        :value="productName"
        @input="updateEditedProduct({ path: 'name', value: $event })" />
    </q-card-section>
    <q-card-section>
      <q-input
        :label="$t('products.productDescription')"
        :placeholder="initialDescription"
        type="textarea"
        :max-height="190"
        rows="8"
        :value="productDescription"
        @input="updateEditedProduct({ path: 'description', value: $event })" />
    </q-card-section>
  </q-card>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'ProductEditName',
  data () {
    return {
      initialName: '',
      initialDescription: ''
    }
  },
  computed: {
    ...mapGetters(['editedProduct', 'myProducts']),
    productId () {
      return this.editedProduct.productId
    },
    productName () {
      return this.editedProduct.name
    },
    productDescription () {
      return this.editedProduct.description
    }
  },
  methods: {
    ...mapActions(['updateEditedProduct'])
  },
  created () {
    this.initialName = this.editedProduct.name
    this.initialDescription = this.editedProduct.description
  }
}

// TODO : pouvoir indiquer si la modification est majeure ou mineure (si oui -> notifications)

</script>
