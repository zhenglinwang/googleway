
function cl(x){
  console.log(x);
}


function isChartsLoaded(){
  if( typeof google.visualization === 'undefined'){
    return false;
  }else{
    return true;
  }
}


/**
 * Adds infowindow to the specified map object
 *
 * @param map_id
 * @param mapObject
 *          the object the info window is being attached to
 * @param objectAttribute
 *          string attribute name
 * @param attributeValue
 *          the value of the attribute
 */
function add_infoWindow(map_id, mapObject, infoWindow, objectAttribute, attributeValue){

  mapObject.set(objectAttribute, attributeValue);

  google.maps.event.addListener(mapObject, 'click', function(event){

    // the listener is being bound to the mapObject. So, when the infowindow
    // contents are updated, the 'click' listener will need to see the new information
    // ref: http://stackoverflow.com/a/13504662/5977215
    mapObject.setOptions({"_information": mapObject.get(objectAttribute)});

    infoWindow.setContent(mapObject.get(objectAttribute));

    infoWindow.setPosition(event.latLng);
    infoWindow.open(window[map_id + 'map']);
  });
}


/**
 * Map click
 *
 * Returns details of the click even on a map
 **/
function map_click(map_id, mapObject, mapInfo){

  if(!HTMLWidgets.shinyMode) return;

  //Shiny.onInputChange("myMapData", 123.7887);

  google.maps.event.addListener(mapObject, 'click', function(event){
//   mapObject.addListener('click', function(){
//
    var eventInfo = $.extend(
      mapInfo,
      {
        id: map_id,
//        latNumeric: event.latLng.lat(),
        lat: event.latLng.lat().toFixed(4),
        lon: event.latLng.lng().toFixed(4),
        centerLat: mapObject.getCenter().lat().toFixed(4),
        centerLng: mapObject.getCenter().lng().toFixed(4),
        zoom: mapObject.getZoom(),
        randomValue: Math.random()
      }
    );

    // logging messages for debugging numerics / text error
//    console.log("map clicked - event.latLng.lat(): ");
//    console.log(event.latLng.lat());

    Shiny.onInputChange(map_id + "_map_click", eventInfo);
  })
}


function bounds_changed(map_id, mapObject, mapInfo){
  if(!HTMLWidgets.shinyMode) return;

  google.maps.event.addListener(mapObject, 'bounds_changed', function(event){
    var eventInfo = $.extend(
      {
        id: map_id,
//        bounds:mapObject.getBounds(),
//        east: mapObject.getBounds().toJSON().east.toFixed(4),
//        north: mapObject.getBounds().toJSON().north.toFixed(4),
//        south: mapObject.getBounds().toJSON().south.toFixed(4),
//        west: mapObject.getBounds().toJSON().west.toFixed(4),
        northEastLat: mapObject.getBounds().getNorthEast().lat().toFixed(4),
        northEastLon: mapObject.getBounds().getNorthEast().lng().toFixed(4),
        southWestLat: mapObject.getBounds().getSouthWest().lat().toFixed(4),
        southWestLon: mapObject.getBounds().getSouthWest().lng().toFixed(4),
        randomValue: Math.random()
      },
      mapInfo
    );

    Shiny.onInputChange(map_id + "_bounds_changed", eventInfo);
  })
}

function zoom_changed(map_id, mapObject, mapInfo){

    if(!HTMLWidgets.shinyMode) return;

  google.maps.event.addListener(mapObject, 'bounds_changed', function(event){
    var eventInfo = $.extend(
      {
        id: map_id,
        zoom: mapObject.getZoom(),
        randomValue: Math.random()
      },
      mapInfo
    );

    Shiny.onInputChange(map_id + "_zoom_changed", eventInfo);
  })

}

/**
 * Marker click
 *
 * Returns details of the marker that was clicked
 **/
function marker_click(map_id, markerObject, marker_id, markerInfo){
  if(!HTMLWidgets.shinyMode) return;

  google.maps.event.addListener(markerObject, 'click', function(event){

    var eventInfo = $.extend(
      {
        id: marker_id,
        lat: event.latLng.lat().toFixed(4),
        lon: event.latLng.lng().toFixed(4),
        randomValue: Math.random()
      },
      markerInfo
    );

    Shiny.onInputChange(map_id + "_marker_click", eventInfo);
  })
}

/**
 * Shape Click
 *
 * Returns the 'id' of the shape that was clicked back to shiny
 *
 **/
function shape_click(map_id, shapeObject, shape_id, shapeInfo){

  if(!HTMLWidgets.shinyMode) return;

  google.maps.event.addListener(shapeObject, 'click', function(event){

    var eventInfo = $.extend(
      {
        id: shape_id,
        lat: event.latLng.lat().toFixed(4),
        lon: event.latLng.lng().toFixed(4),
        randomValue: Math.random() // force reactivity so that 'onInputChange' thinks the input has changed
      },
      shapeInfo
    );

    Shiny.onInputChange(map_id + "_shape_click", eventInfo);
  });

}

function polyline_click(map_id, polylineObject, polyline_id, polylineInfo){

  if(!HTMLWidgets.shinyMode) return;

  google.maps.event.addListener(polylineObject, 'click', function(event){

    var eventInfo = $.extend(
      {
        id: polyline_id,
        lat: event.latLng.lat().toFixed(4),
        lon: event.latLng.lng().toFixed(4),
        path: google.maps.geometry.encoding.encodePath(polylineObject.getPath()),
        randomValue: Math.random()
      },
      polylineInfo
    );

    Shiny.onInputChange(map_id + "_polyline_click", eventInfo);
  });

}

function polygon_click(map_id, polygonObject, polygon_id, polygonInfo){

  if(!HTMLWidgets.shinyMode) return;

  google.maps.event.addListener(polygonObject, 'click', function(event){

    var polygonOuterPath = google.maps.geometry.encoding.encodePath(polygonObject.getPath());
    var polygonAllPaths = [];
    var paths = polygonObject.getPaths();

    for(i = 0; i < paths.getLength(); i++){
      polygonAllPaths.push(google.maps.geometry.encoding.encodePath(paths.getAt(i)));
    }

    var eventInfo = $.extend(
      {
        id: polygon_id,
        lat: event.latLng.lat().toFixed(4),
        lon: event.latLng.lng().toFixed(4),
        path: polygonOuterPath,
        paths: polygonAllPaths,
        randomValue: Math.random()
      },
      polygonInfo
    );

    Shiny.onInputChange(map_id + "_polygon_click", eventInfo);
  });

}

/** find By Id
 *
 * @param source
 *     source array in which to find the id
 * @param id
 *     id value to find in the array
 *
 **/
function findById(source, id) {
  for (var i = 0; i < source.length; i++) {
    if (source[i].id === id) {
      return source[i];
    }
  }
  return;
}




