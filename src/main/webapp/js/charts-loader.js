// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(fetchMessageData);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.

function fetchMessageData() {
          fetch("/questionchart")
              .then((response) => {
              	console.log(response);
                return response.json();
              })
              .then((msgJson) => {
                var msgData = new google.visualization.DataTable();
                //define columns for the DataTable instance
                msgData.addColumn('string', 'Type of Question');
                msgData.addColumn('number', 'Number of Questions');

                var countStrings = 0;
                var countArrays = 0;
                var countLists = 0;
                var countStacks = 0;
                var countQueues = 0;
                var countTrees = 0;
                var countGraphs = 0;
                var countDynamic = 0;
                var countDivConquer = 0;

                msgRow = [];
                    
                for (i = 0; i < msgJson.length; i++) {
                    
                    var tag = new String(msgJson[i].tag);
                    var totalMessages = i + 1;

                    if(tag != "undefined" && tag != "Select a Tag"){
                    	if(tag == "1"){
                    		countStrings++;
                    		console.log("count str " + countStrings);
                    	}
                    	else if(tag == "2"){
                    		countArrays++;
                    		console.log("count arr " + countArrays);
                    	}
                    	else if(tag == "3"){
                    		countLists++;
                    		console.log("count lists " + countLists);
                    	}
                    	else if(tag == "4"){
                    		countStacks++;
                    		console.log("count stacks " + countStacks);
                    	}
                    	else if(tag == "5"){
                    		countQueues++;
                    		console.log("count queues " + countQueues);
                    	}
                    	else if(tag == "6"){
                    		countTrees++;
                    		console.log("count trees " + countTrees);
                    	}
                    	else if(tag == "7"){
                    		countGraphs++;
                    		console.log("count graphs " + countGraphs);
                    	}
                    	else if(tag == "8"){
                    		countDynamic++;
                    		console.log("count dynamic " + countDynamic);
                    	}
                    	else if(tag == "9"){
                    		countDivConquer++;
                    		console.log("count div con " + countDivConquer);
                    	}
                	}
                		
                }
                  msgData.addRows([
    				['Strings', countStrings],
    				['Arrays', countArrays],
    				['Lists', countLists],
    				['Stacks', countStacks],
    				['Queues', countQueues],
    				['Trees', countTrees],
    				['Graphs', countGraphs],
    				['Dynamic Programming', countDynamic],
    				['Divide and Conquer', countDivConquer]
  				]);

                var options = {'title': 'Question Available in CodingPool',
                 'pieHole': 0.4,
                 'width': 600,
                 'height': 600};

                // Instantiate and draw our chart, passing in some options.
                var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
                chart.draw(msgData, options);

              });
   
        }