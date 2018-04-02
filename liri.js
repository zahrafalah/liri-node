require("dotenv").config();


var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');
var keys = require('./keys.js');


fs.appendFile('./log.txt', 'User Command: node liri.js my-tweets\n\n', (err) => {
    if (err) throw err;
});
var client = new Twitter(twitterKeys);
var params = {screen_name: 'sepidflh', count: 20};


client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(error);
  }
  else{
    var outPut = 'User Tweets:';
    for (var i = 0; i < tweets.length; i++) {
        outPut += 'Created on: ' + tweets[i].created_at +'Tweet content: ' + tweets[i].text;
    }

  }
});

