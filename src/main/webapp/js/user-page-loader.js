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
}

/** Sets the page title based on the URL parameter username. */
function setPageTitle() {
}

/**
 * Shows the message form if the user is logged in and viewing their own or someone else's page.
 */
function showMessageFormIfLoggedIn() {
}

/** Fetches messages and add them to the page. */
function fetchMessages() {
}



}

/**
 * Builds an element that displays the message.
 * @param {Message} message
 * @return {Element}
 */
function buildMessageDiv(message) {


<<<<<<< HEAD
  console.log(message.tag);

  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message-div');
  messageDiv.appendChild(headerDiv);
  messageDiv.appendChild(bodyDiv);
}

/* isBlockCode

This function checks if the message has a block of code. 
If it does it places it between blocks of ode.
If not just return the message.

*/
function isBlockCode(message) {
}


/** Fetches data and populates the UI of the page. */
function buildUI() {
}
