const getKeys = require('./keys.js');
const request = require('request');

// console.log(getKeys);

let choice = process.argv[2];

let input = "";

const nodeArgs = process.argv;

for (let i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        input = input + "+" + nodeArgs[i];
    } else {
        input += nodeArgs[i];
    }
}


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

    if (typeof title === 'undefined') {

    }

    spotify.search({
        type: 'track',
        query: title,
        limit: 1
    }, (err, data) => {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //Prints artists
        const artists = data.tracks.items[0].album.artists;
        let artistArray = [];
        artists.forEach(artist => {
            artistArray.push(artist.name);
        }, this);
        //Clean this up sometime in the future
        console.log(
            `\nArtist(s): ${artistArray.join(', ')} \nSong Title: ${data.tracks.items[0].name}\nURL: ${data.tracks.items[0].album.external_urls.spotify}\nAlbum: ${data.tracks.items[0].album.name}`
        );


    });
};

const getMovie = () => {
    const request = require('request');

}

switch (choice) {
    case "my-tweets":
        getTweets();
        break;
    case "spotify-this-song":
        if (typeof process.argv[3] !== "undefined") {          
            getSpotify(input);
        }
        else { 
            getSpotify("The Sign Ace of Base");                  
        }
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