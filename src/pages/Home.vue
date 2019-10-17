<template>
  <q-page>
    <q-list>
      <email-with-validation
        v-model="email" />
      <password-with-validation
        v-model="password" />
      <checkbox-with-validation
        v-model="checked"
        label="ceci est mon label"
        :mandatory="true">
        Contenu de la carte
      </checkbox-with-validation>
    </q-list>

    {{ email }} ////
    {{ password }} ////
    {{ checked }}
  </q-page>
</template>

<script>
import EmailWithValidation from '../components/form/EmailWithValidation'
import PasswordWithValidation from '../components/form/PasswordWithValidation'
import CheckboxWithValidation from '../components/form/CheckboxWithValidation'

export default {
  name: 'PageHome',
  data () {
    return {
      email: '',
      password: '',
      checked: false
    }
  },
  components: { EmailWithValidation, PasswordWithValidation, CheckboxWithValidation }
}
</script>
