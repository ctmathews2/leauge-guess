const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
  match_id: String,
  game_mode: String,
  queue_id: Number,
  players: [
    {
        champion: String,
        team_id: Number,
        gold: Number,
        level: Number,
        items: [Number],
        damage: Number,
        kills: Number,
        deaths: Number,
        assists: Number
    }
  ],
  teams: [
    {
        objectives: {
            baron: Number,
            champion: Number,
            dragon: Number,
            inihibitor: Number,
            riftHerald: Number,
            tower: Number
        },
        teamId: Number,
        win: Boolean
    }
  ]
});

module.exports = Match = mongoose.model('match', MatchSchema);