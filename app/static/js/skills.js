// on key press fetch the skills and append it to the options list of search.

$(document).ready(function(){
    console.log('hey, I am running')

    hierarchy_data_func()
   

    $(".search_skill_input").keypress(function(){
      var skill_prefix=$(".search_skill_input").val();
      console.log("Function running" + skill_prefix)
    });
  });

  function search_skill_input(str) {
    if (str.length==0) {
        console.log("nothing t search")
    //   document.getElementById("livesearch").innerHTML="";
    //   document.getElementById("livesearch").style.border="0px";
      return;
    }
    console.log("something searched")
  }




//display Hierarchy in model.
hierarchy_data=[]
function hierarchy_data_func(){
    console.log("function called hierarchy_data_func")
    fetch('/authority', {
        method: 'POST', // or 'PUT'
        headers: {
        "content-type": "application/json ;charset=utf-8",
        }
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        if(data["code"]==1){
            hierarchy_data=data["data"]
            hierarchy_display(hierarchy_data)
        }
        else if(data["code"]==2) {
            console.log("addning removable button")
            $('.removable_parent_button').html('<button type="button" class="btn btn-secondary" id="parent_node_creator" data-toggle="modal" data-target="#modal-default">Create Parent</button>')

        }
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

}




backend.addEventListener('click', function(e) {
    console.log("arre function run hoo")
    if (e.target.classList.contains('check_box_my_class')) {
        console.log("check_box clicked")
        catch_for_check=e.target;
        checkbox_array=catch_for_check.parentElement.parentElement.getElementsByClassName("check_box_my_class")
        console.log(checkbox_array)
        toggle_check_boxes(checkbox_array);
    }
})

function toggle_check_boxes(checkbox_array){
for (var k = 0; k < checkbox_array.length; k++){
    if (checkbox_array[k].hasAttribute('checked')) {
        checkbox_array[k].removeAttribute("checked")
        // $(checkbox_array[k]).attr('checked', false);
        re_render=checkbox_array[k].parentElement.innerHTML
        parent_element=checkbox_array[k].parentElement
        checkbox_array[k].parentElement.innerHTML=""
        console.log(re_render)
        $(parent_element).append(re_render)

        
    }else{
        checkbox_array[k].setAttribute("checked","")
        $(checkbox_array[k]).attr('checked', true);
        re_render=checkbox_array[k].parentElement.innerHTML
        parent_element=checkbox_array[k].parentElement
        checkbox_array[k].parentElement.innerHTML=""
        console.log(re_render)
        $(parent_element).append(re_render)
        // checkbox_array[loop_check_box].classList.add("check_box_checked");
    }
}
}

user_data_collect=[]

// Search by skill pre-fix.
document.getElementById("search_by_skill").addEventListener("click", search_users_by_skill,false);


function search_users_by_skill(){
    table_to_add_rows=document.getElementById("populate_row_table")
    table_to_add_rows.innerHTML=''
    search_users_by_name_ajax()

}




function display_user_table(data){

    people_list=data
    table_row_HTML=""
    for (row in people_list){
        single_people=people_list[row]
        table_row_HTML+=`<tr name="`+ single_people['id']+`">
                        <td>`+ single_people['unofficial_name']+`</td>
                        <td>`+ single_people['official_name']+`</td>
                        <td>`+ single_people['inst_id']+`</td>
                        <td>`+ user_type(single_people['role'])+`</td>
                        <td><a href="userprofile/`+ single_people['id']+`"><span class="badge bg-success" style="padding: 3%;" ><i class=" fas fa-solid fa-eye"></i></span></a>
                        </td>
                        </tr>`

    }
    console.log(table_row_HTML)
    table_to_add_rows=document.getElementById("populate_row_table")
    table_to_add_rows.innerHTML+=table_row_HTML

    function user_type(type){

        if (type==2){
            return "Staff"
        }else if(type==3){
            return "Alumni"
        }else if(type==4){
            return "Student"
        }
    }

    }


// Javascript for skill count

document.getElementById("custom-content-above-profile-tab").addEventListener("click", fetch_skill_count,false);
skill_count_data=null

function fetch_skill_count(){
    fetch('/fetch_skill_count', {
        method: 'GET', // or 'PUT'
        headers: {
        "content-type": "application/json ;charset=utf-8",
        },
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        skill_count_data=data
        if(data["code"]==1){
            display_count(data)
            
        }
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
    }
    

function display_count(data){
    total_users=data['total_skills']

    $("#total_skills").html("Total skills in the system: "+total_users)
    table_HTML=''
    for (tuple in data['skill_wise']){
        table_HTML+=`
        <tr>
        <td>`+data['skill_wise'][tuple].skill_name+`</td>
        <td>`+data['skill_wise'][tuple].count+`</td>
        <td><span onclick=" fetch_user_related_to_skill(this.value)" value="`+data['skill_wise'][tuple].skill_id+`" class="badge bg-primary " style="padding: 3%;" data-toggle="modal" data-target="#modal-default"><i class="fas fa-edit"></i></span>
        </td>
        </tr>`

    }

    table_HTML=`<table class="table table-bordered">
    <thead>
        <tr>
        <th>Skill</th>
        <th>Number of skillful people</th>
        <th>See more</th>
        </tr>
    </thead><tbody>`+ table_HTML+`</tbody>
    </table>`

    $("#populate_skill_count_table").html(table_HTML)
}




