var buttonSubmit = document.getElementById("submit");
var labelPrinted = document.getElementById("printed");

buttonSubmit.addEventListener("click", sendCode);

var userCodeLoaderXhr = new XMLHttpRequest();
var lectureLoaderXhr = new XMLHttpRequest();

function sendCode(){
    userCodeLoaderXhr.open("POST", "/request-test");
    userCodeLoaderXhr.send(document.getElementById("editor").value);
}

var count = 0;

function keyFunction(e){
    //console.log(e.key)
    //이거 그냥 두세요 테스트용입니다.
}

userCodeLoaderXhr.onload = function(){
    console.log(userCodeLoaderXhr.response);
    labelPrinted.innerHTML = userCodeLoaderXhr.response;
}