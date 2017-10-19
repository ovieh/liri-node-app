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

const getSpotify = (title) => {
    const Spotify = require('node-spotify-api');
    const spotify = new Spotify(getKeys.spotifyKeys);

    spotify.search({type: 'track', query: title, limit: 1}, (err, data) => {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // console.log(JSON.stringify(data));
        //console.log(data.tracks.items[0].album.artists.name);

        //prints artist
        console.log(data.tracks.items[0].album.artists[0].name);
        
        //prints song title
        console.log(data.tracks.items[0].name);

        //prints URL
        console.log(data.tracks.items[0].album.external_urls.spotify);

        //prints album
        console.log(data.tracks.items[0].album.name);



    });
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