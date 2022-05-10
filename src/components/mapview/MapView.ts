import Mapboxgl from "mapbox-gl";
import { defineComponent, ref, onMounted, watch } from "vue";
import { usePlacesStore } from "../../composables/usePlacesStore";

export default defineComponent({
  name: "MapView",
  setup() {
    const mapElement = ref<HTMLDivElement>();
    const { userLocation, isUserLocationReady } = usePlacesStore();

    const initMap = async () => {
      if (!mapElement.value) throw new Error("Div Element no existe");
      if (!userLocation.value) throw new Error("User Location no existe");
      
      await Promise.resolve();
      
      const map = new Mapboxgl.Map({
        container: mapElement.value, // container ID
        style: "mapbox://styles/mapbox/dark-v10", // style URL
        center: userLocation.value, // starting position [lng, lat]
        zoom: 15, // starting zoom
      });

      const myLocationPopup = new Mapboxgl.Popup({
        offset: [0, -45],
      }).setLngLat(userLocation.value).setHTML(`
          <h4> Aqui estoy </h4>
          <p>${userLocation.value}</p>
        `);

      const myLocationMarker = new Mapboxgl.Marker()
        .setLngLat(userLocation.value)
        .setPopup(myLocationPopup)
        .addTo(map);
    };

    onMounted(() => {
      if (isUserLocationReady.value) return initMap();
    });

    watch(isUserLocationReady, (newVal) => {
      if (isUserLocationReady.value) initMap();
    });
    return {
      isUserLocationReady,
      mapElement,
    };
  },
});
