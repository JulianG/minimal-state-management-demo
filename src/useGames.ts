import React from 'react';

const getGames = () => {
  return fetch('http://localhost:3001/games/').then(response => response.json());
};

export const useGames = () => {
  const [games, setGames] = React.useState([]);

  React.useEffect(() => {
    getGames().then(games => setGames(games));
  }, []);

  return games;
};
