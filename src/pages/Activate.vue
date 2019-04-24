<template>
  <q-page class="row justify-around items-center">
    <transition mode="out-in" enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
      <div key="pending" v-if="state === 'pending'" id="pending" class="column items-center">
        <q-spinner size="50px" />
        <div>Votre compte est en train d'être activé</div>
      </div>
      <div key="successfulActivation"  v-else-if="state === 'successfulActivation'" id="successfulActivation" class="column items-center">
        <q-icon name="check_circle" size="50px" color="positive" />
        <div>Votre compte a été correctement activé.</div>
      </div>
      <div key="errorActivationLinkExpired" v-else-if="state === 'errorActivationLinkExpired'" id="errorActivationLinkExpired" class="column items-center">
        <q-icon name="cancel" size="50px" color="negative" />
        <div>Votre compte n'a pas pu être activé. Le lien a expiré.</div>
      </div>
      <div key="unknownError" v-else id="unknownError" class="column items-center">
        <q-icon name="cancel" size="50px" color="negative" />
        <div>Votre compte n'a pas pu être activé à cause d'une erreur inconnue.</div>
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
    this.$store.dispatch('activate', {
      encodedId: this.$route.params.id,
      oneTimeToken: this.$route.params.token
    })
      .then(response => {
        this.state = 'successfulActivation'
      })
      .catch(error => {
        switch (error[0].message) {
          case 'ACCOUNT_CONFIRMATION_LINK_EXPIRED': this.state = 'errorActivationLinkExpired'; break
          default: this.state = 'unknownError'; break
        }
      })
  }
}
</script>
