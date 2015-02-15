var map;

function initialize() {
  var myLatlng = new google.maps.LatLng(53.3789055,-3.0150173);
  var mapOptions = {
    zoom: 9,
    center: myLatlng
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
  
  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title: 'Workshop: Yoga for couples, partners, friends and singles!'
  });
  
}

google.maps.event.addDomListener(window, 'load', initialize);