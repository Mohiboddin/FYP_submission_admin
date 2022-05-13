from app.db import connect_db, db_close
from datetime import datetime

def get_hierarchy():
    print('in modal gethierarchy')
    con=connect_db()
    cur = con.cursor()
    fetched_data=cur.fetchall()
    db_close(cur,con)
    if (len(fetched_data)!=0): 
        payload = []
        content = {}
        for tupple in fetched_data:
            content = {"id": tupple[0], "path": tupple[1], "level": tupple[2], "name": tupple[3], "ancestors": tupple[4]}
            payload.append(content)
            content={}
        return payload
    else: return False

def add_path_return_id(path):
    print('in modal add_path_return_id')
    con=connect_db()
    cur = con.cursor()
    fetched_data=cur.fetchone()
    print("id is fetched ", fetched_data)
    db_close(cur,con)
    if len(fetched_data)!=0:
        print(fetched_data)
        return fetched_data[0]
    else: 
        return None

def add_path_return_id_child(path):
    print('in modal add_path_return_id')
    con=connect_db()
    cur = con.cursor()
    fetched_data=cur.fetchone()
    print("id is fetched ", fetched_data)
    db_close(cur,con)
    if len(fetched_data)!=0:
        print(fetched_data)
        return fetched_data[0]
    else: 
        return None


def update_node_name(path,new_path, length):
    print('in modal update_node_name')
    con=connect_db()
    cur = con.cursor()

    print("id is fetched ", fetched_data)
    db_close(cur,con)
    return




def authority_delete_node(id,path,length):
    print('in modal authority_delete_node')
    con=connect_db()
    cur = con.cursor()

    #updating the users belonging the node to be deleted.
    transferd_users_to_parent_node=transfer_users_to_parent_node(id,path)
    if transferd_users_to_parent_node:
        print('deletinh the node from hierarchy')

        db_close(cur,con)
        print('thankyou from authority_delete_node')
        return True
    else:
        return False

    # if fetched_data:
    #     return True
    # else: 
    #     return False

def transfer_users_to_parent_node(id,path):
    path_array=path.split('.')
    ancestor=path_array[-2]
    con=connect_db()
    cur = con.cursor()
    result=cur.fetchall()
    db_close(cur,con)
    if len(result)!=0:
        print('updated the users belonging to the node to parenty node')
        return True
    else:
        print('not updated the users belonging to the node to parenty node')
        return False






    

    
    
