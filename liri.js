const getKeys = require('./keys.js');
const request = require('request');

// console.log(getKeys);

let choice = process.argv[2];
let input = process.argv[3];

switch (choice) {
    case "my-tweets":
        getTweets();
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

function getTweets() {
    const Twitter = require('twitter');

    const client = new Twitter({
        consumer_key: getKeys.twitterKeys.consumer_key,
        consumer_secret: getKeys.twitterKeys.consumer_secret,
        access_token_key: getKeys.twitterKeys.access_token_key,
        access_token_secret: getKeys.twitterKeys.access_token_secret
    });

    const params = {
        screen_name: 'fauxvieh'
    };
    client.get('statuses/user_timeline', params, (error, tweets, response) => {
        if (!error) {
            console.log(tweets);
        }
    });
}

let getSpotify = () => {

};

let getMovie = () => {

}