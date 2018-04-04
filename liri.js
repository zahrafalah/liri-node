var dotenv = require("dotenv").config();


var Twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
var keys = require('./keys.js');


var cmdArgs = process.argv;
var liriCommand = cmdArgs[2];


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
                var outPut = 'User Tweets:';
                for (var i = 0; i < tweets.length; i++) {
                    outPut += 'Created on: '+ '-----------' + tweets[i].created_at + '-----------' + 'Tweet content: ' + tweets[i].text;
                }

                fs.appendFile('./log.txt', 'LIRI Response:\n\n' + outPut + '\n', (err) => {
                if (err) throw err;
                console.log(outPut);

                })
            }
    })
};
retrieveTweets();

