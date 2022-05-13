from app import app
from flask import render_template, Response, redirect, request, session, jsonify, send_file
from app.usage import usage_model
from app.auth_backend.login_required import login_required


@app.route("/usage")
@login_required
def usage():
    print("returning usage page")
    usage_data=usage_model.usage_data_func()
    return render_template('usage/usage.html', username=session['username'], active='usage', usage_data=usage_data)



