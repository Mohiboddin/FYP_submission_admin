$(window).scroll(function() {
    if($(window).scrollTop() == $(document).height() - $(window).height()) {
           console.log("Hello")

           if(turn==1){
                search_all_users()
           }
           else if(turn==2){
               search_users_by_name()
           }
    }
});




// validate email id 
function validate_email_id(mail) 
{
    console.log("in validate_email_id")
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
  $(document).Toasts('create', {
    class: 'bg-warning',
    title: 'Warning',
    body: 'Email format is incorrect, correct email is example@gmail.com'
  })
    return (false)
}

// username validate 
function validate_user_name(user_name) 
{
    console.log("in validate_user_name")
 if (/^[a-zA-Z0-9]+$/.test(user_name))
  {
    return (true)
  }
  $(document).Toasts('create', {
    class: 'bg-warning',
    title: 'Warning',
    body: 'Username format is incorrect, only alphabets and numbers are required'
  })
    return (false)
}

// Inst id validate 
function validate_inst_id(inst_id) 
{
    console.log("in validate_inst_id")
 if (/^[a-zA-Z0-9]+$/.test(inst_id))
  {
    return (true)
  }
  $(document).Toasts('create', {
    class: 'bg-warning',
    title: 'Warning',
    body: 'Institute Id format is incorrect, only alphabets and numbers are required'
  })
    return (false)
}





