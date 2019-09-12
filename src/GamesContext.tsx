import React from 'react';
import { useGames } from './useGames';

type GamesContext = ReturnType<typeof useGames>;

export const gamesContext = React.createContext<GamesContext>({
  games: [],
  error: null,
  isPending: true,
  markAsFinished: () => {}
});

export const GamesContextProvider: React.FC = ({ children }) => {
  return <gamesContext.Provider value={useGames()}>{children}</gamesContext.Provider>;
};