
/**
 * drawChart
 *
 * @param marker
 * @param row
 *    the row as javascript
 * @param cols
 *    the DataTableVisualization() columns as javascript
 **/
function drawChart(marker, row, cols) {

  var js = '{'+cols+','+row+'}';
  var data = new google.visualization.DataTable(js);

  // Set chart options
  var options = {'title':'Pizza sold @ '+
                         marker.getPosition().toString(),
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

      //chart       = new google.visualization.PieChart(node);
      //chart       = new google.visualization.ColumnChart(node);

      chart.draw(data, options);
      infoWindow.setContent(node);
      infoWindow.open(marker.getMap(), marker);

}



