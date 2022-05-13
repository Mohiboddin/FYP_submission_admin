
var hierarchy_data=[
    {
        "ancestors": "",
        "id": 34,
        "level": 1,
        "name": "AIKTC",
        "path": "AIKTC"
    },
    {
        "ancestors": "AIKTC",
        "id": 3,
        "level": 2,
        "name": "Pharmacy",
        "path": "AIKTC.Pharmacy"
    },
    {
        "ancestors": "AIKTC",
        "id": 4,
        "level": 2,
        "name": "Architecture",
        "path": "AIKTC.Architecture"
    },
    {
        "ancestors": "AIKTC",
        "id": 2,
        "level": 2,
        "name": "Engineering",
        "path": "AIKTC.Engineering"
    },
    {
        "ancestors": "AIKTC.Engineering",
        "id": 6,
        "level": 3,
        "name": "Mechanical",
        "path": "AIKTC.Engineering.Mechanical"
    }
]
$(function () {

    //  fetching user hierarchy data
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


})

function create_parent(data, node){

    return new Promise(resolve=>{ 

    node_name =data[node].name
    console.log(node_name);
    add_node.innerHTML += `<li><div name="`+data[node].id+`" class="row"><p style="padding-right: 20px;">`+node_name +`</p>
    <button type="button" class="createChild btn btn-primary" style="">Child</button>
    <button type="button" class="editIT btn btn-warning">Edit</button></div></li>`;
    resolve ()
      });

    
}

function create_child(data, node, parent_rendering){

    return new Promise(resolve=>{

    node_name =data[node].name
    console.log(node_name)
    var x = '';
    x += `<li><div name="`+data[node].id+`" class="row"><p style="padding-right: 20px;">`+node_name+`</p>
    <button type="button" class="createChild btn btn-primary" style="">Child</button>
    <button type="button" class="closeIT btn btn-danger">Del</button>
    <button type="button" class="editIT btn btn-warning">Edit</button></div></li>`;
    console.log(x);
    console.log($(parent_rendering).html() )

    parent_rendering.append(`<ul>`+x+`</ul>`);

    resolve('resolved');
   
});



}

