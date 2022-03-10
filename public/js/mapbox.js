/* eslint-disable */

const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log('Hello from the client side');

mapboxgl.accessToken =
  'pk.eyJ1IjoibmlqaXRoZW9nIiwiYSI6ImNsMGs4ajd0dDAxMjIzaXF5dXdqbnQyczkifQ.xwl95ofCqgv8pd034vIITA';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/nijitheog/cl0k8xaim002314qya9pieba4',
  scrollZoom: false
  //   center: [-118.113491, 34.111745],
  //   zoom: 10
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc => {
  // Create marker
  const el = document.createElement('div');
  el.className = 'marker';
  // Add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom'
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // Add popup
  new mapboxgl.Popup({
    offset: 30
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);
  // Extend map bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100
  }
});
