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
      <LCustomMarkerCluster
        :options="markerClusterOptions"
        @clusterclick="clusterClick"
        @ready="ready"
      >
        <LMarker
          v-for="marker in markers"
          :key="marker.id"
          :lat-lng="marker.latlng"
        >
          <LPopup :content="marker.text" />
        </LMarker>
      </LCustomMarkerCluster>
    </LMap>
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import { latLng } from 'leaflet'
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
import LCustomMarkerCluster from '@/components/LCustomMarkerCluster'

function rand (n) {
  const max = n + 0.1
  const min = n - 0.1
  return Math.random() * (max - min) + min
}

export default {
  name: 'App',
  components: {
    LCustomMarkerCluster,
    LMap,
    LTileLayer,
    LMarker,
    LPopup
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
      },
      markerClusterOptions: { // Put here options handled by leaflet-markerCluster (https://github.com/Leaflet/Leaflet.markercluster#options)
        animateAddingMarkers: true
      }
    }
  },
  methods: {
    clusterClick () {
      console.log('cluster clicked!')
    },
    ready () {
      console.log('cluster ready!')
    }
  }
}
</script>

<style>
#app {
  height: 95vh;
  width: 95vw;
}
</style>
