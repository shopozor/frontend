export default {
  methods: {
    labellize ({ value, i18nPath }) {
      if (value) {
        return {
          value,
          label: this.$t(`${i18nPath}.${value}`)
        }
      } else {
        return {
          value: undefined,
          label: ''
        }
      }
    },
    labellizeArray ({ values, i18nPath }) {
      const vm = this
      return values.map(value => vm.labellize({ value, i18nPath }))
    }
  }
}
