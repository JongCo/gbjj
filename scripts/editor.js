var buttonSubmit = document.getElementById("submit");
var labelPrinted = document.getElementById("printed");

buttonSubmit.addEventListener("click", sendCode);

var xhrObject = new XMLHttpRequest();

function sendCode(){
    xhrObject.open("POST", "/request-test");
    xhrObject.send(document.getElementById("editor").value);
}

var count = 0;

function keyFunction(e){
    //console.log(e.key)
    //이거 그냥 두세요 테스트용입니다.
}

xhrObject.onload = function(){
    console.log(xhrObject.response);
    labelPrinted.innerHTML = xhrObject.response;
}