function upload_data(){

        var lines = content_excel.split("\n");
        
        row={}
        for (var i=4; i<lines.length; i++){
            data=lines[i].split(",")
            console.log(data)
            output.push({
                name: data[0],
                email: data[1],
                inst_id: data[2],
                user_type: data[3]
            });
            console.log(output)
            
        }
        
        console.log(output);
// send the excel file data to server in the form of JSON
fetch('/users_add', {
    method: 'POST', // or 'PUT'
    headers: {
    "content-type": "application/json ;charset=utf-8",
    },
    body: JSON.stringify(output)
    })
    .then(response => response.json())
    .then(data => {
    console.log('Success:', data);
    if(data["code"]==1){
        
        $(document).Toasts('create', {
            class: 'bg-success',
            title: 'Data Uploaded',
            body: 'Data from excel sheet is uploaded to server successfully.'
            })
        
    }
    else if(data["code"]==2) {
        $(document).Toasts('create', {
            class: 'bg-warning',
            title: 'Warning',
            body: 'Something went wrong with the data you uploaded, try reuploading in compatible format.'
            })
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


document.getElementById("custom-content-above-profile-tab").addEventListener("click", fetch_user_count,false);

function fetch_user_count(){
fetch('/fetch_user_count', {
    method: 'GET', // or 'PUT'
    headers: {
    "content-type": "application/json ;charset=utf-8",
    },
    })
    .then(response => response.json())
    .then(data => {
    console.log('Success:', data);
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




document.getElementById("custom-content-above-messages-tab").addEventListener("click", hierarchy_data_func,false);

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



async function hierarchy_display(data){
    for (node in data){
        
        if((data[node].level)==1){
            console.log("About to call 1st await")
            add_node=$("#populate_hierarchy")
           await create_parent(data,node, add_node)
        }
        else{
             var parent_rendering
            for (node2 in data){
                if (data[node2].path==data[node].ancestors){
                    parent_rendering=$('[name="'+data[node2].id+'"]').parent()
                    break
                    }
                }
                console.log("About to call 2nd await")
                console.log(parent_rendering)
                await create_child(data, node, parent_rendering)
        
    }
}
}

function create_parent(data, node, add_node){

    return new Promise(resolve=>{ 

    node_name =data[node].name
    console.log(node_name);
    // add_node=$("#populate_hierarchy").html()
    $(add_node).html(`<li><div name="`+data[node].id+`" class="row"><p style="padding-right: 20px;">`+node_name +`</p>
    <input class="mt-1 check_box_my_class" type="checkbox" checked=""></div></li>`);
    console.log(add_node)
    resolve ()
      });
}

function create_child(data, node, parent_rendering){

    return new Promise(resolve=>{

    node_name =data[node].name
    console.log(node_name)
    var x = '';
    x += `<li><div name="`+data[node].id+`" class="row"><p style="padding-right: 20px;">`+node_name+`</p>
    <input class="mt-1 check_box_my_class" type="checkbox" checked=""></div></li>`;
    console.log(x);
    console.log($(parent_rendering).html() )

    parent_rendering.append(`<ul>`+x+`</ul>`);

    resolve('resolved');
   
})
}

backend = document.getElementById('populate_hierarchy')

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





user_data_collect=[]
from_date=null
turn=null

document.getElementById("search_all_users_button").addEventListener("click", search_all_users_first_time,false);
document.getElementById("search_by_name").addEventListener("click", search_users_by_name_first_time,false);


function search_all_users_first_time(){
    table_to_add_rows=document.getElementById("populate_row_table")
    table_to_add_rows.innerHTML=''
    from_date=""
    search_all_users()

}

function search_users_by_name_first_time(){
    table_to_add_rows=document.getElementById("populate_row_table")
    table_to_add_rows.innerHTML=''
    from_date=""
    search_users_by_name()

}

function search_users_by_name()
{
    search_prefix=document.getElementById("search_by_name_value").value

    if(search_prefix==''){
        $(document).Toasts('create', {
            class: 'bg-warning',
            title: 'Warning',
            body: 'Nothing to search'
            })
            return
    }

    data={
        "branches":[], 
        "from_date": from_date,
        "search_prefix": search_prefix
        }
    checked_branches=document.querySelectorAll('[checked]');
    for (var k = 0; k < checked_branches.length; k++){
        branch_no= checked_branches[k].parentElement.getAttribute('name');
        data.branches.push(branch_no)
    }
    if (data.branches.length!=0 ){

        fetch('/search_users_by_prefix', {
            method: 'POST', // or 'PUT'
            headers: {
            "content-type": "application/json ;charset=utf-8",
            },
            body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data_of_people => {
            console.log('Success:', data_of_people);
            if(data_of_people["code"]==1){
                
            display_user_table(data_of_people["data"])
            people_array=data_of_people["data"]
            from_date=people_array.people[people_array.people.length-1][8]
            
            turn=2
            console.log(from_date, turn)    
            }
            else if(data_of_people["code"]==2) {
                $(document).Toasts('create', {
                    class: 'bg-warning',
                    title: 'Warning',
                    body: 'Data Finished.'
                    })
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
    else{
        $(document).Toasts('create', {
            class: 'bg-warning',
            title: 'Warning',
            body: 'Select branches'
            })
    }
}




function search_all_users(){
    // collecting all the data : like-branch ID

    document.getElementById("search_by_name_value").value=''

    data={
        "branches":[], 
        "from_date": from_date
        }
    checked_branches=document.querySelectorAll('[checked]');
    for (var k = 0; k < checked_branches.length; k++){
        branch_no= checked_branches[k].parentElement.getAttribute('name');
        data.branches.push(branch_no)
    }
    fetch('/search_all_users', {
        method: 'POST', // or 'PUT'
        headers: {
        "content-type": "application/json ;charset=utf-8",
        },
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data_of_people => {
        console.log('Success:', data_of_people);
        if(data_of_people["code"]==1){
            
        display_user_table(data_of_people["data"])
        people_array=data_of_people["data"]
        from_date=people_array.people[people_array.people.length-1][8]
        turn=1
        console.log(from_date, turn)
            
        }
        else if(data_of_people["code"]==2) {
            $(document).Toasts('create', {
                class: 'bg-warning',
                title: 'Warning',
                body: 'Data Finished.'
                })
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

        // next_time_call="search_all_users"
    
}

function display_user_table(data){

    people_list=data['people']
    user_data_collect=user_data_collect.concat(people_list)
    table_row_HTML=""
    for (row in people_list){
        single_people=people_list[row]
        table_row_HTML+=`<tr name="`+ single_people[0]+`">
                        <td>`+ single_people[1]+`</td>
                        <td>`+ single_people[2]+`</td>
                        <td>`+ single_people[3]+`</td>
                        <td>`+ user_type(single_people[5])+`</td>
                        <td>`+ onboarded(single_people[6])+`</td>
                        <td><a href="userprofile/`+ single_people[0]+`"><span  class="badge bg-success" style="padding: 3%;" ><i class=" fas fa-solid fa-eye"></i></span></a>
                        <span onclick="modal_update_user_info(this)" class="badge bg-primary " style="padding: 3%;" data-toggle="modal" data-target="#modal-default"><i class="fas fa-edit"></i></span>
                        <span class="badge bg-danger dropdown-toggle " style="padding: 3%; cursor: pointer;" data-toggle="dropdown"><i class="fas fa-ellipsis-h"></i></span>
                        <div class="dropdown-menu">
                            <a onclick="modal_del_deact_user(this)" class="dropdown-item" data-toggle="modal" data-target="#modal-sm">Deactivate</a>
                            <a onclick="modal_del_deact_user(this)" class="dropdown-item" data-toggle="modal" data-target="#modal-sm-2">Delete Account</a>
                        </div>
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
        function onboarded(last_login){
            if(last_login!=null){
                return `<span class="badge bg-success">Yes</span>`
            }
            else{
                return `<span class="badge bg-danger">No</span>`
            }
        }
    }


    var event_info=null

// Update User Info 

catch_uuid=null
function modal_update_user_info(e){
    console.log(e)
    catch_for_update=e;
    uuid=catch_for_update.parentElement.parentElement.getAttribute(["name"])
    catch_uuid=uuid
    console.log(uuid)

    for (row in user_data_collect){
        single_people=user_data_collect[row]
        console.log(row, single_people)

        if (single_people[0]==uuid){
            $("#user_name_update").val(single_people[1])
            $("#email_id_update").val(single_people[7])
            $("#roll_no_update").val(single_people[3])
            $("#user_type_update").val(single_people[5])
            break
        }
    }
  
}
    
document.getElementById("save_update_user").addEventListener("click", update_user_info,false);
function update_user_info(){
    data={}
    data['uuid']=catch_uuid
    data['official_name']=$("#user_name_update").val()
    data['email_id']=$("#email_id_update").val()
    data['inst_id']=$("#roll_no_update").val()
    data['user_type']=$("#user_type_update").val()

    console.log(data)

    // send the excel file data to server in the form of JSON
    fetch('/user_update', {
        method: 'POST', // or 'PUT'
        headers: {
        "content-type": "application/json ;charset=utf-8",
        },
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        if(data["code"]==1){
            
            $(document).Toasts('create', {
                class: 'bg-success',
                title: 'Data Uploaded',
                body: 'User updated successfully.'
                })
            
        }
        else if(data["code"]==2) {
            $(document).Toasts('create', {
                class: 'bg-warning',
                title: 'Warning',
                body: 'Something went wrong with the data you updated.'
                })
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


