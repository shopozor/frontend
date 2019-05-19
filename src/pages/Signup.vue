<template>
  <q-page padding class="q-pa-md flex flex-center bg-secondary">
    <q-page-sticky position="bottom-right">
      <q-icon name="mail" size="50px" color="accent" />
    </q-page-sticky>

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
              :error-message="$t('signup.email.error')"
              no-error-icon>
              <template v-slot:before>
                <q-icon name="mail" />
              </template>
              <template v-slot:append>
                <validity-icon :knowError="$v.email.$invalid" :showError="$v.email.$error" mandatory />
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
                :error-message="passwordError"
                no-error-icon>
                <template v-slot:before>
                  <q-icon name="vpn_lock" />
                </template>
              <template v-slot:append>
                <validity-icon :knowError="$v.password.$invalid" :showError="$v.password.$error" mandatory />
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
              :error-message="$t('signup.confirmPassword.error')"
              no-error-icon>
              <template v-slot:before>
                <q-icon name="vpn_lock" />
              </template>
              <template v-slot:append>
                <validity-icon :knowError="$v.confirmPassword.$invalid" :showError="$v.confirmPassword.$error" mandatory />
              </template>
            </q-input>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section side>
            <q-btn round flat size="1em" icon="help" color="primary" @click="() => explainCookies = true" />
          </q-item-section>
          <q-item-section>
            <q-checkbox
              id="acceptCookies"
              v-model="acceptCookies"
              @input="() => acceptCookiesTouched = true"
              :label="$t('signup.cookiesPolicy.accept')" />
          </q-item-section>
          <q-item-section side>
            <validity-icon :knowError="!acceptCookies" :showError="!acceptCookies && acceptCookiesTouched" mandatory />
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section side>
            <q-btn round flat size="1em" icon="help" color="primary" @click="() => explainTermsOfService = true" />
          </q-item-section>
          <q-item-section>
            <q-checkbox
              id="acceptTermsOfService"
              v-model="acceptTermsOfService"
              @input="() => acceptTermsOfServiceTouched = true"
              :label="$t('signup.termsOfService.accept')" />
          </q-item-section>
          <q-item-section side>
            <validity-icon :knowError="!acceptTermsOfService" :showError="!acceptTermsOfService && acceptTermsOfServiceTouched" mandatory />
          </q-item-section>
        </q-item>

        <q-item class="row justify-center">
          <q-btn
            id="createAccount"
            class="q-ma-md"
            :class="{'animated shake': shakeButton}"
            :color="disableCreateAccount ? 'ghost' : 'primary'"
            :unelevated="disableCreateAccount"
            :label="$t('signup.createAccount')"
            @click="submit"
            />
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

    <q-dialog v-model="explainCookies">
      <q-card>
        <q-card-section>
          {{ $t('signup.cookiesPolicy.explain') }}
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="primary" @click="() => explainCookies = false">{{ $t('actions.close') }}</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="explainTermsOfService">
      <q-card>
        <q-card-section>
          {{ $t('signup.termsOfService.explain') }}
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="primary" @click="() => explainTermsOfService = false">{{ $t('actions.close') }}</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import {required, email, minLength, sameAs} from 'vuelidate/lib/validators'
import ValidityIcon from '../../common/src/components/form/ValidityIcon'

export default {
  name: 'PageSignup',
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      acceptCookies: false,
      acceptCookiesTouched: false,
      acceptTermsOfService: false,
      acceptTermsOfServiceTouched: false,
      shakeButton: false,
      creatingAccount: false,
      emailSent: false,
      explainCookies: false,
      explainTermsOfService: false
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
    logEvent (e) { console.log(e) },
    submit () {
      this.$v.$touch()
      this.acceptCookiesTouched = true
      this.acceptTermsOfServiceTouched = true

      if (this.$v.$error || !this.acceptCookies || !this.acceptTermsOfService) {
        this.shakeButton = true
        const vm = this
        setTimeout(() => { vm.shakeButton = false }, 500)
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
  components: {ValidityIcon}
}
</script>
