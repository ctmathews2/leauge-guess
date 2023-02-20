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

const getTenMatchIds = function(req, res, next) {
    // Get match Ids
    console.log('im here')
    riotRequest.request('americas', 'match', '/lol/match/v5/matches/by-puuid/'+req.puuid+'/ids', function(err, data) {
        console.log('second');
        req.matchIds = data; //How much is data?
        next();
    });
}

const getTenStats = function(req, res, next) {
    console.log(req.matchIds);
    console.log(req.puuid);
    req.matchesData = [];
    for(let i = 0; i < req.matchIds.length; i++) {
        riotRequest.request('americas', 'match', '/lol/match/v5/matches/'+req.matchIds[i], function(err, data) {
            console.log('third');
            req.matchesData.push(data);
            if(i == req.matchIds.length - 1) {
                next();
            }
        })
    }
}

const sendData = function(req, res) {
    res.send(req.matchesData);
}

// create funtion to get 10 matches and stats
// send data back to console log data for now
// after try to send it to DB - if not already present? look at book.js api

matchRouter.get('/', [getPuuid, getMatchIds, getStats ]);
matchRouter.get('/seed', [getPuuid, getTenMatchIds, getTenStats, sendData]);

module.exports = matchRouter;