const $ = require('jquery');

const header = require('./scripts/header')();
const main = require('./scripts/main')();
const footer = require('./scripts/footer')();

$('body').append(header, main,  footer);

// document.body.appendChild(header);
// document.body.appendChild(footer);
