// ==UserScript==
// @name         Nawddons
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Epiquipe
// @match        https://*.natureatwar.fr/*
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// @grant        none
// ==/UserScript==

'use strict';

$.ajax({
    url: 'https://raw.githubusercontent.com/despire907/Nawddons/main/Nawddons.js',
    success: (data) => {
       eval(data);
    }
})
