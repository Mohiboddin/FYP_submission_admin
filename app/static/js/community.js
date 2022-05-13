$(function () {
        console.log(data_js['community_info'].id)
        fetch_chat('', data_js['community_info'].id)




        var LineChartData = {
            labels  : ["1 day ago","2 day ago","3 day ago","4 day ago","5 day ago","6 day ago","7 day ago","8 day ago","9 day ago","10 day ago"],
            datasets: [
              {
                label               : 'Number of chats per day',
                backgroundColor     : 'rgba(60,141,188,0.9)',
                borderColor         : 'rgba(60,141,188,0.8)',
                pointRadius          : 5,
                pointColor          : '#3b8bba',
                pointStrokeColor    : 'rgba(60,141,188,1)',
                pointHighlightFill  : '#fff',
                pointHighlightStroke: 'rgba(60,141,188,1)',
                data                : [23,34,45,67,12,34,54,56,78,29]
              }
            ]
          }
      
          var lineChartCanvas = $('#lineChart').get(0).getContext('2d')
          var lineChartData = $.extend(true, {}, LineChartData)
          var temp0 = LineChartData.datasets[0]
      
      
          lineChartData.datasets[0] = temp0
      
          var lineChartOptions = {
            elements: {
              line: {
                  tension: 0
              }
          },
            responsive              : true,
            maintainAspectRatio     : false,
            datasetFill             : false,
            animation: {
              duration: 0
          }
          }
      
      
          lineChartData.datasets[0].fill = false;
      
          var lineChart = new Chart(lineChartCanvas, {
            type: 'line',
            data: lineChartData,
            options: lineChartOptions,
          
          })
          
    
})

from_date=null
chat_data=null
function fetch_chat(from_date_send, community_id){
    data_chat_fetch={
        "from_date": from_date_send,
        "id": community_id
    }

    fetch('/community_chat', {
        method: 'POST', // or 'PUT'
        headers: {
        "content-type": "application/json ;charset=utf-8",
        },
        body: JSON.stringify(data_chat_fetch)
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        if(data["data"]){
            chat_data=data["data"]
            from_date=chat_data[chat_data.length-1].created_at
            chat_display(data["data"])
        }
        else
            {
                $(document).Toasts('create', {
                    class: 'bg-default',
                    title: 'Notify',
                    body: 'No more Chat'
                  })
            }
        })
        .catch((error) => {
        console.error('Error:', error);
        });

}

function chat_display(data_to_display){

    chat_html_node=$("#chat_populate")
    for ( message in data_to_display){

        HTML=`<div class="chat-message-left pb-4">
        <div>
           <img src="`+data_to_display[message]['photo_url'] +`" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40">  
       </div>
        <div class="flex-shrink-1 bg-chat-color rounded py-2 px-3 mr-3">
           <div class="font-weight-bold mb-1 text-info">`+data_to_display[message]['official_name'] +`</div> 
           `+ data_to_display[message]['message_content'] +`
           <br/><div class="text-muted small text-nowrap mt-2 float-right">`+ data_to_display[message]['time'] +`</div>
        </div>
     </div>`
     chat_html_node.append(HTML)
        
    }

    

    console.log(data_to_display)
}


$('#chat_populate').scroll(function() {
    if($('#chat_populate').height()==(document.getElementById('chat_populate').scrollHeight-$('#chat_populate').scrollTop()-48)) {
           // ajax call get data from server and append to the div
        //    counter++
        //    window[next_time_call]();
           console.log("Hello")
           fetch_chat(from_date, data_js['community_info'].id)
    }
});



document.getElementById("community_engagement").addEventListener("click", community_engagement_chart(),false);

function community_engagement_chart(){

    
}