import React from 'react';
import { GameComponent } from './GameComponent';
import { useGames } from '../useGames';

export const GameGrid = () => {
  const { games, error, isPending, markAsFinished } = useGames();
  
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
