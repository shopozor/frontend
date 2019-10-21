<template>
  <div>
    <unit-field
      :value="editedFormats[formatId].size"
      :setValue="updateSize"
      valueWidth="50%"
      :unit="editedFormats[formatId].sizeUnit"
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
import FormatCriticalValuesMixin from '../FormatCriticalValuesMixin.js'

export default {
  name: 'FormatDescriptionAuto',
  mixins: [FormatCriticalValuesMixin],
  data () {
    return {
      defineDefaultValues: false
    }
  },
  props: {
    formatId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['editedFormats', 'editedProduct']),
    size () { return this.editedFormats[this.formatId].size },
    sizeUnit () { return this.editedFormats[this.formatId].sizeUnit },
    defaultConsumerPrice () { return this.editedProduct.defaultConsumerPrice },
    defaultUnit () { return this.editedProduct.defaultUnit },
    physicalSize () { return getPhysicalSize({ unit: this.defaultUnit }) }
  },
  methods: {
    ...mapActions(['updateEditedFormat']),
    update (propName, value) {
      this.updateEditedFormat({formatId: this.formatId, newProps: {[propName]: value}})
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
