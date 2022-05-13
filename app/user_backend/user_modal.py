import time
from app import mail , celery
from app.db import connect_db, db_close
import random
from flask import json
from uuid import uuid4
from flask_mail import Mail, Message
import bcrypt



#celery task to send the mail.
@celery.task()
def add_users_from_excel(json_data):
    print('in modal users_add')
    print(type(json_data))
    con=connect_db()
    cur = con.cursor()
    fetched_data=cur.fetchone()
    for row in json_data:
        print(type(row), row, row['name'])
        name=row['name']
        email=row['email']
        inst_id=row['inst_id']
        user_type=row['user_type']
        password = random.randint(100001,999999)
        if name!='' and email!='' and inst_id!='' and user_type!='':
            #calling the mail function
            if send_mail(email,password):
                hashed_password=password_hashing(password)  
        else:
            return False

    db_close(cur,con)
    return

@celery.task()
def try_bulk_import():
    time.sleep(5)
    print('we were sleeping')
    return



def add_user_from_excel(json_data):
    print('in modal add_user_from_excel')
    print(type(json_data))
    name=json_data['user_name']
    email=json_data['email_id']
    inst_id=json_data['inst_id']
    user_type=json_data['user_type']
    con=connect_db()
    cur = con.cursor()  

    fetched_data=cur.fetchone()
    password = random.randint(100001,999999)
    if name!='' and email!='' and inst_id!='' and user_type!='':
        if send_mail(email,password):
            hashed_password=password_hashing(password)      
    else:
        return False
    db_close(cur,con)
    return True


def send_mail(email, password):
    try:
        print('sending email')
        body_text= f'You have been added to the app, Download the app from play store and onboard using the this email and  password as {password}'
        msg=Message('Invitation to join the revolution', sender='utorrentdata1@gmail.com', recipients=[email])
        msg.body= body_text
        mail.send(msg)
        return True
    except: return False



def password_hashing(token):
    SECRET_KEY='$2b$12$ag3g.9K9b.8S8n6a6SMGBO'
    token=str(token)
    hashed_token = (bcrypt.hashpw(token.encode('utf-8'), SECRET_KEY.encode('utf-8'))).decode('utf-8')
    print(f'Token : {token} & Hashed Token : {hashed_token}')
    if hashed_token:
        return hashed_token
    else:
        return None



def fetch_user_count():
    print('in modal fetch_user_count')
    con=connect_db()
    cur = con.cursor()  
    onboarded=cur.fetchall()
    added=cur.fetchall()    
    db_close(cur,con)
    if onboarded and added:
        return {"added": added, "onboarded":onboarded, "code": 1}
    else:
        return  None


def search_all_users(json_data):
    print('in modal fetch_user_count')
    con=connect_db()
    cur = con.cursor()
    from_date = json_data['from_date'] if json_data['from_date']!="" else "now()"
    branches=json_data["branches"]
    # make  x any syntax
    or_count=len(branches)-1
    str=''
    for a in branches:
        str=str+ " "+a+ " =any(belongs_to) "
        if (or_count>0):
            or_count=or_count-1
            str=str+" or "
    print(str)
    people=cur.fetchall()
    db_close(cur,con)
    if people:
        return {"people": people, "code": 1}
    else:
        return  None


def search_users_by_prefix(json_data):
    print('in modal fetch_user_count')
    con=connect_db()
    cur = con.cursor()
    from_date = json_data['from_date'] if json_data['from_date']!="" else "now()"
    branches=json_data["branches"]
    prefix=json_data["search_prefix"]
    # make  x any syntax
    or_count=len(branches)-1
    str=''
    for a in branches:
        str=str+ " "+a+ " =any(belongs_to) "
        if (or_count>0):
            or_count=or_count-1
            str=str+" or "
    print(str)
    
    people=cur.fetchall()
    db_close(cur,con)
    if people:
        return {"people": people, "code": 1}
    else:
        return  None


