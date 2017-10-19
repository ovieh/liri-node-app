const getKeys = require('./keys.js');
const request = require('request');

// console.log(getKeys);

let choice = process.argv[2];
let input = process.argv[3];


const getTweets = () => {
    const Twitter = require('twitter');
    const moment = require('moment');
    const client = new Twitter(getKeys.twitterKeys);

    const params = {
        screen_name: 'fauxvieh',
        count: 20
    };
    client.get('statuses/user_timeline', params, (error, tweets, response) => {
        if (!error) {

            tweets.map(element => {
                console.log(`${element.text} --${moment(element.created_at, 'ddd MMM DD HH:mm:ss ZZ YYYY').format('dddd, MMMM Do YYYY, h:mm:ss a')}`);
            });

        }
    });
}

const getSpotify = () => {

};

const getMovie = () => {

}
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