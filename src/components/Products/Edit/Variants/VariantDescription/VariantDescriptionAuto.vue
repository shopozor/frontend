<template>
  <div class="row justify-center items-baseline">
    <q-btn icon="settings" flat round @click="openSetDefault" />
    <unit-field
      :value="value"
      @input="update"
      linked
      compatibleUnits
      :readonly="!isUpdatable"
    />
    <q-dialog
      v-model="defineDefaultValues"
      :persistent="!defaultIsSet"
      >
      <q-card>
        <q-card-section>
          <q-icon name="settings" />
          {{ $t('products.defineDefaultPricePerUnit') }}
        </q-card-section>
        <q-card-section>
          <product-default-price-per-unit-selector />
        </q-card-section>
        <q-card-actions>
          <shaking-btn
            icon="check"
            @success="closeSetDefault"
            :disable="!defaultIsSet"
            round
            color="positive"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import UnitField from '../../../../Units/UnitField'
import ShakingBtn from '../../../../form/ShakingBtn'
import ProductDefaultPricePerUnitSelector from '../../ProductDefaultPricePerUnitSelector'
import {convert, unitsAreCompatible, mainUnit} from '../../../../Units/UnitsHelpers'
import VariantCriticalValuesMixin from '../../../../../mixins/VariantCriticalValuesMixin'

export default {
  name: 'VariantDescriptionAuto',
  mixins: [VariantCriticalValuesMixin],
  data () {
    return {
      defineDefaultValues: false
    }
  },
  computed: {
    ...mapGetters([
      'editedVariantDescriptionAmount',
      'editedVariantDescriptionUnit',
      'editedProductDefaultGrossConsumerPrice',
      'editedProductDefaultUnit',
      'editedVariantGrossConsumerPrice'
    ]),
    value () {
      return {
        amount: this.editedVariantDescriptionAmount({ variantId: this.variantId }),
        unit: this.editedVariantDescriptionUnit({ variantId: this.variantId })
      }
    },
    defaultGrossConsumerPrice () {
      return this.editedProductDefaultGrossConsumerPrice
    },
    defaultUnit () {
      return this.editedProductDefaultUnit
    },
    defaultIsSet () {
      return this.defaultGrossConsumerPrice !== undefined &&
        this.defaultGrossConsumerPrice !== 0 &&
        this.defaultUnit !== undefined &&
        this.defaultUnit !== ''
    }
  },
  methods: {
    ...mapActions([
      'updateEditedVariantDescriptionAmount',
      'updateEditedVariantDescriptionUnit',
      'updateEditedProductDefaultGrossConsumerPrice',
      'updateEditedProductDefaultUnit',
      'updateEditedVariantGrossConsumerPrice'
    ]),
    update (event) {
      this.updateEditedVariantDescriptionAmount({
        variantId: this.variantId,
        value: event.amount
      })
      this.updateEditedVariantDescriptionUnit({
        variantId: this.variantId,
        value: event.unit
      })
      this.updateGrossConsumerPrice()
    },
    adaptUnitToDefault () {
      const incompatible = !unitsAreCompatible({ unit1: this.defaultUnit, unit2: this.value.unit })
      if (incompatible) {
        this.updateEditedVariantDescriptionUnit({
          variantId: this.variantId,
          value: mainUnit({ unit: this.defaultUnit })
        })
      }
    },
    updateGrossConsumerPrice () {
      this.adaptUnitToDefault()
      const newPrice = convert({
        oldValue: this.value.amount * this.defaultGrossConsumerPrice,
        oldUnit: this.defaultUnit,
        newUnit: this.value.unit
      })
      this.updateEditedVariantGrossConsumerPrice({
        variantId: this.variantId,
        value: Math.round(newPrice)
      })
    },
    openSetDefault () {
      this.defineDefaultValues = true
    },
    closeSetDefault () {
      this.defineDefaultValues = false
    }
  },
  watch: {
    defaultUnit (newUnit, oldUnit) { this.updateGrossConsumerPrice() },
    defaultGrossConsumerPrice (newPrice, oldPrice) { this.updateGrossConsumerPrice() }
  },
  components: { UnitField, ProductDefaultPricePerUnitSelector, ShakingBtn },
  mounted () {
    if (!this.defaultIsSet) {
      this.openSetDefault()
    } else {
      this.updateGrossConsumerPrice()
    }
  }
}
</script>
