
  label_usage=[]
  student_live=[]
  student_usage=[]
  alumni_live=[]
  alumni_usage=[]
  staff_live=[]
  staff_usage=[]
  
  for(a in data_js){
      label_usage.push(data_js[a].recorded_at)
      student_live.push(data_js[a].student_live)
      student_usage.push(data_js[a].student_usage)
      alumni_live.push(data_js[a].alumni_live)
      alumni_usage.push(data_js[a].alumni_usage)
      staff_live.push(data_js[a].staff_live)
      staff_usage.push(data_js[a].staff_usage)      
  }

  bar_chart_display()
  plot_line_chart()


function bar_chart_display(){
        
    var BarChartData = {
  
  
      labels  : label_usage,
      datasets: [
        {
          label               : 'Students Usage',
          backgroundColor     : 'rgba(60,141,188,0.9)',
          borderColor         : 'rgba(60,141,188,0.8)',
          pointRadius          : false,
          pointColor          : '#3b8bba',
          pointStrokeColor    : 'rgba(60,141,188,1)',
          pointHighlightFill  : '#fff',
          pointHighlightStroke: 'rgba(60,141,188,1)',
          data                : student_usage
        },
        {
          label               : 'Alumni Usage',
          backgroundColor     : 'rgba(210, 214, 222, 1)',
          borderColor         : 'rgba(210, 214, 222, 1)',
          pointRadius         : false,
          pointColor          : 'rgba(210, 214, 222, 1)',
          pointStrokeColor    : '#c1c7d1',
          pointHighlightFill  : '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          data                : alumni_usage
        },
        {
          label               : 'Staff Usage',
          backgroundColor     : 'rgba(60,141,188,0.5)',
          borderColor         : 'rgba(60,141,188,0.5)',
          pointRadius         : false,
          pointColor          : 'rgba(60,141,188,0.5)',
          pointStrokeColor    : 'rgba(60,141,188,0.5)',
          pointHighlightFill  : '#fff',
          pointHighlightStroke: 'rgba(60,141,188,0.5)',
          data                : staff_usage
        },
      ]
    }
  
     //-------------
    //- BAR CHART -
    //-------------
    var barChartCanvas = $('#barChart').get(0).getContext('2d')
    var barChartData = $.extend(true, {}, BarChartData)
    var temp0 = BarChartData.datasets[0]
    var temp1 = BarChartData.datasets[1]
    var temp2 = BarChartData.datasets[2]
  
    barChartData.datasets[0] = temp0
    barChartData.datasets[1] = temp1
    barChartData.datasets[2] = temp2
  
    var barChartOptions = {
      responsive              : true,
      maintainAspectRatio     : false,
      datasetFill             : false,
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
                stepSize: 1
            }
        }]
    }
    }
  
    new Chart(barChartCanvas, {
      type: 'bar',
      data: barChartData,
      options: barChartOptions
    })
  
  }


  

  function plot_line_chart(){
  //-------------
      //- LINE CHART -
      //--------------
      
      var LineChartData = {
        labels  : label_usage,
        datasets: [
          {
            label               : 'Students Live ',
            backgroundColor     : 'rgba(60,141,188,0.9)',
            borderColor         : 'rgba(60,141,188,0.8)',
            pointRadius          : 5,
            pointColor          : '#3b8bba',
            pointStrokeColor    : 'rgba(60,141,188,1)',
            pointHighlightFill  : '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            data                : student_live 
          },
          {
            label               : 'Alumni Live ',
            backgroundColor     : 'rgba(210, 4, 45,0.9)',
            borderColor         : 'rgba(210, 4, 45,0.9)',
            pointRadius          : 5,
            pointColor          : '#3b8bba',
            pointStrokeColor    : 'rgba(210, 4, 45,0.9)',
            pointHighlightFill  : '#fff',
            pointHighlightStroke: 'rgba(210, 4, 45,0.9)',
            data                : alumni_live
          },
          {
            label               : 'Staff Live',
            backgroundColor     : 'rgba(0,141,0,0.9)',
            borderColor         : 'rgba(0,141,0,0.9)',
            pointRadius          : 5,
            pointColor          : '#3b8bba',
            pointStrokeColor    : 'rgba(0,141,0,0.9)',
            pointHighlightFill  : '#fff',
            pointHighlightStroke: 'rgba(0,141,0,0.9)',
            data                :  staff_live
          },
        ]
      }
  
      var lineChartCanvas = $('#lineChart').get(0).getContext('2d')
      var lineChartData = $.extend(true, {}, LineChartData)
      var temp0 = LineChartData.datasets[0]
      var temp1 = LineChartData.datasets[1]
      var temp2 = LineChartData.datasets[2]
  
  
      lineChartData.datasets[0] = temp0
      lineChartData.datasets[1] = temp1
      lineChartData.datasets[2] = temp2
  
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
      lineChartData.datasets[2].fill = false;
  
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
      setInterval(line_chart_set_timer, 30000);
      
  }