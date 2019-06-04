from application import app
from flask import render_template, send_file, abort, request, redirect, url_for, json, make_response, session
import time

import os, sys

import json

import modules.execute_module as p_exe

#파일 경로를 Path라는 클래스로 관리하기 위해 import함
try:
    from pathlib import WindowsPath as Path
    Path("a")
except:
    from pathlib import PosixPath as Path
    Path("a")


#현재 이 코드가 돌아가고 있는 파일시스템 경로를 저장
#이 디렉토리를 기준으로 파일을 로드함.
BASE_DIR = Path(os.getcwd())
#jc_BASE_DIR = jcPath(BASE_DIR)


#서버에 저장되어있는 강의 폴더 목록을 생성함
def get_file_list(folder_name = "nonnonnonnonnon"):
    lecture_list = []
    if folder_name == "nonnonnonnonnon":
        for child in BASE_DIR.joinpath("resource/lecture").iterdir():
            lecture_list.append({"file":child.name, "name":str(child.name).split('.')[0], "isdir":Path.is_dir(child)})
        return lecture_list
    else:
        for child in BASE_DIR.joinpath("resource/lecture/", folder_name).iterdir():
            lecture_list.append({"file":child.name, "name":str(child.name).split('.')[0], "isdir":Path.is_dir(child)})
        return lecture_list




#------home------
@app.route("/", methods=['GET'])
def main_page():
    if 'username' in session:
        return redirect(url_for("home"))

    return render_template("titlepage.html")


@app.route("/home", methods=['GET'])
def home():
    '''
    기본 페이지 출력
    클라우드 서비스 홈같은 느낌으로
    '''

    if 'username' in session:
        username = session['username']
        return render_template("home.html", username = username, ptype = type(session['username']))

    return "You're not logged in. <br><a href = '/login'></b>" + \
           "Click here to login</b></a>"



@app.route("/home/get", methods=['GET'])
def test_response():
    filepath_dict = {'username':session['username'], 'listpath':[]}
    for child in BASE_DIR.joinpath('userdata/'+session['username']).iterdir():
        filepath_dict['listpath'].append(child.name)

    final_str = json.dumps(filepath_dict)
    return final_str



#------Editor------
@app.route("/editor", methods=['GET'])
def editor():
    return render_template("code-edit.html")


@app.route("/editor/<string:file_name>", methods=['GET'])
def editor_load(file_name):
    return render_template("code-edit.html", file_name=file_name)


@app.route("/editor/getlecture/<string:lecture_name>", methods=['GET'])
def getlecture(lecture_name):
    for item in get_file_list():
        if lecture_name in item['name']:
            with open(BASE_DIR.joinpath("resource/lecture/" + item['file'])) as f:
                return f.read()

    return "강의가 없습니다."

#------Lecture Page------
@app.route("/lecture-list/<string:folder_name>", methods=['GET'])
def lecture_page_in_folder(folder_name):
    return render_template("lecture-list.html")


@app.route("/lecture-list", methods=['GET'])
def lecture_page():
    return render_template("lecture-list.html")


@app.route("/lecture-list/getlist", methods=['GET'])
def get_lecture_list():
    final_json = json.dumps(get_file_list())
    return final_json


@app.route("/lecture-list/getlist/<string:folder>", methods=['GET'])
def get_lecture_list_in_folder(folder):
    final_json = json.dumps(get_file_list(folder))
    return final_json


@app.route("/request-test", methods=['POST'])
def request_test():
    ccv = "작동"
    '''
    클라이언트에서 받는 post요청의 값을 본다.
    '''
    try:
        p_exe.py_exec(request.data)
        if(p_exe.pp == None):
            ccv = "작동"
        else:
            ccv = p_exe.pp
    except Exception as inst:
        ccv = "무언가 오류가 났습니다. 오류! \n" + str(inst)
    return ccv



@app.route("/test/1", methods=['GET'])
def test_1():
    test_list = [0,1,2,3,4,5]
    return render_template("test-temp1.html", test_list = test_list)



#------Login & Sign Up------
@app.route("/signup", methods=['GET'])
def signup():
    '''
    회원가입 페이지
    '''
    '''
    if session['username']:
        return render_template("already-login.html")
    else:
        return render_template("signup.html")
    '''
    try:
        if session['username']:
            return render_template("already-login.html")
    except KeyError:
        return render_template("signup.html")



@app.route("/signup/veri", methods=['POST'])
def singup_exec():
    '''
    회원가입을 위해 회원 정보를 가져와 처리하는 Post주소

    아이디, 비번, 이름 데이터를 얻어옴
    '''
    _id = request.form['signupId']
    _pwd = request.form['signupPwd']
    _name = request.form['signupName']
    _prof = request.form['signupProf']

    if _id and _pwd and _name:
        with open("userdata/userlist.txt",'r') as f:
            userlist = json.load(f)
            
        for item in userlist['userdata']:
            if _id == item['id']:
                return "이미 아이디가 사용중입니다."
        
        userlist['userdata'].append({"id":_id, "pwd":_pwd, "name":_name, "prof":_prof})

        with open("userdata/userlist.txt",'w') as f:
            json.dump(userlist, f)

        return _id + _pwd + _name + _prof
                    
    else:
        return json.dumps({'html':'<span>not good</span>'})



@app.route("/signup/test", methods=['GET'])
def signup_test():
    with open("userdata/userlist.txt") as f:
        userlist = json.load(f)
    
    final_str = ""
    for item in userlist['userdata']:
        final_str = final_str + str(item) + "<br>"
    return final_str



@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        with open("userdata/userlist.txt",'r') as f:
            userlist = json.load(f)
        
        for item in userlist['userdata']:
            if (request.form['logid'], request.form['logpwd']) == (item['id'], item['pwd']):
                session['username'] = request.form['logid']
                return redirect(url_for("home"))

        return render_template("login.html", caution_str = "회원정보가 일치하지 않습니다.")

    return render_template("login.html")



#------스타일 및 스크립트------
@app.route("/styles/<path:file>", methods=['GET'])
def resource_serving(file):
    
    target_path = Path(BASE_DIR.joinpath("styles"), file)

    if target_path.exists() and not target_path.is_dir():

        return send_file(target_path.open(mode="rb"), attachment_filename=target_path.name)

    abort(404)



@app.route("/scripts/<path:file>", methods=['GET'])
def scripts_serving(file):
    
    target_path = Path(BASE_DIR.joinpath("scripts"), file)

    if target_path.exists() and not target_path.is_dir():

        return send_file(target_path.open(mode="rb"), attachment_filename=target_path.name)

    abort(404)



@app.route("/testing_cookie_page", methods=['GET'])
def testing_cookie_page():
    return render_template("ses_index.html")


@app.route("/setcookie", methods=['GET','POST'])
def setcookie():
    if request.method == 'POST':
    
        user = request.form['id']

        resp = make_response("Cookie Setting Complete")
        resp.set_cookie('userID', user)

        print(type(resp))

        return resp
    
    return "잘못된 접근입니다."


@app.route("/getcookie")
def getcookie():
    user_id = request.cookies.get('userID')
    print(type(user_id))
    print(user_id)

    return "<h1>welcome " + user_id + "</h1>"


@app.route("/sessionclear")
def session_clear():
    session.clear()
    return "<h2>세션이 클리어되었습니다.</h2>"