<template>
  <q-page padding class="q-pa-md flex flex-center">
    <div style="width: 500px; max-width: 90vw;">
      <q-list>
        <q-item>
          <q-item-section>
            <q-input
              v-model="email"
              type="email"
              :float-label="$t('profile.email')"
              @blur="$v.email.$touch"
              @keyup.enter="focusPassword"
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
                ref="password"
                v-model="password"
                type="password"
                :float-label="$t('profile.password')"
                @blur="$v.password.$touch"
                @keyup.enter="focusConfirmPassword"
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
                ref="confirmPassword"
                v-model="confirmPassword"
                type="password"
                @blur="$v.confirmPassword.$touch"
                @keyup.enter="submit"
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
        <q-item class="row justify-center">
            <q-btn class="q-ma-md" color="primary" :label="$t('signup.createAccount')" @click="submit" ></q-btn>
        </q-item>
      </q-list>
    </div>
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
      confirmPassword: ''
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
    passwordError: function () {
      return this.$tc('signup.password.error', 6 - this.password.length, {count: 6 - this.password.length})
    }
  },
  methods: {
    focusPassword () {
      this.$refs.password.focus()
    },
    focusConfirmPassword () {
      this.$refs.confirmPassword.focus()
    },
    submit () {
      this.$v.$touch()

      if (this.$v.$error) {
        this.$q.notify(this.$t('signup.correctErrors'))
      } else {
        this.$store.dispatch('signup', {email: this.email, password: this.password})
      }
    }
  }
}
</script>
