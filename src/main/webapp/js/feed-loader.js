const urlParams = new URLSearchParams(window.location.search);
const parameterUsername = urlParams.get('user');
const tagMap = new Map([["1" , "Strings"], ["2" , "Arrays"] ,["3", "Lists"], ["4", "Stacks"], ["5", "Queues"], ["6", "Trees"], 
	["7", "Graphs"], ["8", "Dynamic Programming"], ["9", "Divide and Conquer"]]);
var userEmail = {};

function showMessageFormIfLoggedIn(){
	fetch('/login-status')
		.then((response) => {
			return response.json();
		})
		.then((loginStatus) => {
			if (loginStatus.isLoggedIn && loginStatus.username != parameterUsername) {
				userEmail = {
					email: loginStatus.username
				}
				const messageForm = document.getElementById('message-form');
				messageForm.action = '/messages?recipient=' + parameterUsername;
				messageForm.classList.remove('hidden');
			}
		})
	;
}

function getUserEmail(solved){
	fetch('/login-status')
		.then((response) => {
			return response.json();
		})
		.then((loginStatus) => {
			yup = solved.includes(userEmail.email);
			return yup;
		})
	;
	return yup;
}

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

	const container = document.createElement('div');
	container.setAttribute("class", "container");
	const row = document.createElement('div');
	row.setAttribute("class", "row");
	const col8 = document.createElement('div');
	col8.setAttribute("class", "col-10");
	const col4 = document.createElement('div');
	col4.setAttribute("class", "col-2");


	const timeDiv = document.createElement('div');
	timeDiv.classList.add('card-header');
	let head = document.createElement("h6");
	let node = document.createTextNode("Problem Type: ");

	let tagType = document.createElement("span");
	tagType.setAttribute("class", "badge badge-primary");
	let tagNode = document.createTextNode(tagName);
	tagType.appendChild(tagNode);

	head.appendChild(node);
	head.appendChild(tagType);
	timeDiv.appendChild(head);

	let date = new Date(message.timestamp).toLocaleDateString('en-US', {  
		day : 'numeric',
		month : 'short',
		year : 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
	timeDiv.appendChild(document.createTextNode(date));

	col8.appendChild(timeDiv);


	const solvedButton = document.createElement("button");
	solvedButton.setAttribute("type", "submit");

	if(message.solved != undefined){
		if(message.solved.includes(userEmail.email)){
			solvedButton.setAttribute("class", "btn btn-success");
			solvedButton.innerHTML = "Solved";
		}else{
			solvedButton.setAttribute("class", "btn btn-warning");
			solvedButton.innerHTML = "Not Solved";
		}
	}


	const messageID = message.id;

	const formContainerSolved = document.createElement('form');
	formContainerSolved.setAttribute("action", "/status?mid="+messageID);
	formContainerSolved.setAttribute("method", "POST");
	formContainerSolved.appendChild(solvedButton);

	col4.appendChild(formContainerSolved);
	row.appendChild(col8);
	row.appendChild(col4);
	container.appendChild(row);

	const headerDiv = document.createElement('div');
	headerDiv.classList.add('card-header');
	headerDiv.appendChild(usernameDiv);
	headerDiv.appendChild(container);


	const bodyDiv = document.createElement('div');
	bodyDiv.classList.add('card-body');
	bodyDiv.setAttribute('name', 'messageText');
	bodyDiv.innerHTML = isBlockCode(message.text);


	var xmlString = "<div class=\"input-group mb-3\"><input name=\"replyText\" type=\"text\" class=\"form-control\" placeholder=\"Write a comment\"><div class=\"input-group-append\"><button class=\"btn btn-outline-primary\" type=\"submit\">Comment</button></div></div>";
	const commentStruct = new DOMParser().parseFromString(xmlString, 'text/html');

	const footerDiv = document.createElement('div');
	footerDiv.classList.add('card-footer');
	footerDiv.innerHTML = (new XMLSerializer()).serializeToString(commentStruct);

	const list = document.createElement('div');
	list.classList.add('card');

	const ulDiv = document.createElement('ul');
	ulDiv.setAttribute('class', 'list-group list-group-flush');

	const ar = message.replies;

	const l = ar.length;

	for(var i = 1; i < l; i++){
		const replies = buildReply(message.replies[i]);
		ulDiv.appendChild(replies);
	}

	list.appendChild(ulDiv);

	const formContainer = document.createElement('form');
	formContainer.setAttribute("action", "/reply?mid="+messageID);
	formContainer.setAttribute("method", "POST");
	formContainer.appendChild(footerDiv);

	const messageDiv = document.createElement('div');
	messageDiv.setAttribute("class", "card border-primary mb-3");
	messageDiv.appendChild(headerDiv);
	messageDiv.appendChild(bodyDiv);
	messageDiv.innerHTML += "<span class=\"badge badge-pill badge-primary\">Comments</span>";
	messageDiv.appendChild(list);
	messageDiv.appendChild(formContainer);

	return messageDiv;
}

function buildReply(reply){
	const footer = document.createElement('li');
	footer.classList.add('list-group-item');
	footer.innerHTML = reply;
	return footer;
}

function isBlockCode(message) {
	var str = message;
	var patt1 = /```(.*)```/s;
	var result = str.match(patt1);
	if (result != null) {
		message = message.replace(/```/s, "<pre class=\"ft-syntax-highlight\" data-syntax=\"js\" data-syntax-theme=\"one-dark\" data-ui-theme=\"MacOSX\"><code><BR>").replace(/```/s, "</code></pre>");
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



