<template>
  <q-page padding class="q-pa-md flex flex-center bg-secondary">
    <forgot-password />
  </q-page>
</template>

<script>
import forgotPassword from '../../common/src/pages/ForgotPassword'

export default {
  name: 'ForgotPasswordPage',
  components: { forgotPassword }
}
</script>
