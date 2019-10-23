export default {
  methods: {
    labellize ({ value, i18nPath }) {
      return {
        value,
        label: this.$t(`${i18nPath}.${value}`)
      }
    },
    labellizeArray ({ values, i18nPath }) {
      const vm = this
      return values.map(value => vm.labellize({ value, i18nPath }))
    }
  }
}
