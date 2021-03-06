/*
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Get ?user=XYZ parameter value
const urlParams = new URLSearchParams(window.location.search);
const parameterUsername = urlParams.get('user');

// URL must include ?user=XYZ parameter. If not, redirect to homepage.
if (!parameterUsername) {
    window.location.replace('/');
}

/** Sets the page title based on the URL parameter username. */
function setPageTitle() {
    document.getElementById('page-title').innerText = parameterUsername;
    document.title = parameterUsername + ' - User Page';
}

/**
 * Shows the message form if the user is logged in and viewing their own or someone else's page.
 */
function showMessageFormIfLoggedIn() {
    fetch('/login-status')
        .then((response) => {
            return response.json();
        })
        .then((loginStatus) => {
            if (loginStatus.isLoggedIn && loginStatus.username == parameterUsername) {
                document.getElementById('about-me-form').classList.remove('hidden');
                fetchImageUploadUrlAndShowForm();
            }
        })
    ;
}

function fetchImageUploadUrlAndShowForm() {
    fetch('/image-upload-url?recipient=' + parameterUsername)
        .then((response) => {
            return response.text();
        }).then((imageUploadUrl) => {
        const messageForm = document.getElementById('message-form');
        messageForm.action = imageUploadUrl;
        messageForm.classList.remove('hidden');
        document.getElementById('recipientInput').value = parameterUsername;
    })
    ;
}

/** Fetches messages and add them to the page. */
function fetchMessages() {
    const url = '/messages?user=' + parameterUsername;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((messages) => {
            const messagesContainer = document.getElementById('message-container');
            if (messages.length == 0) {
                messagesContainer.innerHTML = '<p>This user has no posts yet.</p>';
            } else {
                messagesContainer.innerHTML = '';
            }
            messages.forEach((message) => {
                const messageDiv = buildMessageDiv(message);
                messagesContainer.appendChild(messageDiv);
            })
            ;
        })
    ;
}

function fetchAboutMe() {
    const url = '/about?user=' + parameterUsername;
    fetch(url).then((response) => {
        return response.text();
    }).then((aboutMe) => {
        const aboutMeContainer = document.getElementById('about-me-container');
        if (aboutMe == '') {
            aboutMe = 'This user has not entered any information yet.';
        }

        aboutMeContainer.innerHTML = aboutMe;

    })
    ;
}

/**
 * Builds an element that displays the message.
 * @param {Message} message
 * @return {Element}
 */
function buildMessageDiv(message) {
    const headerDiv = document.createElement('div');
    headerDiv.classList.add('card-header');
    headerDiv.appendChild(document.createTextNode(
    message.user + ' - ' + new Date(message.timestamp)));

    const bodyDiv = document.createElement('div');
    bodyDiv.classList.add('card-body');
    bodyDiv.innerHTML = isBlockCode(message.text);

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('card');
    messageDiv.appendChild(headerDiv);
    messageDiv.appendChild(bodyDiv);

    if(message.imageUrl){
        bodyDiv.innerHTML += '<br/>';
        bodyDiv.innerHTML += '<img src="' + message.imageUrl + '" />';
    }

    return messageDiv;
}

/* isBlockCode

This function checks if the message has a block of code. 
If it does it places it between blocks of ode.
If not just return the message.

*/
function isBlockCode(message) {
    var str = message;
    var patt1 = /```(.*)```/s;
    var result = str.match(patt1);
    if (result != null) {
        message = message.replace(/```/s, "<pre class=\"prettyprint\"><code>").replace(/```/s, "</code></pre>");
        return message;
    } else {
        return message;
    }
}


/** Fetches data and populates the UI of the page. */
function buildUI() {
    setPageTitle();
    showMessageFormIfLoggedIn()
    fetchAboutMe();
    fetchMessages();
}
