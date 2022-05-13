from app import app
from flask import render_template, Response, redirect, request, session, jsonify, send_file
from app.network_backend import network_model
from app.auth_backend.login_required import login_required


@app.route("/network")
@login_required
def network():
    print("returning network page")
    return render_template('network/network.html', username=session['username'], active='network_data')


@app.route("/connection_date_wise")
@login_required
def connection_date_wise():
    data= network_model.connection_date_wise_model()
    if data:
        return {"data": data, "code":1},200 
    else:
        return {"msg": "Data Not found", "code":2},200 




