import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ShowMatch() {
  const [match, setMatch] = useState([]);

  useEffect(() => {
    // axios
    //   .get('http://localhost:8082/api/matches')
    //   .then((res) => {
    //     console.log('Result: \n', res);
    //     setMatch(res.data.id);
    //   })
    //   .catch((err) => {
    //     console.log('Error from ShowMatch');
    //   });
  }, []);

  function getMatchData() {
    axios
    .get('http://localhost:8082/api/matches')
    .then((res) => {
      console.log('Result: \n', res);
      setMatch(res.data.id);
    })
    .catch((err) => {
      console.log('Error from ShowMatch');
    });
  }

  return (
    <div className='ShowBookList'>
      <div className='container'>
        <button onClick={getMatchData}>Get Match Data</button>
        {match}
      </div>
    </div>
  );
}

export default ShowMatch;