def user_update(json_data):
    print('in modal user_update')
    con=connect_db()
    cur = con.cursor()
    uuid=json_data['uuid']
    official_name= json_data['official_name']
    email_id= json_data['email_id']
    inst_id= json_data['inst_id']
    user_type=  json_data['user_type']
    returned_id=None
    if uuid!='' and official_name!='' and email_id!='' and inst_id!='' and user_type!='':
        returned_id=cur.fetchone()
    db_close(cur,con)
    if returned_id:
        return True
    else:
        return  False

def deactivate_user(json_data):
    print('in modal deactivate_user')
    con=connect_db()
    cur = con.cursor()
    uuid=json_data['uuid']
    if uuid!='':
        id=cur.fetchone()
    db_close(cur,con)
    if id:
        return True
    else:
        return  False

def reactivate_user(json_data):
    print('in modal reactivate_user')
    con=connect_db()
    cur = con.cursor()
    uuid=json_data['uuid']
    if uuid!='':
    db_close(cur,con)
    if id:
        return True
    else:
        return  False

def delete_user(json_data):
    print('in modal delete_user')
    con=connect_db()
    cur = con.cursor()
    uuid=json_data['uuid']
    if uuid!='':
    db_close(cur,con)
    if id:
        return True
    else:
        return  False

def user_profile_info(id):
    con=connect_db()
    cur=con.cursor()

    #user's general info
    tuple=cur.fetchone()
    data={
        "id":tuple[0], "official_name":tuple[1], "unofficial_name":tuple[2], "phone":tuple[3], "role":tuple[4], "belongs_to":tuple[5], "created_at":tuple[6], "email":tuple[7], "inst_id":tuple[8], "last_login":tuple[9],  "photo_url":tuple[10], "title":tuple[11], "description": tuple[12]
    }
    
    #skills of the user    
    skill_collection=cur.fetchall()
    payload=[]
    for tuple2 in skill_collection:
        payload.append(tuple2[0])
    data["skills"]= payload 

    #departments of user
    department=cur.fetchall()
    payload=[]
    for tuple2 in department:
        payload.append(tuple2[0])
    data["departments"]= payload 
    
    #community to which user belong
    communities=cur.fetchall()
    payload=[]
    for tuple2 in communities:
        payload.append({ "id":tuple2[0], "name":tuple2[1], "profile_photo":tuple2[2] })
    data["communities"]= payload 
    
    #user's connection
    connections=cur.fetchall()
    payload=[]
    for tuple2 in connections:
        payload.append({ "id": tuple2[0],"unofficial_name": tuple2[1], "title": tuple2[2], "photo_url": tuple2[3], "role": tuple2[4] })
    data["connections"]= payload 
    db_close(cur,con)
    print(data)    
    return data
    
def my_profile_info(email):
    con=connect_db()
    cur=con.cursor()
    id=cur.fetchone()
    #user's general info
    tuple=cur.fetchone()
    data={
        "id":tuple[0], "official_name":tuple[1], "unofficial_name":tuple[2], "phone":tuple[3], "role":tuple[4], "belongs_to":tuple[5], "created_at":tuple[6], "email":tuple[7], "inst_id":tuple[8], "last_login":tuple[9],  "photo_url":tuple[10], "title":tuple[11], "description": tuple[12]
    }
    
    #skills of the user    
    skill_collection=cur.fetchall()
    payload=[]
    for tuple2 in skill_collection:
        payload.append(tuple2[0])
    data["skills"]= payload 

    #departments of user
    department=cur.fetchall()
    payload=[]
    for tuple2 in department:
        payload.append(tuple2[0])
    data["departments"]= payload 
    
    #community to which user belong
    communities=cur.fetchall()
    payload=[]
    for tuple2 in communities:
        payload.append({ "id":tuple2[0], "name":tuple2[1], "profile_photo":tuple2[2] })
    data["communities"]= payload 
    
    #user's connection
    connections=cur.fetchall()
    payload=[]
    for tuple2 in connections:
        payload.append({ "id": tuple2[0],"unofficial_name": tuple2[1], "title": tuple2[2], "photo_url": tuple2[3], "role": tuple2[4] })
    data["connections"]= payload 
    db_close(cur,con)
    print(data)    
    return data