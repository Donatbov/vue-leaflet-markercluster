<template>
  <div id="app">
    <LMap
      class="map"
      :zoom="zoom"
      :max-zoom="19"
      :use-global-leaflet="true"
      :center="center"
      :options="mapOptions"
    >
      <LTileLayer
        :url="url"
        :attribution="attribution"
      />
      <LMarker
        v-for="object in objectList"
        :key="object.id"
        :lat-lng="object.latlng"
      />
    </LMap>
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import { latLng } from 'leaflet'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'

export default {
  name: 'App',
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data () {
    return {
      zoom: 8,
      center: latLng(46.35312518717163, 6.784678858852737),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      mapOptions: {
        zoomSnap: 0.5
      },
      objectList: [
        {
          latlng: latLng(46.7934204, 7.1568772)
        },
        {
          latlng: latLng(47.3625149, 7.3499802)
        },
        {
          latlng: latLng(46.3179423, 7.9809608)
        },
        {
          latlng: latLng(46.9976485, 6.9365306)
        }
      ]
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
