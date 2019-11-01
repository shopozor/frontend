<template>
  <q-btn
    class="q-ma-md"
    :class="{'animated shake': isShaking, enabled: !disable}"
    :color="disable ? 'ghost' : color"
    :unelevated="disable"
    :label="label"
    :round="round"
    :icon="icon"
    @click="tryEmit">
    <slot />
  </q-btn>
</template>

<script>
export default {
  name: 'SchakingBtn',
  data () {
    return {
      isShaking: false
    }
  },
  props: {
    label: {
      type: String,
      default: () => undefined
    },
    disable: {
      type: Boolean,
      default: () => false
    },
    round: {
      type: Boolean,
      default: () => undefined
    },
    icon: {
      type: String,
      default: () => undefined
    },
    color: {
      type: String,
      default: () => undefined
    }
  },
  methods: {
    tryEmit () {
      if (!this.disable) {
        this.$emit('success')
      } else {
        this.$emit('error')
        if (!this.isShaking) {
          this.isShaking = true
          const vm = this
          setTimeout(() => { vm.isShaking = false }, 500)
        }
      }
    }
  }
}
</script>
