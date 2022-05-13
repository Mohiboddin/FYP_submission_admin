# from unicodedata import name
from app import app, mail , celery
from flask import render_template, request
from app.db import connect_db, db_close
from flask_mail import Mail, Message

# from app import 




@app.route("/")
def show_page():
   
    print("returning home show page")
    return render_template('display/show_page.html')




@app.route("/enter_user", methods=["POST"])
def enter_user():
   
    print("returning enter_user page")
    if request.method == "POST":
        json_data = request.get_json(force = True)
        id = json_data['id']
      
        con=connect_db()
        cur = con.cursor()
        sql= "INSERT INTO public.user_live (id, user_id, created_at) VALUES (%s, 'bdcbd475-5e63-42aa-953c-0052f9949dab', now());"
        cur.execute(sql,(id,))
        db_close(cur,con)
        print("Added user")
     
    return {'messsage':'User added', 'code': 1}, 200


@app.route("/exit_user", methods=["POST"])
def exit_user():
   
    print("returning exit_user page")
    if request.method == "POST":
        json_data = request.get_json(force = True)
        id = json_data['id']

        con=connect_db()
        cur = con.cursor()
        sql= "UPDATE public.user_live SET updated_at=now() WHERE id=%s;"
        cur.execute(sql,(id,))
        db_close(cur,con)
        print("user exit ")
     
    return {'messsage':'user exited', 'code': 1}, 200

