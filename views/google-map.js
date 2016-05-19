function initMap() {
  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
    center: {lat: 45.5231, lng: -122.6765},
    zoom: 10
  });

  var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  var marker = new google.maps.Marker({
    position: {lat: 45.5231, lng: -122.6765},
    map: map,
    icon: '../img/cursor.png'
  });
}
