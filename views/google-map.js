var initMap = function() {
  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
    center: {lat: 45.5231, lng: -122.6765},
    zoom: 10
  });

  // downtown portland marker
  var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  var marker = new google.maps.Marker({
    position: {lat: 45.5231, lng: -122.6765},
    map: map,
    icon: './img/pizza-icon.png'
  });

  // hillsboro marker
  var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  var marker = new google.maps.Marker({
    position: {lat: 45.5229, lng: -122.9898},
    map: map,
    icon: './img/pizza-icon.png'
  });

  // pearl district marker
  var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  var marker = new google.maps.Marker({
    position: {lat: 45.530209, lng: -122.6812039},
    map: map,
    icon: './img/pizza-icon.png'
  });

  // buckman marker
  var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  var marker = new google.maps.Marker({
    position: {lat: 45.5179732, lng: -122.649625},
    map: map,
    icon: './img/pizza-icon.png'
  });

  // PDX marker
  var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  var marker = new google.maps.Marker({
    position: {lat: 45.5897694, lng: -122.5950942},
    map: map,
    icon: './img/pizza-icon.png'
  });

  // clackamas marker
  var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  var marker = new google.maps.Marker({
    position: {lat: 45.4076205, lng: -122.5703692},
    map: map,
    icon: './img/pizza-icon.png'
  });
}
