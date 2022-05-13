from app import app
from flask import render_template, redirect, request, session, jsonify, make_response
from app.auth_backend.login_required import login_required
from app.authority_backend import authority_modal


#admin decorator required
@app.route("/authority", methods=["POST", "GET"])
@login_required
def authority(): 
    if request.method == "POST":
            data= authority_modal.get_hierarchy()
            if(data):
                print(data)
                return {'data': data, 'code': 1},200 # OK             
            else:
                return {'msg': 'No data', 'code': 2},200 # OK  
    print(session['username'])

    print("returning authority page")
    return render_template('authority/authority.html', username=session['username'], active='authority')


@app.route("/authority_add_parent", methods=["POST"])
@login_required
def authority_add_parent(): 
    if request.method == "POST":
        json_data = request.get_json(force = True)
        path = json_data['path']
        print("printing the path to be add ",path)
        #locate the user
        id= authority_modal.add_path_return_id(path)
        if id:
            return {'id': id, 'code': 1},200 # OK 
        else:
            return {'msg': 'err', 'code': 2}, 200 #OK


@app.route("/authority_add_child", methods=["POST"])
@login_required
def authority_add_child(): 
    if request.method == "POST":
        json_data = request.get_json(force = True)
        path = json_data['path']
        print("printing the path to be add ",path)
        #locate the user
        id= authority_modal.add_path_return_id_child(path)
        if id:
            return {'id': id, 'code': 1},200 # OK 
        else:
            return {'msg': 'err', 'code': 2}, 200 #OK

@app.route("/authority_update_node_name", methods=["POST"])
@login_required
def authority_update_node_name(): 
    if request.method == "POST":
        json_data = request.get_json(force = True)
        update_node_id = json_data['update_node_id']
        new_path = json_data['new_path']
        path = json_data['path']
        length = json_data['length']
        
        print("printing the path to be add ",update_node_id)
        #locate the user
        authority_modal.update_node_name(path,new_path, length)
        return {'msg': "node name updated", 'code': 1},200 # OK 
        # if updated:
            
        # else:
        #     return {'msg': "node name not updated", 'code': 2}, 200 #OK

@app.route("/authority_delete_node", methods=["POST"])
@login_required
def authority_delete_node(): 
    if request.method == "POST":
        json_data = request.get_json(force = True)
        id = json_data['id']
        path = json_data['path']
        length = json_data['length']
        print("printing the path to be add ",id)
        #locate the user
        node_deleted=authority_modal.authority_delete_node(id, path, length)
        if node_deleted:
            return {'msg': "deleted", 'code': 1},200 # OK 
        else:
            return {'msg': "cannot delete", 'code': 2}, 200 #OK