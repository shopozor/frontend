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
      <l-control position="topright">
        <q-btn icon="my_location" round color="white" text-color="black" @click="getCurrentLocation" />
      </l-control>

      <budzonnery-marker :latLng="[46.7, 7]" name="Coin-Coin-la-Ville" image="https://cdn.quasar-framework.org/img/mountains.jpg" />
      <budzonnery-marker :latLng="[46.75, 7.1]" marked name="Pouet-les-Bois" image="https://cdn.quasar-framework.org/img/parallax2.jpg" />

      <l-marker v-if="currentPosition.lat" :lat-lng="[currentPosition.lat, currentPosition.lng]" />
    </l-map>
  </q-page>
</template>

<script>
import FillHeight from '../mixins/FillHeight'
import BudzonneryMarker from '../components/map/markers/BudzonneryMarker'

export default {
  data () {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 10,
      center: [46.7, 7],
      bounds: null,
      currentPosition: {}
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
    },
    getCurrentLocation () {
      const vm = this
      navigator.geolocation.getCurrentPosition(location => {
        vm.currentPosition.lat = location.coords.latitude
        vm.currentPosition.lng = location.coords.longitude
        vm.currentPosition.acc = location.coords.accuracy

        vm.center = [location.coords.latitude, location.coords.longitude]
      })
    }
  },
  components: { BudzonneryMarker },
  mixins: [FillHeight]
}
</script>