async function hierarchy_display(data){
    for (node in data){
        
        if((data[node].level)==1){
            console.log("About to call 1st await")
           await create_parent(data,node)
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

function remove_button_and_add_parent_node(x){
    $('#parent_node_creator').toggle();
    node_name = $('#node_name').val();
    data={
        "path": node_name
    }
    console.log(data)



    // add parent to database
    fetch('/authority_add_parent', {
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
            hierarchy_data.push({ "ancestors": "", "id": data["id"] ,  "level": 1, "name": node_name , "path": node_name })
            add_node.innerHTML += `<li><div name="`+data["id"] +`"  class="row"><p style="padding-right: 20px;">`+node_name +`</p>
            <button type="button" class="createChild btn btn-primary" style="">Child</button>
            <button type="button" class="editIT btn btn-warning">Edit</button></div></li>`;
            $('#modal_function').removeAttr("onclick");
            node_name='';
            $('#node_name').val("");
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


function add_child_modal(){
    $('#modal_heading').html("Create Child Node");
    $('#modal_message').html("Child Node Name");
    $('#modal-default').modal('show');
    $("#modal_function").attr("onclick","render_child()");
    $('#modal-body').html(`<input class="form-control" id="node_name" type="text" placeholder="Eg: AIKTC">`)
    
}
function render_child(){
    
    node_name = $('#node_name').val()
    console.log(node_name)
    for (node2 in hierarchy_data){
        if (hierarchy_data[node2].id==ancestor_id){
            ancestor_path=hierarchy_data[node2].path
            parent_rendering=$('[name="'+hierarchy_data[node2].id+'"]').parent()
            break
            }
        }
       
        // add child to database
        node_name=node_name.split(' ').join('_')
        node_path=ancestor_path+'.'+node_name

        data={
            "path": node_path
        }
        console.log(data)
    

    fetch('/authority_add_child', {
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
            hierarchy_data.push({ "ancestors": ancestor_path, "id": data["id"] ,  "level": 1, "name": node_name , "path": node_path })
            var x = '';
            x += `<li><div name="`+data["id"]+`" class="row"><p style="padding-right: 20px;">`+node_name.split('_').join(' ')+`</p>
            <button type="button" class="createChild btn btn-primary" style="">Child</button>
            <button type="button" class="closeIT btn btn-danger">Del</button>
            <button type="button" class="editIT btn btn-warning">Edit</button></div></li>`;
            console.log(x);
            console.log($(parent_rendering).html() )

            parent_rendering.append(`<ul>`+x+`</ul>`);
            node_name="";

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

    $('#modal_function').removeAttr("onclick");
    $('#node_name').val("");
}


var catch_for_delete
function remove_node_modal(catch_for_delete){
    name_of_node=$(catch_for_delete).siblings('p').html()
    $('#modal_heading').html("Delete Node");
    $('#modal_message').html("Are you Sure you Want to delete "+name_of_node+" Node? \n Every Sub-nodes Linked to it will also be deleted and the users linked to this node will be shifted to the parent node");
    $('#modal-body').empty();
    $('#modal-default').modal('show');
    $("#modal_function").attr("onclick","delete_node()");

}

function delete_node(){
    delete_node_id=$(catch_for_delete.parentElement).attr("name")
    path_to_node=null
    hierarchy_node_index=null
    for (node2 in hierarchy_data){
        if (hierarchy_data[node2].id==delete_node_id){
            path_to_node=hierarchy_data[node2].path
            hierarchy_node_index=node2
            break
            }
        }
    data={
        "id": delete_node_id,
        "path": path_to_node,
        "length": hierarchy_data[hierarchy_node_index].path.split('.').length
    }
    console.log(data)

    
    fetch('/authority_delete_node', {
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
            for (node2 in hierarchy_data){
                if (hierarchy_data[node2].id==delete_node_id){
                    hierarchy_data.pop(hierarchy_data[node2])
                    break
                    }
                }
            catch_for_delete.parentElement.parentElement.remove();
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
    $('#modal-body').html(`<input class="form-control" id="node_name" type="text" placeholder="Eg: AIKTC">`)
}

function edit_node_model(){
    $('#modal_heading').html("Edit Node");
    $('#modal_message').html("Change the name");
    $('#modal-default').modal('show');
    $("#modal_function").attr("onclick","rerender_name()");
    $('#modal-body').html(`<input class="form-control" id="node_name" type="text" placeholder="Eg: AIKTC">`)
}

function rerender_name(){
    
    node_name = $('#node_name').val()
    node_name=node_name.split(' ').join('_')
    update_node_id=node_id
    new_path=null
    hierarchy_node_index=null
    for (node2 in hierarchy_data){
        if (hierarchy_data[node2].id==node_id){
            path_to_node=hierarchy_data[node2].path
            new_path=hierarchy_data[node2].path.split('.')
            new_path[new_path.length-1]=node_name
            hierarchy_node_index=node2
            break
            }
        }
  
        console.log(node_name,update_node_id)

       
        // add child to database
        
        data={
            "update_node_id": update_node_id,
            "new_path": new_path.join('.'),
            "path": hierarchy_data[hierarchy_node_index].path,
            "length": (hierarchy_data[hierarchy_node_index].path.split('.').length)
        }
        console.log(data)
    

    fetch('/authority_update_node_name', {
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
            hierarchy_data[hierarchy_node_index].name=node_name      
            li.children[0].innerText=node_name ;
            node_name="";

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
    $('#modal_function').removeAttr("onclick");
    $('#node_name').val("");
}

backend = document.getElementById('add_node')

backend.addEventListener('click', function(e) {
    console.log("arre function run hoo")
    if (e.target.classList.contains('closeIT')) {
        console.log("cross clicked")
        catch_for_delete=e.target;
        remove_node_modal(catch_for_delete);
    }

    if (e.target.classList.contains('createChild')) {
        createChildBTN = e.target;
        li = createChildBTN.parentElement.parentElement;
        ancestor_id=$(li).children(":first").attr("name");
        console.log(ancestor_id)
        add_child_modal()
    }

    if (e.target.classList.contains('editIT')) {
        createChildBTN = e.target;
        li = createChildBTN.parentElement;
        node_id=$(li).attr("name");
        edit_node_model()
    
    }
})



// If required
// `<li><div  class="row"><p style="padding-right: 20px;">XYZ</p>
//     <button type="button" class="createChild btn btn-primary" style=""><i class="fas fa-regular fa-pen" aria-hidden="true">
//     </i></button><button type="button" class="closeIT btn btn-danger"><i class="fas fa-solid fa-ban"></i>
//     </button></div>
//     </li>`
