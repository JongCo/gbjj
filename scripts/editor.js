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
    console.log(e.key)
}

xhrObject.onload = function(){
    console.log(xhrObject.response);
    labelPrinted.innerHTML = xhrObject.response;
}