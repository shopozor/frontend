<template>
  <q-input
    :value="displayVal"
    input-class="text-right"
    @focus="focus"
    @input="input"
    @blur="blur"
    :hint="hint"
    :label="label"
    :readonly="readonly"
    suffix="CHF"
  />
</template>

<script>
export default {
  name: 'SinglePriceInput',
  data () {
    return {
      hasFocus: false
    }
  },
  props: {
    value: {
      type: Number,
      required: true
    },
    hint: String,
    label: String,
    readonly: Boolean
  },
  computed: {
    safeVal () {
      if (Number.isNaN(this.value)) return 0
      else return this.value / 100
    },
    displayVal () {
      if (this.hasFocus) return this.safeVal
      else return (this.safeVal).toFixed(2)
    }
  },
  methods: {
    input (val) {
      const value = Math.floor(Number.parseFloat(val) * 100)
      this.$emit('input', value)
    },
    focus () {
      this.hasFocus = true
      this.$emit('focus')
    },
    blur () {
      this.hasFocus = false
      this.$emit('blur')
    }
  }
}
</script>
