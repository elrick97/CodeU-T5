function fetchMessageData() {
          fetch("/messagechart")
              .then((response) => {
              	console.log(response);
                return response.json();
              })
              .then((msgJson) => {
                var msgData = new google.visualization.DataTable();
                //define columns for the DataTable instance
                msgData.addColumn('date', 'Date');
                msgData.addColumn('number', 'Message Count');

               
                for (i = 0; i < msgJson.length; i++) {
                    msgRow = [];
                    var timestampAsDate = new Date (msgJson[i].timestamp);
                    var totalMessages = i + 1;
                    msgRow.push(timestampAsDate, totalMessages);
               
                    //console.log(msgRow);
                    msgData.addRow(msgRow);

                }
                //console.log(msgData);
                drawChart(msgData);
              });
        }

fetchMessageData();