from app import app
from flask import render_template, redirect, request, session, jsonify, make_response
from app.auth_backend.login_required import login_required
from app.dashboard_backend import dashboard_modal

@app.route("/admin")
@login_required
def home_page(): 
    print(session['username'])
    data= dashboard_modal.top_community()
    print("returning home page")
    return render_template('dashboard/index.html', username=session['username'], active='dashboard', data=data)

@app.route("/admin_engagement")
@login_required
def admin_engagement():
    data= dashboard_modal.user_engagement_data()
    print("returning engegement data")
    return {"data": data, "code": 1}, 200 # OK 

@app.route("/admin_user_count")
@login_required
def admin_user_count():
    data= dashboard_modal.admin_user_count_data()
    print("returning admin_user_count data")
    return {"data": data, "code": 1}, 200 # OK 


@app.route("/admin_user_live")
@login_required
def admin_user_live():
    data= dashboard_modal.admin_user_live_data()
    print("returning admin_user_live_data")
    return {"data": data, "code": 1}, 200 # OK 

@app.route("/admin_user_live_single_interval")
@login_required
def admin_user_live_single_interval():
    data= dashboard_modal.admin_user_live_data_single_interval()
    print("returning admin_user_live_data")
    return {"data": data, "code": 1}, 200 # OK 

