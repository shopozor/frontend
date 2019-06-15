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
          <q-btn
            id="loginButton"
            class="q-ma-md"
            color="primary"
            :label="$t('login.connect')"
            @click="login" />
        </q-item>
        <q-item class="row justify-center">
          <router-link
            id="forgotPassword"
            to="/pathNeedsToBeSet">
            {{ $t('login.forgotPassword') }}
          </router-link>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'PageLogin',
  data () {
    return {
      email: '',
      password: '',
      stayLoggedIn: true,
      invalidCredentials: false
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
    }
  }
}
</script>
