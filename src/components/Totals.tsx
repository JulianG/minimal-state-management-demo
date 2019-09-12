import React from 'react';
import { gamesContext } from '../GamesContext';

export const Totals = () => {
  const { games } = React.useContext(gamesContext);

  const totalGames = games.length;
  const inProgress = games.filter(g => g.status === 'in-progress').length;
  const finished = games.filter(g => g.status === 'finished').length;

  return (
    <div className="card">
      total games: {totalGames}
      <br />
      in progress️: {inProgress}
      <br />
      finished: {finished}
    </div>
  );
};
