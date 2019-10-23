<template>
  <div>
    <unit-field
      :value="measure"
      :setValue="updateSize"
      valueWidth="50%"
      :unit="measureUnit"
      :setUnit="updateSizeUnit"
      unitWidth="50%"
      :linked="true"
      :filter="physicalSize"
      :readonly="!isUpdatable"
    />
    <q-dialog
      v-model="defineDefaultValues"
      persistent
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
          <q-btn icon="close" round color="negative" @click="defineDefaultValues = false" />
          <q-btn icon="done" round color="positive" @click="defineDefaultValues = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import UnitField from '../../../../Units/UnitField'
import ProductDefaultPricePerUnitSelector from '../../ProductDefaultPricePerUnitSelector'
import {convert, unitsAreCompatible, mainUnit, getPhysicalSize} from '../../../../Units/UnitsHelpers'
import VariantCriticalValuesMixin from '../../../../../mixins/VariantCriticalValuesMixin'

export default {
  name: 'VariantDescriptionAuto',
  mixins: [VariantCriticalValuesMixin],
  data () {
    return {
      defineDefaultValues: false
    }
  },
  props: {
    variantId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['editedProduct']),
    measure () { return this.editedProduct.variants[this.variantId].description.measure },
    measureUnit () { return this.editedProduct.variants[this.variantId].description.measureUnit },
    defaultConsumerPrice () { return this.editedProduct.pricing.defaultGrossPrice },
    defaultUnit () { return this.editedProduct.pricing.defaultUnit },
    physicalSize () { return getPhysicalSize({ unit: this.defaultUnit }) }
  },
  methods: {
    ...mapActions(['updateEditedVariant']),
    updateSizeUnit (value) {
      this.updateEditedVariant({
        variantId: this.variantId,
        path: 'description.measureUnit',
        value
      })
      this.updateConsumerPrice()
    },
    updateSize (value) {
      this.updateEditedVariant({
        variantId: this.variantId,
        path: 'description.measure',
        value
      })
      this.updateConsumerPrice()
    },
    updateConsumerPrice () {
      const newPricePerUnit = 1 / convert({
        startValue: 1 / this.defaultConsumerPrice,
        startUnit: this.defaultUnit,
        endUnit: this.measureUnit
      })
      const value = newPricePerUnit * this.measure
      this.updateEditedVariant({
        variantId: this.variantId,
        path: 'pricing.grossPrice',
        value
      })
    }
  },
  watch: {
    defaultUnit (newUnit, oldUnit) { this.updateConsumerPrice() },
    defaultConsumerPrice (newPrice, oldPrice) { this.updateConsumerPrice() }
  },
  components: { UnitField, ProductDefaultPricePerUnitSelector },
  mounted () {
    if (this.defaultConsumerPrice === 0 || this.defaultUnit === '') {
      console.log('machin')
      this.defineDefaultValues = true
    } else if (unitsAreCompatible({unit1: this.sizeUnit, unit2: this.defaultUnit})) {
      this.updateConsumerPrice()
    } else {
      this.updateSizeUnit(mainUnit({ unit: this.defaultUnit }).short)
      this.updateSize(1)
    }
  }
}
</script>
