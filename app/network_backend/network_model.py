from app.db import connect_db, db_close


def connection_date_wise_model():
    print('in modal connection_date_wise_model')
    con=connect_db()
    cur = con.cursor()
    data=cur.fetchall()
    payload=[]
    for tuple in data:
        payload.append({ "count":tuple[0],"date":tuple[1],"type":tuple[2]})
    if len(payload)!=0:
        return payload
    else: return None
