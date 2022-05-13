$(function () {
  //  fetching user engagement data
    fetch('/admin_engagement', {
    method: 'GET', // or 'PUT'
    headers: {
    "content-type": "application/json ;charset=utf-8",
    }
    })
    .then(response => response.json())
    .then(data => {
    console.log('Success:', data);
    if(data["code"]==1)
        bar_chart_display(data["data"])
    else
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

    //  fetching number of users  data
    fetch('/admin_user_count', {
      method: 'GET', // or 'PUT'
      headers: {
      "content-type": "application/json ;charset=utf-8",
      }
      })
      .then(response => response.json())
      .then(data => {
      console.log('Success:', data);
      if(data["code"]==1)
          pie_chart_display(data["data"])
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
  

      //  fetching number of users live data
    fetch('/admin_user_live', {
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

function line_chart_display_2nd_time(data){

  array_data.push.apply(array_data, array_data.splice(0,1));
  array_data[11]=data.one
  plot_line_chart_realtime(array_data)
  
}

  

var myDate = new Date();
var myDay = myDate.getDay();

var weekday = ['Sunday', 'Monday', 'Tuesday','Wednesday', 'Thursday', 'Friday', 'Saturday'];

function plot_data(posts){
  console.log("we are in the plotting function")
  d=[]
  for (a=0; a<posts.length;a++){
    console.log(posts[a].date)
    day_num= new Date(posts[a].date).getDay();
    d[day_num]=posts[a].count

  }
  console.log(d)
  return d
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



function pie_chart_display(data){
    //-------------
    //- DONUT CHART -
    //-------------
    // Get context with jQuery - using jQuery's .get() method.

    console.log(data)
    $("#total_users_count").html("Total Users: " + data["total_users"])


    var donutChartCanvas = $('#donutChart').get(0).getContext('2d')
    var donutData        = {
      labels: [
          'Students',
          'Alumni',
          'Staff',
      ],
      datasets: [
        {
          data: [data.student,data.alumni,data.staff],
          backgroundColor : ['#f56954', '#00a65a', '#f39c12'],
        }
      ]
    }
    var donutOptions     = {
      maintainAspectRatio : false,
      responsive : true,
    }
    //Create pie or douhnut chart
    // You can switch between pie and douhnut using the method below.
    new Chart(donutChartCanvas, {
      type: 'doughnut',
      data: donutData,
      options: donutOptions
    })
}
