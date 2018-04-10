
var dotenv = require("dotenv").config();


var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
var keys = require('./keys.js');




var cmdArgs = process.argv;
var liriCommand = cmdArgs[2];
var liriArg = '';
for (var i = 3; i < cmdArgs.length; i++) {
	liriArg += cmdArgs[i] + ' ';
}


function retrieveTweets() {

    fs.appendFile('./log.txt', 'User Command: node liri.js my-tweets\n\n', (err) => {
            if (err) throw err;
    });

    var client = new Twitter(keys.twitter);
    console.log(client);

    var params = {screen_name: 'sepidflh', count: 20};

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (error) {
                console.log(error);
            }
            else{
                var outPut = 'User Tweets:'+ '-----------\r\n';
                for (var i = 0; i < tweets.length; i++) {
                    outPut += 'Created on: ' + tweets[i].created_at + '-----------\r\n' + 'Tweet content: ' + tweets[i].text + '-----------\r\n';
                }

                fs.appendFile('./log.txt', 'LIRI Response:\r\n' + outPut + '\r\n', (err) => {
                if (err) throw err;
                console.log(outPut);

                })
            }
    })
};
// retrieveTweets();


var movie;
function omdbMovieInfo(movie) {

                var nodeArgs = process.argv;
                var movie = "";
               
            for (var i = 3; i < nodeArgs.length; i++) {

                if (i > 3 && i < nodeArgs.length) {

                movie = movie + "+" + nodeArgs[i];

                }else {
                movie += nodeArgs[i];}
                
            }
    
	fs.appendFile('./log.txt', 'User Command: node liri.js movie-this ' + movie + '\r\n', (err) => {
		if (err) throw err;
	});

    var queryStr = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    console.log(queryStr);
	
	request(queryStr, function (error, response, body) {
        if (!error && response.statusCode === 200) {

                var data = JSON.parse(body);
                
		    	var outputStr = '------------------------\n' + 
								'Movie Information:\n' + 
								'Movie Title: ' + data.Title + '\n' + 
								'Year Released: ' + data.Released + '\n' +
								'IMDB Rating: ' + data.imdbRating + '\n' +
								'Country Produced: ' + data.Country + '\n' +
								'Language: ' + data.Language + '\n' +
								'Plot: ' + data.Plot + '\n' +
								'Actors: ' + data.Actors + '\n' + 
								'Rotten Tomatoes Rating: ' + data.tomatoRating + '\n' +
								'Rotten Tomatoes URL: ' + data.tomatoURL + '\n';

				fs.appendFile('./log.txt', 'LIRI Response:\r\n' + outputStr + '\n', (err) => {
					if (err) throw err;
					console.log(outputStr);
				});
			}
		});
    }
// omdbMovieInfo(movie);



function spotifySong(song) {
    console.log(song);

    var spotifyApi = new Spotify(keys.spotify);
   
    song = song || 'Ace of Base';
	fs.appendFile('./log.txt', 'User Command: node liri.js spotify-this-song ' + song + '\r\n', (err) => {
		if (err) throw err;
	});

	// 	var search;
	// if (song === undefined) {
	// 	search = 'The Sign Ace Of Base';
	// } else {
    // 	search = song;}
    


	spotifyApi.search({ type: 'track', query: song}, function(error, data) {
	   
        if (error) {
            return console.log('Error occurred: ' + error);
          }
				
			    var songInfo = data.tracks.items[0];
				var outputStr = '------------------------\n' + 
								'Song Information:\n' + 
								'------------------------\r\n' + 
								'Song Name: ' + songInfo.name + '\n'+ 
								'Artist: ' + songInfo.artists[0].name + '\n' + 
								'Album: ' + songInfo.album.name + '\n' + 
								'Preview Here: ' + songInfo.preview_url + '\n';

				
				fs.appendFile('./log.txt', 'LIRI Response:\r\n' + outputStr + '\n', (err) => {
					if (err) throw err;
					console.log(outputStr);
				});
	});
}
// console.log(liriArg);
// spotifySong(liriArg);
// console.log(spotifySong);

function doAsItSays() {
	
	fs.appendFile('./log.txt', 'User Command: node liri.js do-what-it-says\r\n', (err) => {
		if (err) throw err;
	});

	fs.readFile('./random.txt', 'utf8', function (error, data) {
		if (error) {
			console.log(error);
			return;
		} else {
			// Split out the command name and the parameter name
			var cmdString = data.split(',');
			var command = cmdString[0].trim();
			var param = cmdString[1].trim();

			switch(command) {
				case 'my-tweets':
					retrieveTweets(); 
					break;

				case 'movie-this':
                    omdbMovieInfo(param);
                    break;
                    
                case 'spotify-this-song':
					spotifySong(param);
					break;
			}
		}
	});
}

switch (liriCommand) {
    case "my-tweets":
      retrieveTweets();
      break;
    
    case "movie-this":
      omdbMovieInfo(movie);
      break;
    
    case "spotify-this-song":
      spotifySong(liriArg);
      break;
    
    case "do-what-it-says":
      doAsItSays();
      break;
}


    

