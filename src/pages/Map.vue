<template>
  <q-page :style="`height: ${fillHeight}px`">
    <l-map
      :zoom="zoom"
      :center="center"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
    >
      <l-tile-layer :url="url" />
      <budzonnery-marker :latLng="[46.7, 7]" />
      <budzonnery-marker :latLng="[46.75, 7.1]" marked />
    </l-map>
  </q-page>
</template>

<script>
import FillHeight from '../../common/src/mixins/FillHeight'
import BudzonneryMarker from '../../common/src/components/map/markers/BudzonneryMarker'

export default {
  data () {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 10,
      center: [46.7, 7],
      bounds: null
    }
  },
  methods: {
    zoomUpdated (zoom) {
      this.zoom = zoom
    },
    centerUpdated (center) {
      this.center = center
    },
    boundsUpdated (bounds) {
      this.bounds = bounds
    }
  },
  components: { BudzonneryMarker },
  mixins: [FillHeight]
}
</script>
