
var presentPathArray = window.location.pathname.split("/");
var lectureFolder = function(){
    return presentPathArray[presentPathArray.length - 1];
}

var attendedListObject = document.getElementById("student-list-view");
var attendedNumberObject = document.getElementById("in-user-number");
var attendedNumber = 0;

var xhrObject = new XMLHttpRequest();

xhrObject.open("GET", "/management/getsend/" + lectureFolder());
xhrObject.send()

xhrObject.onload = function(){
    a = JSON.parse(xhrObject.response)
    attendedNumber = a.length;
    for ( var i = 0; i < a.length; i++ ){
        attendedListObject.appendChild( createElementUserfiles( a[i] ))
    }
    attendedNumberObject.innerHTML = "수강자 수 : " + attendedNumber;
}

function createElementUserfiles( lecture_obj ){
    var fileElement = document.createElement('li');
    fileElement.setAttribute('class', 'sended-item')
    fileElement.setAttribute('title', lecture_obj );
    fileElement.innerHTML = lecture_obj;
    fileElement.addEventListener('click', fileLinker);
    return fileElement;
}

function fileLinker( lecture_obj ){
    console.log(lecture_obj)
    location.href = "/management/check/" + lectureFolder() + "!" + lecture_obj.target.title;
}