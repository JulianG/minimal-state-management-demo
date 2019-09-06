import React from 'react';
import ReactDOM from 'react-dom';

fetch('http://localhost:3001/games/')
  .then(response => response.json())
  .then(games => {
    ReactDOM.render(
      <pre>{JSON.stringify(games, null, 2)}</pre>,
      document.getElementById('root')
    );
  });
