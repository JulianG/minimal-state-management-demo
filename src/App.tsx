import React from 'react';
import { useGames } from './useGames';

export const App = () => {
  const { games, error, isPending } = useGames();

  return (
    <>
      {error && <pre>ERROR! {error}...</pre>}
      {isPending && <pre>LOADING...</pre>}
      <pre>{JSON.stringify(games, null, 2)}</pre>
    </>
  );
};
