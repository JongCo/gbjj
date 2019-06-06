var chatContext = document.getElementById("chat-cont");

var sendText = document.getElementById("chat-send-input");
var sendButton = document.getElementById("chat-send-button");

xhrYameChatSendObject = new XMLHttpRequest();
xhrYameChatGetObject = new XMLHttpRequest();

sendButton.addEventListener("click", sendButtonFunc );

function createChatPobject(username, context) {
    var chatDocumentObject = document.createElement('p');
    chatDocumentObject.setAttribute('class', 'chat-text')
    chatDocumentObject.innerHTML = username + " : " + context;
    return chatDocumentObject;
}


function sendButtonFunc() {
    xhrYameChatSendObject.open("POST", "/yamechat/sendchat");
    xhrYameChatSendObject.send(sendText.value);
}

function getChatList() {
    xhrYameChatGetObject.open("GET", "/yamechat/getchat");
    xhrYameChatGetObject.send();
}

xhrYameChatGetObject.onload = function(){
    responseObject = JSON.parse(xhrYameChatGetObject.response);
    console.log(responseObject);
    if (responseObject[0] != undefined){
        for( var i = 0; i < responseObject.length; i++){
            chatContext.appendChild( createChatPobject(responseObject[i].user, responseObject[i].cont) );
            chatContext.scrollTop = chatContext.scrollHeight
        }
    }
    
}

setInterval(getChatList, 1000);