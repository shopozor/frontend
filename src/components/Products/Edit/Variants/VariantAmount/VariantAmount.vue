<template>
  <q-card inline class="width-md q-ma-sm">
    <q-card-section>
      <div class="row justify-center items-baseline">
        <q-btn
          @click="remove"
          icon="remove"
          round
          color="primary"
          :disable="disableRemove" />
        <q-input
          class="q-mx-md"
          mask="#"
          input-class="text-center"
          reverse-fill-mask
          style="width: 8em"
          v-model="inputAmount"
          @blur="updateAmount(inputAmount)"
          :rules="[val => (val >= ordersSummary.paid || isUpdatable) || $t('products.variants.stockBelowOrders')]" />
        <q-btn
          @click="add"
          icon="add"
          round
          color="primary" />
      </div>
      <div class="row justify-around q-mt-md">
        <div class="column items-center">
          <q-icon name="shopping_cart" size="md" />
          {{ ordersSummary.unPaid }}
          <q-tooltip>{{ $t('products.variants.inShoppingCart') }}</q-tooltip>
        </div>
        <div class="column items-center">
          <q-icon name="storefront" size="md" />
          {{ ordersSummary.paid }}
          <q-tooltip>{{ $t('products.variants.ordered') }}</q-tooltip>
        </div>
        <div class="column items-center">
          <q-icon name="img:statics/img/budzicone_head.svg" size="md" />
          {{ inputAmount - ordersSummary.paid }}
          <q-tooltip>{{ $t('products.variants.available') }}</q-tooltip>
        </div>
        <!-- <div>
          <div>{{$tc('products.ordered', ordersSummary.paid)}}: {{ordersSummary.paid}}</div>
          <br>
          <div>{{$tc('products.available', inputAmount - ordersSummary.paid)}}: {{inputAmount - ordersSummary.paid}}</div>
          <br>
          <div>dans un panier : {{ordersSummary.unPaid}}</div>
        </div> -->
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import VariantCriticalValuesMixin from '../../../../../mixins/VariantCriticalValuesMixin'

export default {
  name: 'VariantAmount',
  mixins: [VariantCriticalValuesMixin],
  data () {
    return {
      inputAmount: 0
    }
  },
  props: {
    variantId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'editedVariantStockAmount'
    ]),
    stockAmount () {
      return this.editedVariantStockAmount({ variantId: this.variantId })
    },
    ordersSummary () {
      return this.editedVariantOrdersSummary({ variantId: this.variantId })
    },
    disableRemove () {
      const noMore = this.stockAmount <= this.ordersSummary.paid
      return (noMore && !this.isUpdatable) || this.stockAmount <= 0
    }
  },
  methods: {
    ...mapActions(['updateEditedVariantStockAmount']),
    add () {
      this.updateAmount(this.stockAmount + 1)
    },
    remove () {
      this.updateAmount(this.stockAmount - 1)
    },
    updateAmount (val) {
      let value = Number.parseInt(val)
      value = Number.isNaN(value) ? 0 : value
      if (value >= this.ordersSummary.paid || this.isUpdatable) {
        this.inputAmount = value
        this.updateEditedVariantStockAmount({ variantId: this.variantId, value })
      } else {
        this.inputAmount = this.ordersSummary.paid
        this.updateEditedVariantStockAmount({ variantId: this.variantId, value: this.ordersSummary.paid })
        this.$q.notify({
          message: 'Vous ne pouvez pas baisser votre stock en-dessous du nombre de commandes.',
          icon: 'warning',
          timeout: 5000,
          position: 'top',
          actions: [
            {
              icon: 'close'
            }
          ]
        })
      }
    }
  },
  mounted () {
    this.inputAmount = this.stockAmount
  }
}
</script>
