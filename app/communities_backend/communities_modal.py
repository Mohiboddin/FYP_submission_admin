from app.db import connect_db, db_close



def get_communities_info():
    print('in modal to find user get_communities_info')
    con=connect_db()
    cur = con.cursor()
    fetched_data=cur.fetchall()
    db_close(cur,con)
    print("get_communities_info Ends")
    if (len(fetched_data)!=0): 
        payload = []
        content = {}
        for tupple in fetched_data:
            content = {"id": tupple[0], "name": tupple[1], "profile_photo": tupple[2], "total_member": tupple[3]}
            payload.append(content)
            content={}
        return payload
    else: return None

def get_community_info(id):
    print('in modal to find user get_community_info')
    con=connect_db()
    cur = con.cursor()
    fetched_data=cur.fetchone()
    data={
        "cummunity_info": None,
        "admin": None,
        "members": None
    }
    if (len(fetched_data)!=0): 
        content = {"id": fetched_data[0], "name": fetched_data[1], "profile_photo": fetched_data[2], "total_member": fetched_data[3], "created_at": fetched_data[4], "about": fetched_data[5]}
        data["community_info"]=content
    else:
        db_close(cur,con)
        return None

    fetched_data=cur.fetchall()
    if (len(fetched_data)!=0): 
        payload = []
        content = {}
        for tupple in fetched_data:
            content = {"id": tupple[0], "name": tupple[1]}
            payload.append(content)
            content={}
        data["admin"]=payload
    else:
        db_close(cur,con)
        return None

    fetched_data=cur.fetchall()
    if (len(fetched_data)!=0): 
        payload = []
        content = {}
        for tupple in fetched_data:
            content = {"official_name": tupple[0], "user_uuid": tupple[1], "joined_at": tupple[2], "photo_url": tupple[3], "status": tupple[4], "role": tupple[5]}
            payload.append(content)
            content={}
        data["members"]= payload
    else:
        db_close(cur,con)
        return None
    
    return data



def get_community_chat(from_date, id):
    print('in modal to get_community_chat', from_date, id)
    con=connect_db()
    cur = con.cursor()
    print(f'SELECT people.official_name, people.id, community_message.message_content , to_char(community_message.created_at,\'DD Month YYYY\'),to_char(community_message.created_at,\'HH24:MI:SS\'), people.photo_url, community_message.created_at FROM community_message INNER JOIN people ON community_message.sender_uuid = people.id WHERE community_message.community_id={id} AND community_message.created_at < {from_date} order by community_message.created_at desc Limit 5')
    fetched_data=cur.fetchall()
    db_close(cur,con)

    if (len(fetched_data)!=0): 
        payload = []
        content = {}
        for tupple in fetched_data:
            content = {"official_name": tupple[0], "peopel_id": tupple[1], "message_content": tupple[2], "date": tupple[3], "time": tupple[4], "photo_url": tupple[5], "created_at": tupple[6]}
            payload.append(content)
            content={}
        return payload
    else: return None


