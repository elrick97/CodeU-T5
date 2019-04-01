// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

  // Create the data table.
  var dataStructures_data = new google.visualization.DataTable();
  dataStructures_data.addColumn('string', 'Data Structure');
  dataStructures_data.addColumn('number', 'Number of Questions');
  dataStructures_data.addRows([
    ['Strings', 13],
    ['Arrays', 11],
    ['Lists', 15],
    ['Stacks', 9],
    ['Queues', 6],
    ['Trees', 5],
    ['Graphs', 7]
  ]);

  // Set chart options
  var options = {'title':'Subdomain of Questions',
                 'width':800,
                 'height':650};

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
  chart.draw(dataStructures_data, options);
}