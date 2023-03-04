import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ShowMatch() {
  const [match, setMatch] = useState();
  const [currentMatch, setCurrentMatch]  = useState({});

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

  useEffect(() => {
    console.log('this is current match now', currentMatch)
    // TestFunc();
  }, [currentMatch]);

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

  // do champion stuff here
  // console.log(test);

  // also look at:
  /**
   * function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}
   */

  return (
    <div className='show-match'>
      <div className="content">
      {/* <p>Here is Match Data: {JSON.stringify(match)}</p> */}
        <div className="scoreboard-container">
          <div className="blue-side-container">
            <button className="select-button" onClick={showData}>Blue Side</button>
            <div className="objectives">Objectives</div>
            <div className="scoreboard">
              <TestFunc stuff={currentMatch} team={currentMatch.players[0].team_id}/>
            </div>
          </div>
          <div className="red-side-container">
          <button className="select-button" onClick={showData}>Red Side</button>
            <div className="objectives">Objectives</div>
            <div className="scoreboard">
              <TestFunc stuff={currentMatch} team={currentMatch.players[5].team_id}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowMatch;

export function TestFunc(props) {
    console.log('This func has been called', props);
    const currentMatch = props.stuff;
    const champs = currentMatch?.players;

    const BluePlayers = champs?.filter(champ => champ.team_id === props.team).map(champ => 
        <div key={champ.champion} className="player">
          <img className="champ-icon" src={`https://ddragon.leagueoflegends.com/cdn/13.4.1/img/champion/${champ.champion}.png`}></img>
          <div className="player-stats">
            <div className="player-items">
              <ItemsFunc champ={champ} />
            </div>
            <div className="player-info">
              <p className="player-level">Level: {champ.level}</p>
              <p className="player-damage">Damage: {champ.damage}</p>
              <p className="player-kda">KDA: {champ.kills}/{champ.deaths}/{champ.assists}</p>
            </div>
          </div>
        </div>
        // <div>Testing!</div>
    )

    console.log('Blue Players: ', BluePlayers);

    return(
      BluePlayers
    );
}

export function ItemsFunc(props) {
  const items = props.champ.items;
  const itemsComp = items.filter(item => item != 0).map(item =>
    <img key={item.toString()} className="item-icon" src={`https://ddragon.leagueoflegends.com/cdn/13.4.1/img/item/${item}.png`}></img>
  )
  return (
    itemsComp
  )
}