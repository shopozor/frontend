<template>
  <div>
    <unit-field
      :value="editedVariants[variantId].size"
      :setValue="updateSize"
      valueWidth="50%"
      :unit="editedVariants[variantId].sizeUnit"
      :setUnit="updateSizeUnit"
      unitWidth="50%"
      :linked="true"
      :filter="physicalSize"
      :readonly="!isUpdatable"
    />
    <q-dialog
      v-model="defineDefaultValues"
      prevent-close>
    <span slot="title"></span>
    <span slot="body">
      <q-icon name="settings" />
      {{$t('products.defineDefaultPricePerUnit')}}
      <product-default-price-per-unit-selector />
    </span>
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
    ...mapGetters(['editedVariants', 'editedProduct']),
    size () { return this.editedVariants[this.variantId].size },
    sizeUnit () { return this.editedVariants[this.variantId].sizeUnit },
    defaultConsumerPrice () { return this.editedProduct.defaultConsumerPrice },
    defaultUnit () { return this.editedProduct.defaultUnit },
    physicalSize () { return getPhysicalSize({ unit: this.defaultUnit }) }
  },
  methods: {
    ...mapActions(['updateEditedVariant']),
    update (propName, value) {
      this.updateEditedVariant({variantId: this.variantId, newProps: {[propName]: value}})
    },
    updateSizeUnit (newUnit) {
      this.update('sizeUnit', newUnit)
      this.updateConsumerPrice()
    },
    updateSize (value) {
      this.update('size', value)
      this.updateConsumerPrice()
    },
    updateConsumerPrice () {
      const newPricePerUnit = 1 / convert({
        startValue: 1 / this.defaultConsumerPrice,
        startUnit: this.defaultUnit,
        endUnit: this.sizeUnit
      })
      this.update('consumerPrice', newPricePerUnit * this.size)
    }
  },
  watch: {
    defaultUnit (newUnit, oldUnit) { this.updateConsumerPrice() },
    defaultConsumerPrice (newPrice, oldPrice) { this.updateConsumerPrice() }
  },
  components: { UnitField, ProductDefaultPricePerUnitSelector },
  mounted () {
    if (this.defaultConsumerPrice === 0 || this.defaultUnit === '') {
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
