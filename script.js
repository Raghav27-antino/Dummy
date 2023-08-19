let geocoder;
let address;

function initMap() {
  geocoder = new google.maps.Geocoder();

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const location = new google.maps.LatLng(latitude, longitude);
      getAddressFromLatLng(location);
    });
  }
}

function initAutocomplete() {
  const input = document.getElementById('locationInput');
  const autocomplete = new google.maps.places.Autocomplete(input);
}

function getAddressFromLatLng(location) {
  geocoder.geocode({ location: location }, (results, status) => {
    if (status === "OK") {
      if (results[0]) {
        address = results[0].formatted_address;
        document.getElementById('locationInput').value = address;
        console.log("Address:", address);
      } else {
        console.log("No address found for this location.");
      }
    } else {
      console.log("Geocoder failed due to:", status);
    }
  });
}

function initialize() {
  initMap();
  initAutocomplete();

  const clearButton = document.getElementById('clearButton');
  const current = document.getElementById('current');
  const locationInput = document.getElementById('locationInput');

  clearButton.addEventListener('click', () => {
    locationInput.value = '';
  });

  current.addEventListener('click', () => {
    locationInput.value = address;
  });
}