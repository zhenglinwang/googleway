

function cl(x){
  console.log(x);
}


function drawChart(marker, js) {

//  var js = '{"cols":[{"id":"task","label":"Task","type":"string"},{"id":"hours","label":"Hours per Day","type":"number"}],"rows":[{"c":[{"v":"Play"},{"v":11}]},{"c":[{"v":"Eat"},{"v":2}]},{"c":[{"v":"Commute"},{"v":2}]},{"c":[{"v":"Watch TV"},{"v":2}]},{"c":[{"v":"Sleep"},{"v":7,"f":"7.000"}]}]}';

//  var h = '[{"id":"firstCol", "type":"string"},{"id":"booVal","type":"boolean"},{"id":"numVal","type":"number"},{"id":"strVal","type":"string"},{"id":"dteVal","type":"string"},{"id":"dtmVal","type":"string"}]';

//  var r = '[{"c":[{"v":"hello"},{"v":true},{"v":1},{"v":"myString"},{"v":"myDate"},{"v":"myDateTime"}] }]';

//  var str = '{"cols":'+h+',"rows":'+r+'}';
//  cl("valid json");
  js = '{'+js+'}'
  cl(js);
//  cl("invalid json");
//  cl(str);

  //var data = new google.visualization.DataTable(js);

        // Create the data table.
        //var data = new google.visualization.DataTable();
        //data.addColumn('string', 'Topping');
        //data.addColumn('number', 'Slices');
        //data.addRows([
        //  ['Mushrooms', 3],
        //  ['Onions', 1],
        //  ['Olives', 1],
        //  ['Zucchini', 1],
        //  ['Pepperoni', 2]
        //]);

        //var data = new google.visualization.DataTable({
         //cols: [{id: 'task', label: 'Task', type: 'string'},
          //      {id: 'hours', label: 'Hours per Day', type: 'number'}],
        // rows: [{c:[{v: 'Work'}, {v: 11}]},
        //       {c:[{v: 'Eat'}, {v: 2}]},
        //       {c:[{v: 'Commute'}, {v: 2}]},
        //       {c:[{v: 'Watch TV'}, {v:2}]},
        //       {c:[{v: 'Sleep'}, {v:7, f:'7.000'}]}]
         //}, 0.6);

         var data = new google.visualization.DataTable(js);

        cl(data.toJSON());

        // Set chart options
        var options = {'title':'Pizza sold @ '+
                               marker.getPosition().toString(),
                       'width':400,
                       'height':150};

        var node        = document.createElement('div'),
            infoWindow  = new google.maps.InfoWindow(),
            chart       = new google.visualization.PieChart(node);

            chart.draw(data, options);
            infoWindow.setContent(node);
            infoWindow.open(marker.getMap(), marker);
      }



