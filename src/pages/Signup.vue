<template>
  <q-page padding class="q-pa-md flex flex-center">
    <div style="width: 500px; max-width: 90vw;">
      <q-list>
        <q-item>
          <q-item-section>
            <q-input
              id="email"
              v-model="email"
              type="email"
              :float-label="$t('profile.email')"
              @blur="$v.email.$touch"
              :error="$v.email.$error"
              :label="$t('signup.email.label')"
              :hint="$t('signup.email.hint')"
              :error-message="$t('signup.email.error')">
              <template v-slot:before>
                <q-icon name="mail" />
              </template>
              <template v-slot:append v-if="!$v.email.$invalid">
                <q-icon name="check_circle" color="positive" />
              </template>
            </q-input>
          </q-item-section>
        </q-item>
        <q-item>
            <q-item-section>
              <q-input
                id="password"
                v-model="password"
                type="password"
                :float-label="$t('profile.password')"
                @blur="$v.password.$touch"
                :error="$v.password.$error"
                :label="$t('signup.password.label')"
                :hint="$t('signup.password.hint')"
                :error-message="passwordError">
                <template v-slot:before>
                  <q-icon name="vpn_lock" />
                </template>
                <template v-slot:append v-if="!$v.password.$invalid">
                  <q-icon name="check_circle" color="positive" />
                </template>
              </q-input>
            </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              @blur="$v.confirmPassword.$touch"
              :error="$v.confirmPassword.$error"
              :label="$t('signup.confirmPassword.label')"
              :hint="$t('signup.confirmPassword.hint')"
              :error-message="$t('signup.confirmPassword.error')">
              <template v-slot:before>
                <q-icon name="vpn_lock" />
              </template>
              <template v-slot:append v-if="!$v.confirmPassword.$invalid" >
                <q-icon name="check_circle" color="positive" />
              </template>
            </q-input>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-checkbox
              id="acceptCookies"
              v-model="acceptCookies"
              :label="$t('signup.cookiesPolicy.accept')" />
          </q-item-section>
          <q-item-section side>
            <q-icon name="help" size="2em">
              <q-tooltip>
                {{ $t('signup.cookiesPolicy.explain') }}
              </q-tooltip>
            </q-icon>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-checkbox
              id="acceptTermsOfService"
              v-model="acceptTermsOfService"
              :label="$t('signup.termsOfService.accept')" />
          </q-item-section>
          <q-item-section side>
            <q-icon name="help" size="2em">
              <q-tooltip>
                {{ $t('signup.termsOfService.explain') }}
              </q-tooltip>
            </q-icon>
          </q-item-section>
        </q-item>
        <q-item class="row justify-center">
          <q-btn
            id="createAccount"
            class="q-ma-md"
            color="primary"
            :label="$t('signup.createAccount')"
            @click="submit"
            :disable="disableCreateAccount" />
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
import {required, email, minLength, sameAs} from 'vuelidate/lib/validators'

export default {
  name: 'PageSignup',
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      acceptCookies: false,
      acceptTermsOfService: false,
      creatingAccount: false,
      emailSent: false
    }
  },
  validations: {
    email: {
      required, email
    },
    password: {
      required, minLength: minLength(6)
    },
    confirmPassword: {
      required, sameAs: sameAs('password')
    }
  },
  computed: {
    passwordError () {
      return this.$tc('signup.password.error', 6 - this.password.length, {count: 6 - this.password.length})
    },
    disableCreateAccount () {
      const disable =
        this.$v.email.$invalid ||
        this.$v.password.$invalid ||
        this.password !== this.confirmPassword ||
        !this.acceptCookies ||
        !this.acceptTermsOfService

      return disable
    }
  },
  methods: {
    submit () {
      this.$v.$touch()

      if (this.$v.$error) {
        this.$q.notify(this.$t('signup.correctErrors'))
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
  }
}
</script>
