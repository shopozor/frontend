import {mapGetters} from 'vuex'

export default {
  name: 'VariantCriticalValuesMixin',
  props: {
    variantId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['pendingOrdersOfVariantSummary']),
    pendingOrdersSummary () {
      return this.pendingOrdersOfVariantSummary({ variantId: this.variantId })
    },
    hasPendingPaidOrders () {
      const summary = this.pendingOrdersSummary.paid
      return summary.amount > 0
    },
    hasPendingNotPaidOrders () {
      const summary = this.pendingOrdersSummary.notPaid
      return summary.amount > 0
    },
    allowNonTrivialChanges () {
      return this.$store.getters.editedProduct.allowNonTrivialChanges
    },
    isUpdatable () {
      return (!this.hasPendingPaidOrders && !this.hasPendingNotPaidOrders) || this.allowNonTrivialChanges
    }
  }
}
