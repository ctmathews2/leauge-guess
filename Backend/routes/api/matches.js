// routes/api/matches.js

const express = require('express');
const matchRouter = express.Router();

var RiotRequest = require('riot-lol-api');
const config = require('config');
const key = config.get('apikey');

var riotRequest = new RiotRequest(key);

// Load Book model
// const Book = require('../../models/Book');

// @route GET api/books/test
// @description tests books route
// @access Public
matchRouter.get('/test', (req, res) => res.send('match route testing!'));

// @route GET api/books
// @description Get all books
// @access Public
// matchRouter.get('/', async (req, res) => {
//     // res.send(getPuuid('ysoseriious'))
//     res.send(await getPuuid('ysoseriious'));
// });
const getPuuid = function(req, res, next) {
    // Get ID
    riotRequest.request('na1', 'summoner', '/lol/summoner/v4/summoners/by-name/ysoseriious', function(err, data) {
        console.log('first');
        req.puuid = data.puuid;
        console.log(next);
        next(); //data.puuid
    });
}

const getMatchIds = function(req, res, next) {
    // Get match Ids
    console.log('im here')
    riotRequest.request('americas', 'match', '/lol/match/v5/matches/by-puuid/'+req.puuid+'/ids', function(err, data) {
        console.log('second');
        req.matchId = data[0];
        next(); //data[0]
    });
}

const getStats = function(req, res) {
    console.log(req.matchId);
    console.log(req.puuid)
    riotRequest.request('americas', 'match', '/lol/match/v5/matches/'+req.matchId, function(err, data) {
        console.log('third');
        res.send(data);
    });
}

matchRouter.get('/', [getPuuid, getMatchIds, getStats ]);

module.exports = matchRouter;