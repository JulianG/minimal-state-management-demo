import React from 'react';
import { Game } from '../gameClientAPI';

type GameComponentProps = { game: Game; markAsFinished: (id: number) => void };

export const GameComponent = ({ game, markAsFinished }: GameComponentProps) => {
  return (
    <div key={game.id} className="game card">
      <div className="title"><div className="year">{game.year}</div>{game.title}</div>
      <div className="thumbnail">
        <img src={game.img} alt={game.title} />
      </div>
      <div className="genre"> {game.genre}</div>
      <div className="status">
        {getStatusText(game.status)} <button
          disabled={game.status === 'finished'}
          onClick={() => markAsFinished(game.id)}
        >
          Mark as Finished
        </button>
      </div>
    </div>
  );
};

function getStatusText(status: Game['status']): string {
  return {
    'not-started': '❌ not started',
    'in-progress': '⚠️ in progress',
    finished: '✅ finished'
  }[status];
}
