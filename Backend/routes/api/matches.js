// routes/api/matches.js

const express = require('express');
const matchRouter = express.Router();

const Match = require('../../models/Match');

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
        req.puuid = data.puuid;
        next(); //data.puuid
    });
}

const getMatchIds = function(req, res, next) {
    // Get match Ids
    riotRequest.request('americas', 'match', '/lol/match/v5/matches/by-puuid/'+req.puuid+'/ids', function(err, data) {
        req.matchId = data[0];
        next(); //data[0]
    });
}

const getStats = function(req, res) {
    riotRequest.request('americas', 'match', '/lol/match/v5/matches/'+req.matchId, function(err, data) {
        res.send(data);
    });
}

const getTenMatchIds = function(req, res, next) {
    // Get match Ids
    riotRequest.request('americas', 'match', '/lol/match/v5/matches/by-puuid/'+req.puuid+'/ids', function(err, data) {
        req.matchIds = data; //How much is data?
        next();
    });
}

const getTenStats = function(req, res, next) {
    req.matchesData = [];
    for(let i = 0; i < req.matchIds.length; i++) {
        riotRequest.request('americas', 'match', '/lol/match/v5/matches/'+req.matchIds[i], function(err, data) {
            req.matchesData.push(data);
            if(i == req.matchIds.length - 1) {
                next();
            }
        })
    }
}

const sendData = function(req, res) {
    let dataList = []
    for(let i = 0; i < req.matchesData.length; i++) {
        let match = req.matchesData[i];
        let playersList = [];

        for(let n = 0; n < match.info.participants.length; n++) {
            let playerData = match.info.participants[n];
            let player = {
                team_id: playerData.teamId,
                gold: playerData.goldEarned,
                level: playerData.champLevel,
                items: [
                    playerData.item0,
                    playerData.item1,
                    playerData.item2,
                    playerData.item3,
                    playerData.item4,
                    playerData.item5,
                    playerData.item6
                ],
                damage: playerData.totalDamageDealtToChampions,
                kills: playerData.kills,
                deaths: playerData.deaths,
                assists: playerData.assists,
                position: playerData.teamPosition
            }
            playersList.push(player);
        }

        let teamsList = [];
        for(let t = 0; t < match.info.teams.length; t++) {
            let team = {
                objectives: {
                    baron: match.info.teams[t].objectives.baron.kills,
                    champion: match.info.teams[t].objectives.champion.kills,
                    dragon: match.info.teams[t].objectives.dragon.kills,
                    inhibitor: match.info.teams[t].objectives.inhibitor.kills,
                    riftHerald: match.info.teams[t].objectives.riftHerald.kills,
                    tower: match.info.teams[t].objectives.tower.kills,
                },
                teamId: match.info.teams[t].teamId,
                win: match.info.teams[t].win
            }
            teamsList.push(team);
        }

        data = {
            match_id: match.metadata.matchId,
            game_mode: match.info.gameMode,
            queue_id: match.info.queueId,
            players: playersList,
            teams: teamsList
        }
        dataList.push(data);
        Match.create(data)
            .then(match => console.log('pushed match to db'))
            .catch(err => console.log('error occured', err));
    }
    res.send(dataList);
}

matchRouter.get('/', [getPuuid, getMatchIds, getStats ]);
matchRouter.get('/seed', [getPuuid, getTenMatchIds, getTenStats, sendData]);

module.exports = matchRouter;