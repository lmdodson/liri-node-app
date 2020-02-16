var dotenv = require("dotenv").config();
// console.log(dotenv)

var axios = require("axios");

var Spotify = require("node-spotify-api");
// connects to the keys file
var keys = require("./keys.js");

// pull in user input
var userCommand = process.argv[2];
var userItem = process.argv.slice(3).join(" ");

//! Bands in town search

//! Spotify search
// calls the spotify key
var spotify = new Spotify(keys.spotify);

//Spotify search function
var spotifyThis = function(song) {
	if (!userItem) {
		song = "Never Gonna Give You Up";
	}

	console.log("Looking for your song");

	// Spotify api call
	spotify.search(
		{
			type: "track",
			query: song,
			limit: 1
		},
		function(err, data) {
			if (err) {
				return console.log("Error occurred: " + err);
			}

			var songData = [
				"Song: " + song,
				"Artist(s): " + data.tracks.items[0].artists[0].name,
				"Album Name: " + data.tracks.items[0].album.name
			].join("\n\n");
			console.log(songData);
		}
	);
};

//! OMDB search
var movieThis = function(movie) {
	axios
		.get(
			"http://www.omdbapi.com/?t=" +
				movie +
				"&y=&plot=short&apikey=trilogy"
		)
		.then(function(response) {
			var movieData = [
				"Movie Title: " + movie,
				"Release Date: " + response.data.Released,
				"IMDB Rating: " + response.data.imdbRating,
				"Rotten Tomatoes Rating: " + response.data.Ratings[1],
				"Production Country: " + response.data.Country,
				"Movie Language(s): " + response.data.Language,
				"Plot: " + response.data.Plot,
				"Actors: " + response.data.Actors
			].join("\n\n");
			console.log(movieData);
		})
		.catch(function(error) {
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log("---------------Data---------------");
				console.log(error.response.data);
				console.log("---------------Status---------------");
				console.log(error.response.status);
				console.log("---------------Status---------------");
				console.log(error.response.headers);
			} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an object that comes back with details pertaining to the error that occurred.
				console.log(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log("Error", error.message);
			}
			console.log(error.config);
		});
};

//! Switch case function for user input
switch (userCommand) {
	case "concert-this":
		concertThis();
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
}
