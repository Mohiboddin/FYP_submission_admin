from app import app
from flask import render_template, Response, redirect, request, session, jsonify, send_file
from app.skill_backend import skill_model
from app.auth_backend.login_required import login_required


@app.route("/skilldata")
@login_required
def skilldata():
    print("returning skilldata page")
    return render_template('skills/skill_people.html', username=session['username'], active='skill_data')



@app.route("/search_users_by_skill", methods=["POST"])
@login_required
def search_users_by_skill():
    if request.method == "POST":
        json_data = request.get_json(force = True)
        print("printing the search_users_by_prefix ",json_data['branches'])
        #locate the user
        data= skill_model.search_users_by_skill_model(json_data)
        if data["code"]==1:
            return data,200 # OK 
        else:
            return data, 200 #OK


@app.route("/fetch_skill_count", methods=["GET"])
@login_required
def fetch_skill_count():
    data= skill_model.skill_count_on_campus_model()
    if data["code"]==1:
        return data,200 # OK 
    else:
        return data, 200 #OK
