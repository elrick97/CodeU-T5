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
   const usernameDiv = document.createElement('h5');
   usernameDiv.classList.add("card-header");
   usernameDiv.appendChild(document.createTextNode(message.user));
   
   const timeDiv = document.createElement('div');
   timeDiv.classList.add('card-header');
   timeDiv.appendChild(document.createTextNode(new Date(message.timestamp)));
   
   var button = document.createElement("BUTTON");
   button.innerHTML = "Solve";
   button.style.backgroundColor = '#4CAF50';
   button.style.color = "white";
   button.style.borderRadius = "5px";
   button.style.border = 'none';
   button.style.margin = "10px 0 0 0";
   button.onClick = function(){
   	onSolveButtonClick();
   }
  
   const headerDiv = document.createElement('div');
   headerDiv.classList.add('card-header');
   headerDiv.appendChild(usernameDiv);
   headerDiv.appendChild(timeDiv);
   headerDiv.appendChild(button);
   
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

function onSolveButtonClick(){
	//post('/messages', message.UUID, "POST");
	//button.style.color = '#fb5e50';	
}

/*function post(path, params, method){
	var form = document.createElement("form");
	form.setAttribute("method", method);
	form.setAttribute("action", path);
	
	for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }
	
	document.body.appendChild(form);
	form.submit();
	}*/

