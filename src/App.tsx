import React from 'react';
import { useGames } from './useGames';
import { GameComponent } from './GameComponent';
import { Game } from './gameClientAPI';

export const App = () => {
  return (
    <>
      <h1>My Favourite Commodore 64 Games</h1>
      <GameList />
    </>
  );
};

const GameList = () => {
  const { games, error, isPending, markAsFinished } = useGames();

  return (
    <>
      {error && <pre>ERROR! {error}...</pre>}
      {isPending && <pre>LOADING...</pre>}
      <Totals games={games} />
      <GameGrid games={games} markAsFinished={markAsFinished} />
    </>
  );
};

type TotalsProps = { games: Game[] };

const Totals = ({ games }: TotalsProps) => {
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

type GameGridProps = { games: Game[]; markAsFinished: (id: number) => void };

const GameGrid = ({ games, markAsFinished }: GameGridProps) => {
  return (
    <div className="gamegrid">
      {games.map(game => (
        <GameComponent key={game.id} game={game} markAsFinished={markAsFinished} />
      ))}
    </div>
  );
};
