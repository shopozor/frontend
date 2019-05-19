<template>
  <q-page>
    <input-with-validation
    v-model="value"
    type="email"
    iconName="mail"
    floatLabel="float"
    label="label"
    hint="hint"
    errorMessage="error"
    :showError="true"
    :knowError="true" />
    {{ value }}
  </q-page>
</template>

<script>
import InputWithValidation from '../../common/src/components/form/InputWithValidation'
export default {
  name: 'PageHome',
  data () {
    return {
      value: ''
    }
  },
  components: { InputWithValidation }
}
</script>
