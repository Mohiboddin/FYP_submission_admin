$(function () {
     
        //  fetching connection formed terminated
      fetch('/connection_date_wise', {
        method: 'GET', // or 'PUT'
        headers: {
        "content-type": "application/json ;charset=utf-8",
        }
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        if(data["code"]==1)
            line_chart_display_1st_time(data["data"])
        else if(data["code"]==2)
            {
                $(document).Toasts('create', {
                    class: 'bg-warning',
                    title: 'Warning',
                    body: 'Something went worng'
                  })
            }
        })
        .catch((error) => {
        console.error('Error:', error);
        });  
  
  });
  // this array is used to shift the data for realtime graph
  var array_data_1=[0,0,0,0,0,0,0,0,0,0]
  var array_data_2=[0,0,0,0,0,0,0,0,0,0]
  
  function line_chart_display_1st_time(data){
    var js_date = new Date()
    for (tuple in data){
        var new_date=new Date(data[tuple].date)
        if(data[tuple].type==1){
           
            var Difference_In_Time = js_date.getTime() - new_date.getTime();
            var Difference_In_Days = parseInt( Difference_In_Time / (1000 * 3600 * 24));
            console.log(Difference_In_Days)
            array_data_1[Difference_In_Days]=data[tuple].count

        }
        else{
            var Difference_In_Time = js_date.getTime() -  new_date.getTime();
            var Difference_In_Days = parseInt( Difference_In_Time / (1000 * 3600 * 24));
            console.log(Difference_In_Days)
            array_data_2[Difference_In_Days]=data[tuple].count
        }
    }

    plot_line_chart()
  }
  
  function plot_line_chart(){
  //-------------
      //- LINE CHART -
      //--------------
      console.log(array_data_1,array_data_2)
      var LineChartData = {
        labels  : ['9-day ago','8-day ago','7-day ago','6-day ago','5-day ago','4-day ago','3-day ago','2-day ago', '1-day ago','Today'],
        datasets: [
          {
            label               : 'Connections Succesfull',
            backgroundColor     : 'rgba(60,141,188,0.9)',
            borderColor         : 'rgba(60,141,188,0.8)',
            pointRadius          : 5,
            pointColor          : '#3b8bba',
            pointStrokeColor    : 'rgba(60,141,188,1)',
            pointHighlightFill  : '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            data                : array_data_1
          },
          {
            label               : 'Connections Unsuccesfull',
            backgroundColor     : 'rgba(210, 4, 45,0.9)',
            borderColor         : 'rgba(210, 4, 45,0.8)',
            pointRadius          : 5,
            pointColor          : '#3b8bba',
            pointStrokeColor    : 'rgba(210, 4, 45,1)',
            pointHighlightFill  : '#fff',
            pointHighlightStroke: 'rgba(210, 4, 45,1)',
            data                : array_data_2
          }
        ]
      }
  
      var lineChartCanvas = $('#lineChart').get(0).getContext('2d')
      var lineChartData = $.extend(true, {}, LineChartData)
      var temp0 = LineChartData.datasets[0]
      var temp1 = LineChartData.datasets[1]
  
  
      lineChartData.datasets[0] = temp0
      lineChartData.datasets[1] = temp1
  
      var lineChartOptions = {
        elements: {
          line: {
              tension: 0
          }
      },
        responsive              : true,
        maintainAspectRatio     : false,
        datasetFill             : false
      }
  
  
      lineChartData.datasets[0].fill = false;
      lineChartData.datasets[1].fill = false;
  
      var lineChart = new Chart(lineChartCanvas, {
        type: 'line',
        data: lineChartData,
        options: lineChartOptions,
        scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true,
                  stepSize: 1
              }
          }]
      }
      })
      
  }