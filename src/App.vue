<template>
  <div id="app">
    <LMap
      class="map"
      :zoom="zoom"
      :max-zoom="maxZoomLevel"
      :use-global-leaflet="true"
      :center="center"
      :options="mapOptions"
    >
      <LTileLayer
        :url="url"
        :attribution="attribution"
      />
      <LMarker
        v-for="marker in markers"
        :key="marker.id"
        :lat-lng="marker.latlng"
      >
        <LPopup :content="marker.text" />
      </LMarker>
    </LMap>
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import { latLng } from 'leaflet'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'

function rand (n) {
  const max = n + 0.1
  const min = n - 0.1
  return Math.random() * (max - min) + min
}

export default {
  name: 'App',
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data () {
    const markers = []
    const nbLocationWithManyMarkers = 10
    const nbLocationWithASingleMarker = 10
    const nbMarkersAtSamePosition = 10
    const centerLat = 45.64401457919508
    const centerLng = 5.867792155632818
    for (let i = 0; i < nbLocationWithManyMarkers; i++) {
      const point = {
        id: i,
        latlng: latLng(rand(centerLat), rand(centerLng)),
        text: 'Hola ' + i
      }
      for (let i = 0; i < nbMarkersAtSamePosition; i++) {
        markers.push(point)
      }
    }
    for (let i = nbLocationWithManyMarkers; i < nbLocationWithManyMarkers + nbLocationWithASingleMarker; i++) {
      const point = {
        id: i,
        latlng: latLng(rand(centerLat), rand(centerLng)),
        text: 'Hola ' + i
      }
      markers.push(point)
    }
    return {
      markers,
      zoom: 11,
      center: latLng(centerLat, centerLng),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      maxZoomLevel: 19, // Map on the url above don't load after this zoom-level
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      mapOptions: {
        zoomSnap: 0.5
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 95vh;
  width: 95vw;
}
</style>
