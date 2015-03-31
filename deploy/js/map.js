var map;

function initialize_trelogan_yoga_map() {
  var myLatlng = new google.maps.LatLng(53.260998,-3.501757);
  var mapOptions = {
    zoom: 9,
    center: myLatlng
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
  
  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title: 'Trelogan Yoga Wednesday Classes'
  });
  
}

google.maps.event.addDomListener(window, 'load', initialize_trelogan_yoga_map);