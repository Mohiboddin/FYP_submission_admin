from app import app
from flask import render_template, redirect, request, session, jsonify, make_response, url_for
from app.auth_backend import authentication_modal
import random

@app.route("/login", methods=["POST", "GET"])
def login():

    if request.method == "POST":
        json_data = request.get_json(force = True)
        print("printing json data", json_data)
        email = json_data['email']
        password = json_data['password']
        if(email!="" and password!=""):
            #locate the user
            username= authentication_modal.verify_user(email, password)
            # set the session
            if(username!=""):
                session["email"]=email
                session["username"] = username
                session["logged_in"]=True
                print(username)
                return {'msg': 'Successfully Loged in', 'code': 1},200 # OK
            else:
                return {'messsage':'Invalid Username Or password', 'code': 2}, 200 # user not found
            

    print("returning Login page")
    return render_template('authentication/login.html')

@app.route("/logout")
def logout():
    session.pop('logged_in',None)
    session.pop('username',None)
    session.pop('email',None)
    return redirect(url_for('login'))


@app.route("/forgotpassword", methods=["POST", "GET"])
def forgot_password():

    if request.method == "POST":
        json_data = request.get_json(force = True)
        email = json_data['email']
        #locate the user
        username= authentication_modal.verify_email(email)
        # set the session
        if(username!=""):
            #Send Email
            already_otp= authentication_modal.otp_exist(email)
            if already_otp!="":
                return {'messsage':'OTP already exist', 'otp': already_otp, 'code':4}, 200
            value = random.randint(1001,9999)
            #sending otp with email.
            email_sent=authentication_modal.send_mail(email,value)
            if email_sent:
                print("Email Sended", value)
                authentication_modal.otp(email,value)
                return {'messsage':'Enter the OTP', 'otp': value, 'code':1}, 200 # user not found
            else:
                return {'messsage':'Something went wrong in server', 'code': 3}, 200   
            
        return {'messsage':'user dosent exist', 'code': 2}, 200
   
    print("returning forgot Password page")
    return render_template('authentication/forgot_password.html')


@app.route("/otpverify", methods=["POST"])
def verify_otp():
    if request.method == "POST":
        json_data = request.get_json(force = True)
        email = json_data['email']
        otp = json_data['otp']

        validate= authentication_modal.verify_otp(email, otp)
        if(validate):
            #store new password
            session["email"] = email
            return {'messsage':'proceed for change password', 'code': 1}, 200
        else:
            return {'messsage':'wrong OTP Or the 2 min time limit Exceed', 'code': 2}, 200


@app.route("/recovery", methods=["POST","GET"])
def recovery():
    if request.method == "POST":
        json_data = request.get_json(force = True)

        if'email' not in session:
            return {'messsage':'Invalid request-no session', 'code': 2}, 200
        
        email = session["email"]
        confirm_password = json_data['confirm_password']
        password = json_data['password']

        # validate= authentication_modal.verify_otp_expired(email)
        session.pop('email',None)
        update=authentication_modal.update_password(email,password)

        return {'messsage':'Password Updated', 'code': 1}, 200
        # if(validate):
        #     #store new password
        #     update=authentication_modal.update_password(email,password)

        #     return {'messsage':'Password Updated', 'code': 1}, 200
        # else:
        #     return {'messsage':'Your OTP expired', 'code': 2}, 200

    print("returning recovery page")
    return render_template('authentication/recov_password.html')
