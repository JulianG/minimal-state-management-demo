import React from 'react';
import { Game } from './gameClientAPI';

type GameComponentProps = { game: Game; markAsFinished: (id: number) => void };

export const GameComponent = ({ game, markAsFinished }: GameComponentProps) => {
  return (
    <pre onClick={() => markAsFinished(game.id)}>
      Title: {game.title}
      Year: {game.year}
      Status: {game.status}
    </pre>
  );
};
