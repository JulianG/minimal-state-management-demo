import React from 'react';
import { useGames } from './useGames';

export const App = () => {
  const games = useGames();
  return <pre>{JSON.stringify(games, null, 2)}</pre>;
};
