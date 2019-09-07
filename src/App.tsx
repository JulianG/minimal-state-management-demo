import React from 'react';
import { useGames } from './useGames';
import { Game } from './gameClientAPI';

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

type GameComponentProps = { game: Game; markAsFinished: (id: number) => void };

const GameComponent = ({ game, markAsFinished }: GameComponentProps) => {
  return (
    <pre onClick={() => markAsFinished(game.id)}>
      Title: {game.title}
      Year: {game.year}
      Status: {game.status}
    </pre>
  );
};