var dotenv = require("dotenv").config();
// console.log(dotenv)

var Spotify = require('node-spotify-api');

// connects to the keys file
var keys = require("./keys.js");

var userCommand = process.argv[2]
var userItem = process.argv.splice[3]


// !Spotify search
// calls the spotify key
var spotify = new Spotify(keys.spotify);
var spotifyThis = function () {
    //
    // var song = process.argv.slice(2);
    spotify.search({
        type: 'track',
        query: 'Just What to Say',
        limit: 1
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data.tracks.items[0].album.artists[0].name);
    });
}
spotifyThis();