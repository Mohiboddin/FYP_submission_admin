from app import app
from flask import render_template, Response, redirect, request, session, jsonify, send_file
from app.user_backend import user_modal
from app.auth_backend.login_required import login_required


@app.route("/user")
@login_required
def users():
   
    print("returning users page")
    return render_template('user/user.html', username=session['username'], active='user')

@app.route("/download_csv")
@login_required
def download_csv():
    csv ="Note: (1). please don't modify the header of excel file.,,,\n(2). The User type should be an integer: Staff-2 | Alumni-3 | Student-4,,,\n(3). Start filling data from row number 5,,,\n name,email,institution_id,user_type \n"
    return Response(csv, mimetype="text/csv", headers={"Content-disposition": "attachment; filename=format.csv"})
    
@app.route("/users_add", methods=["POST"])
@login_required
def users_add():
    if request.method == "POST":
        json_data = request.get_json(force = True)
        print("printing the path to be add ",json_data)
        #locate the user
        added= user_modal.add_users_from_excel.delay(json_data)
       
        return {'msg': "users are being added", 'code': 1},200 # OK 
      

@app.route("/user_add", methods=["POST"])
@login_required
def user_add():
    if request.method == "POST":
        json_data = request.get_json(force = True)
        print("printing the path to be add ",json_data)
        #locate the user
        added= user_modal.add_user_from_excel(json_data)
        if added:
            return {'msg': "user added sccessfully", 'code': 1},200 # OK 
        else:
            return {'msg': 'something went wrong', 'code': 2}, 200 #OK

@app.route("/fetch_user_count", methods=["GET"])
@login_required
def fetch_user_count():
    print("printing the path to fetch_user_count ")
    #locate the user
    data= user_modal.fetch_user_count()
    if data:
        return data,200 # OK 
    else:
        return {'msg': 'something went wrong', 'code': 2}, 200 #OK

@app.route("/search_all_users", methods=["POST"])
@login_required
def search_all_users():
    if request.method == "POST":
        json_data = request.get_json(force = True)
        print("printing the search_all_users ",json_data['branches'])
        #locate the user
        data= user_modal.search_all_users(json_data)
        if data:
            return {'data': data, 'code': 1},200 # OK 
        else:
            return {'msg': 'something went wrong', 'code': 2}, 200 #OK

@app.route("/search_users_by_prefix", methods=["POST"])
@login_required
def search_users_by_prefix():
    if request.method == "POST":
        json_data = request.get_json(force = True)
        print("printing the search_users_by_prefix ",json_data['branches'])
        #locate the user
        data= user_modal.search_users_by_prefix(json_data)
        if data:
            return {'data': data, 'code': 1},200 # OK 
        else:
            return {'msg': 'something went wrong', 'code': 2}, 200 #OK


@app.route("/user_update", methods=["POST"])
@login_required
def user_update():
    if request.method == "POST":
        json_data = request.get_json(force = True)
        #locate the user
        id= user_modal.user_update(json_data)
        if id:
            return {'msg': "user updated", 'code': 1},200 # OK 
        else:
            return {'msg': 'something went wrong', 'code': 2}, 200 #OK

@app.route("/delete_user", methods=["POST"])
@login_required
def delete_user():
    if request.method == "POST":
        json_data = request.get_json(force = True)
        print("printing the search_all_users ",json_data['branches'])
        #locate the user
        id= user_modal.delete_user(json_data)
        if id:
            return {'msg': "user deleted", 'code': 1},200 # OK 
        else:
            return {'msg': 'something went wrong', 'code': 2}, 200 #OK

@app.route("/deactivate_user", methods=["POST"])
@login_required
def deactivate_user():
    if request.method == "POST":
        json_data = request.get_json(force = True)
        id= user_modal.deactivate_user(json_data)
        if id:
            return {'msg': "user deactivated", 'code': 1},200 # OK 
        else:
            return {'msg': 'something went wrong', 'code': 2}, 200 #OK

@app.route("/reactivate_user", methods=["POST"])
@login_required
def reactivate_user():
    if request.method == "POST":
        json_data = request.get_json(force = True)
        print("printing the search_all_users ",json_data['branches'])
        #locate the user
        id= user_modal.reactivate_user(json_data)
        if id:
            return {'msg': "user reactivaeted", 'code': 1},200 # OK 
        else:
            return {'msg': 'something went wrong', 'code': 2}, 200 #OK


#profile endpoints
@app.route("/userprofile/<id>", methods=["POST","GET"])
@login_required
def user_profile(id):
    data=user_modal.user_profile_info(id)
    print("returning user's profile page")    
    return render_template('user/profile.html', username=session['username'],data=data)
     
@app.route("/myprofile", methods=["GET"])
@login_required
def myprofile():
    email=session["email"]
    data=user_modal.my_profile_info(email)
    print("returning user's profile page")    
    return render_template('user/profile.html', username=session['username'],data=data)
     
