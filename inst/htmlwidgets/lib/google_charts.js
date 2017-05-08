
/**
 * drawChart
 *
 * @param marker
 * @param row
 *    the row as javascript
 * @param cols
 *    the DataTableVisualization() columns as javascript
 **/
function drawChart(marker) {

//  cl('charts loaded: ' + isChartsLoaded().toString());
//
//  if(!isChartsLoaded()){
//    cl('loading charts library');
//    google.charts.load('current', {'packages':['corechart']});
//  }

  var js = '{'+marker.chart_cols+','+marker.info_window+'}';
  var data = new google.visualization.DataTable(js);

  cl(data.toJSON());

  // Set chart options
  var options = {'title':'Marker location: '+ marker.getPosition().toString(),
//                 'chartArea' : {'left': '5%', 'width' : '80%'},
//                 'legend' : 'bottom',
                 'width':400,
                 'height':150};

  var node        = document.createElement('div'),
      infoWindow  = new google.maps.InfoWindow();

  var chart;
  var type = marker.chart_type;

  if(type === 'area'){
    chart = new google.visualization.AreaChart(node);
  }else if(type === 'line'){
    chart = new google.visualization.LineChart(node);
  }else if(type === 'pie'){
    chart = new google.visualization.PieChart(node);
  }

  chart.draw(data, options);
  infoWindow.setContent(node);
  infoWindow.open(marker.getMap(), marker);

}



