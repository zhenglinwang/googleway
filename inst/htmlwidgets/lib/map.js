
/**
 * Initialise Map
 *
 * Initialises the map
 *
 *
 **/
function initialise_map(el, x) {

  // map bounds object
  //console.log("initialising map: el.id: ");
  //console.log(el.id);
  window[el.id + 'mapBounds'] = new google.maps.LatLngBounds();

  // if places
  if(x.search_box === true){
    var input = document.getElementById('pac-input');
    //var input = document.getElementById('search-container');

    window[el.id + 'googleSearchBox'] = new google.maps.places.SearchBox(input);
    window[el.id + 'map'].controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    window[el.id + 'map'].addListener('bounds_changed', function() {
      window[el.id + 'googleSearchBox'].setBounds(window[el.id + 'map'].getBounds());
    });

    var markers = [];

    // listen for deleting the search bar
    input.addEventListener('input', function(){
      if(input.value.length === 0){
        clear_search(el.id)
      }
    })

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    window[el.id + 'googleSearchBox'].addListener('places_changed', function() {
      var places = window[el.id + 'googleSearchBox'].getPlaces();
      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      window[el.id + 'googlePlaceMarkers'].forEach(function(marker) {
        marker.setMap(null);
      });
      window[el.id + 'googlePlaceMarkers'] = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();

      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        window[el.id + 'googlePlaceMarkers'].push(new google.maps.Marker({
          map: window[el.id + 'map'],
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      window[el.id + 'map'].fitBounds(bounds);
    });
  }

  // call initial layers
  if(x.calls !== undefined){

    for(layerCalls = 0; layerCalls < x.calls.length; layerCalls++){

      //push the map_id into the call.args
      x.calls[layerCalls].args.unshift(el.id);

      if (window[x.calls[layerCalls].functions]){

        window[x.calls[layerCalls].functions].apply(window[el.id + 'map'], x.calls[layerCalls].args);
      }else{
        console.log("Unknown function " + x.calls[layerCalls]);

      }
    }
  }

  // listeners
  mapInfo = {};
//  console.log('map info');
//  console.log(mapInfo);

  map_click(el.id, window[el.id + 'map'], mapInfo);
  bounds_changed(el.id, window[el.id + 'map'], mapInfo);
  zoom_changed(el.id, window[el.id + 'map'], mapInfo);

//  console.log("map info 2");
//  console.log(mapInfo);

}
