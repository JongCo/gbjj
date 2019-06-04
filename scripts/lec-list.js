

var presentPathArray = window.location.pathname.split("/");
var lectureFolder = function(){
    return presentPathArray[presentPathArray.length - 1];
}


var element_explorerWindow = document.getElementById("explorer-window");

window.onload = function(){
    var xhrObject = new XMLHttpRequest();
    if (lectureFolder() == "lecture-list"){
        xhrObject.open("GET", "/lecture-list/getlist");
    } else {
        xhrObject.open("GET", "/lecture-list/getlist/" + lectureFolder());
    }
    xhrObject.send();
    xhrObject.onload = function(){
        a = JSON.parse(xhrObject.response);
        console.log(a);
        for (var i = 0; i < a.length; i++){
            element_explorerWindow.appendChild( createElementUserfiles( a[i]) );
        }
    }
}

function createElementUserfiles( lecture_obj ){
    if (lecture_obj.isdir == false){
        var fileElement = document.createElement('li');
        fileElement.setAttribute('class', 'file-list')
        fileElement.setAttribute('title', lecture_obj.name );
        fileElement.setAttribute('jc_link', lecture_obj.file)
        fileElement.innerHTML = lecture_obj.name;
        fileElement.addEventListener('click', fileLinker);
        return fileElement;
    } else {
        var fileElement = document.createElement('li');
        fileElement.setAttribute('class', 'file-list')
        fileElement.setAttribute('title', lecture_obj.name );
        fileElement.setAttribute('jc_link', lecture_obj.file)
        fileElement.innerHTML = lecture_obj.name;
        fileElement.addEventListener('click', fileLinker);
        return fileElement;
    }
}

function fileLinker( lecture_obj ){
    console.log(lecture_obj)
    location.href = "/editor/" + lecture_obj.target.title;
}

function fileLinker( lecture_obj ){
    console.log(lecture_obj)
    location.href = "/lecture-list/" + lecture_obj.target.title;
}