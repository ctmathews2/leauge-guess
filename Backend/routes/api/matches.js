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
matchRouter.get('/', (req, res) => {
    riotRequest.request('na1', 'summoner', '/lol/summoner/v4/summoners/by-name/ysoseriious', function(err, data) {
        res.send(data);
    });
});

module.exports = matchRouter;