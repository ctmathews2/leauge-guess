import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ShowMatch() {
  const [match, setMatch] = useState();
  const [currentMatch, setCurrentMatch]  = useState();

  useEffect(() => {
    axios
      .get('http://localhost:8082/api/matches')
      .then((res) => {
        console.log('Result: \n', res.data);
        setMatch(res.data);
        setCurrentMatch(res.data[0]);
        console.log('what is this?', match);
      })
      .catch((err) => {
        console.log('Error from ShowMatch');
      });
  }, []);

  function getMatchData() {
    axios
    .post('http://localhost:8082/api/matches')
    .then((res) => {
      console.log('Result: \n', res);
      setMatch(res.data.id);
    })
    .catch((err) => {
      console.log('Error from getMatchData', err);
    });
  }

  // function to call seed api
  function seedMatchData() {
    axios
    .post('http://localhost:8082/api/matches/seed')
    .then((res) => {
      console.log('Seed Data:', res);
    })
    .catch((err) => {
      console.log('Error from seedMatchData', err);
    })
  }

  function showData() {
    console.log('data set', match);
    console.log('current', currentMatch);
  }

  return (
    <div className='show-match'>
      <div className="content">
      {/* <p>Here is Match Data: {JSON.stringify(match)}</p> */}
        <div className="scoreboard-container">
          <div className="blue-side-container">
            <button className="select-button" onClick={showData}>Blue Side</button>
            <div className="objectives">Objectives</div>
            <div className="scoreboard">
              <div className="player">
                <img className="champ-icon" src={`https://ddragon.leagueoflegends.com/cdn/13.4.1/img/champion/${currentMatch.players[0].champion}.png`}></img>
                <div className="player-stats">
                  <div className="player-items">
                    <img className="item-icon"></img>
                  </div>
                  <div className="player-damage"></div>
                  <p className="player-kda"></p>
                </div>
              </div>
            </div>
          </div>
          <div className="red-side-container">
            Red
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowMatch;