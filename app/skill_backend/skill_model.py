from app.db import connect_db, db_close


def search_users_by_skill_model(json_data):
    print('in modal search_users_by_skill_model')
    con=connect_db()
    cur = con.cursor()
    branches=json_data["branches"]
    prefix=json_data["skill_prefix"]
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
    payload=[]
    for tuple in people:
        content={"id":tuple[0] , "official_name":tuple[1], "unofficial_name":tuple[2], "inst_id":tuple[3], "belongs_to":tuple[4], "role":tuple[5]}
        print(content)
        payload.append(content)

    if len(payload)!=0:
        return {"people": payload, "code": 1}
    else:
        return {"msg": "No data for given skill", "code": 2}

def skill_count_on_campus_model():
    print('in model skill_count_on_campus_model')
    con=connect_db()
    cur = con.cursor()
    cur.execute('select  COUNT(DISTINCT skill_id) from having_skill ')
    total_skills=cur.fetchone()
    cur.execute('with ins1 as(Select skill_id, count(*) from having_skill group by skill_id) Select skill_dataset.id, skill_dataset.name, ins1.count from skill_dataset join ins1 on ins1.skill_id=skill_dataset.id order by ins1.count desc')
    skill_wise=cur.fetchall()
    payload=[]
    for tuple in skill_wise:
        content={"skill_id":tuple[0] , "skill_name": tuple[1], "count": tuple[2]}
        payload.append(content)
    if len(payload)!=0:
        return {"skill_wise": payload, "total_skills": total_skills, "code": 1}
    else: return {"msg": "No data", "code": 2}

# def fetch_user_related_to_skill(skill):
#     select pe.id, pe.unofficial_name, pe.title, pe.photo_url, pe.role from having pe join 

