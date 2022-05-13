from app.db import connect_db, db_close
from datetime import datetime

def user_engagement_data():
    print('in modal to user_data engagement')
    con=connect_db()
    cur = con.cursor()
    fetched_data=cur.fetchall()
    engagement={
        "like": [],
        "post": [],
        "comment": []
    }
    payload = []
    content = {}
    for tupple in fetched_data:
        content = {"date": tupple[0], "count": tupple[1]}
        payload.append(content)
        content={}
    engagement["like"]=payload

    fetched_data=cur.fetchall()
    payload = []
    for tupple in fetched_data:
        content = {"date": tupple[0], "count": tupple[1]}
        payload.append(content)
        content={}
    engagement["post"]=payload

    fetched_data=cur.fetchall()
    payload = []
    for tupple in fetched_data:
        content = {"date": tupple[0], "count": tupple[1]}
        payload.append(content)
        content={}
    engagement["comment"]=payload
    
    db_close(cur,con)
    print(engagement)
    return engagement  


def admin_user_count_data():
    print('in modal tadmin_user_count_data')
    con=connect_db()
    cur = con.cursor()
    fetched_data=cur.fetchall()
    user_count_data={
        "staff": fetched_data[1][1],
        "alumni": fetched_data[2][1],
        "student": fetched_data[3][1],
        "total_users": fetched_data[1][1]+fetched_data[2][1]+ fetched_data[3][1]
    }

    db_close(cur,con)
    print(user_count_data)
    return user_count_data

def admin_user_live_data():
    print('in modal admin_user_live_data')
    con=connect_db()
    cur = con.cursor()
    fetched_data=cur.fetchall()
    user_count_data={
        "one": fetched_data[0][0],
        "two":fetched_data[1][0],
        "three":fetched_data[2][0],
        "four":fetched_data[3][0],
        "five":fetched_data[4][0],
        "six":fetched_data[5][0],
        "seven":fetched_data[6][0],
        "eight":fetched_data[7][0],
        "nine":fetched_data[8][0],
        "ten":fetched_data[9][0],
        "eleven":fetched_data[10][0],
        "twelve":fetched_data[11][0]
    }

    db_close(cur,con)
    print(user_count_data)
    return user_count_data    

def admin_user_live_data_single_interval():
    print('in modal admin_user_live_data_single_interval')
    con=connect_db()
    cur = con.cursor()
    fetched_data=cur.fetchall()
    user_count_data={
        "one": fetched_data[0][0],
    }

    db_close(cur,con)
    print(user_count_data)
    return user_count_data   

def top_community():
    print('in modal top_community')
    con=connect_db()
    cur = con.cursor()
    fetched_data=cur.fetchall()
    payload = []
    for tupple in fetched_data:
        content = {"name": tupple[0], "profile_photo": tupple[1], "about": tupple[2], "total_member": tupple[3], "community_id": tupple[4]}
        payload.append(content)
        content={}
    db_close(cur,con)
    print(payload)
    if(len(fetched_data)!=0):
        return payload
    else: 
        return None   
