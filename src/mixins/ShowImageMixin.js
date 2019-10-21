export default {
  name: 'ShowImageMixin',
  computed: {
    showImage () {
      const imageExists = this.image && this.image.length > 0
      if (imageExists) return this.image
      else return 'statics/img/no_image.png'
    }
  }
}
