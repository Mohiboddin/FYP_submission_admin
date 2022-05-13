from app import mail
from app.db import connect_db, db_close
from datetime import datetime
from flask_mail import Mail, Message
import bcrypt




def verify_user(email, password):
    print('in modal to find user',email, 'and',password)
    con=connect_db()
    cur = con.cursor()
    password_from_db=cur.fetchone()
    user_name=password_from_db[0]
    password_from_db=password_from_db[1]
    db_close(cur,con)
    if bcrypt.checkpw(password.encode('utf-8'), password_from_db.encode('utf-8')):
        print("Signin Ends", email )
        return user_name
    return ""  

# def verify_user(email, password):
#     print('in modal to find user',email, 'and',password)
#     con=connect_db()
#     cur = con.cursor()
#     hashed_password=password_hashing(password)
#     user=cur.fetchone()
#     db_close(cur,con)
#     print("Signin Ends", user )
#     return user[0] if user else ""  

def verify_email(email):
    print('in modal to find user',email)
    con=connect_db()
    cur = con.cursor()
    user=cur.fetchone()
    db_close(cur,con)
    print("verify_email Ends")
    return user[0] if user else ""  

def verify_email_otp(email,otp):
    print('in modal to find user',email, 'for otp=', otp)
    con=connect_db()    
    cur = con.cursor()
    email=cur.fetchone()
    db_close(cur,con)
    print("verify_email_otp Ends")
    return True if email else False 

def update_password(email,password):
    print('in modal to update user',email, 'for password=', password)
    hashed_password=password_hashing(password)
    con=connect_db() 
    cur = con.cursor()
    db_close(cur,con)
    print("update_password Ends")
    return True if update else False 

def otp_exist(email):
    print('in modal to check OTP exist for ',email)
    con=connect_db() 
    cur = con.cursor()
    otp_exist=cur.fetchone()
    db_close(cur,con)
    print("update_password Ends")
    return otp_exist[0] if otp_exist else "" 

def otp(email,otp):
    print('in modal to store otp  ',otp)
    con=connect_db() 
    cur = con.cursor()
    db_close(cur,con)
    print("otp stored")
    return 

def verify_otp(email,otp):
    print('in modal to verify otp  ',otp)
    con=connect_db() 
    cur = con.cursor()
    verify_otp=cur.fetchone()
    db_close(cur,con)
    print("otp stored", verify_otp)
    return  verify_otp

def verify_otp_expired(email):
    print('in modal to verify otp  ',otp)
    con=connect_db() 
    cur = con.cursor()
    verify_otp=cur.fetchone()
    db_close(cur,con)
    print("otp stored", verify_otp)
    return  verify_otp

def send_mail(email, otp):
    try:
        print('sending email')
        body_text= f'You have now requested for new password, your OTP is {otp}'
        msg=Message('Update Password', sender='utorrentdata1@gmail.com', recipients=[email])
        msg.body= body_text
        mail.send(msg)
        return True
    except: return False



def password_hashing(token):
    hashed_token = (bcrypt.hashpw(token.encode('utf-8'), SECRET_KEY.encode('utf-8'))).decode('utf-8')
    print(f'Token : {token} & Hashed Token : {hashed_token}')
    if hashed_token:
        return hashed_token
    else:
        return None


# def find_by_username(cls,username,password):
#     print('in modal to find user',username, 'and',password)
#     data = cursor.fetchone()
#     cursor.close()    
#     print("Signin Ends")
#     return True if data else False       