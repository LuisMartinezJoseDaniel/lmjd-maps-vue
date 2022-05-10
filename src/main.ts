import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJpdXpyZzciLCJhIjoiY2wyemh2M3duMGRiZjNrb3l6OG5ha3l3YiJ9.9vW7HGoIysjuqQYr02Q1og";

if (!navigator.geolocation) {
  alert("Tu navegador no soporta el GeoLocation");
  throw new Error("Tu navegador no soporta el GeoLocation");
}

createApp(App).use(store).use(router).mount("#app");
