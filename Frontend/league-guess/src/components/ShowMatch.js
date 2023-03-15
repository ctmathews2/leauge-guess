import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function ShowMatch() {
  const [match, setMatch] = useState();
  const [matchIndex, setMatchIndex] = useState(1);
  const [currentMatch, setCurrentMatch]  = useState({});
  const [gold, setGold] = useState(6);
  const [points, setPoints] = useState(0);
  const [hideObjectives, setHideObjectives] = useState([true,true]);
  const [hidePlayerBlue, setHidePlayerBlue] = useState([true, true, true, true, true]);
  const [hidePlayerRed, setHidePlayerRed] = useState([true, true, true, true, true]);

  const navigate = useNavigate(); 

  useEffect(() => {
    axios
      .get('http://localhost:8082/api/matches')
      .then((res) => {
        setMatch(res.data);
        setCurrentMatch(res.data[0]);
      })
      .catch((err) => {
        console.log('Error from ShowMatch', err);
      });
  }, []);

  function chooseWinner(index) {
    if(currentMatch.teams[index].win === true) {
      console.log('Correct!');
      setPoints(points + 500 + (100 * gold));
      setMatchIndex(matchIndex + 1);
      setCurrentMatch(match[matchIndex]);
      setHidePlayerBlue([true, true, true, true, true]);
      setHidePlayerRed([true, true, true, true, true]);
      setHideObjectives([true, true]);
      setGold(6);
    } else {
      console.log('Incorrect');
      navigate("/", { state: { points: points} });
    }
  }

  function toggleObjectives (index) {
    if (gold >= 3) {
      let temp = [...hideObjectives];
      temp[index] = false;
      setHideObjectives(temp);
      setGold(gold - 3);
    }
  }

  return (
    <div className='show-match'>
      <h1 className='title'>Who Won?</h1>
      <h2>Gold: {gold}    Points: {points}</h2>
      <div className="content">
        <div className="scoreboard-container">
          <div className="blue-side-container">
            <button className="select-button" onClick={() => {chooseWinner(0)}}>Blue Side Won</button>
            <div className="objectives" >
              {hideObjectives[0] && <button className="reveal-obj" onClick={()=>{toggleObjectives(0)}}>Reveal Objectives (3G)</button>}
              {!hideObjectives[0] && <ObjectivesFunc match={currentMatch} team={0}/>}
            </div>
            <div className="scoreboard">
              <TestFunc stuff={currentMatch} team={100} gold={[gold, setGold]} playerHide={[hidePlayerBlue, setHidePlayerBlue]}/>
            </div>
          </div>
          <div className="red-side-container">
            <button className="select-button" onClick={() => {chooseWinner(1)}}>Red Side Won</button>
            <div className="objectives">
              {hideObjectives[1] && <button className="reveal-obj" onClick={()=>{toggleObjectives(1)}}>Reveal Objectives (3G)</button>}
              {!hideObjectives[1] && <ObjectivesFunc match={currentMatch} team={1}/>}
            </div>
            <div className="scoreboard">
              <TestFunc stuff={currentMatch} team={200} gold={[gold, setGold]} playerHide={[hidePlayerRed, setHidePlayerRed]}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowMatch;

export function TestFunc(props) {
    // Can this have its own state?
    // const [hidden, setHidden] = useState([true,true,true,true,true]);
    // console.log('here', hidden)

    function hello() {
      console.log('yoooo');
    }

    function changeElement(index) {
      if(props.gold[0] >= 1) {
        let temp = [...props.playerHide[0]];
        temp[index] = false;
        props.playerHide[1](temp);
        props.gold[1](props.gold[0] - 1);
      }
    };

    if(props.stuff) {
      const currentMatch = props.stuff;
      const champs = currentMatch?.players;
      console.log(props);
      const BluePlayers = champs?.filter(champ => champ.team_id === props.team).map((champ, index) => 
          <div key={champ.champion} className={props.team == 100 ? 'player-blue' : 'player-red'}>
            <img className="champ-icon" src={`https://ddragon.leagueoflegends.com/cdn/13.4.1/img/champion/${champ.champion}.png`}></img>
            <div className="player-stats">
              {props.playerHide[0][index] && <button className="reveal-button" onClick={()=>{changeElement(index)}}>Reveal Player Stats (1G)</button>}
              {!props.playerHide[0][index] && <div className={props.team == 100 ? 'player-items-blue' : 'player-items-red'}>
                <ItemsFunc champ={champ} />
              </div>}
              {!props.playerHide[0][index] && <div className="player-info">
                <p className="player-level">Level: {champ.level}</p>
                <p className="player-damage">Damage: {champ.damage}</p>
                <p className="player-kda">KDA: {champ.kills}/{champ.deaths}/{champ.assists}</p>
              </div>}
            </div>
          </div>
          // <div>Testing!</div>
      )
  
      // console.log('Blue Players: ', BluePlayers);
  
      return(
        BluePlayers
      );
    }
    // console.log('This func has been called', props);
    return <div>Hello World</div>
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

export function ObjectivesFunc(props) {
  if(props.match.teams){
    console.log(props.match);
    const objectives = props.match.teams[props.team].objectives;
    return (
      <div className="objectives-container">
        <p>Barons: {objectives.baron}</p>
        <p>Dragons: {objectives.dragon}</p>
        <p>Heralds: {objectives.riftHerald}</p>
        {/* <p>Structues: {objectives.tower}</p> Too Much Info*/}
        <p>Kills: {objectives.champion}</p>
      </div>
    )
  }
  return <div>Goodbye World</div>
}

  // Legacy function to call seed api
  // function seedMatchData() {
  //   axios
  //   .post('http://localhost:8082/api/matches/seed')
  //   .then((res) => {
  //     console.log('Seed Data:', res);
  //   })
  //   .catch((err) => {
  //     console.log('Error from seedMatchData', err);
  //   })
  // }