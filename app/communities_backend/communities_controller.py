from app import app
from flask import render_template, redirect, request, session, jsonify, make_response
from app.auth_backend.login_required import login_required
from app.communities_backend import communities_modal


@app.route("/community")
@login_required
def community(): 
    print(session['username'])

    communities_info=communities_modal.get_communities_info()

    print("returning community")
    return render_template('community/community_item.html', username=session['username'], active='community', communities_info=communities_info)



@app.route("/community/<id>")
@login_required
def community_id(id): 
    print(session['username'])
    data=communities_modal.get_community_info(id)
    print("returning community")
    return render_template('community/community_detail.html', username=session['username'], active='community', data=data)

@app.route("/community_chat", methods=["POST"])
@login_required
def community_chat(): 
    print(session['username'])
    if request.method == "POST":
        json_data = request.get_json(force = True)
        from_date = json_data['from_date'] if json_data['from_date']!="" else "now()"
        id = json_data['id'] 
        chat=communities_modal.get_community_chat(from_date,id)
        print("returning community_chat")
        return {"data": chat, "code": 1}, 200 #OK