function add_rectangles(map_id, data_rectangles, update_map_view, layer_id){

  var i;
  window[map_id + 'googleRectangles' + layer_id] = [];
  var infoWindow = new google.maps.InfoWindow();

 for (i = 0; i < Object.keys(data_rectangles).length; i++) {
    add_rectangle(map_id, data_rectangles[i]);
  }

  function add_rectangle(map_id, rectangle){

    var latlonNorthEast = new google.maps.LatLng(rectangle.north, rectangle.east);
    var latlonSouthWest = new google.maps.LatLng(rectangle.south, rectangle.west);

    var bounds = new google.maps.LatLngBounds(
      latlonSouthWest,
      latlonNorthEast
    )

    var Rectangle = new google.maps.Rectangle({
        id: rectangle.id,
        bounds: bounds,
        strokeColor: rectangle.stroke_colour,
        strokeOpacity: rectangle.stroke_opacity,
        strokeWeight: rectangle.stroke_weight,
        fillColor: rectangle.fill_colour,
        fillOpacity: rectangle.fill_opacity,
        draggable: rectangle.draggable,
        editable: rectangle.editable,
        radius: rectangle.radius,
        mouseOverGroup: rectangle.mouse_over_group,
        zIndex: rectangle.z_index
      });

    window[map_id + 'googleRectangles' + layer_id].push(Rectangle);
    Rectangle.setMap(window[map_id + 'map']);

    if(rectangle.info_window){
      add_infoWindow(map_id, Rectangle, infoWindow, '_information', rectangle.info_window);
    }

    if(rectangle.mouse_over || rectangle.mouse_over_group){
      add_mouseOver(map_id, Rectangle, infoWindow, "_mouse_over", rectangle.mouse_over, layer_id, 'googleRectangles');
    }

    shapeInfo = { layerId : layer_id };
    shape_click(map_id, Rectangle, rectangle.id, shapeInfo);

    if(update_map_view === true){
      window[map_id + 'mapBounds'].extend(latlonNorthEast);
      window[map_id + 'mapBounds'].extend(latlonSouthWest);
    }
  }

  if(update_map_view === true){
    window[map_id + 'map'].fitBounds(window[map_id + 'mapBounds']);
  }

}


/**
 * clears rectangles from a google map object
 * @param map_id
 *          the map to clear
 * @param layer_id
 *          the layer to clear
 */
function clear_rectangles(map_id, layer_id){
  for (i = 0; i < window[map_id + 'googleRectangles' + layer_id].length; i++){
    window[map_id + 'googleRectangles' + layer_id][i].setMap(null);
  }
  window[map_id + 'googleRectangles' + layer_id] = null;
}



function update_rectangles(map_id, data_rectangles, layer_id){

  // for a given circle_id, change the options
  var objectAttribute;
  var attributeValue;
  var _id;
  var thisUpdateRectangle;
  var currentIds = [];

  for(i = 0; i < Object.keys(window[map_id + 'googleRectangles' + layer_id]).length; i++){

    _id = window[map_id + 'googleRectangles' + layer_id][i].id;
    currentIds.push(_id);

    // find if there is a matching id in the new polygon data set
    thisUpdateRectangle = findById(data_rectangles, _id);
    if(thisUpdateRectangle !== undefined){

//    if(data_rectangles.find(x => x.id === _id)){
//      thisUpdateRectangle = data_rectangles.find(x => x.id === _id);

      //if the polygon is currently set to Null, re-put it on the map
      if(window[map_id + 'googleRectangles' + layer_id][i].getMap() === null){
        window[map_id + 'googleRectangles' + layer_id][i].setMap(window[map_id + 'map']);
      }

      // the new id exists in the current data set
      // update the values for this polygon

      // for each of the options in data_polygon, update the polygons
      for(j = 0; j < Object.keys(thisUpdateRectangle).length; j++){

        objectAttribute = Object.keys(thisUpdateRectangle)[j];

        attributeValue = thisUpdateRectangle[objectAttribute];

        switch(objectAttribute){
          case "draggable":
            window[map_id + 'googleRectangles' + layer_id][i].setOptions({draggable: attributeValue});
            break;
          case "fill_colour":
            window[map_id + 'googleRectangles' + layer_id][i].setOptions({fillColor: attributeValue});
            break;
          case "fill_opacity":
            window[map_id + 'googleRectangles' + layer_id][i].setOptions({fillOpacity: attributeValue});
            window[map_id + 'googleRectangles' + layer_id][i].setOptions({fillOpacityHolder: attributeValue});
            break;
          case "stroke_colour":
            window[map_id + 'googleRectangles' + layer_id][i].setOptions({strokeColor: attributeValue});
            break;
          case "stroke_weight":
            window[map_id + 'googleRectangles' + layer_id][i].setOptions({strokeWeight: attributeValue});
            break;
          case "stroke_opacity":
            window[map_id + 'googleRectangles' + layer_id][i].setOptions({strokeOpacity: attributeValue});
            break;
          case "info_window":
            window[map_id + 'googleRectangles' + layer_id][i].setOptions({_information: attributeValue});
            break;
        }
      }

    }else{
        window[map_id + 'googleRectangles' + layer_id][i].setMap(null);
    }
  }
}
