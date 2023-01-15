// Call Riot API and return match data of X matches
// Store that data in DB
// Called from FE Admin (For now a button on the frontend)
var RiotRequest = require('riot-lol-api');
const config = require('config');
const key = config.get('apikey');

var riotRequest = new RiotRequest(key);

// 'summoner' is a string to identify the method being used currently
// See note about rate-limiting in the README.
// Also see https://developer.riotgames.com/rate-limiting.html#method-headers
riotRequest.request('na1', 'summoner', '/lol/summoner/v4/summoners/by-name/ysoseriious', function(err, data) {
    console.log(data);
});