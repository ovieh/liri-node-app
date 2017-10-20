const getKeys = require('./keys.js');

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

// Good effort
// const join = (arr) => {
//     let joinedArray = [];
//     arr.forEach( element => joinedArray.push(element.subElement) );
//     return joinedArray;
// };

const getSpotify = (title) => {
    const Spotify = require('node-spotify-api');
    const spotify = new Spotify(getKeys.spotifyKeys);

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

const getMovie = (input) => {
    const request = require('request');

    const queryURL = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=40e9cece";
    console.log(queryURL);

    request(queryURL, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Production Country(s): " + JSON.parse(body).Country);

            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
}

const getText = () => {
    var fs = require('fs');

    fs.readFile('random.txt', 'utf-8', (error, data) => {
        if (error) {
            return console.log(error);
        }

        const joinedCommand = data.split(",");

        //This doesn't seem DRY to me. *shrugs*
        switch (joinedCommand[0]) {
            case "spotify-this-song":
                getSpotify(joinedCommand[1]);
                break;
            case "movie-this":
                getMovie(joinedCommand[1]);
                break;
            default:
                console.log("invalid text file");
        }
    });
}


switch (choice) {
    case "my-tweets":
        getTweets();
        break;
    case "spotify-this-song":
        if (typeof process.argv[3] !== "undefined") {
            getSpotify(input);
        } else {
            getSpotify("The Sign Ace of Base");
        }
        break;

    case "movie-this":
        if (typeof process.argv[3] !== "undefined") {
            getMovie(input);
        } else {
            getMovie("Mr. Nobody");
        }
        break;
    case "do-what-it-says":
        getText();
        break;
    default:
        console.log("Invalid user input");
        break;
}