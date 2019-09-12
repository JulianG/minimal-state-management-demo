import React from 'react';
import { Totals } from './Totals';
import { GameGrid } from './GameGrid';
import { GamesContextProvider } from '../GamesContext';

export const GamesScreen = () => {
  return (
    <GamesContextProvider>
      <Totals />
      <GameGrid />
    </GamesContextProvider>
  );
};
