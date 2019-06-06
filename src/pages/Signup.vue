<template>
  <q-page padding class="q-pa-md flex flex-center bg-secondary">
    <div style="width: 500px; max-width: 90vw;">
      <q-list>

        <email-with-validation
          id="email"
          v-model="email.value"
          @validity-check="email.isValid = $event"
          mandatory
          :hint="$t('signup.email.hint')"
          :errorMessage="$t('signup.email.error')" />

        <password-with-validation
          id="password"
          v-model="password.value"
          @validity-check="password.isValid = $event"
          mandatory
          :hint="$t('signup.password.hint')"
          :errorMessage="$t('signup.password.error')" />

        <password-with-validation
          id="confirmPassword"
          v-model="confirmPassword.value"
          @validity-check="confirmPassword.isValid = $event"
          mandatory
          :hint="$t('signup.confirmPassword.hint')"
          :errorMessage="$t('signup.confirmPassword.error')"
          :repeatPassword="password.value" />

        <checkbox-with-validation
          id="acceptCookies"
          v-model="acceptCookies"
          :label="$t('signup.cookiesPolicy.accept')"
          mandatory>
          {{ $t('signup.cookiesPolicy.explain') }}
        </checkbox-with-validation>

        <checkbox-with-validation
          id="acceptTermsOfService"
          v-model="acceptTermsOfService"
          :label="$t('signup.termsOfService.accept')"
          mandatory>
          {{ $t('signup.termsOfService.explain') }}
        </checkbox-with-validation>

        <q-item class="row justify-center">
          <q-btn
            id="createAccount"
            class="q-ma-md"
            :class="{'animated shake': shakingButton}"
            :color="disableCreateAccount ? 'ghost' : 'primary'"
            :unelevated="disableCreateAccount"
            :label="$t('signup.createAccount')"
            @click="submit"/>
        </q-item>

      </q-list>
    </div>

    <q-dialog v-model="creatingAccount" persistent>
      <q-card>
        <q-card-section>
          <div>{{ $t('signup.creatingAccount') }}</div>
        </q-card-section>
        <q-card-section class="text-center">
          <q-spinner size="5em" color="primary" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog id="emailSentDialog" v-model="emailSent" persistent>
      <q-card>
        <q-card-section>
          <div>{{ $t('signup.emailSent') }}</div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn label="ok" color="primary" @click="$router.push('/')" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import emailWithValidation from '../../common/src/components/form/EmailWithValidation'
import passwordWithValidation from '../../common/src/components/form/PasswordWithValidation'
import checkboxWithValidation from '../../common/src/components/form/CheckboxWithValidation'

export default {
  name: 'PageSignup',
  data () {
    return {
      email: { value: '', isValid: false },
      password: { value: '', isValid: false },
      confirmPassword: { value: '', isValid: false },
      acceptCookies: false,
      acceptTermsOfService: false,
      shakingButton: false,
      creatingAccount: false,
      emailSent: false
    }
  },
  computed: {
    disableCreateAccount () {
      const disable =
        !this.email.isValid ||
        !this.password.isValid ||
        !this.confirmPassword.isValid ||
        !this.acceptCookies ||
        !this.acceptTermsOfService

      return disable
    }
  },
  methods: {
    submit () {
      if (this.disableCreateAccount) {
        this.shakingButton = true
        const vm = this
        setTimeout(() => { vm.shakingButton = false }, 500)
        // this.$q.notify(this.$t('signup.correctErrors'))
      } else {
        this.creatingAccount = true
        const vm = this
        this.$store.dispatch('signup', {email: this.email, password: this.password})
          .then(() => {
            vm.creatingAccount = false
            vm.emailSent = true
          })
          .catch(() => {
            vm.creatingAccount = false
            // vm.error = true
          })
      }
    }
  },
  components: {
    emailWithValidation,
    passwordWithValidation,
    checkboxWithValidation
  }
}
</script>
