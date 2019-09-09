import React from 'react';
import { useGames } from './useGames';
import { GameComponent } from './GameComponent';

export const App = () => {
  const { games, error, isPending, markAsFinished } = useGames();

  return (
    <>
      {error && <pre>ERROR! {error}...</pre>}
      {isPending && <pre>LOADING...</pre>}
      <ol>
        {games.map(game => (
          <li key={game.id}>
            <GameComponent game={game} markAsFinished={markAsFinished} />
          </li>
        ))}
      </ol>
    </>
  );
};

