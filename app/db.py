import psycopg2


def connect_db():    
    con = psycopg2.connect(
        dbname='fyp_db' ,
        user='postgres' ,
        host='localhost' ,
        password='')
    return con


def db_close(cur, con):
    con.commit()
    cur.close()
    con.close()