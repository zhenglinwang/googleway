/**
 * Chart JSON
 *
 * creates the required JSON that feeds a Google DataTable
 *
 * @param cols
 *     The column headings
 * @param rows
 *     Rows of data
 **/
function chartJson(cols, rows){
  return('{'+cols+','+rows+'}');
}

/**
 * Chart Type
 *
 * Returns a chart object
 *
 * @param type
 *     String specifying the type of chart (e.g. 'line', 'pie', ...)
 * @param node
 *     document.element 'div' node
 *
 **/
function chartType(type, node){
  if(type === 'area'){
    return(new google.visualization.AreaChart(node));
  }else if(type === 'line'){
    return(new google.visualization.LineChart(node));
  }else if(type === 'pie'){
    return(new google.visualization.PieChart(node));
  }
}

/**
 * Chart Options
 *
 * set the options for a chart
 *
 * @param mapObject
 *     map object containing the option data
 **/
function chartOptions(mapObject){
    var options = {'title':'Marker location: '+ mapObject.getPosition().toString(),
//                 'chartArea' : {'left': '5%', 'width' : '80%'},
//                 'legend' : 'bottom',
                 'width':400,
                 'height':150};

   return(options);
}


/**
 * drawChart
 *
 * @param mapObject
 *     map object that contains the data for the chart
 **/
function chartObject(mapObject) {

  cl("chart object");

  var js = chartJson(mapObject.chart_cols, mapObject.info_window);
  var data = new google.visualization.DataTable(js);

  // Set chart options
  var options = chartOptions(mapObject);

  var node        = document.createElement('div'),
      infoWindow  = new google.maps.InfoWindow();

  // get a chart object
  var chart = chartType(mapObject.chart_type, node);

  chart.draw(data, options);
  infoWindow.setContent(node);
  infoWindow.open(mapObject.getMap(), mapObject);

}



