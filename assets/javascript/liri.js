require("dotenv").config();

// connects to the keys file
var keys = require("./keys.js");

// calls the spotify key
var spotify = new Spotify(keys.spotify);