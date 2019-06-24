// read and set environment variables with the dotenv package
require("dotenv").config();


// VARIABLES

// fs read/write
var fs = require("fs");

// node-spotify-api npm
var Spotify = require("node-spotify-api");

// axios npm
var axios = require("axios");

// moment-api
var moment = require("moment");

// required to import the keys.js file and store it in a variable
var keys = require("./keys.js");

// initialize spotify api
var spotify = new Spotify(keys.spotify);


// capture user input
var userCommand = process.argv[2];
var inputParameter = process.argv[3];


userInput(userCommand, inputParameter);