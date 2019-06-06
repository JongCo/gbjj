var buttonSubmit = document.getElementById("runit");
var labelPrinted = document.getElementById("printed");
var buttonSend = document.getElementById("send");

buttonSubmit.addEventListener("click", runitCode);
buttonSend.addEventListener("click", sendCodeToProf);

var userCodeLoaderXhr = new XMLHttpRequest();
var lectureLoaderXhr = new XMLHttpRequest();
var lectureSenderXhr = new XMLHttpRequest();
//  위에 lectureLoader가 
//  /editor/getlecture/(강의 이름) 이라는 URL에 접속해서
//  응답으로 강의 이름을 받아와야 해요.


var presentPathArray = window.location.pathname.split("/");
var lectureName = function(){
    return presentPathArray[presentPathArray.length - 1];
}

console.log(presentPathArray);
console.log(presentPathArray[presentPathArray.length - 1]);

function runitCode(){
    userCodeLoaderXhr.open("POST", "/request-test");
    userCodeLoaderXhr.send(document.getElementById("editor").value);
}

function getLecture(){
    lectureLoaderXhr.open("GET","/editor/getlecture/" + lectureName());
    lectureLoaderXhr.send();
}

function sendCodeToProf(){
    lectureSenderXhr.open("POST","/lecture/sendcode/" + lectureName());
    lectureSenderXhr.send(document.getElementById("editor").value);
    console.log("dd");
}

getLecture();

var count = 0;

function keyFunction(e){
    //console.log(e.key)
    //이거 그냥 두세요 테스트용입니다.
}

userCodeLoaderXhr.onload = function(){
    console.log(userCodeLoaderXhr.response);
    labelPrinted.innerHTML = userCodeLoaderXhr.response;
}

lectureLoaderXhr.onload = function(){
    console.log(lectureLoaderXhr.response);
    document.getElementById("lecture-content").innerHTML = lectureLoaderXhr.response ;
}