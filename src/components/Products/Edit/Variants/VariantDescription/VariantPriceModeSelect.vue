<template>
  <div>
    <q-select
      :hint="hint"
      :value="priceMode"
      @input="input"
      :options="options"
      :readonly="!isUpdatable"
      emit-value
    />

    <q-dialog v-model="alertUnitChange">
      <q-card>
        <q-card-section>
          {{ `${$t(`products.variants.thisVariantUnit`)} (${$t(`units.names.${previousUnit}`)}) ${$t(`products.variants.wasNotCompatibleWithDefaultUnit`)} (${$t(`units.names.${defaultUnit}`)}).` }}
        </q-card-section>
        <q-card-section>
          {{ `${$t(`products.variants.nowThisVariantUnitIs`)} ${$t(`units.names.${defaultUnit}`)}.`}}
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as priceModes from '../../../../../types/priceModes'
import VariantCriticalValuesMixin from '../../../../../mixins/VariantCriticalValuesMixin'
import labellize from '../../../../../mixins/Labellize'
import { unitsAreCompatible } from '../../../../Units/UnitsHelpers'

export default {
  name: 'VariantPriceModeSelect',
  data () {
    return {
      previousUnit: undefined,
      alertUnitChange: false
    }
  },
  props: {
    withHint: Boolean
  },
  computed: {
    ...mapGetters(['editedVariantPriceMode', 'editedVariantDescriptionUnit', 'editedProductDefaultUnit']),
    priceMode () {
      const value = this.editedVariantPriceMode({ variantId: this.variantId })
      const i18nPath = 'priceModes'
      return this.labellize({ value, i18nPath })
    },
    options () {
      return this.labellizeArray({ values: Object.values(priceModes), i18nPath: 'priceModes' })
    },
    hint () {
      return this.withHint ? this.$t('products.variants.priceMode') : undefined
    },
    unit () {
      return this.editedVariantDescriptionUnit({ variantId: this.variantId })
    },
    defaultUnit () {
      return this.editedProductDefaultUnit
    }
  },
  methods: {
    ...mapActions(['updateEditedVariantPriceMode', 'updateEditedVariantDescriptionUnit']),
    adaptUnitToDefault () {
      const incompatibleUnits = !unitsAreCompatible({ unit1: this.defaultUnit, unit2: this.unit }) && this.defaultUnit !== undefined
      if (incompatibleUnits) {
        this.previousUnit = this.unit
        this.updateEditedVariantDescriptionUnit({ variantId: this.variantId, value: this.defaultUnit })
        this.alertUnitChange = true
      }
    },
    input (priceMode) {
      if (priceMode === priceModes.AUTO_PRICE) this.adaptUnitToDefault()
      this.updateEditedVariantPriceMode({
        variantId: this.variantId,
        value: priceMode
      })
    }
  },
  mixins: [VariantCriticalValuesMixin, labellize]
}
</script>
