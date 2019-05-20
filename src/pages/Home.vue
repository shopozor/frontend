<template>
  <q-page>
    <email-with-validation
      v-model="value" />
    <password-with-validation
      v-model="value" />
    {{ value }}
  </q-page>
</template>

<script>
import EmailWithValidation from '../../common/src/components/form/EmailWithValidation'
import PasswordWithValidation from '../../common/src/components/form/PasswordWithValidation'
export default {
  name: 'PageHome',
  data () {
    return {
      value: ''
    }
  },
  components: { EmailWithValidation, PasswordWithValidation }
}
</script>
