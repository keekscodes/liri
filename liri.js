// read and set environment variables with the dotenv package
require("dotenv").config();

/// VARIABLES ////

// node-spotify-api npm
var Spotify = require("node-spotify-api");

// required to import the keys.js file and store it in a variable
var keys = require("./keys.js");

// axios npm
var axios = require("axios");

// moment-api
var moment = require("moment");

// fs read/write
var fs = require("fs");

// initialize spotify api
var spotify = new Spotify(keys.spotify);


// capture user input
var userCommand = process.argv[2];
var inputParameter = process.argv[3];

// FUNCTIONS
userInput(userCommand, inputParameter);



// concert-this artist/band name here




var concertInfo = function(inputParameter) {
    var queryURL = "https://rest.bandsintown.com/artists/" + inputParameter + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(
        function(response) {
            var jsonData = response.data;

            if (!jsonData.length) {
                console.log(`There are currently no events scheduled for ${inputParameter}. Check back again at a later time.`);
                return;
            }

            console.log(`Check out these upcoming concerts for ${inputParameter}:`);

            for (var i = 0; i < jsonData.length; i++) {
                var show = jsonData[i];

                // Print data about each concert
                // If a concert doesn't have a region, display the country instead
                // Use moment to format the date
                console.log(
                    show.venue.city +
                    "," +
                    (show.venue.region || show.venue.country) +
                    " at " +
                    show.venue.name +
                    " " +
                    moment(show.datetime).format("MM/DD/YYYY")
                );
            }
        }
    );
};
console.log(event);


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