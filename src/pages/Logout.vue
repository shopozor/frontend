<template>
  <q-page>
    <div class="fixed-center text-center">
      <div id="logoutPending" v-if="isAuthorized">
        <q-spinner size="50px" />
        <div class="text-faded">{{ $t('logout.pending') }}</div>
      </div>
      <div v-else id="successfulLogout">
        <div>{{ $t('logout.success') }}</div>
        <q-btn id="goHome" color="primary" @click="goHome">ok</q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PageLogout',
  created () {
    this.logout().then(() => {
      setTimeout(this.goHome, 2000)
    })
  },
  computed: {
    ...mapGetters(['isAuthorized'])
  },
  methods: {
    ...mapActions(['logout']),
    goHome () {
      this.$router.push('/')
    }
  }
}
</script>
