from app.db import connect_db, db_close
from app import celery


def usage_data_func():
    print('in modal usage_data_func')
    con=connect_db()
    cur = con.cursor()
    data=cur.fetchall()
    payload=[]
    
    for tuple in data:
        payload.append({ "id": tuple[0], "student_live": tuple[1], "student_usage": tuple[2], "alumni_live": tuple[3], "alumni_usage": tuple[4], "staff_live": tuple[5], "staff_usage": tuple[6], "recorded_at": tuple[7] })
    db_close(cur,con)
    if len(payload)!=0:
        return payload
    else: return None

#function runned by celery beat every 5 min
@celery.task()
def usage_update_func():
    print('in modal usage_update_func runned by Beat')
    con=connect_db()
    cur = con.cursor()
    data=cur.fetchall()
    usage={
        'staff_live': None,
        'staff_usage': None,
        'alumni_live': None,
        'alumni_usage': None,
        'student_live': None,
        'student_usage': None,
        'recorded_at': None
    }
    for tuple in data:
        if tuple[0]==2:
            usage['staff_live']=tuple[1]
            usage['staff_usage']=tuple[2]
        elif tuple[0]==3:
            usage['alumni_live']=tuple[1]
            usage['alumni_usage']=tuple[2]
        elif tuple[0]==4:
            usage['student_live']=tuple[1]
            usage['student_usage']=tuple[2]
        usage['recorded_at']=tuple[3]
    print(usage)
    
    db_close(cur,con)
    return 
    
  
