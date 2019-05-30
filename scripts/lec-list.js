

var element_explorerWindow = document.getElementById("explorer-window");

window.onload = function(){
    var xhrObject = new XMLHttpRequest();
    xhrObject.open("GET", "/lecture-list/getlist");
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
    var fileElement = document.createElement('li');
    fileElement.setAttribute('class', 'file-list')
    fileElement.setAttribute('title', lecture_obj.name );
    fileElement.setAttribute('jc_link', lecture_obj.file)
    fileElement.innerHTML = lecture_obj.name;
    fileElement.addEventListener('click', fileLinker);
    return fileElement;
}

function fileLinker( lecture_obj ){
    console.log(lecture_obj)
    location.href = "/editor/" + lecture_obj.target.attributes.jc_link.value;
}