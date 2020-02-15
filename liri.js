var dotenv = require("dotenv").config();
// console.log(dotenv)

var Spotify = require('node-spotify-api');

// connects to the keys file
var keys = require("./keys.js");

// pull in user input
var userCommand = process.argv[2];
var userItem = process.argv.slice(3);

// !Spotify search
// calls the spotify key
var spotify = new Spotify(keys.spotify);
var spotifyThis = function (song) {
    console.log("Looking for your song")

    spotify.search({
        type: 'track',
        query: song,
        limit: 1
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data.tracks.items[0].album.artists[0].name);
    });
}

// spotifyThis(song)

//! Switch case function for user input
switch (userCommand) {
    case "concert-this":
        concertThis(userItem);
        break;
    case "spotify-this-song":
        spotifyThis(userItem);
        break;
    case "movie-this":
        movieThis(userItem);
        break;
    case "do-what-it-says":
        doItFunction(userItem);
        break;
};