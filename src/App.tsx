import React from 'react';

const getGames = () => {
  return fetch('http://localhost:3001/games/').then(response => response.json());
};

export const App = () => {
  const [games, setGames] = React.useState([]);

  React.useEffect(() => {
    getGames().then(games => setGames(games));
  }, []);

  return <pre>{JSON.stringify(games, null, 2)}</pre>;
};
