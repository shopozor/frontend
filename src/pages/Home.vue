<template>
  <q-page>
    {{ $t('welcome') }}
    <validity-icon :mandatory="true" :knowError="true" :showError="false" />
  </q-page>
</template>

<script>
import ValidityIcon from '../components/ValidityIcon'
export default {
  name: 'PageHome',
  components: { ValidityIcon }
}
</script>
