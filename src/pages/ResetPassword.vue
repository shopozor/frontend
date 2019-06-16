<template>
  <q-page padding class="q-pa-md flex flex-center bg-secondary">
    <reset-password />
  </q-page>
</template>

<script>
import resetPassword from '../../common/src/pages/ResetPassword'

export default {
  name: 'ResetPasswordPage',
  components: { resetPassword }
}
</script>
