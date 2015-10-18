function initialize_trelogan_yoga_map(a, b) {
    var c = new google.maps.LatLng(a, b),
        d = {
            zoom: 9,
            center: c
        };
    map = new google.maps.Map(document.getElementById("map-canvas"), d), new google.maps.Marker({
        position: c,
        map: map,
        title: "Trelogan Yoga Classes"
    })
}
var map;