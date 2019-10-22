<template>
  <q-card class="width-max height-sm row justify-center content-center">
    <q-btn icon="add" size="xl" round color="primary" @click="createVariant"/>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'NewVariant',
  methods: {
    ...mapActions(['createEditedVariant']),
    createVariant () {
      this.createEditedVariant()
    }
  }
}
</script>
