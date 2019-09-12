import React from 'react';
import { GameComponent } from './GameComponent';
import { useGamesContext } from '../GamesContext';

export const GameGrid = () => {
  const { games, error, isPending, markAsFinished } = useGamesContext();

  return (
    <div className="gamegrid">
      {error && <pre>ERROR! {error}...</pre>}
      {isPending && <pre>LOADING...</pre>}
      {games.map(game => (
        <GameComponent key={game.id} game={game} markAsFinished={markAsFinished} />
      ))}
    </div>
  );
};
