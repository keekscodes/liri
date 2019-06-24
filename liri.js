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

// FUNCTIONS

function userInput(userCommand, inputParameter) {
    switch (userCommand) {
        case 'concert-this':
            concertInfo(inputParameter);
            break;

        case 'spotify-this-song':
            songInfo(inputParameter);
            break;

        case 'movie-this':
            movieInfo(inputParameter);
            break;

        case 'do-what-it-says':
            randomInfo();
            break;

        default:
            console.log("Hmmm...LIRI doesn't quite know that");
    }
}


// concert-this artist/band name here
var concertInfo = function(inputParameter) {
    var queryURL = `https://rest.bandsintown.com/artists/${inputParameter}/events?app_id=codingbootcamp`;

    axios.get(queryURL)
        .then(function(response) {
            var jsonRes = response.data;

            if (!jsonRes.length) {
                console.log(`There are currently no events scheduled for ${artist}. Check back again at a later time.`);
                return;
            }

            console.log(`Check out these upcoming concerts for ${artist}:`);

            for (let i = 0; i < jsonRes.length; i++) {
                let event = jsonRes[i];


                console.log(`${event.venue.city}, ${event.venue.region || event.venue.country} at ${event.venue.name} ` + moment(event.dateTime).format("MM/DD/YYYY"));

            }

        });
};