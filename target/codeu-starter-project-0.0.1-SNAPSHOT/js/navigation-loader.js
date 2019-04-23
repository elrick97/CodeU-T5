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

/**
 * Adds a login or logout link to the page, depending on whether the user is
 * already logged in.
 */
function addLoginOrLogoutLinkToNavigation() {
  const navigationElement = document.getElementById('navigation');
  if (!navigationElement) {
    console.warn('Navigation element not found!');
    return;
  }

  fetch('/login-status')
      .then((response) => {
        return response.json();
      })
      .then((loginStatus) => {
        if (loginStatus.isLoggedIn) {
          var xmlString = "<nav class=\"navbar navbar-expand-md navbar-dark fixed-top bg-primary\"><a class=\"navbar-brand\" href=\"#\">CodePool</a><button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarCollapse\" aria-controls=\"navbarCollapse\" aria-expanded=\"false\" aria-label=\"Toggle navigation\"><span class=\"navbar-toggler-icon\"></span></button><div class=\"collapse navbar-collapse\" id=\"navbarCollapse\"><ul id=\"navList\" class=\"navbar-nav mr-auto\"><li class=\"nav-item active\"><a class=\"nav-link\" href=\"/\">Home<span class=\"sr-only\">(current)</span></a></li><li class=\"nav-item\"><a class=\"nav-link\" href=\"/feed.html\">Pool</a></li></ul></div></nav>";
          const s = new DOMParser().parseFromString(xmlString, "text/xml");
          navigationElement.innerHTML = (new XMLSerializer()).serializeToString(s);
          const listElem = document.getElementById("navList");
          listElem.appendChild(createListItem(createLink(
              '/user-page.html?user=' + loginStatus.username, 'Your HotTub')));
          listElem.appendChild(createListItem(createLink(
              '/logout', 'Logout')));
        } else {
          var xmlString = "<nav class=\"navbar navbar-expand-md navbar-dark fixed-top bg-primary\"><a class=\"navbar-brand\" href=\"#\">CodingPool</a><button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarCollapse\" aria-controls=\"navbarCollapse\" aria-expanded=\"false\" aria-label=\"Toggle navigation\"><span class=\"navbar-toggler-icon\"></span></button><div class=\"collapse navbar-collapse\" id=\"navbarCollapse\"><ul class=\"navbar-nav mr-auto\"><li class=\"nav-item\"><a class=\"nav-link\" href=\"/login\">Login</a></li></ul></div></nav>";
          const s = new DOMParser().parseFromString(xmlString, "text/xml");
          navigationElement.innerHTML = (new XMLSerializer()).serializeToString(s);
          navigationElement.appendChild(
              createListItem(createLink('/login', 'Login')));
        }
      });
}
function createListItem(childElement) {
  const listItemElement = document.createElement('li');
  listItemElement.setAttribute('class', 'nav-item');
  listItemElement.appendChild(childElement);
  return listItemElement;
}

/**
 * Creates an anchor element.
 * @param {string} url
 * @param {string} text
 * @return {Element} Anchor element
 */
function createLink(url, text) {
  const linkElement = document.createElement('a');
  linkElement.appendChild(document.createTextNode(text));
  linkElement.setAttribute('class', 'nav-link');
  linkElement.href = url;
  return linkElement;
}
