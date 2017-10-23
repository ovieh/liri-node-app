(() => {
    const getKeys = require('./keys.js');
    const fs = require('fs');


    const choice = process.argv[2];
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
        let appendEntry = "";
        const params = {
            screen_name: 'fauxvieh',
            count: 20
        };
        client.get('statuses/user_timeline', params, (error, tweets, response) => {
            if (!error) {

                tweets.map(element => {
                    let entry = `${element.text} --${moment(element.created_at, 'ddd MMM DD HH:mm:ss ZZ YYYY')
                        .format('dddd, MMMM Do YYYY, h:mm:ss a')}\n`;
                    appendEntry = appendEntry.concat(entry);

                });

            }
            log(choice, appendEntry);
            console.log(appendEntry);

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

            let output = `\nArtist(s): ${artistArray.join(', ')} \nSong Title: ${data.tracks.items[0].name}\nURL: ${data.tracks.items[0].album.external_urls.spotify}\nAlbum: ${data.tracks.items[0].album.name}\n`;
            console.log(choice, output);
            log(choice, output);

        });
    };

    const getMovie = (input) => {
        const request = require('request');

        const queryURL = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=40e9cece";
        // console.log(queryURL);s
        let rottenScore = "No score";
        let imdbScore = "No Score";

        request(queryURL, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                if (typeof JSON.parse(body).Ratings[1] !== 'undefined') {
                    rottenScore = JSON.parse(body).Ratings[1].Value;
                }
                if (typeof JSON.parse(body).Ratings[0] !== 'undefined') {
                    imdbScore = JSON.parse(body).Ratings[0].Value;
                }
                // Refactor this to one string
                let movie = `Title: ${JSON.parse(body).Title}
Release Year: ${JSON.parse(body).Year}
Release Year: ${JSON.parse(body).Year}
IMDB Rating: ${imdbScore}
Rotten Tomatoes Rating: ${rottenScore}
Production Country(s): ${JSON.parse(body).Country}
Language: ${JSON.parse(body).Language}
Plot: ${JSON.parse(body).Plot}
"Actors: ${JSON.parse(body).Actors}\n`;

                console.log(movie);
                log(choice, movie);
            }
        });
    }

    const getText = () => {

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

    const log = (command, result) => {

        const entry = "\n" + command + "\n" + result;

        fs.appendFile('log.txt', entry, err => {
            if (err) throw err;

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
})(); //IIFE