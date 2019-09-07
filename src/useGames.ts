import React from 'react';
import { useAsyncFunction } from './useAsyncFunction';

export type Game = {
  id: number;
  title: string;
  year: number;
  genre: string;
  url: string;
  status: 'not-started' | 'in-progress' | 'finished';
  img: string;
};

const getGames = (): Promise<Game[]> => {
  return fetch('http://localhost:3001/games/').then(response => {
    if (response.status !== 200) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
};

export const setGameStatus = (id: number, status: Game['status']): Promise<Game> => {
  return fetch('http://localhost:3001/games/' + id, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: status })
  }).then(response => response.json());
};

const emptyList: Game[] = [];

const useFetchedGames = () => {
  const [fetchedGames, error, isPending] = useAsyncFunction(getGames, emptyList);

  const [games, setGames] = React.useState(emptyList);
  React.useEffect(() => {
    setGames(fetchedGames);
  }, [fetchedGames]);

  return { games, setGames, error, isPending };
};

export const useGames = () => {
  const { games, error, isPending, setGames } = useFetchedGames();

  const updateGame = (game: Game) => {
    const index = games.findIndex(g => g.id === game.id);
    if (index >= 0) {
      const gamesCopy = games.slice();
      gamesCopy[index] = game;
      setGames(gamesCopy);
    }
  };
  const markAsFinished = (id: number) => {
    setGameStatus(id, 'finished').then(updateGame);
  };

  return { games, error, isPending, markAsFinished };
};
