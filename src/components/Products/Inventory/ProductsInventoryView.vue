<template>
  <q-page class="flex flex-center">
    <product-inventory-card
      v-for="(product, productId) in productsInInventory"
      :key="productId"
      :productId="productId"
      :jumpTo="jumpTo" />
    <q-btn
      class="q-ma-lg fixed-bottom-right shadow-6"
      icon="delete_sweep"
      size="md"
      color="primary"
      :label="$t('products.trash')"
      v-show="!productsTrashIsEmpty"
      @click="jumpToTrash"
      />
    <q-page-sticky position="bottom">
      <q-btn class="q-ma-md shadow-12" icon="add" round color="primary" size="xl" @click="newProduct" />
    </q-page-sticky>
    <q-page-sticky position="top-right">
      <q-card style="width: 300px">
        <q-card-section>
          <q-select label="taille des données test" v-model="budzonnerySize" :options="options" @input="() => producer = ''" />
        </q-card-section>
        <q-card-section>
          <q-select label="producteur" v-model="producer" :options="producers">
            <template v-slot:after>
              <q-btn icon="cloud_download" round color="primary" @click="loadTestProducts" :disable="producer === ''" />
            </template>
          </q-select>
        </q-card-section>
      </q-card>
    </q-page-sticky>
  </q-page>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import ProductInventoryCard from './ProductInventoryCard'
import { summarizeProducers } from '../../../store/products/productsLoader'

export default {
  name: 'ProductsInventoryView',
  data () {
    return {
      budzonnerySize: 'small',
      options: [
        'tiny',
        'small',
        'medium',
        'large'
      ],
      producer: ''
    }
  },
  props: {
    jumpTo: {
      type: Function,
      required: true
    }
  },
  components: {ProductInventoryCard},
  computed: {
    ...mapGetters(['productsTrashIsEmpty', 'productsInInventory'])
  },
  asyncComputed: {
    producers () {
      return new Promise(resolve => {
        summarizeProducers({ budzonnerySize: this.budzonnerySize })
          .then(producersList => {
            resolve(producersList)
          })
      })
    }
  },
  methods: {
    ...mapActions(['createProduct']),
    newProduct () {
      this.createProduct()
      this.jumpTo('edit')
    },
    jumpToTrash () {
      this.jumpTo('trash')
    },
    loadTestProducts () {
      this.$store.dispatch('getMyProducts', {
        budzonnerySize: this.budzonnerySize,
        producerId: this.producer.value
      })
    }
  }
}
</script>
