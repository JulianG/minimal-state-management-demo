import React from 'react';
import { useGames } from './useGames';

type GamesContext = ReturnType<typeof useGames>;

const gamesContext = React.createContext<GamesContext | undefined>(undefined);

export const useGamesContext = (): GamesContext => {
  const context = React.useContext(gamesContext);
  if (!context) {
    throw new Error(
      'useGameContext must be used in a component within a GameContextProvider.'
    );
  }
  return context;
};

export const GamesContextProvider: React.FC = ({ children }) => {
  return <gamesContext.Provider value={useGames()}>{children}</gamesContext.Provider>;
};
