//Code based on Google maps API examples https://developers.google.com/maps/documentation/javascript/markers

var loc_map;
var infoWindow;
var service;
  function initAutocomplete() {
    loc_map = new google.maps.Map(document.getElementById('loc_map'), {
      center: {lat: 33.4725, lng: -112.0722},
      zoom: 10,
      mapTypeId: 'roadmap'
    });

var script = document.createElement('script');
	script.src = "../static/js/searchmarkers.js";
document.getElementsByTagName("head")[0].appendChild(script);

infowindow = new google.maps.InfoWindow();
service = new google.maps.places.PlacesService(loc_map);
// console.log(service);
  }

window.geojson_callback = function(results) {

//Google place search code
// Create the search box and link it to the UI element.
    // console.log(results);
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    loc_map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    console.log(loc_map);

    // Bias the SearchBox results towards current map's viewport.
    loc_map.addListener('bounds_changed', function() {
      searchBox.setBounds(loc_map.getBounds());
      console.log(loc_map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }

//Custom code
var locations = new Array();
var cc1;
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	  var name = [];
console.log(labels);

for(var i = 0; i < results.features.length; i++) {
	 var coords = results.features[i].geometry.coordinates;
	if (results.features[i].properties.city == place.name) {
		cc1 = new google.maps.LatLng(coords[0], coords[1]);
		//console.log(locations[i]);
    // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: loc_map,
          position: cc1
        }));

	   var city = results.features[i].properties.city;
	  var state = results.features[i].properties.state;
		name.push(results.features[i].properties.name);
	  //var name = results.features[i].properties.name;
	  var ID = 	results.features[i].id;
	  var stars =  results.features[i].properties.stars;
	  var review = results.features[i].properties.review;
		//console.log(markers[markers.length - 1])
		console.log(markers.length - 1);
		console.log(name);
	  google.maps.event.addListener(markers[markers.length - 1]	, 'click', function() {
          infowindow.setContent('<div><strong>' + name[markers.length-1] + '</strong><br>' +
            'City: ' + city +  '  ,  ' + 'State: ' + state + '<br>' + ' Yelp Rating: ' + stars + '<br>' + 'Yelp Fan Reviewers: ' + review +
            '</div>');
          infowindow.open(loc_map, this);


        });
	}

}



        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      loc_map.fitBounds(bounds);
    });


}
