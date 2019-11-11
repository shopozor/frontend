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
    ...mapGetters(['editedProductAllowNonTrivialChanges', 'editedVariantOrdersSummary']),
    pendingOrdersSummary () {
      return this.editedVariantOrdersSummary({ variantId: this.variantId })
    },
    hasPendingPaidOrders () {
      const summary = this.pendingOrdersSummary.paid
      return summary > 0
    },
    hasPendingNotPaidOrders () {
      const summary = this.pendingOrdersSummary.notPaid
      return summary > 0
    },
    allowNonTrivialChanges () {
      return this.editedProductAllowNonTrivialChanges
    },
    isUpdatable () {
      return (!this.hasPendingPaidOrders && !this.hasPendingNotPaidOrders) || this.allowNonTrivialChanges
    }
  }
}
