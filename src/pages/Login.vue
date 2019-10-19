<template>
  <q-page padding class="q-pa-md flex flex-center">
    <div style="width: 500px; max-width: 90vw;">
      <q-list id="LoginForm">

        <q-item class="incorrectIdentifiers bg-warning" v-if="invalidCredentials">
          <q-item-section>
            {{ $t('login.invalidCredentials') }}
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-input
              id="email"
              v-model="email"
              type="email"
              :float-label="$t('profile.email')">
              <template v-slot:prepend>
                <q-icon name="mail" />
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
                @keyup.enter="login({email, password, stayLoggedIn})">
                <template v-slot:prepend>
                  <q-icon name="vpn_lock" />
                </template>
              </q-input>
            </q-item-section>
        </q-item>

        <q-item class="row justify-center">
          <q-toggle
            id="toggleStayLoggedIn"
            class="q-ma-md"
            :class="{'text-faded': !stayLoggedIn}"
            v-model="stayLoggedIn"
            :label="$t('login.stayLoggedIn')" />
        </q-item>

        <q-item class="row justify-center">
          <shaking-btn
            id="loginButton"
            :label="$t('login.connect')"
            :action="login"
            :disable="disableLogin" />
        </q-item>

        <q-item class="row justify-center">
          <q-btn
            id="forgotPassword"
            @click="goToResetPassword"
            flat
            rounded
            no-caps
            color="info">
            {{ $t('login.forgotPassword') }}...
          </q-btn>
        </q-item>

        <q-item>
          <q-card>
            <q-card-actions>
              <q-btn color="primary" @click="forceLogin">Forcer un login pour tester l'interface</q-btn>
            </q-card-actions>
            <q-card-section>
              <q-input
                v-model="email"
                type="email"
                float-label="nom d'utilisateur forcé">
                <template v-slot:prepend>
                  <q-icon name="mail" />
                </template>
              </q-input>
            </q-card-section>
            <q-card-section>
              <q-select
              v-model="authorization"
              :options="authorizations" />
            </q-card-section>
          </q-card>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import types from '../types'
import { generatePath } from '../router/Helpers'
import shakingBtn from '../components/form/ShakingBtn'

export default {
  name: 'PageLogin',
  data () {
    return {
      email: '',
      password: '',
      stayLoggedIn: true,
      invalidCredentials: false,
      authorization: 'Producteur',
      authorizations: [
        'Consommateur',
        'Producteur'
      ]
    }
  },
  computed: {
    disableLogin () {
      const disable =
        this.email === '' ||
        this.password === ''

      return disable
    }
  },
  methods: {
    login () {
      const vm = this
      vm.$store.dispatch('login', {
        email: vm.email,
        password: vm.password,
        stayLoggedIn: vm.stayLoggedIn
      })
        .then(() => vm.$router.push('/'))
        .catch(errors => vm.handleError(errors))
    },
    handleError (errors) {
      this.invalidCredentials = errors.some(error => error.message === 'WRONG_CREDENTIALS')
    },
    goToResetPassword () {
      this.$router.push(
        generatePath({ link: types.links.FORGOT_PASSWORD })
      )
    },
    forceLogin () {
      let permissions = [types.permissions.NOT_CONNECTED]
      switch (this.authorization) {
        case 'Consommateur': permissions = [types.permissions.CONSUMER]; break
        case 'Producteur': permissions = [types.permissions.MANAGE_PRODUCTS]; break
        default: break
      }
      this.$store.commit('storePermissions', {
        email: this.email,
        userId: this.email,
        token: this.email,
        permissions
      })
      this.$router.push('/')
    }
  },
  components: { shakingBtn }
}
</script>
