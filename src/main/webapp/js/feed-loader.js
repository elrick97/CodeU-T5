const urlParams = new URLSearchParams(window.location.search);
const parameterUsername = urlParams.get('user');

  // Fetch messages and add them to the page.
function fetchMessages(){
  const url = '/feed';
  fetch(url).then((response) => {
    return response.json();
  }).then((messages) => {
    const messageContainer = document.getElementById('message-container');
    if(messages.length == 0){
      messageContainer.innerHTML = '<p>There are no posts yet.</p>';
    }
    else{
      messageContainer.innerHTML = '';  
    }
    messages.forEach((message) => {  
      const messageDiv = buildMessageDiv(message);
      messageContainer.appendChild(messageDiv);
    });
  });
}
  
function buildMessageDiv(message){
   const usernameDiv = document.createElement('div');
   usernameDiv.classList.add("left-align");
   usernameDiv.appendChild(document.createTextNode(message.user));
   
   const timeDiv = document.createElement('div');
   timeDiv.classList.add('right-align');
   timeDiv.appendChild(document.createTextNode(new Date(message.timestamp)));
   
   const headerDiv = document.createElement('div');
   headerDiv.classList.add('message-header');
   headerDiv.appendChild(usernameDiv);
   headerDiv.appendChild(timeDiv);
   
   const bodyDiv = document.createElement('div');
   bodyDiv.classList.add('message-body');
   bodyDiv.innerHTML = isBlockCode(message.text);
   
   const messageDiv = document.createElement('div');
   messageDiv.classList.add("message-div");
   messageDiv.appendChild(headerDiv);
   messageDiv.appendChild(bodyDiv);

   console.log(message);
   
   return messageDiv;
  }

function showMessageFormIfLoggedIn() {
    fetch('/login-status')
        .then((response) => {
            return response.json();
        })
        .then((loginStatus) => {
            if (loginStatus.isLoggedIn && loginStatus.username != parameterUsername) {
                const messageForm = document.getElementById('message-form');
                messageForm.action = '/messages?recipient=' + parameterUsername;
                messageForm.classList.remove('hidden');
            }
        })
    ;
}

function isBlockCode(message) {
  var str = message;
  var patt1 = /```(.*)```/s;
  var result = str.match(patt1);
  if (result != null) {
    message = message.replace(/```/s, "<pre class=\"prettyprint\"><code>").replace(/```/s, "</code></pre>");
    return message;
  }else{
    return message;
  }
}
  
  // Fetch data and populate the UI of the page.
function buildUI(){
  showMessageFormIfLoggedIn();
  fetchMessages();
}
