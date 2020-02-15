var dotenv = require("dotenv").config();
console.log(dotenv)

var Spotify = require('node-spotify-api');

// connects to the keys file
var keys = require("./keys.js");


// !Spotify search
// calls the spotify key
var spotify = new Spotify(keys.spotify);
var spotifyThis = function () {
    //
    // var song = process.argv.slice(2);
    spotify
        .search({
            type: 'track',
            query: 'Gone',
            limit: 1
        })
        .then(function (response) {
            var results = response.tracks.items.album;
            console.log(results);
        })
        .catch(function (err) {
            console.log(err);
        });
}

spotifyThis();