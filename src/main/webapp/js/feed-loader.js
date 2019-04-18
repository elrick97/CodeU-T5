const urlParams = new URLSearchParams(window.location.search);
const parameterUsername = urlParams.get('user');
const tagMap = new Map([["1" , "Strings"], ["2" , "Arrays"] ,["3", "Lists"], ["4", "Stacks"], ["5", "Queues"], ["6", "Trees"], 
  ["7", "Graphs"], ["8", "Dynamic Programming"], ["9", "Divide and Conquer"]]);

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
  let tagName = "No tag selected";
  if (message.tag != null) {
    tagName = tagMap.get(message.tag);
  }
   const usernameDiv = document.createElement('h5');
   usernameDiv.classList.add("card-header");
   usernameDiv.appendChild(document.createTextNode(message.user));

   const timeDiv = document.createElement('div');
   timeDiv.classList.add('card-header');
   let head = document.createElement("h6");
   let node = document.createTextNode("Problem Type: " + tagName);
   head.appendChild(node);
   timeDiv.appendChild(head);
   
   let date = new Date(message.timestamp).toLocaleDateString('en-US', {  
      day : 'numeric',
      month : 'short',
      year : 'numeric',
      hour: '2-digit',
      minute: '2-digit'
   });
   timeDiv.appendChild(document.createTextNode(date));
   
   const headerDiv = document.createElement('div');
   headerDiv.classList.add('card-header');
   headerDiv.appendChild(usernameDiv);
   headerDiv.appendChild(timeDiv);
   
   const bodyDiv = document.createElement('div');
   bodyDiv.classList.add('card-body');
   bodyDiv.setAttribute("name", "messageText")
   bodyDiv.innerHTML = isBlockCode(message.text);

  var xmlString = "<div class=\"input-group mb-3\"><input name=\"replyText\" type=\"text\" class=\"form-control\" placeholder=\"Write a comment\"><div class=\"input-group-append\"><button class=\"btn btn-outline-secondary\" type=\"submit\">Comment</button></div></div>";
  const commentStruct = new DOMParser().parseFromString(xmlString, 'text/html');

  console.log(commentStruct);

   const footerDiv = document.createElement('div');
   footerDiv.classList.add('card-footer');
   footerDiv.innerHTML = (new XMLSerializer()).serializeToString(commentStruct);

   const messageDiv = document.createElement('div');
   messageDiv.classList.add("card");
   messageDiv.appendChild(headerDiv);
   messageDiv.appendChild(bodyDiv);
   messageDiv.appendChild(footerDiv);

   const formContainer = document.createElement('form');
   formContainer.setAttribute("action", "/reply");
   formContainer.setAttribute("method", "POST");
   formContainer.appendChild(messageDiv);
   
 return formContainer;
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
