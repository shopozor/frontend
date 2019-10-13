<template>
  <q-page class="row justify-around items-center">
    <transition mode="out-in" enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
      <div key="pending" v-if="state === 'pending'" id="pending" class="column items-center">
        <q-spinner size="50px" />
        <div>{{ $t('activate.pending') }}</div>
      </div>
      <div key="successfulActivation"  v-else-if="state === 'successfulActivation'" id="successfulActivation" class="column items-center">
        <q-icon name="check_circle" size="50px" color="positive" />
        <div>{{ $t('activate.success') }}</div>
      </div>
      <div key="errorActivationLinkExpired" v-else-if="state === 'errorActivationLinkExpired'" id="errorActivationLinkExpired" class="column items-center">
        <q-icon name="cancel" size="50px" color="negative" />
        <div>{{ $t('activate.error.expiredLink') }}</div>
      </div>
      <div key="unknownError" v-else id="unknownError" class="column items-center">
        <q-icon name="cancel" size="50px" color="negative" />
        <div>{{ $t('activate.error.unknown') }}</div>
      </div>
    </transition>
  </q-page>
</template>

<script>
export default {
  name: 'Activate',
  data () {
    return {
      state: 'pending'
    }
  },
  created () {
    const vm = this
    vm.$store.dispatch('activate', {
      encodedId: vm.$route.params.id,
      oneTimeToken: vm.$route.params.token
    })
      .then(response => {
        vm.state = 'successfulActivation'
      })
      .catch(error => {
        switch (error[0].message) {
          case 'LINK_EXPIRED': vm.state = 'errorActivationLinkExpired'; break
          default: vm.state = 'unknownError'; break
        }
      })
  }
}
</script>
