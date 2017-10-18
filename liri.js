const getKeys = require('./keys.js');

//console.log(getKeys);

let choice = process.argv[2];
let input = process.argv[3];

switch (choice) {
    case "my-tweets":
        getTweets(input);
        break;
    case "spotify-this-song":
        getSpotify(input);
        break;
    case "movie-this":
        getMovie(input);
        break;
    case "do-what-it-says":
        console.log(input);
        break;
    default:
        console.log("Invalid user input");
        break;
}