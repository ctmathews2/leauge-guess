import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ShowMatch() {
  const [match, setMatch] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8082/api/matches')
      .then((res) => {
        console.log('Result: \n', res.data);
        setMatch(res.data);
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
    .get('http://localhost:8082/api/matches/seed')
    .then((res) => {
      console.log('Seed Data:', res);
    })
    .catch((err) => {
      console.log('Error from seedMatchData', err);
    })
  }

  return (
    <div>
      <p>Here is Match Data: {JSON.stringify(match)}</p>
    </div>
  );
}

export default ShowMatch;