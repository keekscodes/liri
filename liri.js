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
var inputParameter = process.argv.slice(3).join(" ");;

// FUNCTIONS //


// concert-this artist/band name here
var concertInfo = function(inputParameter) {
    var queryURL = "https://rest.bandsintown.com/artists/" + inputParameter + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(

        function(response) {
            var jsonEvents = response.data;

            if (!jsonEvents.length) {
                console.log("There are currently no events scheduled for: " + inputParameter + ". Check back again at a later time.");
                return;
            }

            console.log(`Check out these upcoming concerts for ${inputParameter}`);

            for (var i = 0; i < jsonEvents.length; i++) {
                var event = jsonEvents[i];

                // info about each concert
                console.log("----------------EVENT INFO----------------");
                console.log(i);
                console.log("VENUE: " + event.venue.name);
                console.log("LOCATION: " + event.venue.city || event.venue.country);
                console.log("DATE: " + moment(event.datetime).format("MM/DD/YYYY"));
            }
        }
    )
}

// spotify-this-song

var spotifyInfo = function(inputParameter) {
    if (inputParameter === undefined) {
        inputParameter = "The Sign";
    }

    spotify.search({
            type: "track",
            query: inputParameter
        },
        function(err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }

            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                console.log("----------------SONG INFO----------------");
                console.log(i);
                console.log("ARTIST(S): " + songs[i].artists[0].name);
                console.log("SONG NAME: " + songs[i].name);
                console.log("PREVIEW: " + songs[i].preview_url);
                console.log("ALBUM: " + songs[i].album.name);
            }
        }
    );
};


// movie-this

var movieInfo = function(inputParameter) {
    if (inputParameter === undefined) {
        inputParameter = "Mr. Nobody"
        console.log("---------------------------");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");

    }
    var queryUrl = "http://www.omdbapi.com/?t=" + inputParameter + "&y=&plot=full&tomatoes=true&apikey=trilogy"

    axios.get(queryUrl)
        .then(function(response) {
            var movies = response.data;

            console.log("----------------MOVIE INFO----------------");
            console.log("Title: " + movies.Title);
            console.log("Release Year: " + movies.Year);
            console.log("IMDB Rating: " + movies.Rated);
            console.log("Country of Production: " + movies.Country);
            console.log("Language: " + movies.Language);
            console.log("Plot: " + movies.Plot);
            console.log("Actors: " + movies.Actors);
            console.log("Rotten Tomatoes Rating: " + movies.Ratings[1].Value);
            console.log("----------------------------------------");
        })
}

// do-what-it-says

var doWhatItSays = function() {
    fs.readFile('random.txt', 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        var dataArr = data.split(',');
        userInput(dataArr[0], dataArr[1]);
    });
}

// Function for determining which command is executed
var userInput = function(command, userParam) {
    switch (command) {
        case "concert-this":
            concertInfo(userParam);
            break;
        case "spotify-this-song":
            spotifyInfo(userParam);
            break;
        case "movie-this":
            movieInfo(userParam);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log("Hmmm...LIRI doesn't quite know that");
    }
};

// user input command line and executes correct function accordingly
var runUser = function(command, userParam) {
    userInput(command, userParam);
};

runUser(userCommand, inputParameter);