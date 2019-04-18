<template>
  <parametricLayout
    subtitle="store"
    :email="email"
    :orderedLinks="orderedLinks"
    :accessRules="accessRules"
    :permissions="permissions"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import parametricLayout from '../../common/src/layouts/parametricLayout'
import { orderedLinks, accessRules } from '../router/links'

export default {
  name: 'layout',
  data () {
    return {
      accessRules,
      orderedLinks
    }
  },
  computed: {
    ...mapGetters(['permissions', 'email'])
  },
  components: { parametricLayout }
}
</script>
