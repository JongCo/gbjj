var childrenOfCurrentDir = []
//var workDir = getQueryInUrl(window.location.search)

//document.getElementById("work-directory").innerHTML = workDir.n;
var element_explorerWindow = document.getElementById("explorer-window")
var a = null;

window.onload = function(){
    var xhrObject = new XMLHttpRequest();
    xhrObject.open("GET", "/home/get");
    xhrObject.send();
    xhrObject.onload = function() {
        a = JSON.parse(xhrObject.response);
        //document.getElementById("child-path").innerHTML = xhrObject.response;
        for (var i = 0; i < a['listpath'].length; i++){
            element_explorerWindow.appendChild( createElementUserfiles( a['listpath'][i]) );
        }
    }
}


function createElementUserfiles( filename ){
    var fileElement = document.createElement('li');
    fileElement.setAttribute('class', 'file-list')
    fileElement.setAttribute('title', filename);
    fileElement.innerHTML = filename;
    fileElement.addEventListener('click', fileLinker);
    return fileElement;
}

function fileLinker( filename ){
    location.href = "/editor/" + filename.target.title;
}

