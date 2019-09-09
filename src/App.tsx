import React from 'react';
import { useGames } from './useGames';
import { GameComponent } from './GameComponent';

export const App = () => {
  const { games, error, isPending, markAsFinished } = useGames();

  return (
    <>
      <h1>My Favourite Commodore 64 Games</h1>
      {error && <pre>ERROR! {error}...</pre>}
      {isPending && <pre>LOADING...</pre>}
      <div className="gamegrid">
        {games.map(game => (
          <GameComponent key={game.id} game={game} markAsFinished={markAsFinished} />
        ))}
      </div>
    </>
  );
};