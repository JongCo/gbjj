var buttonSubmit = document.getElementById("submit");
var labelPrinted = document.getElementById("printed");

buttonSubmit.addEventListener("click", sendCode);

var userCodeLoaderXhr = new XMLHttpRequest();
var lectureLoaderXhr = new XMLHttpRequest();
//  위에 lectureLoader가 
//  /editor/getlecture/(강의 이름) 이라는 URL에 접속해서
//  응답으로 강의 이름을 받아와야 해요.


var presentPathArray = window.location.pathname.split("/");
var lectureName = function(){
    return presentPathArray[presentPathArray.length - 1];
}

console.log(presentPathArray);
console.log(presentPathArray[presentPathArray.length - 1]);

function sendCode(){
    userCodeLoaderXhr.open("POST", "/request-test");
    userCodeLoaderXhr.send(document.getElementById("editor").value);
}

function getLecture(){
    lectureLoaderXhr.open("GET","/editor/getlecture/" + lectureName());
    lectureLoaderXhr.send();
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