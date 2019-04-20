<template>
  <transition mode="out-in" leave-active-class="animated flipOutY" enter-active-class="animated flipInY">
    <q-icon key="error" v-if="showError" name="error" color="negative" />
    <q-icon key="valid" v-else-if="!knowError" name="check_circle" color="positive" />
    <q-icon key="mandatory" v-else-if="mandatory" name="fiber_manual_record" color="ghost" />
  </transition>
</template>

<script>
export default {
  name: 'ValidityIcon',
  props: {
    mandatory: {
      type: Boolean,
      default: false
    },
    knowError: {
      type: Boolean,
      default: false
    },
    showError: {
      type: Boolean,
      default: false
    }
  }
}
</script>
